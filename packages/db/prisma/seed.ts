// prisma/seed.ts
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
} from "@prisma/client";
import { prisma } from "../index";

// In-memory mapping for role permissions.
const RolePermissions: { [role: string]: string[] } = {
  ADMIN: ["ALL"],
  USER: ["CREATE_ORDER", "VIEW_SERVICES", "WRITE_REVIEW", "MANAGE_PROFILE"],
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
  REGULATORY_OFFICER: ["VERIFY_COMPANY", "APPROVE_DOCUMENTS"],
};

// List of all unique permissions (actions) required.
const allPermissions = Array.from(
  new Set(Object.values(RolePermissions).flat())
);

async function seedRolesAndPermissions() {
  // 1. Seed default roles.
  const roles = [
    { name: "USER" },
    { name: "ADMIN" },
    { name: "CONSULTANT" },
    { name: "SERVICE_PROVIDER" },
    { name: "SUPPORT_AGENT" },
    { name: "REGULATORY_OFFICER" },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
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
    // First, fetch the role record.
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      console.warn(`Role ${roleName} not found!`);
      continue;
    }
    const permissionsForRole = RolePermissions[roleName];
    for (const permissionName of permissionsForRole) {
      // Fetch the permission record.
      const permission = await prisma.permission.findUnique({
        where: { name: permissionName },
      });
      if (!permission) {
        console.warn(`Permission ${permissionName} not found!`);
        continue;
      }
      // Create the join record. The unique composite constraint (roleId, permissionId)
      // ensures we only create one record per pair.
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

async function seedAdminUser() {
  // Create an admin user if one does not already exist.
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "hashedpassword123", // Replace with a real bcrypt-hashed password
      role: { connect: { name: "ADMIN" } },
      profile: {
        create: {
          firstName: "Admin",
          lastName: "User",
          phone: "+123456789",
          nationality: "Azerbaijani",
          timezone: "Europe/Berlin",
          preferredLanguage: Language.AZ,
        },
      },
      companyDetails: {
        create: {
          businessName: "Test GmbH",
          businessType: BusinessType.GMBH,
          businessCategory: BusinessCategory.TECH,
          registrationStatus: RegistrationStatus.APPROVED,
          vatNumber: "DE123456789",
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
      role: true,
    },
  });

  console.log("✅ Seeded admin user:", adminUser);
}

async function main() {
  await seedRolesAndPermissions();
  await seedAdminUser();
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
