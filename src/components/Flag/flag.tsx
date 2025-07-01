import { getCountry } from "@/helpers/getCountry";
import { getFlag } from "@/helpers/getFlag";
import styles from "@/styles/flag.module.css";
import clsx from "clsx";

type FlagProps = {
  code: string;
  customSelect?: boolean;
  direction?: string;
  className?: string;
};

/**
 * A component that renders a country flag.
 *
 * @param {string} flag the URL of the flag image
 * @param {boolean} customSelect whether the flag is being rendered in a custom select component
 */

const Flag: React.FC<FlagProps> = (props) => {
  const { code, customSelect, direction, className } = props;

  return (
    <div
      className={clsx(
        styles["flag-wrap"],
        customSelect && styles["custom-select"],
        direction === "rtl" && styles["rtl"],
        className
      )}
    >
      <img
        alt={getCountry(code)?.label}
        src={getFlag(code)}
        className={styles.flag}
      />
    </div>
  );
};

export default Flag;
