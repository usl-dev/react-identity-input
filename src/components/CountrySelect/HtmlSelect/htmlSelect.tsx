import Flag from "@/components/Flag";
import styles from "@/styles/htmlSelect.module.css";
import Arrow from "../Arrow";
import clsx from "clsx";
import { HtmlSelectProps } from "@/types/types";

const HtmlSelect: React.FC<HtmlSelectProps> = (props) => {
  const {
    moveKeyToTop,
    countryCode,
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
          value={countryCode}
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

        <Flag countryCode={countryCode} className={className?.flag} />
        <Arrow customArrowIcon={customArrowIcon} className={className?.arrow} />
      </div>
    </div>
  );
};

export default HtmlSelect;
