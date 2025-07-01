export const getFlag = (
  countryCode: string | undefined
): string | undefined => {
  if (!countryCode) return undefined;

  try {
    return new URL(
      `../assets/flags/${countryCode.toLowerCase()}.svg`,
      import.meta.url
    ).href;
  } catch (err) {
    console.error(`Flag not found for country: ${countryCode}`);
    return undefined;
  }
};
