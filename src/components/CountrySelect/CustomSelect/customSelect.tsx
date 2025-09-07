import React, { useId, useMemo } from "react";
import Flag from "@/components/Flag";
import LazyFlag from "@/components/Flag/LazyFlag";
import { CustomSelectProps } from "@/types/types";
import styles from "@/styles/customSelect.module.css";
import Arrow from "../Arrow";
import clsx from "clsx";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useCustomSelect } from "@/hooks/useCustomSelect";

const CustomSelect: React.FC<CustomSelectProps> = (props) => {
  const {
    moveKeyToTop,
    countryCode,
    handleChangeSelect,
    showFlag,
    showDialCode,
    customArrowIcon,
    direction,
    enableSearch = true,
    searchPlaceholder,
    className,
  } = props;

  const {
    isOpen,
    searchQuery,
    filteredCountries,
    focusedIndex,
    listRef,
    searchInputRef,
    toggleDropdown,
    handleOptionClick,
    handleSearchChange,
    handleClickOutside,
    handleKeyDown,
  } = useCustomSelect({
    countryCode,
    moveKeyToTop,
    enableSearch,
    handleChangeSelect,
  });

  const ref = useClickOutside<HTMLDivElement>(handleClickOutside, isOpen);
  const listboxId = useId();
  const buttonId = useId();

  // Memoize the country list rendering to prevent unnecessary re-renders

  const renderCountryList = useMemo(
    () =>
      filteredCountries?.map((option, index) => (
        <li
          key={option?.value}
          className={clsx(
            styles["country-list-item"],
            className?.country_list_item
          )}
          role="presentation"
        >
          <button
            className={clsx(
              styles["country-option"],
              option?.value === countryCode && styles.selected,
              focusedIndex === index && styles.focused,
              className?.country_option
            )}
            value={option?.value}
            data-label={option?.label}
            data-dial-code={option?.dial_code}
            onClick={handleOptionClick}
            aria-selected={option?.value === countryCode}
            role="option"
            type="button"
            id={`${listboxId}-option-${index}`}
            tabIndex={isOpen ? 0 : -1}
          >
            {showFlag && (
              <LazyFlag
                countryCode={option?.value}
                customSelect
                className={className?.list_flag}
              />
            )}
            <span className={styles["country-name"]}>{option.label}</span>
            {showDialCode && (
              <span className={styles["dial-code"]}>{option?.dial_code}</span>
            )}
          </button>
        </li>
      )),
    [
      filteredCountries,
      countryCode,
      handleOptionClick,
      showFlag,
      className,
      listboxId,
      isOpen,
      showDialCode,
      focusedIndex,
    ]
  );

  return (
    <div
      ref={ref}
      className={clsx(
        styles["select-container"],
        direction === "rtl" && styles.rtl,
        className?.select_container
      )}
      dir={direction}
    >
      <button
        id={buttonId}
        className={clsx(
          styles["select-overlay-btn"],
          className?.select_overlay_btn
        )}
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={`Select country, currently ${
          filteredCountries.find((c) => c.value === countryCode)?.label ||
          countryCode
        }`}
      >
        <Flag countryCode={countryCode} className={className?.flag} />
        <Arrow
          customSelect={isOpen}
          customArrowIcon={customArrowIcon}
          className={className?.arrow}
        />
      </button>
      <div
        className={clsx(
          styles["dropdown-container"],
          isOpen ? styles["dropdown-open"] : styles["dropdown-closed"],
          className?.dropdown_container
        )}
        aria-hidden={!isOpen}
      >
        {enableSearch && (
          <input
            type="text"
            placeholder={searchPlaceholder}
            className={clsx(styles["search-input"], className?.search_input)}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
            aria-label="Search countries"
          />
        )}
        <ul
          ref={listRef}
          className={clsx(styles["country-list"], className?.country_list)}
          role="selection"
          aria-activedescendant="option-id"
        >
          {renderCountryList}
        </ul>
      </div>
    </div>
  );
};

// Simplified memo comparison for better performance
export default React.memo(CustomSelect, (prevProps, nextProps) => {
  return (
    prevProps.countryCode === nextProps.countryCode &&
    prevProps.handleChangeSelect === nextProps.handleChangeSelect &&
    prevProps.showFlag === nextProps.showFlag &&
    prevProps.showDialCode === nextProps.showDialCode &&
    prevProps.direction === nextProps.direction &&
    prevProps.enableSearch === nextProps.enableSearch &&
    prevProps.searchPlaceholder === nextProps.searchPlaceholder &&
    // Only check reference equality for complex objects
    prevProps.moveKeyToTop === nextProps.moveKeyToTop &&
    prevProps.className === nextProps.className &&
    prevProps.customArrowIcon === nextProps.customArrowIcon
  );
});
