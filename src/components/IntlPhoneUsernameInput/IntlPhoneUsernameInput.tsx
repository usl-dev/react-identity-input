import AuthInput from "../AuthInput";
import CustomSelect from "../CountrySelect/CustomSelect";
import HtmlSelect from "../CountrySelect/HtmlSelect";
import Flag from "../Flag";
import { Options } from "@/types/types";
import useInputHook from "@/hooks/useInputHook";
import styles from "@/styles/intlPhoneUsernameInput.module.css";
import { useDeviceType } from "@/hooks/useDeviceType ";
import clsx from "clsx";

const defaultOptions: Options = {
  mode: "hybrid",
  enableFlag: false,
  customSelect: {
    showFlag: false,
    showDialCode: false,
  },
  multiCountry: false,
  defaultCountry: "IN",
  direction: "ltr",
  enforceHtmlSelect: false,
  enforceCustomSelect: false,
};

type IntlPhoneUsernameInputProps = {
  value: string;
  onChange: (value: string) => void;
  selectFieldName?: string;
  options?: Options;
  [key: string]: any;
};

/**
 * A component that renders a flag, a country select and an input field, all together.
 * The country select is a hybrid of a select field and a text input, where the select
 * field is only shown if the text input contains a valid country code.
 *
 * @param {string} value the current value of the input field
 * @param {function} onChange callback function that gets called when the input field value changes
 * @param {string} selectFieldName the name of the select field
 * @param {object} options options to customize the component
 * @param {string} options.mode the mode of the component, either "select" or "hybrid"
 * @param {boolean} options.multiCountry whether the country select should be shown
 * @param {boolean} options.enableFlag whether the flag should be shown
 * @param {object} options.customSelect options to customize the custom select component
 * @param {string} options.defaultCountry the default country code
 * @param {string[]} options.highLightCountries the country codes to highlight
 * @param {string[]} options.preferredCountries the country codes to show at the top of the select field
 * @param {React.ReactNode} options.customArrowIcon the custom arrow icon to use for the select field
 * @param {object} rest any other props to pass to the AuthInput component
 *
 * @returns {JSX.Element} the rendered component
 */

const IntlPhoneUsernameInput: React.FC<IntlPhoneUsernameInputProps> = (
  props
) => {
  const {
    value,
    onChange,
    selectFieldName = "country_select",
    options = {},
    ...rest
  } = props;

  const finalOptions = { ...defaultOptions, ...options };
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
  } = finalOptions;

  const {
    country,
    inputRef,
    minLength,
    maxLength,
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
  });

  const isMobile = useDeviceType();

  const renderSelect = () => {
    if (multiCountry && inputValue?.startsWith(country?.presentDialCode)) {
      if (enforceCustomSelect) {
        return (
          <CustomSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            country={country}
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
            country={country}
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
            country={country}
            customArrowIcon={customArrowIcon}
            direction={direction}
            className={classes?.html_select as { [key: string]: string }}
          />
        ) : (
          <CustomSelect
            handleChangeSelect={handleChangeSelect}
            moveKeyToTop={moveKeyToTop}
            country={country}
            customArrowIcon={customArrowIcon}
            className={classes?.custom_select as { [key: string]: string }}
            direction={direction}
            {...customSelect}
          />
        );
      }
    }
    return null;
  };

  const renderFlag = () => {
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
            code={country?.code}
            direction={direction}
            className={classes?.flag as string}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={clsx(
        styles.container,
        direction === "rtl" && styles.rtl,
        classes?.intlPhoneUsernameInputWrapper
      )}
    >
      {renderFlag()}
      {renderSelect()}
      <AuthInput
        multiCountry={multiCountry}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        minLength={minLength}
        maxLength={maxLength}
        inputRef={inputRef}
        handleClick={handleClick}
        direction={direction}
        phoneMode={mode === "phone"}
        isNumber={isNumber}
        className={classes?.input_box as string}
        enableFlag={multiCountry ? true : enableFlag}
        {...rest}
      />
    </div>
  );
};

export default IntlPhoneUsernameInput;
