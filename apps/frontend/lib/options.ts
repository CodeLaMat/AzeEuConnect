import {
  ScaleIcon,
  CurrencyDollarIcon,
  ComputerDesktopIcon,
  HomeIcon,
  HeartIcon,
  MusicalNoteIcon,
  ShieldCheckIcon,
  TruckIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  FireIcon,
  BoltIcon,
  TrophyIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';


const iconMap = {
  LEGAL: ScaleIcon,
  FINANCE: CurrencyDollarIcon,
  TECH: ComputerDesktopIcon,
  REAL_ESTATE: HomeIcon,
  HEALTHCARE: HeartIcon,
  ENTERTAINMENT: MusicalNoteIcon,
  SECURITY: ShieldCheckIcon,
  FOOD: FireIcon,
  TRANSPORTATION: TruckIcon,
  EDUCATION: AcademicCapIcon,
  MANUFACTURING: Cog6ToothIcon,
  SPORTS: TrophyIcon,
  OTHER: EllipsisHorizontalIcon,
};

const colorMap = {
  LEGAL: "from-blue-500 to-blue-600",
  FINANCE: "from-emerald-400 to-emerald-600",
  TECH: "from-indigo-500 to-indigo-700",
  REAL_ESTATE: "from-yellow-500 to-yellow-700",
  HEALTHCARE: "from-pink-400 to-pink-600",
  ENTERTAINMENT: "from-purple-500 to-purple-700",
  SECURITY: "from-gray-600 to-gray-900",
  FOOD: "from-orange-400 to-orange-600",
  TRANSPORTATION: "from-cyan-400 to-cyan-700",
  EDUCATION: "from-teal-500 to-teal-700",
  MANUFACTURING: "from-slate-600 to-slate-800",
  SPORTS: "from-green-500 to-green-700",
  OTHER: "from-neutral-400 to-neutral-700",
};

const providerMap = {
  LEGAL: "120+",
  FINANCE: "90+",
  TECH: "200+",
  REAL_ESTATE: "65+",
  HEALTHCARE: "150+",
  ENTERTAINMENT: "55+",
  SECURITY: "40+",
  FOOD: "85+",
  TRANSPORTATION: "60+",
  EDUCATION: "70+",
  MANUFACTURING: "45+",
  SPORTS: "30+",
  OTHER: "20+",
};

export function useServiceCategories(locale: string) {
  const t = useTranslations();
  

  return [
    {
      value: "LEGAL",
      label: t("services.categories.legal.label"),
      title: t("services.categories.legal.title"),
      icon: iconMap.LEGAL,
      color: colorMap.LEGAL,
      features: t('services.categories.legal.features') as unknown as string[],
      providers: providerMap.LEGAL,
      description: t('services.categories.legal.description'),
      href: `/${locale}/services/legal`,
      serviceSubCategories: [
        { value: "LEGAL_CONSULTATION", label: t("services.categories.legal.sub.legalConsultation") },
        { value: "COMPANY_FORMATION", label: t("services.categories.legal.sub.companyFormation") },
        { value: "CONSULTING_SERVICES", label: t("services.categories.legal.sub.consultingServices") },
        { value: "PROCUREMENT_SERVICES", label: t("services.categories.legal.sub.procurementServices") },
        { value: "MERGERS_AND_ACQUISITIONS", label: t("services.categories.legal.sub.mergersAndAcquisitions") },
        { value: "LEGAL_DOCUMENT_PREPARATION", label: t("services.categories.legal.sub.legalDocumentPreparation") },
      ],
    },
    {
      value: "FINANCE",
      label: t("services.categories.finance.label"),
      title: t("services.categories.finance.title"),
      icon: iconMap.FINANCE,
      color: colorMap.FINANCE,
      features: t('services.categories.finance.features') as unknown as string[],
      providers: providerMap.FINANCE,
      description: t('services.categories.finance.description'),
      href: `/${locale}/services/finance`,
      serviceSubCategories: [
        { value: "TAX_ADVISORY", label: t("services.categories.finance.sub.taxAdvisory") },
        { value: "BANKING_SETUP", label: t("services.categories.finance.sub.bankingSetup") },
        { value: "FINANCIAL_PLANNING", label: t("services.categories.finance.sub.financialPlanning") },
        { value: "MARKETING_SERVICES", label: t("services.categories.finance.sub.marketingServices") },
        { value: "CONSULTING_SERVICES", label: t("services.categories.finance.sub.consultingServices") },
      ],
    },
    {
      value: "TECH",
      label: t("services.categories.tech.label"),
      title: t("services.categories.tech.title"),
      icon: iconMap.TECH,
      color: colorMap.TECH,
      features: t('services.categories.tech.features') as unknown as string[],
      providers: providerMap.TECH,
      description: t('services.categories.tech.description'),
      href: `/${locale}/services/tech`,
      serviceSubCategories: [
        { value: "IT_SUPPORT", label: t("services.categories.tech.sub.itSupport") },
        { value: "SOFTWARE_DEVELOPMENT", label: t("services.categories.tech.sub.softwareDevelopment") },
        { value: "DESIGN_SERVICES", label: t("services.categories.tech.sub.designServices") },
        { value: "TECH_SUPPORT", label: t("services.categories.tech.sub.techSupport") },
        { value: "CLOUD_COMPUTING", label: t("services.categories.tech.sub.cloudComputing") },
        { value: "DATA_MANAGEMENT", label: t("services.categories.tech.sub.dataManagement") },
        { value: "PROJECT_MANAGEMENT", label: t("services.categories.tech.sub.projectManagement") },
        { value: "SYSTEM_ADMINISTRATION", label: t("services.categories.tech.sub.systemAdministration") },
        { value: "TESTING_AND_QUALITY_ASSURANCE", label: t("services.categories.tech.sub.testingAndQualityAssurance") },
        { value: "ITIL_AND_SERVICE_MANAGEMENT", label: t("services.categories.tech.sub.itilAndServiceManagement") },
      ],
    },
    {
      value: "REAL_ESTATE",
      label: t("services.categories.realEstate.label"),
      title: t("services.categories.realEstate.title"),
      icon: iconMap.REAL_ESTATE,
      color: colorMap.REAL_ESTATE,
      features: t('services.categories.realEstate.features') as unknown as string[],
      providers: providerMap.REAL_ESTATE,
      description: t('services.categories.realEstate.description'),
      href: `/${locale}/services/real-estate`,
      serviceSubCategories: [
        { value: "REAL_ESTATE_SERVICES", label: t("services.categories.realEstate.sub.realEstateServices") },
        { value: "HOME_RENOVATION", label: t("services.categories.realEstate.sub.homeRenovation") },
        { value: "REPAIR_SERVICES", label: t("services.categories.realEstate.sub.repairServices") },
        { value: "PROPERTY_MANAGEMENT", label: t("services.categories.realEstate.sub.propertyManagement") },
        { value: "RETAIL_SALES", label: t("services.categories.realEstate.sub.retailSales") },
        { value: "REAL_ESTATE_ADVISORY", label: t("services.categories.realEstate.sub.realEstateAdvisory") },
        { value: "REAL_ESTATE_LEGAL_ADVICE", label: t("services.categories.realEstate.sub.realEstateLegalAdvice") },
      ],
    },
    {
      value: "HEALTHCARE",
      label: t("services.categories.healthcare.label"),
      title: t("services.categories.healthcare.title"),
      icon: iconMap.HEALTHCARE,
      color: colorMap.HEALTHCARE,
      features: t('services.categories.healthcare.features') as unknown as string[],
      providers: providerMap.HEALTHCARE,
      description: t('services.categories.healthcare.description'),
      href: `/${locale}/services/healthcare`,
      serviceSubCategories: [
        { value: "HEALTHCARE_SERVICES", label: t("services.categories.healthcare.sub.healthcareServices") },
        { value: "FITNESS_TRAINING", label: t("services.categories.healthcare.sub.fitnessTraining") },
        { value: "PERSONAL_COACHING", label: t("services.categories.healthcare.sub.personalCoaching") },
        { value: "BEAUTY_SERVICES", label: t("services.categories.healthcare.sub.beautyServices") },
        { value: "LIFESTYLE_CONSULTING", label: t("services.categories.healthcare.sub.lifestyleConsulting") },
        { value: "PET_SERVICES", label: t("services.categories.healthcare.sub.petServices") },
        { value: "MENTAL_HEALTH_ADVICE", label: t("services.categories.healthcare.sub.mentalHealthAdvice") },
        { value: "HEALTH_AND_RECOVERY_PROGRAMS", label: t("services.categories.healthcare.sub.healthAndRecoveryPrograms") },
      ],
    },
    {
      value: "ENTERTAINMENT",
      label: t("services.categories.entertainment.label"),
      title: t("services.categories.entertainment.title"),
      icon: iconMap.ENTERTAINMENT,
      color: colorMap.ENTERTAINMENT,
      features: t('services.categories.entertainment.features') as unknown as string[],
      providers: providerMap.ENTERTAINMENT,
      description: t('services.categories.entertainment.description'),
      href: `/${locale}/services/entertainment`,
      serviceSubCategories: [
        { value: "TRAVEL_PLANNING", label: t("services.categories.entertainment.sub.travelPlanning") },
        { value: "EVENT_MANAGEMENT", label: t("services.categories.entertainment.sub.eventManagement") },
        { value: "ENTERTAINMENT_SERVICES", label: t("services.categories.entertainment.sub.entertainmentServices") },
        { value: "TOUR_GUIDING", label: t("services.categories.entertainment.sub.tourGuiding") },
        { value: "EVENT_PLANNING", label: t("services.categories.entertainment.sub.eventPlanning") },
        { value: "ENTERTAINMENT_ADVISORY", label: t("services.categories.entertainment.sub.entertainmentAdvisory") },
      ],
    },
    {
      value: "SECURITY",
      label: t("services.categories.security.label"),
      title: t("services.categories.security.title"),
      icon: iconMap.SECURITY,
      color: colorMap.SECURITY,
      features: t('services.categories.security.features') as unknown as string[],
      providers: providerMap.SECURITY,
      description: t('services.categories.security.description'),
      href: `/${locale}/services/security`,
      serviceSubCategories: [
        { value: "SECURITY_SERVICES", label: t("services.categories.security.sub.securityServices") },
        { value: "POLICE_SERVICES", label: t("services.categories.security.sub.policeServices") },
        { value: "FIRE_SERVICES", label: t("services.categories.security.sub.fireServices") },
        { value: "SECURITY_ASSISTANCE", label: t("services.categories.security.sub.securityAssistance") },
        { value: "SECURITY_TRAINING", label: t("services.categories.security.sub.securityTraining") },
        { value: "EMERGENCY_RESPONSE", label: t("services.categories.security.sub.emergencyResponse") },
      ],
    },
    {
      value: "FOOD",
      label: t("services.categories.food.label"),
      title: t("services.categories.food.title"),
      icon: iconMap.FOOD,
      color: colorMap.FOOD,
      features: t('services.categories.food.features') as unknown as string[],
      providers: providerMap.FOOD,
      description: t('services.categories.food.description'),
      href: `/${locale}/services/food`,
      serviceSubCategories: [
        { value: "FOOD_CATERING", label: t("services.categories.food.sub.foodCatering") },
        { value: "CATERING_SERVICES", label: t("services.categories.food.sub.cateringServices") },
        { value: "FOOD_DELIVERY", label: t("services.categories.food.sub.foodDelivery") },
        { value: "RESTAURANT_MANAGEMENT", label: t("services.categories.food.sub.restaurantManagement") },
        { value: "FOOD_ADVISORY", label: t("services.categories.food.sub.foodAdvisory") },
        { value: "FOOD_SAFETY_COMPLIANCE", label: t("services.categories.food.sub.foodSafetyCompliance") },
        { value: "FOOD_PREPARATION", label: t("services.categories.food.sub.foodPreparation") },
      ],
    },
    {
      value: "TRANSPORTATION",
      label: t("services.categories.transportation.label"),
      title: t("services.categories.transportation.title"),
      icon: iconMap.TRANSPORTATION,
      color: colorMap.TRANSPORTATION,
      features: t('services.categories.transportation.features') as unknown as string[],
      providers: providerMap.TRANSPORTATION,
      description: t('services.categories.transportation.description'),
      href: `/${locale}/services/transportation`,
      serviceSubCategories: [
        { value: "LOGISTICS_SERVICES", label: t("services.categories.transportation.sub.logisticsServices") },
        { value: "TRANSPORTATION_SERVICES", label: t("services.categories.transportation.sub.transportationServices") },
        { value: "DELIVERY_SERVICES", label: t("services.categories.transportation.sub.deliveryServices") },
        { value: "VEHICLE_RENTAL", label: t("services.categories.transportation.sub.vehicleRental") },
        { value: "TRANSPORTATION_ADVISORY", label: t("services.categories.transportation.sub.transportationAdvisory") },
      ],
    },
    {
      value: "EDUCATION",
      label: t("services.categories.education.label"),
      title: t("services.categories.education.title"),
      icon: iconMap.EDUCATION,
      color: colorMap.EDUCATION,
      features: t('services.categories.education.features') as unknown as string[],
      providers: providerMap.EDUCATION,
      description: t('services.categories.education.description'),
      href: `/${locale}/services/education`,
      serviceSubCategories: [
        { value: "TUTORING_SERVICES", label: t("services.categories.education.sub.tutoringServices") },
        { value: "ONLINE_COURSES", label: t("services.categories.education.sub.onlineCourses") },
        { value: "EDUCATIONAL_ADVISORY", label: t("services.categories.education.sub.educationalAdvisory") },
        { value: "LANGUAGE_TRAINING", label: t("services.categories.education.sub.languageTraining") },
        { value: "EDUCATIONAL_RESOURCES", label: t("services.categories.education.sub.educationalResources") },
      ],
    },
    {
      value: "MANUFACTURING",
      label: t("services.categories.manufacturing.label"),
      title: t("services.categories.manufacturing.title"),
      icon: iconMap.MANUFACTURING,
      color: colorMap.MANUFACTURING,
      features: t('services.categories.manufacturing.features') as unknown as string[],
      providers: providerMap.MANUFACTURING,
      description: t('services.categories.manufacturing.description'),
      href: `/${locale}/services/manufacturing`,
      serviceSubCategories: [
        { value: "MANUFACTURING_SERVICES", label: t("services.categories.manufacturing.sub.manufacturingServices") },
        { value: "PRODUCTION_MANAGEMENT", label: t("services.categories.manufacturing.sub.productionManagement") },
        { value: "QUALITY_CONTROL", label: t("services.categories.manufacturing.sub.qualityControl") },
        { value: "SUPPLY_CHAIN_MANAGEMENT", label: t("services.categories.manufacturing.sub.supplyChainManagement") },
        { value: "MANUFACTURING_ADVISORY", label: t("services.categories.manufacturing.sub.manufacturingAdvisory") },
      ],
    },
    {
      value: "SPORTS",
      label: t("services.categories.sports.label"),
      title: t("services.categories.sports.title"),
      icon: iconMap.SPORTS,
      color: colorMap.SPORTS,
      features: t('services.categories.sports.features') as unknown as string[],
      providers: providerMap.SPORTS,
      description: t('services.categories.sports.description'),
      href: `/${locale}/services/sports`,
      serviceSubCategories: [
        { value: "SPORTS_COACHING", label: t("services.categories.sports.sub.sportsCoaching") },
        { value: "SPORTS_ADVISORY", label: t("services.categories.sports.sub.sportsAdvisory") },
        { value: "SPORTS_EQUIPMENT_RENTAL", label: t("services.categories.sports.sub.sportsEquipmentRental") },
        { value: "SPORTS_EVENT_MANAGEMENT", label: t("services.categories.sports.sub.sportsEventManagement") },
      ],
    },
    {
      value: "OTHER",
      label: t("services.categories.other.label"),
      title: t("services.categories.other.title"),
      icon: iconMap.OTHER,
      color: colorMap.OTHER,
      features: t('services.categories.other.features') as unknown as string[],
      providers: providerMap.OTHER,
      description: t('services.categories.other.description'),
      href: `/${locale}/services/other`,
      serviceSubCategories: [],
    },
  ];
}


export const countryToTimezone: Record<string, string> = {
  // Caucasus & Middle East
  Azerbaijan: "Asia/Baku",
  Turkey: "Europe/Istanbul",
  UAE: "Asia/Dubai",

  // Europe - Western & Central
  "United Kingdom": "Europe/London",
  Ireland: "Europe/Dublin",
  Germany: "Europe/Berlin",
  Netherlands: "Europe/Amsterdam",
  France: "Europe/Paris",
  Belgium: "Europe/Brussels",
  Switzerland: "Europe/Zurich",
  Austria: "Europe/Vienna",
  "Czech Republic": "Europe/Prague",
  Poland: "Europe/Warsaw",

  // Europe - Southern
  Italy: "Europe/Rome",
  Spain: "Europe/Madrid",
  Portugal: "Europe/Lisbon",
  Greece: "Europe/Athens",

  // Europe - Northern
  Finland: "Europe/Helsinki",
  Sweden: "Europe/Stockholm",
  Norway: "Europe/Oslo",
  Denmark: "Europe/Copenhagen",

  // Europe - Eastern
  Russia: "Europe/Moscow",

  // North America
  USA: "America/New_York",
  Canada: "America/Toronto",

  // Oceania
  Australia: "Australia/Sydney",
  "New Zealand": "Pacific/Auckland",

  // Asia
  India: "Asia/Kolkata",
  China: "Asia/Shanghai",
  Japan: "Asia/Tokyo",
  "South Korea": "Asia/Seoul",

  // Africa
  "South Africa": "Africa/Johannesburg",

  // South America
  Brazil: "America/Sao_Paulo",

  // Additional regions
  Mexico: "America/Mexico_City",

  OTHER: "UTC", // Default timezone for other countries
};

export const getTimezoneByCountry = (country: string): string => {
  return countryToTimezone[country] || "UTC";
};

export const availableCountries = Object.keys(countryToTimezone);

export const supportedLocales = ["az", "en", "ru", "de"];
export const currencies = [
  { value: "TRY", label: "Turkish Lira", symbol: "₺" },
  { value: "EUR", label: "Euro", symbol: "€" },
  { value: "USD", label: "US Dollar", symbol: "$" },
  { value: "AZN", label: "Azerbaijani Manat", symbol: "₼" },
];