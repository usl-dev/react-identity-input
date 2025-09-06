import React, { useMemo } from "react";
import AuthInput from "../AuthInput";
import CustomSelect from "../CountrySelect/CustomSelect";
import HtmlSelect from "../CountrySelect/HtmlSelect";
import Flag from "../Flag";
import { IntlPhoneUsernameInputProps } from "@/types/types";
import useInputHook from "@/hooks/useInputHook";
import styles from "@/styles/intlPhoneUsernameInput.module.css";
import { useDeviceType } from "@/hooks/useDeviceType ";
import clsx from "clsx";
import { getValidOptions } from "@/helpers/getValidOptions";
import { cleanProps } from "@/helpers/cleanProps";

const IntlPhoneUsernameInput: React.FC<IntlPhoneUsernameInputProps> = (
  props
) => {
  const {
    value,
    onChange,
    selectFieldName = "country_select",
    options = {},
    max: _max,
    min: _min,
    type: _type,
    onChangeSelect,
    ...rest
  } = props;

  // Memoize expensive operations
  const inputProps = useMemo(() => cleanProps(rest), [rest]);
  const finalOptions = useMemo(() => getValidOptions(options), [options]);

  const {
    multiCountry,
    enableFlag,
    customSelect,
    mode,
    defaultCountry,
    highLightCountries,
    preferredCountries,
    customArrowIcon,
    direction,
    enforceCustomSelect,
    enforceHtmlSelect,
    classes,
    format,
    hideDialCode,
  } = finalOptions;

  const {
    countryDetails,
    inputRef,
    handleInputChange,
    handleChangeSelect,
    handleClick,
    moveKeyToTop,
    inputValue,
    isNumber,
  } = useInputHook({
    mode,
    multiCountry,
    defaultCountry,
    highLightCountries,
    preferredCountries,
    value,
    onChange,
    format,
    onChangeSelect,
    hideDialCode,
  });

  const isMobile = useDeviceType();

  // Memoize render functions to prevent unnecessary re-renders

  const renderSelect = useMemo(() => {
    if (
      multiCountry &&
      inputValue?.startsWith(countryDetails?.presentDialCode)
    ) {
      if (enforceCustomSelect) {
        return (
          <CustomSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            countryCode={countryDetails?.code}
            customArrowIcon={customArrowIcon}
            direction={direction}
            className={classes?.custom_select as { [key: string]: string }}
            {...customSelect}
          />
        );
      } else if (enforceHtmlSelect) {
        return (
          <HtmlSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            countryCode={countryDetails?.code}
            customArrowIcon={customArrowIcon}
            className={classes?.html_select as { [key: string]: string }}
            direction={direction}
          />
        );
      } else {
        return isMobile ? (
          <HtmlSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            countryCode={countryDetails?.code}
            customArrowIcon={customArrowIcon}
            direction={direction}
            className={classes?.html_select as { [key: string]: string }}
          />
        ) : (
          <CustomSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            countryCode={countryDetails?.code}
            customArrowIcon={customArrowIcon}
            className={classes?.custom_select as { [key: string]: string }}
            direction={direction}
            {...customSelect}
          />
        );
      }
    }
    return null;
  }, [
    multiCountry,
    inputValue,
    countryDetails?.presentDialCode,
    enforceCustomSelect,
    enforceHtmlSelect,
    isMobile,
    handleChangeSelect,
    moveKeyToTop,
    countryDetails?.code,
    customArrowIcon,
    direction,
    classes?.custom_select,
    classes?.html_select,
    customSelect,
  ]);

  const renderFlag = useMemo(() => {
    if (!multiCountry && enableFlag && isNumber) {
      return (
        <div
          className={clsx(
            styles["flag-container"],
            direction === "rtl" && styles["rtl"],
            classes?.flag_container
          )}
        >
          <Flag
            countryCode={countryDetails?.code}
            direction={direction}
            className={classes?.flag as string}
          />
        </div>
      );
    }
    return null;
  }, [
    multiCountry,
    enableFlag,
    isNumber,
    countryDetails?.code,
    direction,
    classes?.flag_container,
    classes?.flag,
  ]);

  return (
    <div
      className={clsx(
        styles.container,
        direction === "rtl" && styles.rtl,
        classes?.intlPhoneUsernameInputWrapper
      )}
    >
      {renderFlag}
      {renderSelect}
      <AuthInput
        multiCountry={multiCountry}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        inputRef={inputRef}
        handleClick={handleClick}
        direction={direction}
        phoneMode={mode === "phone"}
        isNumber={isNumber}
        className={classes?.input_box as string}
        enableFlag={multiCountry ? true : enableFlag}
        {...inputProps}
      />
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default React.memo(IntlPhoneUsernameInput, (prevProps, nextProps) => {
  // Custom comparison for better performance - avoid JSON.stringify for circular references
  
  // Deep compare options object safely
  const optionsEqual = (() => {
    const prevOptions = (prevProps.options || {}) as Record<string, any>;
    const nextOptions = (nextProps.options || {}) as Record<string, any>;
    const prevKeys = Object.keys(prevOptions);
    const nextKeys = Object.keys(nextOptions);
    
    if (prevKeys.length !== nextKeys.length) return false;
    
    for (const key of prevKeys) {
      const prevVal = prevOptions[key];
      const nextVal = nextOptions[key];
      
      // Handle array comparison
      if (Array.isArray(prevVal) && Array.isArray(nextVal)) {
        if (prevVal.length !== nextVal.length) return false;
        for (let i = 0; i < prevVal.length; i++) {
          if (prevVal[i] !== nextVal[i]) return false;
        }
      }
      // Handle object comparison (shallow)
      else if (typeof prevVal === 'object' && typeof nextVal === 'object' && prevVal !== null && nextVal !== null) {
        const prevObjKeys = Object.keys(prevVal);
        const nextObjKeys = Object.keys(nextVal);
        if (prevObjKeys.length !== nextObjKeys.length) return false;
        for (const objKey of prevObjKeys) {
          if (prevVal[objKey] !== nextVal[objKey]) return false;
        }
      }
      // Handle primitive comparison
      else if (prevVal !== nextVal) {
        return false;
      }
    }
    return true;
  })();

  return (
    prevProps.value === nextProps.value &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.onChangeSelect === nextProps.onChangeSelect &&
    optionsEqual &&
    prevProps.selectFieldName === nextProps.selectFieldName &&
    prevProps.max === nextProps.max &&
    prevProps.min === nextProps.min &&
    prevProps.type === nextProps.type
  );
});
