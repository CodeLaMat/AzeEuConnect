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
  ServiceType,
  OrderStatus,
  ServiceStatus,
} from "@prisma/client";
import { prisma } from "../index";

// In-memory mapping for role permissions.
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

// List of all unique permissions (actions) required.
const allPermissions = Array.from(
  new Set(Object.values(RolePermissions).flat())
);

async function seedRolesAndPermissions() {
  // 1. Seed default roles.
  const roles: { name: UserRole }[] = Object.values(UserRole).map((role) => ({
    name: role,
  }));

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: { name: role.name },
    });
  }
  console.log("✅ Default roles seeded");

  // 2. Seed permissions.
  for (const permissionName of allPermissions) {
    await prisma.permission.upsert({
      where: { name: permissionName },
      update: {},
      create: {
        name: permissionName,
        action: permissionName as Action,
      },
    });
  }
  console.log("✅ Permissions seeded");

  // 3. Create RolePermission associations.
  for (const roleName in RolePermissions) {
    const typedRoleName = roleName as UserRole;

    const role = await prisma.role.findUnique({
      where: { name: typedRoleName },
    });
    if (!role) {
      console.warn(`Role ${roleName} not found!`);
      continue;
    }

    const permissionsForRole = RolePermissions[typedRoleName];
    for (const permissionName of permissionsForRole) {
      const permission = await prisma.permission.findUnique({
        where: { name: permissionName },
      });

      if (!permission) {
        console.warn(`Permission ${permissionName} not found!`);
        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          role: { connect: { id: role.id } },
          permission: { connect: { id: permission.id } },
          displayName: permissionName,
        },
      });
    }
  }
  console.log("✅ RolePermission associations seeded");
}

async function seedServiceProvider() {
  const serviceProviderUser = await prisma.user.upsert({
    where: { email: "serviceprovider@example.com" },
    update: {},
    create: {
      email: "serviceprovider@example.com",
      password: "hashedpassword123", // Replace with real bcrypt hash
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
      services: {
        create: {
          companyFormation: ServiceStatus.REQUESTED,
          taxAndAccounting: ServiceStatus.IN_PROGRESS,
          legalConsultation: ServiceStatus.COMPLETED,
          bankingSetup: ServiceStatus.REQUESTED,
          virtualOffice: ServiceStatus.IN_PROGRESS,
        },
      },
    },
    include: {
      profile: true,
      companyDetails: true,
      subscription: true,
      services: true,
    },
  });

  console.log("✅ Seeded service provider user:", serviceProviderUser);
  return serviceProviderUser; // Returning the user object for further use
}

async function seedBuyer() {
  const buyerUser = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: {
      email: "buyer@example.com",
      password: "hashedpassword123", // Replace with real bcrypt hash
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
    include: {
      profile: true,
    },
  });

  console.log("✅ Seeded buyer user:", buyerUser);
  return buyerUser; // Returning the user object for further use
}

async function seedServiceListing(serviceProviderUserId: string) {
  const serviceListing = await prisma.serviceListing.create({
    data: {
      title: "Consulting Service",
      description: "Business and financial consulting services.",
      category: "Consulting",
      country: "Germany",
      price: 100.0,
      serviceType: ServiceType.LEGAL_CONSULTATION,
      ownerId: serviceProviderUserId, // Use the service provider's user ID
    },
  });

  console.log("✅ Seeded service listing:", serviceListing);
  return serviceListing; // Returning the service listing for order creation
}

async function seedOrders(
  buyerUserId: string,
  serviceListingId: string,
  serviceProviderUserId: string
) {
  const order = await prisma.order.create({
    data: {
      status: OrderStatus.PENDING,
      buyerId: buyerUserId, // Use the actual buyer user ID
      providerId: serviceProviderUserId, // Use the service provider's user ID
      serviceId: serviceListingId, // Use the actual service listing ID
      amount: 150.0,
      isPaid: false,
    },
  });

  console.log("✅ Seeded order:", order);
}

async function main() {
  const serviceProvider = await seedServiceProvider(); // Get the service provider user
  const buyer = await seedBuyer(); // Get the buyer user
  const serviceListing = await seedServiceListing(serviceProvider.id); // Pass the service provider's ID to the service listing
  await seedOrders(buyer.id, serviceListing.id, serviceProvider.id); // Pass both buyer and service provider IDs to create the order
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
