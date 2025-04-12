import {
  UserRole,
  BusinessType,
  BusinessCategory,
  RegistrationStatus,
  SubscriptionPlan,
  PaymentStatus,
  PaymentMethod,
  Language,
  Action,
  Currency,
  ServiceCategory,
  OrderStatus,
  InvoiceStatus,
  InvoiceType,
  PaymentStage,
} from "@prisma/client";
import { prisma } from "../index";

const RolePermissions: { [role in UserRole]: Action[] } = {
  ADMIN: ["ALL"],
  CUSTOMER: ["CREATE_ORDER", "VIEW_SERVICES", "WRITE_REVIEW", "MANAGE_PROFILE"],
  CONSULTANT: [
    "POST_SERVICE",
    "MANAGE_APPOINTMENTS",
    "VIEW_CLIENTS",
    "MANAGE_PROFILE",
  ],
  SERVICE_PROVIDER: [
    "POST_SERVICE",
    "MANAGE_ORDERS",
    "RESPOND_TO_REVIEWS",
    "MANAGE_PROFILE",
    "VIEW_CLIENTS",
  ],
  SUPPORT_AGENT: ["MANAGE_TICKETS", "READ_USERS"],
  MODERATOR: ["VIEW_USERS"],
  REGULATORY_OFFICER: ["VERIFY_COMPANY", "APPROVE_DOCUMENTS"],
};

const allPermissions = Array.from(
  new Set(Object.values(RolePermissions).flat())
);

async function seedRolesAndPermissions() {
  for (const role of Object.values(UserRole)) {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role },
    });
  }

  for (const permission of allPermissions) {
    await prisma.permission.upsert({
      where: { name: permission },
      update: {},
      create: { name: permission, action: permission as Action },
    });
  }

  for (const roleName in RolePermissions) {
    const role = await prisma.role.findUnique({
      where: { name: roleName as UserRole },
    });
    if (!role) continue;

    for (const permissionName of RolePermissions[roleName as UserRole]) {
      const permission = await prisma.permission.findUnique({
        where: { name: permissionName },
      });
      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
          displayName: permission.name,
        },
      });
    }
  }

  console.log("✅ Roles and permissions seeded.");
}

async function seedServiceProvider() {
  const user = await prisma.user.upsert({
    where: { email: "serviceprovider@example.com" },
    update: {},
    create: {
      email: "serviceprovider@example.com",
      password: "hashedpassword123",
      role: { connect: { name: UserRole.SERVICE_PROVIDER } },
      currentRole: UserRole.SERVICE_PROVIDER,
      profile: {
        create: {
          firstName: "Service",
          lastName: "Provider",
          phone: "+123456789",
          nationality: "Azerbaijani",
          timezone: "Europe/Berlin",
          preferredLanguage: Language.AZ,
        },
      },
      companyDetails: {
        create: {
          businessName: "SP Consulting GmbH",
          businessType: BusinessType.GMBH,
          businessCategory: BusinessCategory.TECH,
          registrationStatus: RegistrationStatus.APPROVED,
          vatNumber: "DE987654321",
          countryOfRegistration: "Germany",
        },
      },
      subscription: {
        create: {
          plan: SubscriptionPlan.PRO,
          paymentStatus: PaymentStatus.ACTIVE,
          paymentMethod: PaymentMethod.STRIPE,
        },
      },
    },
    include: {
      profile: true,
      companyDetails: true,
      subscription: true,
    },
  });

  return user;
}

async function seedBuyer() {
  const user = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: {
      email: "buyer@example.com",
      password: "hashedpassword123",
      role: { connect: { name: UserRole.CUSTOMER } },
      currentRole: UserRole.CUSTOMER,
      profile: {
        create: {
          firstName: "Buyer",
          lastName: "Customer",
          phone: "+987654321",
          nationality: "Azerbaijani",
          timezone: "Europe/Berlin",
          preferredLanguage: Language.AZ,
        },
      },
    },
    include: { profile: true },
  });

  return user;
}

const categories = [
  { category: "TECH", subCategory: "SOFTWARE_DEVELOPMENT" },
  { category: "TECH", subCategory: "IT_SUPPORT" },
  { category: "FINANCE", subCategory: "TAX_ADVISORY" },
  { category: "LEGAL", subCategory: "COMPANY_FORMATION" },
  { category: "REAL_ESTATE", subCategory: "REAL_ESTATE_SERVICES" },
  { category: "HEALTHCARE", subCategory: "HEALTHCARE_SERVICES" },
  { category: "ENTERTAINMENT", subCategory: "EVENT_MANAGEMENT" },
  { category: "FOOD", subCategory: "FOOD_CATERING" },
  { category: "EDUCATION", subCategory: "TUTORING_SERVICES" },
  { category: "SPORTS", subCategory: "SPORTS_COACHING" },
];

async function seedServiceListings(providerId: string) {
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];

    const listing = await prisma.serviceListing.create({
      data: {
        title: `${cat.subCategory.replace(/_/g, " ")} Service`,
        description: `High-quality ${cat.category.toLowerCase()} service by professionals.`,
        category: cat.category,
        subCategory: cat.subCategory,
        price: 99 + i * 10,
        currency: Currency.EUR,
        country: "Germany",
        image: `https://source.unsplash.com/random/400x300?sig=${i}`,
        ownerId: providerId,
      },
    });

    await prisma.servicePackage.createMany({
      data: [
        {
          name: "Basic Plan",
          description: "Basic plan for general services.",
          price: 49.99,
          serviceListingId: listing.id,
        },
        {
          name: "Premium Plan",
          description: "Includes all features.",
          price: 89.99,
          serviceListingId: listing.id,
        },
      ],
    });

    console.log(`✅ Seeded service listing: ${listing.title}`);
  }
}

async function main() {
  await seedRolesAndPermissions();
  const provider = await seedServiceProvider();
  const buyer = await seedBuyer();
  await seedServiceListings(provider.id);

  const sampleListing = await prisma.serviceListing.findFirst({
    where: { ownerId: provider.id },
  });

  if (!sampleListing) throw new Error("No service listing found.");

  const order = await prisma.order.create({
    data: {
      status: OrderStatus.PENDING,
      type: "MARKETPLACE",
      buyerId: buyer.id,
      providerId: provider.id,
      serviceId: sampleListing.id,
      advanceAmount: 60,
      finalAmount: 90,
      paymentStage: PaymentStage.ADVANCE_PAID,
      amount: 150,
      isPaid: false,
      customNotes: "Urgent processing preferred.",
    },
  });

  console.log(`✅ Seeded order with ID: ${order.id}`);

  const invoices = await prisma.invoice.createMany({
    data: [
      {
        orderId: order.id,
        type: InvoiceType.ADVANCE,
        amount: 60,
        status: InvoiceStatus.PAID,
        paidById: buyer.id,
        paidToId: provider.id,
      },
      {
        orderId: order.id,
        type: InvoiceType.FINAL,
        amount: 90,
        status: InvoiceStatus.UNPAID,
        paidById: buyer.id,
        paidToId: provider.id,
      },
    ],
  });

  console.log(`✅ Seeded ${invoices.count} invoices for the order.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
