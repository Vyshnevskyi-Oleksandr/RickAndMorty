"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const store = {};

function createMMKV(_options) {
  return {
    getString(key) {
      return store[key] !== undefined ? store[key] : undefined;
    },
    set(key, value) {
      store[key] = value;
    },
    remove(key) {
      delete store[key];
    }
  };
}

exports.createMMKV = createMMKV;
