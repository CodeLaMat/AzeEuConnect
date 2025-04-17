"use client";
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentsPage;
var react_1 = require("react");
var next_intl_1 = require("next-intl");
var button_1 = require("@/components/ui/button");
var data_table_1 = require("@/components/ui/data-table");
var data_table_pagination_1 = require("@/components/ui/data-table-pagination");
var fa_1 = require("react-icons/fa");
// Mocked list of documents.
var mockDocuments = [
    {
        id: 1,
        title: "Annual Financial Report 2024",
        country: "USA",
        businessArea: "Finance",
        type: "PDF",
        date: "2024-03-15",
        authority: "SEC",
        summary: "A comprehensive annual financial report.",
        link: "/documents/report1.pdf",
        language: "English",
    },
    {
        id: 2,
        title: "Market Analysis Q1",
        country: "Germany",
        businessArea: "Technology",
        type: "Excel",
        date: "2024-04-10",
        authority: "BA",
        summary: "Detailed market analysis for Q1.",
        link: "/documents/report2.xlsx",
        language: "German",
    },
    {
        id: 3,
        title: "Legal Contract Template",
        country: "France",
        businessArea: "Legal",
        type: "Word",
        date: "2024-01-20",
        authority: "Ministry of Justice",
        summary: "Template for legal contracts.",
        link: "/documents/contract.docx",
        language: "French",
    },
    {
        id: 4,
        title: "Press Release: New Product Launch",
        country: "UK",
        businessArea: "Retail",
        type: "PDF",
        date: "2024-02-28",
        authority: "Press Office",
        summary: "Press release detailing a new product launch.",
        link: "/documents/press_release.pdf",
        language: "English",
    },
    {
        id: 5,
        title: "Sustainability Report 2023",
        country: "Azerbaijan",
        businessArea: "Manufacturing",
        type: "PDF",
        date: "2023-12-01",
        authority: "Environmental Agency",
        summary: "Sustainability report covering 2023 operations.",
        link: "/documents/sustainability.pdf",
        language: "Azerbaijani",
    },
];
function DocumentsPage() {
    var t = (0, next_intl_1.useTranslations)("documents");
    // Filter state variables.
    var _a = (0, react_1.useState)(""), country = _a[0], setCountry = _a[1];
    var _b = (0, react_1.useState)(""), businessArea = _b[0], setBusinessArea = _b[1];
    var _c = (0, react_1.useState)(""), docType = _c[0], setDocType = _c[1];
    var _d = (0, react_1.useState)(""), language = _d[0], setLanguage = _d[1];
    var _e = (0, react_1.useState)(""), authority = _e[0], setAuthority = _e[1];
    var _f = (0, react_1.useState)(""), dateFrom = _f[0], setDateFrom = _f[1];
    var _g = (0, react_1.useState)(""), dateTo = _g[0], setDateTo = _g[1];
    // Pagination state.
    var _h = (0, react_1.useState)(1), currentPage = _h[0], setCurrentPage = _h[1];
    var pageSize = 10;
    // Combined state for filtered documents.
    var _j = (0, react_1.useState)(mockDocuments), filteredDocs = _j[0], setFilteredDocs = _j[1];
    // Get today's date to compare date filters
    var today = new Date().toISOString().split("T")[0];
    // Update filteredDocs when filters change.
    (0, react_1.useEffect)(function () {
        var filtered = __spreadArray([], mockDocuments, true);
        // Validate and filter dateFrom and dateTo
        if (dateFrom && new Date(dateFrom) > new Date(today)) {
            alert("The 'From' date cannot be in the future.");
            return;
        }
        if (dateTo && new Date(dateTo) > new Date(today)) {
            alert("The 'To' date cannot be in the future.");
            return;
        }
        if (dateFrom) {
            filtered = filtered.filter(function (doc) { return new Date(doc.date) >= new Date(dateFrom); });
        }
        if (dateTo) {
            filtered = filtered.filter(function (doc) { return new Date(doc.date) <= new Date(dateTo); });
        }
        if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
            alert("'From' date cannot be later than 'To' date.");
            return;
        }
        if (country) {
            filtered = filtered.filter(function (doc) {
                return doc.country.toLowerCase().includes(country.toLowerCase());
            });
        }
        if (businessArea) {
            filtered = filtered.filter(function (doc) {
                return doc.businessArea.toLowerCase().includes(businessArea.toLowerCase());
            });
        }
        if (language) {
            filtered = filtered.filter(function (doc) {
                return doc.language.toLowerCase().includes(language.toLowerCase());
            });
        }
        if (docType) {
            filtered = filtered.filter(function (doc) {
                return doc.type.toLowerCase().includes(docType.toLowerCase());
            });
        }
        if (authority) {
            filtered = filtered.filter(function (doc) {
                return doc.authority.toLowerCase().includes(authority.toLowerCase());
            });
        }
        setFilteredDocs(filtered);
        setCurrentPage(1);
    }, [country, businessArea, docType, authority, dateFrom, dateTo]);
    // Pagination: calculate current page data.
    var totalPages = Math.ceil(filteredDocs.length / pageSize);
    var currentDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    var clearFilters = function () {
        setCountry("");
        setBusinessArea("");
        setDocType("");
        setAuthority("");
        setDateFrom("");
        setDateTo("");
    };
    // Define columns for the shadcn DataTable.
    var columns = [
        {
            accessorKey: "title",
            header: t("table.documentName", { defaultValue: "Document Name" }),
            cell: function (info) { return (<div className="flex items-center space-x-2">
          <fa_1.FaFileAlt className="text-blue-500"/>
          <span>{info.getValue()}</span>
        </div>); },
        },
        {
            accessorKey: "country",
            header: t("table.country", { defaultValue: "Country" }),
        },
        {
            accessorKey: "businessArea",
            header: t("table.businessArea", { defaultValue: "Business Area" }),
        },
        {
            accessorKey: "language",
            header: t("table.language", { defaultValue: "BLanguage" }),
        },
        {
            accessorKey: "type",
            header: t("table.type", { defaultValue: "Type" }),
        },
        {
            accessorKey: "date",
            header: t("table.date", { defaultValue: "Date" }),
        },
        {
            accessorKey: "authority",
            header: t("table.authority", { defaultValue: "Authority" }),
        },
        {
            accessorKey: "link",
            header: "",
            cell: function (info) { return (<button_1.Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
          <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
            {t("table.view", { defaultValue: "View" })}
          </a>
        </button_1.Button>); },
        },
    ];
    return (<div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold">
        {t("title", { defaultValue: "Documents" })}
      </h1>

      {/* Filter Panel */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {t("filter.title", { defaultValue: "Filter Documents" })}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.country", { defaultValue: "Country" })}
            </label>
            <input type="text" value={country} onChange={function (e) { return setCountry(e.target.value); }} className="w-full border rounded px-3 py-2" placeholder="USA, Germany, etc."/>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.businessArea", { defaultValue: "Business Area" })}
            </label>
            <input type="text" value={businessArea} onChange={function (e) { return setBusinessArea(e.target.value); }} className="w-full border rounded px-3 py-2" placeholder="Finance, Technology, etc."/>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.type", { defaultValue: "Type" })}
            </label>
            <input type="text" value={docType} onChange={function (e) { return setDocType(e.target.value); }} className="w-full border rounded px-3 py-2" placeholder="PDF, Word, etc."/>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.authority", { defaultValue: "Authority" })}
            </label>
            <input type="text" value={authority} onChange={function (e) { return setAuthority(e.target.value); }} className="w-full border rounded px-3 py-2" placeholder="SEC, Ministry, etc."/>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.dateFrom", { defaultValue: "From" })}
            </label>
            <input type="date" value={dateFrom} onChange={function (e) { return setDateFrom(e.target.value); }} className="w-full border rounded px-3 py-2" max={today}/>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.dateTo", { defaultValue: "To" })}
            </label>
            <input type="date" value={dateTo} onChange={function (e) { return setDateTo(e.target.value); }} className="w-full border rounded px-3 py-2" max={today}/>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          <button_1.Button onClick={clearFilters} className="bg-gray-600 text-white hover:bg-gray-700 mt-2 cursor-pointer">
            {t("filter.clear", { defaultValue: "Clear Filters" })}
          </button_1.Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <data_table_1.DataTable columns={columns} data={currentDocs}/>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <data_table_pagination_1.DataTablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={function (page) { return setCurrentPage(page); }}/>
      </div>
    </div>);
}
