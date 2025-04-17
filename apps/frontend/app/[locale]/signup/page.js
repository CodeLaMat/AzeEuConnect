"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = RegisterPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var zod_1 = require("zod");
var options_1 = require("@/lib/options");
// ✅ Schema Validation
var registerSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(3, "First Name is required"),
    lastName: zod_1.z.string().min(3, "Last Name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().min(7, "Phone number is required"),
    location: zod_1.z.string().min(3, "Location (Country) is required"),
    nationality: zod_1.z.string().min(3, "Nationality is required"),
    timezone: zod_1.z.string().min(3, "Timezone is required"),
    preferredLanguage: zod_1.z.enum(["AZ", "EN", "DE", "FR", "NL"]),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod_1.z.string(),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
function RegisterPage() {
    var _this = this;
    var router = (0, navigation_1.useRouter)();
    var locale = (0, navigation_1.useParams)().locale;
    var _a = (0, react_1.useState)({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        location: "",
        nationality: "",
        timezone: "UTC",
        preferredLanguage: "AZ",
        password: "",
        confirmPassword: "",
    }), formData = _a[0], setFormData = _a[1];
    // UI states
    var _b = (0, react_1.useState)(""), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    // ✅ Handle form input change
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)), (name === "location" && { timezone: (0, options_1.getTimezoneByCountry)(value) })));
        });
    };
    // ✅ Handle form submission
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result, res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    result = registerSchema.safeParse(formData);
                    if (!result.success) {
                        setError(result.error.errors[0].message);
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    return [4 /*yield*/, fetch("".concat(process.env.NEXT_PUBLIC_BACKEND_URL, "/api/auth/register"), {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(formData),
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 3];
                    router.push("/".concat(locale, "/signin"));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, res.json()];
                case 4:
                    data = _a.sent();
                    setError(data.message || "Registration failed");
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1);
                    setError("Something went wrong");
                    return [3 /*break*/, 8];
                case 7:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>

        {error && (<div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FIRST NAME */}
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John"/>

          {/* LAST NAME */}
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe"/>

          {/* EMAIL */}
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com"/>

          {/* PHONE */}
          <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+994 50 123 4567"/>

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="block mb-1 font-medium">
              Country
            </label>
            <select id="location" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Select a country</option>
              {options_1.availableCountries.map(function (country) { return (<option key={country} value={country}>
                  {country}
                </option>); })}
            </select>
          </div>

          {/* NATIONALITY */}
          <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Azerbaijani"/>

          {/* TIMEZONE */}
          {/* TIMEZONE (READ-ONLY) */}
          <InputField label="Timezone" name="timezone" value={formData.timezone} onChange={handleChange} placeholder="Auto-filled based on country" type="text"/>

          {/* PREFERRED LANGUAGE */}
          <div>
            <label htmlFor="preferredLanguage" className="block mb-1 font-medium">
              Preferred Language
            </label>
            <select id="preferredLanguage" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="AZ">Azerbaijani</option>
              <option value="EN">English</option>
              <option value="DE">German</option>
              <option value="FR">French</option>
              <option value="NL">Dutch</option>
            </select>
          </div>

          {/* PASSWORD */}
          <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange}/>

          {/* CONFIRM PASSWORD */}
          <InputField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}/>

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={loading} className="w-full py-2 bg-secondary text-white font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href={"/".concat(locale, "/signin")} className="text-blue-600 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>);
}
// ✅ Reusable InputField Component
var InputField = function (_a) {
    var label = _a.label, name = _a.name, _b = _a.type, type = _b === void 0 ? "text" : _b, value = _a.value, onChange = _a.onChange, placeholder = _a.placeholder;
    return (<div>
    <label htmlFor={name} className="block mb-1 font-medium">
      {label}
    </label>
    <input id={name} name={name} type={type} value={value} onChange={onChange} className="w-full px-3 py-2 border rounded" placeholder={placeholder}/>
  </div>);
};
