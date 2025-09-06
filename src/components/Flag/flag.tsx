import { getCountryFromList } from "@/helpers/getCountryFromList";
import { getFlag } from "@/helpers/getFlag";
import styles from "@/styles/flag.module.css";
import { FlagProps } from "@/types/types";
import clsx from "clsx";

const Flag: React.FC<FlagProps> = (props) => {
  const { countryCode, customSelect, direction, className } = props;

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
        alt={getCountryFromList(countryCode)?.label}
        src={getFlag(countryCode)}
        className={styles.flag}
      />
    </div>
  );
};

export default Flag;
