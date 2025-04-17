"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceDetailPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var react_redux_1 = require("react-redux");
var servicesSlice_1 = require("@/store/servicesSlice");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var next_intl_1 = require("next-intl");
function ServiceDetailPage() {
    var router = (0, navigation_1.useRouter)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var category = searchParams.get("category");
    var locale = (0, next_intl_1.useLocale)();
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.services; }), services = _a.services, loading = _a.loading, error = _a.error;
    var _b = (0, react_1.useState)(0), minPrice = _b[0], setMinPrice = _b[1];
    var _c = (0, react_1.useState)(""), selectedSubCategory = _c[0], setSelectedSubCategory = _c[1];
    var _d = (0, react_1.useState)([]), filteredServices = _d[0], setFilteredServices = _d[1];
    var _e = (0, react_1.useState)([]), subCategories = _e[0], setSubCategories = _e[1];
    (0, react_1.useEffect)(function () {
        dispatch((0, servicesSlice_1.fetchAllServices)());
    }, [dispatch]);
    (0, react_1.useEffect)(function () {
        var filtered = services
            .filter(function (s) { return s.category === (category === null || category === void 0 ? void 0 : category.toUpperCase()); })
            .filter(function (s) {
            return selectedSubCategory ? s.subCategory === selectedSubCategory : true;
        })
            .filter(function (s) { return s.price >= minPrice; });
        setFilteredServices(filtered);
    }, [selectedSubCategory, minPrice, category, services]);
    (0, react_1.useEffect)(function () {
        if (!loading && category) {
            var normalizedCategory_1 = category.toUpperCase();
            var categoryServices = services.filter(function (service) { return service.category === normalizedCategory_1; });
            var uniqueSubCategories = Array.from(new Set(categoryServices.map(function (s) { return s.subCategory; })));
            setSubCategories(uniqueSubCategories);
        }
    }, [loading, category, services]);
    console.log("Subcategories:", subCategories);
    console.log("Filtered Services:", filteredServices);
    console.log("Selected Category:", category);
    var formatTitle = function (key) {
        return key
            .split("_")
            .map(function (w) { return w[0] + w.slice(1).toLowerCase(); })
            .join(" ");
    };
    return (<div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">
        Services in: {category ? formatTitle(category) : "All"}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="minPrice" className="text-lg mr-2">
            Min Price:
          </label>
          <input type="number" id="minPrice" value={minPrice} onChange={function (e) { return setMinPrice(Number(e.target.value)); }} className="border p-2 rounded" placeholder="0"/>
        </div>

        <div>
          <label htmlFor="subCategory" className="text-lg mr-2">
            Subcategory:
          </label>
          <select id="subCategory" value={selectedSubCategory} onChange={function (e) { return setSelectedSubCategory(e.target.value); }} className="border p-2 rounded">
            <option value="">All</option>
            {subCategories.map(function (sub) { return (<option key={sub} value={sub}>
                {formatTitle(sub)}
              </option>); })}
          </select>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
            !error &&
            filteredServices.map(function (service) { return (<card_1.Card key={service.id} className="w-full">
              <card_1.CardHeader>
                <img src={"https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={service.title} className="w-full h-48 object-cover rounded-t-md"/>
              </card_1.CardHeader>
              <card_1.CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </card_1.CardContent>
              <card_1.CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">€{service.price}</span>
                <button_1.Button variant="default" onClick={function () {
                    return router.push("/".concat(locale, "/services/").concat(service.subCategory, "/details/").concat(service.id));
                }}>
                  View Details
                </button_1.Button>
              </card_1.CardFooter>
            </card_1.Card>); })}
      </div>
    </div>);
}
