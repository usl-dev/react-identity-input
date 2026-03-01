/** Supported pass-through input attributes (aligned with cleanProps allowlist). */
type InputPassthroughProps = Partial<
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "placeholder"
    | "disabled"
    | "required"
    | "name"
    | "id"
    | "autoComplete"
    | "autoFocus"
    | "tabIndex"
    | "maxLength"
    | "minLength"
    | "size"
    | "form"
    | "aria-label"
    | "aria-labelledby"
    | "aria-describedby"
    | "aria-invalid"
    | "aria-required"
    | "aria-disabled"
    | "style"
  >
>;

export type IntlPhoneUsernameInputProps = InputPassthroughProps & {
  value: string;
  onChange: (value: string) => void;
  onChangeSelect?: (e: SelectEvent) => void;
  selectFieldName?: string;
  options?: Options;
  /** Class name applied to the root wrapper (recommended for layout/overrides). */
  className?: string;
  /** Stripped and not forwarded to input (reserved for internal use). */
  max?: number;
  min?: number;
  type?: string;
};

export type CustomSelectProps = {
  moveKeyToTop: Country[];
  countryCode: string;
  handleChangeSelect: (e: SelectEvent) => void;
  selectFieldName?: string;
  showFlag?: boolean;
  showDialCode?: boolean;
  customArrowIcon?: React.ReactNode;
  direction?: string;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  className?: {
    [key: string]: string;
  };
};

export type HtmlSelectProps = {
  moveKeyToTop: Country[];
  countryCode: string;
  handleChangeSelect: (e: SelectEvent) => void;
  selectFieldName?: string;
  customArrowIcon?: React.ReactNode;
  direction?: string;
  className?: {
    [key: string]: string;
  };
};

export type FlagProps = {
  countryCode: string;
  /** Optional label for img alt (avoids loading full country list when passed from parent). */
  label?: string;
  customSelect?: boolean;
  direction?: string;
  className?: string;
  /** Smaller flag when used in custom select trigger/dropdown */
  size?: "sm" | "md";
};

export type InputFieldProps = InputPassthroughProps & {
  handleInputChange: (e: InputEvent) => void;
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

type CustomSelectConfig = {
  showFlag?: boolean;
  showDialCode?: boolean;
  enableSearch?: boolean;
  searchPlaceholder?: string;
};

export type Options = {
  mode?: string;
  format?: boolean; // New prop to enable/disable phone number formatting
  customSelect?: CustomSelectConfig;
  enableFlag?: boolean;
  multiCountry?: boolean;
  defaultCountry: string;
  preferredCountries?: string[];
  highLightCountries?: string[];
  customArrowIcon?: React.ReactNode;
  direction?: string;
  enforceCustomSelect?: boolean;
  enforceHtmlSelect?: boolean;
  classes?: Classes;
  hideDialCode?: boolean; // New prop to hide dial code
};

interface Classes {
  [key: string]: string | Classes;
}

export type Country = {
  label: string;
  value: string;
  dial_code: string;
  image: string;
};

export type CountryState = {
  presentDialCode: string;
  code: string;
  flag: string;
  label?: string;
};

export type ExtendedOptions = Options & {
  value: string;
  onChange: (value: string) => void;
  onChangeSelect?: (e: SelectEvent) => void;
};

export type UseInputHookReturn = {
  countryDetails: CountryState;
  handleInputChange: (e: InputEvent) => void;
  inputRef: RefType;
  handleClick: (e: ClickEvent) => void;
  handleChangeSelect: (e: SelectEvent) => void;
  moveKeyToTop: Country[];
  inputValue: string;
  isNumber: boolean;
};

export type ArrowProps = {
  customSelect?: boolean;
  customArrowIcon?: React.ReactNode; // Accept a custom SVG
  className?: string;
};

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ClickEvent = React.MouseEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type RefType = React.RefObject<HTMLInputElement | null>;
export type BtnClickEvent = React.MouseEvent<HTMLButtonElement>;
