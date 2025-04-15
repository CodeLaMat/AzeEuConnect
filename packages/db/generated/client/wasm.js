
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  roleId: 'roleId',
  currentRole: 'currentRole',
  emailVerified: 'emailVerified',
  twoFactorEnabled: 'twoFactorEnabled',
  lastLogin: 'lastLogin',
  accountStatus: 'accountStatus',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  createdBy: 'createdBy',
  updatedBy: 'updatedBy',
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.ProfileScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  location: 'location',
  phone: 'phone',
  image: 'image',
  gender: 'gender',
  nationality: 'nationality',
  timezone: 'timezone',
  preferredLanguage: 'preferredLanguage',
  userId: 'userId'
};

exports.Prisma.CompanyScalarFieldEnum = {
  id: 'id',
  businessName: 'businessName',
  businessType: 'businessType',
  businessCategory: 'businessCategory',
  registrationStatus: 'registrationStatus',
  businessAddress: 'businessAddress',
  vatNumber: 'vatNumber',
  taxId: 'taxId',
  companySize: 'companySize',
  countryOfRegistration: 'countryOfRegistration',
  formationDate: 'formationDate',
  lastUpdated: 'lastUpdated',
  userId: 'userId'
};

exports.Prisma.SubscriptionScalarFieldEnum = {
  id: 'id',
  plan: 'plan',
  paymentStatus: 'paymentStatus',
  paymentMethod: 'paymentMethod',
  nextBillingDate: 'nextBillingDate',
  discountApplied: 'discountApplied',
  referralCode: 'referralCode',
  userId: 'userId'
};

exports.Prisma.ServicesScalarFieldEnum = {
  id: 'id',
  companyFormation: 'companyFormation',
  taxAndAccounting: 'taxAndAccounting',
  legalConsultation: 'legalConsultation',
  bankingSetup: 'bankingSetup',
  virtualOffice: 'virtualOffice',
  trademarkRegistration: 'trademarkRegistration',
  regulatoryCompliance: 'regulatoryCompliance',
  businessExpansion: 'businessExpansion',
  userId: 'userId'
};

exports.Prisma.ServiceSubscriptionScalarFieldEnum = {
  id: 'id',
  subscriberId: 'subscriberId',
  serviceId: 'serviceId',
  status: 'status',
  startDate: 'startDate',
  endDate: 'endDate',
  createdAt: 'createdAt'
};

exports.Prisma.SavedJobScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  serviceId: 'serviceId',
  savedAt: 'savedAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  documentType: 'documentType',
  fileUrl: 'fileUrl',
  status: 'status',
  uploadedAt: 'uploadedAt',
  verifiedBy: 'verifiedBy',
  userId: 'userId'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  consultantId: 'consultantId',
  serviceCategory: 'serviceCategory',
  scheduledDate: 'scheduledDate',
  status: 'status',
  userId: 'userId'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  type: 'type',
  message: 'message',
  read: 'read',
  createdAt: 'createdAt',
  userId: 'userId'
};

exports.Prisma.SupportTicketScalarFieldEnum = {
  id: 'id',
  subject: 'subject',
  description: 'description',
  priority: 'priority',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.ServiceListingScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  category: 'category',
  subCategory: 'subCategory',
  country: 'country',
  price: 'price',
  currency: 'currency',
  rating: 'rating',
  image: 'image',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  ownerId: 'ownerId'
};

exports.Prisma.ServicePackageScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  price: 'price',
  conditions: 'conditions',
  image: 'image',
  serviceListingId: 'serviceListingId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  rating: 'rating',
  comment: 'comment',
  createdAt: 'createdAt',
  userId: 'userId',
  serviceId: 'serviceId'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  deletedAt: 'deletedAt',
  buyerId: 'buyerId',
  providerId: 'providerId',
  serviceId: 'serviceId',
  stripePaymentIntentId: 'stripePaymentIntentId',
  amount: 'amount',
  isPaid: 'isPaid',
  customNotes: 'customNotes',
  deliveryDue: 'deliveryDue',
  userId: 'userId',
  advanceAmount: 'advanceAmount',
  finalAmount: 'finalAmount',
  paymentStage: 'paymentStage'
};

exports.Prisma.InvoiceScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  type: 'type',
  amount: 'amount',
  status: 'status',
  fileUrl: 'fileUrl',
  issuedAt: 'issuedAt',
  paidAt: 'paidAt',
  stripePaymentIntentId: 'stripePaymentIntentId',
  stripeCustomerId: 'stripeCustomerId',
  paidById: 'paidById',
  paidToId: 'paidToId'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  action: 'action',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  id: 'id',
  roleId: 'roleId',
  permissionId: 'permissionId',
  displayName: 'displayName',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AccountStatus = exports.$Enums.AccountStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  BANNED: 'BANNED'
};

exports.Gender = exports.$Enums.Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.Language = exports.$Enums.Language = {
  AZ: 'AZ',
  EN: 'EN',
  DE: 'DE',
  RU: 'RU'
};

exports.BusinessType = exports.$Enums.BusinessType = {
  GMBH: 'GMBH',
  UG: 'UG',
  SARL: 'SARL',
  BV: 'BV',
  LTD: 'LTD',
  AG: 'AG'
};

exports.BusinessCategory = exports.$Enums.BusinessCategory = {
  TECH: 'TECH',
  FINANCE: 'FINANCE',
  RETAIL: 'RETAIL',
  MANUFACTURING: 'MANUFACTURING',
  OTHER: 'OTHER'
};

exports.RegistrationStatus = exports.$Enums.RegistrationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

exports.CompanySize = exports.$Enums.CompanySize = {
  SOLE_PROPRIETOR: 'SOLE_PROPRIETOR',
  SMALL_BUSINESS: 'SMALL_BUSINESS',
  MEDIUM_BUSINESS: 'MEDIUM_BUSINESS',
  LARGE_BUSINESS: 'LARGE_BUSINESS'
};

exports.SubscriptionPlan = exports.$Enums.SubscriptionPlan = {
  BASIC: 'BASIC',
  PRO: 'PRO',
  ENTERPRISE: 'ENTERPRISE'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  STRIPE: 'STRIPE',
  PAYPAL: 'PAYPAL',
  SEPA: 'SEPA',
  KLARNA: 'KLARNA'
};

exports.ServiceStatus = exports.$Enums.ServiceStatus = {
  REQUESTED: 'REQUESTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

exports.ServiceSubscriptionStatus = exports.$Enums.ServiceSubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

exports.DocumentType = exports.$Enums.DocumentType = {
  ARTICLES_OF_INCORPORATION: 'ARTICLES_OF_INCORPORATION',
  BUSINESS_LICENSE: 'BUSINESS_LICENSE',
  TAX_CERTIFICATE: 'TAX_CERTIFICATE',
  BANKING_AGREEMENT: 'BANKING_AGREEMENT'
};

exports.DocumentStatus = exports.$Enums.DocumentStatus = {
  UPLOADED: 'UPLOADED',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED'
};

exports.ServiceCategory = exports.$Enums.ServiceCategory = {
  LEGAL_CONSULTATION: 'LEGAL_CONSULTATION',
  TAX_ADVISORY: 'TAX_ADVISORY',
  BANKING_SETUP: 'BANKING_SETUP',
  COMPANY_FORMATION: 'COMPANY_FORMATION',
  FINANCIAL_PLANNING: 'FINANCIAL_PLANNING',
  MARKETING_SERVICES: 'MARKETING_SERVICES',
  CONSULTING_SERVICES: 'CONSULTING_SERVICES',
  PROCUREMENT_SERVICES: 'PROCUREMENT_SERVICES',
  MERGERS_AND_ACQUISITIONS: 'MERGERS_AND_ACQUISITIONS',
  IT_SUPPORT: 'IT_SUPPORT',
  SOFTWARE_DEVELOPMENT: 'SOFTWARE_DEVELOPMENT',
  DESIGN_SERVICES: 'DESIGN_SERVICES',
  HUMAN_RESOURCES: 'HUMAN_RESOURCES',
  RECRUITMENT: 'RECRUITMENT',
  REAL_ESTATE_SERVICES: 'REAL_ESTATE_SERVICES',
  HOME_RENOVATION: 'HOME_RENOVATION',
  REPAIR_SERVICES: 'REPAIR_SERVICES',
  HEALTHCARE_SERVICES: 'HEALTHCARE_SERVICES',
  FITNESS_TRAINING: 'FITNESS_TRAINING',
  PERSONAL_COACHING: 'PERSONAL_COACHING',
  BEAUTY_SERVICES: 'BEAUTY_SERVICES',
  LIFESTYLE_CONSULTING: 'LIFESTYLE_CONSULTING',
  PET_SERVICES: 'PET_SERVICES',
  TRAVEL_PLANNING: 'TRAVEL_PLANNING',
  EVENT_MANAGEMENT: 'EVENT_MANAGEMENT',
  ENTERTAINMENT_SERVICES: 'ENTERTAINMENT_SERVICES',
  FOOD_CATERING: 'FOOD_CATERING',
  SECURITY_SERVICES: 'SECURITY_SERVICES',
  LEGAL_DOCUMENT_PREPARATION: 'LEGAL_DOCUMENT_PREPARATION'
};

exports.AppointmentStatus = exports.$Enums.AppointmentStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  EMAIL: 'EMAIL',
  SMS: 'SMS',
  PUSH: 'PUSH'
};

exports.SupportTicketPriority = exports.$Enums.SupportTicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

exports.SupportTicketStatus = exports.$Enums.SupportTicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  CLOSED: 'CLOSED'
};

exports.Currency = exports.$Enums.Currency = {
  EUR: 'EUR',
  USD: 'USD',
  TRY: 'TRY',
  AZN: 'AZN'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.OrderType = exports.$Enums.OrderType = {
  MARKETPLACE: 'MARKETPLACE',
  CUSTOM_JOB: 'CUSTOM_JOB'
};

exports.PaymentStage = exports.$Enums.PaymentStage = {
  NONE: 'NONE',
  AWAITING_ADVANCE_PAYMENT: 'AWAITING_ADVANCE_PAYMENT',
  ADVANCE_PAID: 'ADVANCE_PAID',
  AWAITING_FINAL_PAYMENT: 'AWAITING_FINAL_PAYMENT',
  FINAL_PAID: 'FINAL_PAID'
};

exports.InvoiceType = exports.$Enums.InvoiceType = {
  ADVANCE: 'ADVANCE',
  FINAL: 'FINAL'
};

exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  UNPAID: 'UNPAID',
  PAID: 'PAID',
  REFUNDED: 'REFUNDED',
  CANCELLED: 'CANCELLED'
};

exports.Action = exports.$Enums.Action = {
  ALL: 'ALL',
  CREATE_ORDER: 'CREATE_ORDER',
  VIEW_SERVICES: 'VIEW_SERVICES',
  WRITE_REVIEW: 'WRITE_REVIEW',
  POST_SERVICE: 'POST_SERVICE',
  MANAGE_PROFILE: 'MANAGE_PROFILE',
  RESPOND_TO_REVIEWS: 'RESPOND_TO_REVIEWS',
  MANAGE_ORDERS: 'MANAGE_ORDERS',
  MANAGE_TICKETS: 'MANAGE_TICKETS',
  VERIFY_COMPANY: 'VERIFY_COMPANY',
  APPROVE_COMPANY: 'APPROVE_COMPANY',
  MANAGE_COMPANY: 'MANAGE_COMPANY',
  APPROVE_DOCUMENTS: 'APPROVE_DOCUMENTS',
  MANAGE_APPOINTMENTS: 'MANAGE_APPOINTMENTS',
  READ_USERS: 'READ_USERS',
  VIEW_CLIENTS: 'VIEW_CLIENTS',
  VIEW_SUPPORT_TICKETS: 'VIEW_SUPPORT_TICKETS',
  MANAGE_CLIENTS: 'MANAGE_CLIENTS',
  VIEW_ORDERS: 'VIEW_ORDERS',
  MANAGE_SUBSCRIPTIONS: 'MANAGE_SUBSCRIPTIONS',
  VIEW_SERVICE_LISTINGS: 'VIEW_SERVICE_LISTINGS',
  MANAGE_SUPPORT_AGENTS: 'MANAGE_SUPPORT_AGENTS',
  MANAGE_DOCUMENTS: 'MANAGE_DOCUMENTS',
  VIEW_APPOINTMENTS: 'VIEW_APPOINTMENTS',
  MANAGE_NOTIFICATIONS: 'MANAGE_NOTIFICATIONS',
  VIEW_NOTIFICATIONS: 'VIEW_NOTIFICATIONS',
  SEND_MESSAGES: 'SEND_MESSAGES',
  SEND_EMAILS: 'SEND_EMAILS',
  MANAGE_MESSAGES: 'MANAGE_MESSAGES',
  MANAGE_USERS: 'MANAGE_USERS',
  VIEW_USERS: 'VIEW_USERS',
  VIEW_REVIEWS: 'VIEW_REVIEWS',
  MANAGE_REVIEWS: 'MANAGE_REVIEWS',
  POST_REVIEW: 'POST_REVIEW',
  APPROVE_SERVICE: 'APPROVE_SERVICE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  VerificationToken: 'VerificationToken',
  Profile: 'Profile',
  Company: 'Company',
  Subscription: 'Subscription',
  Services: 'Services',
  ServiceSubscription: 'ServiceSubscription',
  SavedJob: 'SavedJob',
  Document: 'Document',
  Appointment: 'Appointment',
  Notification: 'Notification',
  SupportTicket: 'SupportTicket',
  ServiceListing: 'ServiceListing',
  ServicePackage: 'ServicePackage',
  Review: 'Review',
  Order: 'Order',
  Invoice: 'Invoice',
  Permission: 'Permission',
  Role: 'Role',
  RolePermission: 'RolePermission'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
