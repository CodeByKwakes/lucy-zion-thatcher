import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../environments';

interface DataWithTimestamp {
  value: unknown;
  timestamp: number;
  expirationInSeconds: number;
  isEncrypted: boolean;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  readonly #prefix = 'app-cache-';
  readonly #backupPrefix = 'app-cache-backup-';
  readonly #secretKey = '1029384756';
  readonly #defaultExpirationInSeconds = 172800; // 2 days in seconds

  constructor() {
    // Set up periodic check for expired items (every hour)
    if (typeof window !== 'undefined') {
      setInterval(() => this.cleanupExpiredItems(), 3600000);
    }
  }

  get(key: string): unknown {
    const storageKey = this.getKey(key);
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue) {
      const dataWithTimestamp: DataWithTimestamp = JSON.parse(storedValue);

      // Check if expirationInSeconds is 0 and clear the cache
      if (dataWithTimestamp.expirationInSeconds === 0) {
        this.clear();
        return null;
      }

      // Check if data is still valid based on expiration
      if (
        !dataWithTimestamp.expirationInSeconds ||
        this.isDataValid(dataWithTimestamp)
      ) {
        return dataWithTimestamp.isEncrypted
          ? this.decrypt(dataWithTimestamp.value)
          : dataWithTimestamp.value;
      }
      // If data is expired, backup and remove it from the cache
      this.backupItem(key, dataWithTimestamp);
      this.clearKey(storageKey);
    }

    // Try to get from backup if not in main storage
    return this.getFromBackup(key);
  }

  set(
    key: string,
    value: unknown,
    expirationInSeconds = this.#defaultExpirationInSeconds,
    encrypt: boolean = environment.isProduction
  ): void {
    if (expirationInSeconds === 0) {
      this.clear();
      expirationInSeconds = this.#defaultExpirationInSeconds;
    }

    const storageKey = this.getKey(key);
    const timestamp = new Date().getTime();
    const dataWithTimestamp: DataWithTimestamp = {
      value: encrypt ? this.encrypt(value) : value,
      timestamp,
      expirationInSeconds,
      isEncrypted: encrypt
    };

    localStorage.setItem(storageKey, JSON.stringify(dataWithTimestamp));
    // Remove any backup for this key as we're setting a fresh value
    this.clearBackupKey(key);
  }

  clear(): void {
    // Backup all items before clearing
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.#prefix)) {
        const originalKey = key.substring(this.#prefix.length);
        const item = localStorage.getItem(key);
        const data = item ? JSON.parse(item) : {};
        this.backupItem(originalKey, data);
        localStorage.removeItem(key);
      }
    });
  }

  restoreAllBackups(): void {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.#backupPrefix)) {
        const originalKey = key.substring(this.#backupPrefix.length);
        const backupData = JSON.parse(localStorage.getItem(key) ?? '{}');

        // Restore with a fresh timestamp but keep the same expiration period
        this.set(
          originalKey,
          backupData.isEncrypted
            ? this.decrypt(backupData.value)
            : backupData.value,
          backupData.expirationInSeconds,
          backupData.isEncrypted
        );

        // Remove the backup after restoration
        localStorage.removeItem(key);
      }
    });
  }

  private cleanupExpiredItems(): void {
    const currentTime = new Date().getTime();

    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.#prefix)) {
        try {
          const data: DataWithTimestamp = JSON.parse(
            localStorage.getItem(key) || '{}'
          );
          if (
            data.expirationInSeconds &&
            currentTime - data.timestamp > data.expirationInSeconds * 1000
          ) {
            const originalKey = key.substring(this.#prefix.length);
            this.backupItem(originalKey, data);
            localStorage.removeItem(key);
          }
        } catch (e) {
          // Skip if item can't be parsed
        }
      }
    });
  }

  private backupItem(key: string, data: DataWithTimestamp): void {
    const backupKey = this.#backupPrefix + key;
    localStorage.setItem(backupKey, JSON.stringify(data));
  }

  private getFromBackup(key: string): unknown {
    const backupKey = this.#backupPrefix + key;
    const backupData = localStorage.getItem(backupKey);

    if (backupData) {
      const data: DataWithTimestamp = JSON.parse(backupData);
      // Restore the item to main storage with fresh timestamp
      this.set(
        key,
        data.isEncrypted ? this.decrypt(data.value) : data.value,
        data.expirationInSeconds,
        data.isEncrypted
      );

      // Remove from backup after restoration
      localStorage.removeItem(backupKey);

      return data.isEncrypted ? this.decrypt(data.value) : data.value;
    }

    return null;
  }

  private clearBackupKey(key: string): void {
    localStorage.removeItem(this.#backupPrefix + key);
  }

  private isDataValid(dataWithTimestamp: DataWithTimestamp): boolean {
    const currentTime = new Date().getTime();
    const cacheTime = dataWithTimestamp.timestamp;
    const expirationTime = dataWithTimestamp.expirationInSeconds * 1000; // Convert seconds to milliseconds

    return currentTime - cacheTime < expirationTime;
  }

  private encrypt(value: unknown): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      this.#secretKey
    ).toString();
  }

  private decrypt(encryptedValue: unknown): unknown {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedValue as string,
      this.#secretKey
    );

    return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  }

  private getKey(key: string): string {
    return this.#prefix + key;
  }

  private clearKey(key: string): void {
    localStorage.removeItem(key);
  }
}
