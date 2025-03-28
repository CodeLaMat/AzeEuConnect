import fs from "fs";
import path from "path";

// Load translations from the filesystem
export async function getTranslations(locale: string) {
  try {
    const filePath = path.join(process.cwd(), "locales", `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
}

export const supportedLocales = ["az", "en", "ru", "de"];
