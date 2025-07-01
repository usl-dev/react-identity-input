import { Country, CountryState, SelectEvent } from "@/types/types";
import Flag from "@/components/Flag";
import styles from "@/styles/htmlSelect.module.css";
import Arrow from "../Arrow";
import clsx from "clsx";

type HtmlSelectProps = {
  moveKeyToTop: Country[];
  country: CountryState;
  handleChangeSelect: (e: SelectEvent) => void;
  selectFieldName?: string;
  customArrowIcon?: React.ReactNode;
  direction?: string;
  className?: {
    [key: string]: string;
  };
};

/**
 * A component that renders a custom HTML select element with a list of countries.
 * It displays a dropdown list of countries with flags and dial codes, allowing
 * the user to select a country. It also includes a flag and an arrow icon.
 *
 * @param {HtmlSelectProps} props - The properties for the HtmlSelect component.
 * @param { Country[]} props.moveKeyToTop - A function that returns an array
 * of countries, possibly reordered with some countries at the top.
 * @param {CountryState} props.country - The currently selected country state object.
 * @param {(e: SelectEvent) => void} props.handleChangeSelect - A function to handle
 * changes in the selected country.

 * @param {string} [props.selectFieldName="country_select"] - An optional name
 * for the select field, defaults to "country_select".
 * 
 * @returns {JSX.Element} The rendered HtmlSelect component.
 */

const HtmlSelect: React.FC<HtmlSelectProps> = (props) => {
  const {
    moveKeyToTop,
    country,
    handleChangeSelect,
    selectFieldName = "country_select",
    customArrowIcon,
    direction,
    className,
  } = props;

  return (
    <div
      className={clsx(
        styles["select-container"],
        direction === "rtl" && styles["rtl"],
        className?.html_select_container
      )}
    >
      <div
        className={clsx(styles["select-wrapper"], className?.select_wrapper)}
      >
        <select
          name={selectFieldName}
          value={country?.code}
          onChange={handleChangeSelect}
          className={clsx(styles["select-overlay"], className?.select_overlay)}
        >
          {moveKeyToTop?.map((option) => (
            <option
              key={option?.value}
              value={option?.value}
              data-label={option?.label}
              data-dial-code={option?.dial_code}
            >
              {option?.label}
            </option>
          ))}
        </select>

        <Flag code={country?.code} className={className?.flag} />
        <Arrow customArrowIcon={customArrowIcon} className={className?.arrow} />
      </div>
    </div>
  );
};

export default HtmlSelect;
