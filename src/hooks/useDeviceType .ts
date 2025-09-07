// hooks/useDeviceType.ts
import { DEFAULT_BREAKPOINT } from "@/assets/constants";
import { useState, useEffect } from "react";

// Shared state for device detection to avoid multiple listeners
class DeviceTypeManager {
  private listeners = new Set<(isMobile: boolean) => void>();
  private _isMobile = false;
  private _breakpoint = DEFAULT_BREAKPOINT;
  private resizeHandler: (() => void) | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this._isMobile = window.innerWidth < this._breakpoint;
    }
  }

  subscribe(
    callback: (isMobile: boolean) => void,
    breakpoint: number = DEFAULT_BREAKPOINT
  ) {
    // If breakpoint changed, update and recalculate
    if (breakpoint !== this._breakpoint) {
      this._breakpoint = breakpoint;
      this.updateIsMobile();
    }

    this.listeners.add(callback);

    // Add resize listener only when first subscriber joins
    if (this.listeners.size === 1 && !this.resizeHandler) {
      this.resizeHandler = () => this.updateIsMobile();
      window.addEventListener("resize", this.resizeHandler);
    }

    // Return current state immediately
    return this._isMobile;
  }

  unsubscribe(callback: (isMobile: boolean) => void) {
    this.listeners.delete(callback);

    // Remove resize listener when no more subscribers
    if (this.listeners.size === 0 && this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  private updateIsMobile() {
    if (typeof window === "undefined") return;

    const newIsMobile = window.innerWidth < this._breakpoint;
    if (newIsMobile !== this._isMobile) {
      this._isMobile = newIsMobile;
      this.listeners.forEach((callback) => callback(this._isMobile));
    }
  }
}

// Singleton instance
const deviceManager = new DeviceTypeManager();

export const useDeviceType = (breakpoint: number = DEFAULT_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < breakpoint;
    }
    return false;
  });

  useEffect(() => {
    const currentIsMobile = deviceManager.subscribe(setIsMobile, breakpoint);
    setIsMobile(currentIsMobile);

    return () => {
      deviceManager.unsubscribe(setIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
};
