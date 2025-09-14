import React, { useState } from "react";
import { getCountryFromList } from "@/helpers/getCountryFromList";
import { getFlag } from "@/helpers/getFlag";
import styles from "@/styles/flag.module.css";
import { FlagProps } from "@/types/types";
import clsx from "clsx";

const Flag: React.FC<FlagProps> = (props) => {
  const { countryCode, customSelect, direction, className } = props;
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
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
      {hasError ? (
        <div
          className={styles.flag}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f0f0f0",
            fontSize: "10px",
            color: "#666",
          }}
        >
          {countryCode?.toUpperCase() || "??"}
        </div>
      ) : (
        <img
          alt={getCountryFromList(countryCode)?.label}
          src={getFlag(countryCode)}
          className={styles.flag}
          loading="eager"
          draggable={false}
          onError={handleImageError}
          style={{
            display: "block",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}
    </div>
  );
};

export default React.memo(Flag, (prevProps, nextProps) => {
  // Only re-render if countryCode actually changed (most important prop)
  if (prevProps.countryCode !== nextProps.countryCode) {
    return false; // Re-render
  }
  
  // For other props, only check if countryCode is the same
  return (
    prevProps.customSelect === nextProps.customSelect &&
    prevProps.direction === nextProps.direction &&
    prevProps.className === nextProps.className
  );
});
