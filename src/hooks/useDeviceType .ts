// hooks/useDeviceType.ts
import { useState, useEffect } from "react";

export const useDeviceType = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreen = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < breakpoint);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  return isMobile;
};
