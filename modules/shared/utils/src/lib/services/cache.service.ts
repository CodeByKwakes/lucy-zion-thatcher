import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { environment } from '../environments';

interface DataWithTimestamp {
  value: unknown;
  timestamp: number;
  expirationInSeconds: number;
  isEncrypted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  readonly #prefix = 'app-cache-';
  readonly #secretKey = '1029384756';

  get(key: string): unknown {
    const storageKey = this.getKey(key);
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue) {
      const dataWithTimestamp: DataWithTimestamp = JSON.parse(storedValue);

      // Check if data is still valid based on expiration
      if (
        !dataWithTimestamp.expirationInSeconds ||
        this.isDataValid(dataWithTimestamp)
      ) {
        return dataWithTimestamp.isEncrypted
          ? this.decrypt(dataWithTimestamp.value)
          : dataWithTimestamp.value;
      }
      // If data is expired, remove it from the cache
      this.clearKey(key);
    }

    return null;
  }

  set(
    key: string,
    value: unknown,
    expirationInSeconds = 0,
    encrypt: boolean = environment.isProduction
  ): void {
    const storageKey = this.getKey(key);
    const timestamp = new Date().getTime();
    const dataWithTimestamp: DataWithTimestamp = {
      value: encrypt ? this.encrypt(value) : value,
      timestamp,
      expirationInSeconds,
      isEncrypted: encrypt
    };

    localStorage.setItem(storageKey, JSON.stringify(dataWithTimestamp));
  }

  clear(): void {
    // Clear all items with the app-specific prefix
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(this.#prefix)) {
        this.clearKey(key);
      }
    });
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
