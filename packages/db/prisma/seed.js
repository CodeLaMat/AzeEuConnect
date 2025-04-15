"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@repo/db");
const index_1 = require("../index");
const RolePermissions = {
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
const allPermissions = Array.from(new Set(Object.values(RolePermissions).flat()));
async function seedRolesAndPermissions() {
    for (const role of Object.values(client_1.UserRole)) {
        await index_1.prisma.role.upsert({
            where: { name: role },
            update: {},
            create: { name: role },
        });
    }
    for (const permission of allPermissions) {
        await index_1.prisma.permission.upsert({
            where: { name: permission },
            update: {},
            create: { name: permission, action: permission },
        });
    }
    for (const roleName in RolePermissions) {
        const role = await index_1.prisma.role.findUnique({
            where: { name: roleName },
        });
        if (!role)
            continue;
        for (const permissionName of RolePermissions[roleName]) {
            const permission = await index_1.prisma.permission.findUnique({
                where: { name: permissionName },
            });
            if (!permission)
                continue;
            await index_1.prisma.rolePermission.upsert({
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
    const user = await index_1.prisma.user.upsert({
        where: { email: "serviceprovider@example.com" },
        update: {},
        create: {
            email: "serviceprovider@example.com",
            password: "hashedpassword123",
            role: { connect: { name: client_1.UserRole.SERVICE_PROVIDER } },
            currentRole: client_1.UserRole.SERVICE_PROVIDER,
            profile: {
                create: {
                    firstName: "Service",
                    lastName: "Provider",
                    phone: "+123456789",
                    nationality: "Azerbaijani",
                    timezone: "Europe/Berlin",
                    preferredLanguage: client_1.Language.AZ,
                },
            },
            companyDetails: {
                create: {
                    businessName: "SP Consulting GmbH",
                    businessType: client_1.BusinessType.GMBH,
                    businessCategory: client_1.BusinessCategory.TECH,
                    registrationStatus: client_1.RegistrationStatus.APPROVED,
                    vatNumber: "DE987654321",
                    countryOfRegistration: "Germany",
                },
            },
            subscription: {
                create: {
                    plan: client_1.SubscriptionPlan.PRO,
                    paymentStatus: client_1.PaymentStatus.ACTIVE,
                    paymentMethod: client_1.PaymentMethod.STRIPE,
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
    const user = await index_1.prisma.user.upsert({
        where: { email: "buyer@example.com" },
        update: {},
        create: {
            email: "buyer@example.com",
            password: "hashedpassword123",
            role: { connect: { name: client_1.UserRole.CUSTOMER } },
            currentRole: client_1.UserRole.CUSTOMER,
            profile: {
                create: {
                    firstName: "Buyer",
                    lastName: "Customer",
                    phone: "+987654321",
                    nationality: "Azerbaijani",
                    timezone: "Europe/Berlin",
                    preferredLanguage: client_1.Language.AZ,
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
async function seedServiceListings(providerId) {
    for (let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const listing = await index_1.prisma.serviceListing.create({
            data: {
                title: `${cat.subCategory.replace(/_/g, " ")} Service`,
                description: `High-quality ${cat.category.toLowerCase()} service by professionals.`,
                category: cat.category,
                subCategory: cat.subCategory,
                price: 99 + i * 10,
                currency: client_1.Currency.EUR,
                country: "Germany",
                image: `https://source.unsplash.com/random/400x300?sig=${i}`,
                ownerId: providerId,
            },
        });
        await index_1.prisma.servicePackage.createMany({
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
    const sampleListing = await index_1.prisma.serviceListing.findFirst({
        where: { ownerId: provider.id },
    });
    if (!sampleListing)
        throw new Error("No service listing found.");
    const order = await index_1.prisma.order.create({
        data: {
            status: client_1.OrderStatus.PENDING,
            type: "MARKETPLACE",
            buyerId: buyer.id,
            providerId: provider.id,
            serviceId: sampleListing.id,
            advanceAmount: 60,
            finalAmount: 90,
            paymentStage: client_1.PaymentStage.ADVANCE_PAID,
            amount: 150,
            isPaid: false,
            customNotes: "Urgent processing preferred.",
        },
    });
    console.log(`✅ Seeded order with ID: ${order.id}`);
    const invoices = await index_1.prisma.invoice.createMany({
        data: [
            {
                orderId: order.id,
                type: client_1.InvoiceType.ADVANCE,
                amount: 60,
                status: client_1.InvoiceStatus.PAID,
                paidById: buyer.id,
                paidToId: provider.id,
            },
            {
                orderId: order.id,
                type: client_1.InvoiceType.FINAL,
                amount: 90,
                status: client_1.InvoiceStatus.UNPAID,
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
    await index_1.prisma.$disconnect();
});
