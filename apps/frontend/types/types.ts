import { Company, Review, Subscription, UserRole } from "@prisma/client";

export interface ManagedUser {
  id: string;
  email: string;
  role: { id: string; name: string };
  currentRole: UserRole;
  lastLogin: string | null;
  accountStatus: "ACTIVE" | "SUSPENDED" | "BANNED";
  twoFactorEnabled: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    image?: string;
    phone?: string;
    location?: string;
    nationality?: string;
    preferredLanguage?: "AZ" | "EN" | "DE" | "RU";
    timezone?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
  };
  subscription?: {
    id: string;
    plan: "BASIC" | "PRO" | "ENTERPRISE";
    paymentStatus: "ACTIVE" | "PENDING" | "CANCELLED";
    paymentMethod?: "STRIPE" | "PAYPAL" | "SEPA" | "KLARNA";
    nextBillingDate?: string;
    discountApplied: boolean;
    referralCode?: string;
  };
  companyDetails?: {
    id: string;
    businessName: string;
    businessType: "GMBH" | "UG" | "SARL" | "BV" | "LTD" | "AG";
    businessCategory: "TECH" | "FINANCE" | "RETAIL" | "MANUFACTURING" | "OTHER";
    registrationStatus: "PENDING" | "APPROVED" | "REJECTED";
    businessAddress?: string;
    vatNumber?: string;
    taxId?: string;
    companySize?:
      | "SOLE_PROPRIETOR"
      | "SMALL_BUSINESS"
      | "MEDIUM_BUSINESS"
      | "LARGE_BUSINESS";
    countryOfRegistration?: string;
    formationDate?: string;
    lastUpdated?: string;
  };
  services?: {
    id: string;
    companyFormation?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    taxAndAccounting?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    legalConsultation?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    bankingSetup?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    virtualOffice?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    trademarkRegistration?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    regulatoryCompliance?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
    businessExpansion?: "REQUESTED" | "IN_PROGRESS" | "COMPLETED";
  };
}

export interface UserManagementState {
  users: ManagedUser[];
  selectedUser?: ManagedUser;
  loading: boolean;
  error?: string;
}

export interface ProfileState {
  firstName?: string;
  lastName?: string;
  location?: string;
  image?: string;
  phone?: string;
  nationality?: string;
  timezone?: string;
  preferredLanguage?: string;
  subscription?: Subscription;
  companyDetails?: Company;
  serviceSubscriptions?: any[];
  reviews?: Review[];
}

export interface UserState {
  id: string;
  email: string;
  role: UserRole;
  currentRole: UserRole;
}

export interface RolesState {
  roles: {
    role: { id: string; name: string; description: string };
    permissions: { id: string; permission: { name: string } }[];
  }[];
  loading: boolean;
  error: string | null;
}

export interface ServicePackage {
  name: string;
  description?: string;
  price: number;
  conditions?: string;
}

export interface ServiceFormData {
  title: string;
  description: string;
  category: string;
  country: string;
  serviceType: string;
  price?: number;
  currency: string;
  packages: ServicePackage[];
}

export interface ServiceState {
  services: any[];
  loading: boolean;
  error: string | null;
}
