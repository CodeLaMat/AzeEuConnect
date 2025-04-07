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

async function seedAdminUser() {
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "hashedpassword123", // Replace with real bcrypt hash
      role: { connect: { name: UserRole.ADMIN } },
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
