import React, { memo } from "react";
import styles from "@/styles/arrow.module.css";
import { ArrowProps } from "@/types/types";
import clsx from "clsx";

const Arrow = ({
  customSelect,
  customArrowIcon,
  className,
}: ArrowProps) => {
  if (customArrowIcon) {
    return (
      <div
        className={clsx(
          styles["dropdown-icon"],
          customSelect && styles["custom-select-dropdown"],
          className
        )}
      >
        {customArrowIcon}
      </div>
    );
  }

  return (
    <svg
      className={clsx(
        styles["dropdown-icon"],
        customSelect && styles["custom-select-dropdown"]
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
};

Arrow.displayName = "Arrow";
export default memo(Arrow);
