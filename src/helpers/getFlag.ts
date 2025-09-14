export const getFlag = (
  countryCode: string | undefined
): string | undefined => {
  if (!countryCode) return undefined;

  try {
    // For now, use the existing 4x3 flags but in the future this could be extended
    // to load different sized variants based on the size parameter
    return new URL(
      `../assets/flags/${countryCode?.toLowerCase()}.svg`,
      import.meta.url
    ).href;
  } catch (err) {
    console.error(`Flag not found for country: ${countryCode}`);
    return undefined;
  }
};
