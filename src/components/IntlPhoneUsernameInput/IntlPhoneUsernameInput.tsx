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
import { SELECT_FIELD_NAME } from "@/assets/constants";

const IntlPhoneUsernameInput: React.FC<IntlPhoneUsernameInputProps> = (
  props
) => {
  const {
    value,
    onChange,
    selectFieldName = SELECT_FIELD_NAME,
    options = {},
    max: _max,
    min: _min,
    type: _type,
    onChangeSelect,
    ...rest
  } = props;

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

// Simplified memo comparison for better performance
export default React.memo(IntlPhoneUsernameInput, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.onChangeSelect === nextProps.onChangeSelect &&
    // Use reference equality for options - parent should memoize this object
    prevProps.options === nextProps.options &&
    prevProps.selectFieldName === nextProps.selectFieldName &&
    prevProps.max === nextProps.max &&
    prevProps.min === nextProps.min &&
    prevProps.type === nextProps.type
  );
});
