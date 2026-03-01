export const getFlag = (
  countryCode: string | undefined
): string | undefined => {
  if (!countryCode) return undefined;

  try {
    // Dev (e.g. example app): path relative to src/helpers; built bundle: relative to dist/
    const pathSegment = import.meta.env.DEV
      ? "../assets/flags/"
      : "./assets/flags/";
    return new URL(
      pathSegment + countryCode.toLowerCase() + ".svg",
      import.meta.url
    ).href;
  } catch {
    return undefined;
  }
};
