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
} from "@prisma/client"; // Make sure this path is correct
import { prisma } from "../index";

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "hashedpassword123", // Replace with bcrypt-hashed value if needed
      role: UserRole.ADMIN,
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
    },
  });

  console.log("✅ Seeded user:", user);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
