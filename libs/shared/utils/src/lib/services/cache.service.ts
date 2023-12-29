import { Injectable } from '@angular/core';

interface DataWithTimestamp {
  value: unknown;
  timestamp: number;
  expirationInSeconds: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  #prefix = 'app-cache-';

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
        return dataWithTimestamp.value;
      } else {
        // If data is expired, remove it from the cache
        this.clearKey(key);
      }
    }

    return null;
  }

  set(key: string, value: unknown, expirationInSeconds: number = 0): void {
    const storageKey = this.getKey(key);
    const timestamp = new Date().getTime();
    const dataWithTimestamp = {
      value,
      timestamp,
      expirationInSeconds
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

  private getKey(key: string): string {
    return this.#prefix + key;
  }

  private clearKey(key: string): void {
    localStorage.removeItem(key);
  }
}
