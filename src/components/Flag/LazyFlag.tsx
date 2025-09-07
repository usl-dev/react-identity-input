import { memo, useState, useEffect, useRef } from "react";
import { getCountryFromList } from "@/helpers/getCountryFromList";
import styles from "@/styles/flag.module.css";
import { FlagProps } from "@/types/types";
import clsx from "clsx";
import { getFlag } from "@/helpers/getFlag";

const LazyFlag: React.FC<FlagProps> = memo((props) => {
  const { countryCode, customSelect, direction, className } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const countryData = getCountryFromList(countryCode);
  const flagSrc = getFlag(countryCode);

  useEffect(() => {
    const currentImg = imgRef.current;
    if (!currentImg) return;

    // Create intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
        threshold: 0.1,
      }
    );

    observerRef.current.observe(currentImg);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isVisible]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(true); // Still set loaded to avoid infinite loading state
  };

  return (
    <div
      className={clsx(
        styles["flag-wrap"],
        customSelect && styles["custom-select"],
        direction === "rtl" && styles["rtl"],
        className
      )}
    >
      <img
        ref={imgRef}
        alt={countryData?.label || "Flag"}
        src={
          isVisible
            ? flagSrc
            : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="
        } // Transparent placeholder
        className={clsx(styles.flag, !isLoaded && styles["flag-loading"])}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
});

LazyFlag.displayName = "LazyFlag";

export default LazyFlag;
