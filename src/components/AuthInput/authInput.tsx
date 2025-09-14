import React from "react";
import styles from "@/styles/authInput.module.css";
import { AuthInputProps } from "@/types/types";
import clsx from "clsx";
import { useId } from "react";

const AuthInput: React.FC<AuthInputProps> = (props) => {
  const {
    handleInputChange,
    inputRef,
    handleClick,
    multiCountry,
    inputValue,
    direction,
    phoneMode,
    isNumber,
    className,
    enableFlag,
    ...rest
  } = props;

  const id = useId();

  const inputClassName = clsx(
    styles.inputBox,
    multiCountry && styles.multiCountryInput,
    isNumber && enableFlag && styles.number,
    direction === "rtl" && styles.rtl,
    className
  );

  return (
    <input
      ref={inputRef}
      id={id}
      value={inputValue}
      onChange={handleInputChange}
      onClick={handleClick}
      dir={direction}
      inputMode={phoneMode ? "numeric" : "text"}
      pattern={phoneMode ? "\\d*" : undefined}
      className={inputClassName}
      aria-label={(rest as any).placeholder || "text-input"}
      aria-invalid={(rest as any)["aria-invalid"] || false}
      aria-required={(rest as any).required || false}
      {...rest}
    />
  );
};

// Memoize AuthInput to prevent unnecessary re-renders
export default React.memo(AuthInput, (prevProps, nextProps) => {
  // Compare all relevant props without JSON.stringify to avoid circular structure issues
  const restPrevProps = Object.keys(prevProps).filter(key => 
    !['handleInputChange', 'inputRef', 'handleClick', 'multiCountry', 'inputValue', 'direction', 'phoneMode', 'isNumber', 'className', 'enableFlag'].includes(key)
  );
  const restNextProps = Object.keys(nextProps).filter(key => 
    !['handleInputChange', 'inputRef', 'handleClick', 'multiCountry', 'inputValue', 'direction', 'phoneMode', 'isNumber', 'className', 'enableFlag'].includes(key)
  );

  // Check if rest props are equal by comparing individual primitive values
  if (restPrevProps.length !== restNextProps.length) return false;
  
  for (const key of restPrevProps) {
    if (prevProps[key] !== nextProps[key]) {
      // For objects, do shallow comparison for simple props only
      if (typeof prevProps[key] === 'object' && typeof nextProps[key] === 'object') {
        if (prevProps[key] === null || nextProps[key] === null) {
          if (prevProps[key] !== nextProps[key]) return false;
        } else {
          // Skip objects to avoid circular references
          continue;
        }
      } else {
        return false;
      }
    }
  }

  return (
    prevProps.inputValue === nextProps.inputValue &&
    prevProps.handleInputChange === nextProps.handleInputChange &&
    prevProps.handleClick === nextProps.handleClick &&
    prevProps.multiCountry === nextProps.multiCountry &&
    prevProps.direction === nextProps.direction &&
    prevProps.phoneMode === nextProps.phoneMode &&
    prevProps.isNumber === nextProps.isNumber &&
    prevProps.className === nextProps.className &&
    prevProps.enableFlag === nextProps.enableFlag
  );
});
