/**
 * Allowlist of props that are safe to pass through to the underlying <input>.
 * Prevents option-like or internal keys from leaking to the DOM.
 */
const INPUT_PASSTHROUGH_KEYS = new Set([
  "placeholder",
  "disabled",
  "readOnly",
  "required",
  "name",
  "id",
  "autoComplete",
  "autoFocus",
  "tabIndex",
  "maxLength",
  "minLength",
  "size",
  "form",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-invalid",
  "aria-required",
  "aria-disabled",
  "data-testid",
  "style",
]);

/** Props we never forward (handled by the component or invalid for input). */
const PROPS_TO_OMIT = new Set([
  "min",
  "max",
  "type",
  "value",
  "onChange",
  "options",
  "selectFieldName",
  "onChangeSelect",
  "mode",
  "format",
  "defaultCountry",
  "multiCountry",
  "enableFlag",
  "customSelect",
  "preferredCountries",
  "highLightCountries",
  "customArrowIcon",
  "direction",
  "enforceCustomSelect",
  "enforceHtmlSelect",
  "classes",
  "hideDialCode",
]);

export function cleanProps<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, v]) => {
      if (v === undefined) return false;
      if (PROPS_TO_OMIT.has(key)) return false;
      // Allow allowlisted keys and any data-* or aria-* for flexibility
      if (INPUT_PASSTHROUGH_KEYS.has(key)) return true;
      if (key.startsWith("data-") || key.startsWith("aria-")) return true;
      return false;
    })
  ) as Partial<T>;
}
