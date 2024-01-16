"use client";
import React, { createContext, ReactNode } from "react";
import { stores } from "./stores";

export const StoreContext = createContext(stores);

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  );
};