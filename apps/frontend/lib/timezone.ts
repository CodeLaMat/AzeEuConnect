const countryToTimezone: Record<string, string> = {
  Azerbaijan: "Asia/Baku",
  Germany: "Europe/Berlin",
  Netherlands: "Europe/Amsterdam",
  France: "Europe/Paris",
  Finland: "Europe/Helsinki",
  Turkey: "Europe/Istanbul",
  "United Kingdom": "Europe/London",
  USA: "America/New_York",
  Canada: "America/Toronto",
  Australia: "Australia/Sydney",
  India: "Asia/Kolkata",
  China: "Asia/Shanghai",
  UAE: "Asia/Dubai",
  Japan: "Asia/Tokyo",
};

export const getTimezoneByCountry = (country: string): string => {
  return countryToTimezone[country] || "UTC";
};

export const availableCountries = Object.keys(countryToTimezone);

export const supportedLocales = ["az", "en", "ru", "de"];
