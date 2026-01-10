"use client";

import { useSyncExternalStore, useCallback } from "react";

type Store<T> = {
  value: T;
  listeners: Set<() => void>;
};

const stores = new Map<string, Store<unknown>>();

function getStore<T>(key: string, defaultValue: T): Store<T> {
  if (!stores.has(key)) {
    let initialValue = defaultValue;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          initialValue = JSON.parse(stored) as T;
        } catch {
          initialValue = defaultValue;
        }
      }
    }
    stores.set(key, { value: initialValue, listeners: new Set() });
  }
  return stores.get(key) as Store<T>;
}

function setStoreValue<T>(key: string, newValue: T) {
  const store = stores.get(key) as Store<T> | undefined;
  if (store) {
    store.value = newValue;
    localStorage.setItem(key, JSON.stringify(newValue));
    store.listeners.forEach((listener) => listener());
  }
}

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const store = getStore(key, defaultValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      store.listeners.add(callback);
      return () => {
        store.listeners.delete(callback);
      };
    },
    [store]
  );

  const getSnapshot = useCallback(() => store.value as T, [store]);

  const getServerSnapshot = useCallback(() => defaultValue, [defaultValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (newValue: T) => {
      setStoreValue(key, newValue);
    },
    [key]
  );

  return [value, setValue];
}
