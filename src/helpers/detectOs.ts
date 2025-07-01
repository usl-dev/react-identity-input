export function detectMobileOS(): "Android" | "iOS" | "Unknown" {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return "Unknown";
  }

  const userAgent = navigator.userAgent || (window as any).opera || "";

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    return "iOS";
  }

  return "Unknown";
}
