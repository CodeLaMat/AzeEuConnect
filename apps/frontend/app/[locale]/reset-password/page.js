"use client";
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
exports.default = ResetPasswordPage;
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
function ResetPasswordPage() {
    var _this = this;
    var searchParams = (0, navigation_1.useSearchParams)();
    var token = searchParams.get("token");
    var router = (0, navigation_1.useRouter)();
    var locale = (0, navigation_1.useParams)().locale;
    var _a = (0, react_1.useState)(""), newPassword = _a[0], setNewPassword = _a[1];
    var _b = (0, react_1.useState)(""), confirmPassword = _b[0], setConfirmPassword = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(""), message = _d[0], setMessage = _d[1];
    var _e = (0, react_1.useState)(""), error = _e[0], setError = _e[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var res, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError("");
                    setMessage("");
                    if (!token) {
                        setError("Invalid or missing reset token.");
                        return [2 /*return*/];
                    }
                    if (newPassword !== confirmPassword) {
                        setError("Passwords do not match.");
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    setLoading(true);
                    return [4 /*yield*/, fetch("/api/auth/reset-password", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ token: token, newPassword: newPassword }),
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    if (res.ok) {
                        setMessage("Password reset successfully! Redirecting...");
                        setTimeout(function () {
                            router.push("/".concat(locale, "/signin"));
                        }, 2000);
                    }
                    else {
                        setError(data.message || "Reset failed.");
                    }
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error("Reset error:", err_1);
                    setError("Something went wrong. Try again later.");
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
          Reset Password
        </h2>

        {message && (<div className="bg-green-100 text-green-800 p-3 mb-4 rounded">
            {message}
          </div>)}

        {error && (<div className="bg-red-100 text-red-800 p-3 mb-4 rounded">
            {error}
          </div>)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="New password" className="w-full px-4 py-2 border rounded-md" value={newPassword} onChange={function (e) { return setNewPassword(e.target.value); }} required/>
          <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2 border rounded-md" value={confirmPassword} onChange={function (e) { return setConfirmPassword(e.target.value); }} required/>
          <button_1.Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button_1.Button>
        </form>
      </div>
    </main>);
}
