import { useState } from "react";
import Flag from "@/components/Flag";
import {
  BtnClickEvent,
  Country,
  CountryState,
  SelectEvent,
} from "@/types/types";
import styles from "@/styles/customSelect.module.css";
import Arrow from "../Arrow";
import clsx from "clsx";

type CustomSelectProps = {
  moveKeyToTop: Country[];
  country: CountryState;
  handleChangeSelect: (e: SelectEvent) => void;
  selectFieldName?: string;
  showFlag?: boolean;
  showDialCode?: boolean;
  customArrowIcon?: React.ReactNode;
  direction?: string;
  className?: {
    [key: string]: string;
  };
};

/**
 * A custom select component that renders a list of countries.
 * The component will render a list of countries when the user clicks on the
 * select button. The list of countries will be filtered based on the value of
 * `moveKeyToTop` prop.
 *
 * @param { Country[]} moveKeyToTop - A function that returns a list of countries
 * @param {CountryState} country - The current country state
 * @param {(e: SelectEvent) => void} handleChangeSelect - A callback function that will be called when the user selects a country
 * @param {string} [selectFieldName] - The name of the select field
 * @param {boolean} [showFlag] - Whether to show the flag or not
 * @param {boolean} [showDialCode] - Whether to show the dial code or not
 */

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const {
    moveKeyToTop,
    country,
    handleChangeSelect,
    showFlag,
    showDialCode,
    customArrowIcon,
    direction,
    className,
  } = props;
  const [select, setSelect] = useState(false);

  /**
   * Handles the click event on a country option.
   * It will call the `handleChangeSelect` prop with a fake event object that
   * contains the value and dial code of the selected country.
   * It will also set the `select` state to false.
   * @param {BtnClickEvent} e the click event
   */

  const handleOptionClick = (e: BtnClickEvent) => {
    const target = e.currentTarget;
    const value = target.value;
    const dialCode = target.getAttribute("data-dial-code") ?? "";

    // Call your own handler here manually
    const fakeEvent = {
      target: {
        value: value,
        selectedOptions: [
          {
            getAttribute: (attr: string) =>
              attr === "data-dial-code" ? dialCode : null,
          },
        ],
      },
    } as unknown as React.ChangeEvent<HTMLSelectElement>;

    handleChangeSelect(fakeEvent);
    setSelect(false);
  };

  const renderCountryList = () =>
    moveKeyToTop?.map((option) => (
      <li
        key={option?.value}
        className={clsx(
          styles["country-list-item"],
          option?.value === country?.code && styles.selected,
          className?.country_list_item
        )}
        role="listbox"
      >
        <button
          className={clsx(styles["country-option"], className?.country_option)}
          value={option?.value}
          data-label={option?.label}
          data-dial-code={option?.dial_code}
          onClick={handleOptionClick}
          aria-selected={option?.value === country.code}
          type="button"
        >
          {showFlag ? (
            <>
              <Flag
                code={option?.value}
                customSelect
                className={className?.list_flag}
              />
              <span className={styles["country-name"]}>{option.label}</span>
              {showDialCode && (
                <span className={styles["dial-code"]}>{option?.dial_code}</span>
              )}
            </>
          ) : (
            option?.label
          )}
        </button>
      </li>
    ));

  return (
    <div
      className={clsx(
        styles["select-container"],
        direction === "rtl" && styles.rtl,
        className?.select_container
      )}
      dir={direction}
    >
      <button
        className={clsx(
          styles["select-overlay-btn"],
          className?.select_overlay_btn
        )}
        type="button"
        onClick={() => setSelect(!select)}
        aria-expanded={select}
        aria-haspopup="listbox"
      >
        <Flag code={country?.code} className={className?.flag} />
        <Arrow
          customSelect={select}
          customArrowIcon={customArrowIcon}
          className={className?.arrow}
        />
      </button>
      <ul
        className={clsx(
          styles["country-list"],
          select && styles.show,
          className?.country_list
        )}
        role="selection"
        aria-activedescendant="option-id"
      >
        {renderCountryList()}
      </ul>
    </div>
  );
};

export default CustomSelect;
