import { ClickEvent, InputEvent, RefType } from "@/types/types";
import styles from "@/styles/authInput.module.css";
import clsx from "clsx";

type AuthInputProps = {
  handleInputChange: (e: InputEvent) => void;
  minLength: number | null;
  maxLength: number | null;
  inputRef: RefType;
  handleClick: (e: ClickEvent) => void;
  multiCountry?: boolean;
  inputValue: string;
  direction?: string;
  phoneMode: boolean;
  isNumber: boolean;
  className?: string;
  enableFlag?: boolean;
};

/**
 * A component that renders an input field for international phone numbers as well as a text field.
 *
 * @param {CountryState} country the current country state
 * @param {(e: InputEvent) => void} handleInputChange callback function that gets called when the input field value changes
 * @param {number | null} minLength the minimum length of the input field, or null if no limit
 * @param {number | null} maxLength the maximum length of the input field, or null if no limit
 * @param {RefType} inputRef the reference of the input field
 * @param {(e: ClickEvent) => void} handleClick callback function that gets called when the input field is clicked
 * @param {boolean} [multiCountry=false] whether the input field should allow multiple countries
 * @param {object} [rest] any other props to pass to the input field
 *
 * @returns {JSX.Element} the rendered component
 */

const AuthInput: React.FC<AuthInputProps> = (props) => {
  const {
    handleInputChange,
    minLength,
    maxLength,
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

  const inputClassName = clsx(
    styles["input-box"],
    multiCountry && styles["multi-country-input"],
    isNumber && enableFlag && styles["number"],
    direction === "rtl" && styles["rtl"],
    className
  );

  return (
    <input
      ref={inputRef}
      value={inputValue}
      min={minLength ?? undefined}
      max={maxLength ?? undefined}
      onChange={handleInputChange}
      onClick={handleClick}
      dir={direction}
      inputMode={phoneMode ? "numeric" : "text"}
      pattern={phoneMode ? "\\d*" : ""}
      className={inputClassName}
      {...rest}
    />
  );
};

export default AuthInput;
