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
exports.default = SignInPage;
var next_intl_1 = require("next-intl");
var react_1 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var fa_1 = require("react-icons/fa");
var react_2 = require("react");
var button_1 = require("@/components/ui/button");
// Redux
var react_redux_1 = require("react-redux");
var userSlice_1 = require("@/store/userSlice");
var profileSlice_1 = require("@/store/profileSlice");
var utils_1 = require("@/lib/utils");
var options_1 = require("@/lib/options");
function SignInPage() {
    var _this = this;
    var t = (0, next_intl_1.useTranslations)("navbar");
    var locale = (0, navigation_1.useParams)().locale;
    var router = (0, navigation_1.useRouter)();
    var _a = (0, react_1.useSession)(), session = _a.data, status = _a.status;
    var dispatch = (0, react_redux_1.useDispatch)();
    var _b = (0, react_2.useState)({ email: "", password: "" }), formData = _b[0], setFormData = _b[1];
    var _c = (0, react_2.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_2.useState)(false), redirecting = _d[0], setRedirecting = _d[1];
    var _e = (0, react_2.useState)(""), error = _e[0], setError = _e[1];
    // ✅ Redirect if session exists and user is authenticated
    (0, react_2.useEffect)(function () {
        var redirectToCorrectDashboard = function () { return __awaiter(_this, void 0, void 0, function () {
            var updatedSession, retries, preferredLocale, finalLocale, role, dashboardPath;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!(session && status === "authenticated")) return [3 /*break*/, 6];
                        setRedirecting(true); // show the loading screen during redirection
                        return [4 /*yield*/, (0, react_1.getSession)()];
                    case 1:
                        updatedSession = _g.sent();
                        console.log("User currentRole:", (_a = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _a === void 0 ? void 0 : _a.currentRole, typeof ((_b = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _b === void 0 ? void 0 : _b.currentRole));
                        retries = 5;
                        _g.label = 2;
                    case 2:
                        if (!(!((_c = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _c === void 0 ? void 0 : _c.currentRole) && retries > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, (0, react_1.getSession)()];
                    case 4:
                        updatedSession = _g.sent();
                        retries--;
                        return [3 /*break*/, 2];
                    case 5:
                        if ((_d = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _d === void 0 ? void 0 : _d.currentRole) {
                            preferredLocale = (_f = (_e = updatedSession.user.profile) === null || _e === void 0 ? void 0 : _e.preferredLanguage) === null || _f === void 0 ? void 0 : _f.toLowerCase();
                            finalLocale = preferredLocale && options_1.supportedLocales.includes(preferredLocale)
                                ? preferredLocale
                                : locale;
                            role = updatedSession.user.currentRole.toUpperCase();
                            dashboardPath = (0, utils_1.getDashboardRoute)(role, finalLocale);
                            // Redirect to the appropriate dashboard or unauthorized page
                            if (dashboardPath) {
                                router.push("/".concat(finalLocale, "/").concat(dashboardPath));
                            }
                            else {
                                router.push("/".concat(finalLocale, "/unauthorized"));
                            }
                        }
                        else {
                            setError("Login succeeded, but user currentRole is missing.");
                            setRedirecting(false);
                        }
                        _g.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        redirectToCorrectDashboard();
    }, [session, status, router, locale]);
    // ✅ Handle form input change
    var handleChange = function (e) {
        var _a;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[e.target.name] = e.target.value, _a)));
    };
    // ✅ Handle login with credentials
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var result, updatedSession, retries, role, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    e.preventDefault();
                    setLoading(true);
                    setError("");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, (0, react_1.signIn)("credentials", {
                            email: formData.email,
                            password: formData.password,
                            redirect: false,
                        })];
                case 2:
                    result = _c.sent();
                    if (!(result === null || result === void 0 ? void 0 : result.ok)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, react_1.getSession)()];
                case 3:
                    updatedSession = _c.sent();
                    retries = 5;
                    _c.label = 4;
                case 4:
                    if (!(!((_a = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _a === void 0 ? void 0 : _a.currentRole) && retries > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, react_1.getSession)()];
                case 6:
                    updatedSession = _c.sent();
                    retries--;
                    return [3 /*break*/, 4];
                case 7:
                    if ((_b = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _b === void 0 ? void 0 : _b.currentRole) {
                        role = updatedSession.user.currentRole.toUpperCase();
                        // Dispatch Redux user
                        dispatch((0, userSlice_1.setUserIdentity)({
                            id: updatedSession.user.id || "",
                            email: updatedSession.user.email || "",
                            role: role,
                            currentRole: role,
                        }));
                        dispatch((0, profileSlice_1.fetchUserProfile)(updatedSession.user.id || ""));
                        setRedirecting(true); // trigger loading screen during redirection
                    }
                    else {
                        setError("Login succeeded, but user currentRole is missing.");
                    }
                    return [3 /*break*/, 9];
                case 8:
                    setError("Invalid email or password.");
                    _c.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _c.sent();
                    console.error("❌ Unexpected error:", error_1);
                    setError("Something went wrong. Please try again later.");
                    return [3 /*break*/, 11];
                case 11:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // ✅ Handle Google Sign-In
    var handleGoogleSignIn = function () { return __awaiter(_this, void 0, void 0, function () {
        var result, updatedSession, retries, role, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setError("");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 10, , 11]);
                    return [4 /*yield*/, (0, react_1.signIn)("google", { redirect: false })];
                case 2:
                    result = _c.sent();
                    if (!(result === null || result === void 0 ? void 0 : result.ok)) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, react_1.getSession)()];
                case 3:
                    updatedSession = _c.sent();
                    retries = 5;
                    _c.label = 4;
                case 4:
                    if (!(!((_a = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _a === void 0 ? void 0 : _a.currentRole) && retries > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, new Promise(function (res) { return setTimeout(res, 500); })];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, (0, react_1.getSession)()];
                case 6:
                    updatedSession = _c.sent();
                    retries--;
                    return [3 /*break*/, 4];
                case 7:
                    if ((_b = updatedSession === null || updatedSession === void 0 ? void 0 : updatedSession.user) === null || _b === void 0 ? void 0 : _b.currentRole) {
                        role = updatedSession.user.currentRole.toUpperCase();
                        dispatch((0, userSlice_1.setUserIdentity)({
                            id: updatedSession.user.id || "",
                            email: updatedSession.user.email || "",
                            role: role,
                            currentRole: role,
                        }));
                        dispatch((0, profileSlice_1.fetchUserProfile)(updatedSession.user.id || ""));
                        setRedirecting(true);
                    }
                    else {
                        setError("Login succeeded, but user currentRole is missing.");
                    }
                    return [3 /*break*/, 9];
                case 8:
                    setError("Google authentication failed.");
                    _c.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_2 = _c.sent();
                    console.error("❌ Google Sign-In error:", error_2);
                    setError("Something went wrong during Google sign-in.");
                    return [3 /*break*/, 11];
                case 11:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    // Render a full-screen loading view if redirecting
    if (redirecting) {
        return (<main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
          <span className="animate-spin text-4xl text-blue-600 mb-4">
            <fa_1.FaSpinner />
          </span>
          <p className="text-lg font-medium">Redirecting to your dashboard…</p>
        </div>
      </main>);
    }
    return (<main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-secondary p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-primary">
          {t("auth.title")}
        </h1>
        <p className="text-center text-secondary-foreground">
          {t("auth.description")}
        </p>

        {/* Google Login */}
        <button_1.Button className="flex items-center w-full justify-center mt-4 bg-yellow-600 text-accent font-bold hover:bg-yellow-600 cursor-pointer" onClick={handleGoogleSignIn} disabled={loading}>
          <span className="mr-2 text-accent text-2xl">
            <fa_1.FaGoogle />
          </span>
          {t("auth.logInWithGoogle")}
        </button_1.Button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300"/>
          <span className="px-2 text-gray-500">{t("auth.or")}</span>
          <hr className="flex-grow border-gray-300"/>
        </div>

        {/* Error Message */}
        {error && (<div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>)}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" placeholder={t("auth.emailPlaceholder")} className="w-full px-4 py-2 border rounded-md" value={formData.email} onChange={handleChange} required/>
          <input type="password" name="password" placeholder={t("auth.passwordPlaceholder")} className="w-full px-4 py-2 border rounded-md" value={formData.password} onChange={handleChange} required/>

          {/* Forgot password link */}
          <div className="text-right">
            <span onClick={function () { return router.push("/".concat(locale, "/forgot-password")); }} className="text-sm text-primary hover:underline cursor-pointer">
              {t("auth.forgotPassword") || "Forgot your password?"}
            </span>
          </div>

          <button_1.Button type="submit" className="w-full bg-primary text-secondaty hover:bg-blue-700 cursor-pointer" disabled={loading}>
            {loading ? "Logging in..." : t("auth.login")}
          </button_1.Button>
        </form>

        <p className="text-center mt-4 text-primary">
          {t("auth.noAccount")}{" "}
          <span onClick={function () { return router.push("/".concat(locale, "/signup")); }} className="text-blue-700 hover:underline cursor-pointer">
            {t("auth.signUp")}
          </span>
        </p>
      </div>
    </main>);
}
