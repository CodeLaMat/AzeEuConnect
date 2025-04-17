"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../src");
var src_2 = require("../src");
var RolePermissions = {
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
var allPermissions = Array.from(new Set(Object.values(RolePermissions).flat()));
function seedRolesAndPermissions() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, role, _b, allPermissions_1, permission, _c, _d, _e, _f, roleName, role, _g, _h, permissionName, permission;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _i = 0, _a = Object.values(src_1.UserRole);
                    _j.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    role = _a[_i];
                    return [4 /*yield*/, src_2.prisma.role.upsert({
                            where: { name: role },
                            update: {},
                            create: { name: role },
                        })];
                case 2:
                    _j.sent();
                    _j.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _b = 0, allPermissions_1 = allPermissions;
                    _j.label = 5;
                case 5:
                    if (!(_b < allPermissions_1.length)) return [3 /*break*/, 8];
                    permission = allPermissions_1[_b];
                    return [4 /*yield*/, src_2.prisma.permission.upsert({
                            where: { name: permission },
                            update: {},
                            create: { name: permission, action: permission },
                        })];
                case 6:
                    _j.sent();
                    _j.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 5];
                case 8:
                    _c = RolePermissions;
                    _d = [];
                    for (_e in _c)
                        _d.push(_e);
                    _f = 0;
                    _j.label = 9;
                case 9:
                    if (!(_f < _d.length)) return [3 /*break*/, 16];
                    _e = _d[_f];
                    if (!(_e in _c)) return [3 /*break*/, 15];
                    roleName = _e;
                    return [4 /*yield*/, src_2.prisma.role.findUnique({
                            where: { name: roleName },
                        })];
                case 10:
                    role = _j.sent();
                    if (!role)
                        return [3 /*break*/, 15];
                    _g = 0, _h = RolePermissions[roleName];
                    _j.label = 11;
                case 11:
                    if (!(_g < _h.length)) return [3 /*break*/, 15];
                    permissionName = _h[_g];
                    return [4 /*yield*/, src_2.prisma.permission.findUnique({
                            where: { name: permissionName },
                        })];
                case 12:
                    permission = _j.sent();
                    if (!permission)
                        return [3 /*break*/, 14];
                    return [4 /*yield*/, src_2.prisma.rolePermission.upsert({
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
                        })];
                case 13:
                    _j.sent();
                    _j.label = 14;
                case 14:
                    _g++;
                    return [3 /*break*/, 11];
                case 15:
                    _f++;
                    return [3 /*break*/, 9];
                case 16:
                    console.log("✅ Roles and permissions seeded.");
                    return [2 /*return*/];
            }
        });
    });
}
function seedServiceProvider() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_2.prisma.user.upsert({
                        where: { email: "serviceprovider@example.com" },
                        update: {},
                        create: {
                            email: "serviceprovider@example.com",
                            password: "hashedpassword123",
                            role: { connect: { name: src_1.UserRole.SERVICE_PROVIDER } },
                            currentRole: src_1.UserRole.SERVICE_PROVIDER,
                            profile: {
                                create: {
                                    firstName: "Service",
                                    lastName: "Provider",
                                    phone: "+123456789",
                                    nationality: "Azerbaijani",
                                    timezone: "Europe/Berlin",
                                    preferredLanguage: src_1.Language.AZ,
                                },
                            },
                            companyDetails: {
                                create: {
                                    businessName: "SP Consulting GmbH",
                                    businessType: src_1.BusinessType.GMBH,
                                    businessCategory: src_1.BusinessCategory.TECH,
                                    registrationStatus: src_1.RegistrationStatus.APPROVED,
                                    vatNumber: "DE987654321",
                                    countryOfRegistration: "Germany",
                                },
                            },
                            subscription: {
                                create: {
                                    plan: src_1.SubscriptionPlan.PRO,
                                    paymentStatus: src_1.PaymentStatus.ACTIVE,
                                    paymentMethod: src_1.PaymentMethod.STRIPE,
                                },
                            },
                        },
                        include: {
                            profile: true,
                            companyDetails: true,
                            subscription: true,
                        },
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function seedBuyer() {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, src_2.prisma.user.upsert({
                        where: { email: "buyer@example.com" },
                        update: {},
                        create: {
                            email: "buyer@example.com",
                            password: "hashedpassword123",
                            role: { connect: { name: src_1.UserRole.CUSTOMER } },
                            currentRole: src_1.UserRole.CUSTOMER,
                            profile: {
                                create: {
                                    firstName: "Buyer",
                                    lastName: "Customer",
                                    phone: "+987654321",
                                    nationality: "Azerbaijani",
                                    timezone: "Europe/Berlin",
                                    preferredLanguage: src_1.Language.AZ,
                                },
                            },
                        },
                        include: { profile: true },
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
var categories = [
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
function seedServiceListings(providerId) {
    return __awaiter(this, void 0, void 0, function () {
        var i, cat, listing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < categories.length)) return [3 /*break*/, 5];
                    cat = categories[i];
                    return [4 /*yield*/, src_2.prisma.serviceListing.create({
                            data: {
                                title: "".concat(cat.subCategory.replace(/_/g, " "), " Service"),
                                description: "High-quality ".concat(cat.category.toLowerCase(), " service by professionals."),
                                category: cat.category,
                                subCategory: cat.subCategory,
                                price: 99 + i * 10,
                                currency: src_1.Currency.EUR,
                                country: "Germany",
                                image: "https://source.unsplash.com/random/400x300?sig=".concat(i),
                                ownerId: providerId,
                            },
                        })];
                case 2:
                    listing = _a.sent();
                    return [4 /*yield*/, src_2.prisma.servicePackage.createMany({
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
                        })];
                case 3:
                    _a.sent();
                    console.log("\u2705 Seeded service listing: ".concat(listing.title));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, buyer, sampleListing, order, invoices;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, seedRolesAndPermissions()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, seedServiceProvider()];
                case 2:
                    provider = _a.sent();
                    return [4 /*yield*/, seedBuyer()];
                case 3:
                    buyer = _a.sent();
                    return [4 /*yield*/, seedServiceListings(provider.id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, src_2.prisma.serviceListing.findFirst({
                            where: { ownerId: provider.id },
                        })];
                case 5:
                    sampleListing = _a.sent();
                    if (!sampleListing)
                        throw new Error("No service listing found.");
                    return [4 /*yield*/, src_2.prisma.order.create({
                            data: {
                                status: src_1.OrderStatus.PENDING,
                                type: "MARKETPLACE",
                                buyerId: buyer.id,
                                providerId: provider.id,
                                serviceId: sampleListing.id,
                                advanceAmount: 60,
                                finalAmount: 90,
                                paymentStage: src_1.PaymentStage.ADVANCE_PAID,
                                amount: 150,
                                isPaid: false,
                                customNotes: "Urgent processing preferred.",
                            },
                        })];
                case 6:
                    order = _a.sent();
                    console.log("\u2705 Seeded order with ID: ".concat(order.id));
                    return [4 /*yield*/, src_2.prisma.invoice.createMany({
                            data: [
                                {
                                    orderId: order.id,
                                    type: src_1.InvoiceType.ADVANCE,
                                    amount: 60,
                                    status: src_1.InvoiceStatus.PAID,
                                    paidById: buyer.id,
                                    paidToId: provider.id,
                                },
                                {
                                    orderId: order.id,
                                    type: src_1.InvoiceType.FINAL,
                                    amount: 90,
                                    status: src_1.InvoiceStatus.UNPAID,
                                    paidById: buyer.id,
                                    paidToId: provider.id,
                                },
                            ],
                        })];
                case 7:
                    invoices = _a.sent();
                    console.log("\u2705 Seeded ".concat(invoices.count, " invoices for the order."));
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, src_2.prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
