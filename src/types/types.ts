type CustomSelectConfig = {
  enabled?: boolean;
  showFlag?: boolean;
  showDialCode?: boolean;
};

export type Options = {
  mode?: string;
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
};

export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type ClickEvent = React.MouseEvent<HTMLInputElement>;
export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
export type RefType = React.RefObject<HTMLInputElement | null>;
export type BtnClickEvent = React.MouseEvent<HTMLButtonElement>;
