export function detectMobileOS(): "Android" | "iOS" | "Unknown" {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return "Unknown";
  }

  const userAgent = navigator.userAgent ?? "";
  const hasMSStream =
    "MSStream" in window &&
    Boolean((window as Window & { MSStream?: unknown }).MSStream);

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !hasMSStream) {
    return "iOS";
  }

  return "Unknown";
}
