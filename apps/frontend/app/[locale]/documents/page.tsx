"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { FaFileAlt } from "react-icons/fa";

type Document = {
  id: number;
  title: string;
  country: string;
  businessArea: string;
  type: string;
  date: string;
  authority: string;
  summary: string;
  link: string;
  language: string;
};

// Mocked list of documents.
const mockDocuments: Document[] = [
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

export default function DocumentsPage() {
  const t = useTranslations("documents");

  // Filter state variables.
  const [country, setCountry] = useState("");
  const [businessArea, setBusinessArea] = useState("");
  const [docType, setDocType] = useState("");
  const [language, setLanguage] = useState("");
  const [authority, setAuthority] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Pagination state.
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Combined state for filtered documents.
  const [filteredDocs, setFilteredDocs] = useState<Document[]>(mockDocuments);

  // Get today's date to compare date filters
  const today = new Date().toISOString().split("T")[0];

  // Update filteredDocs when filters change.
  useEffect(() => {
    let filtered = [...mockDocuments];

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
      filtered = filtered.filter(
        (doc) => new Date(doc.date) >= new Date(dateFrom)
      );
    }

    if (dateTo) {
      filtered = filtered.filter(
        (doc) => new Date(doc.date) <= new Date(dateTo)
      );
    }

    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      alert("'From' date cannot be later than 'To' date.");
      return;
    }

    if (country) {
      filtered = filtered.filter((doc) =>
        doc.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (businessArea) {
      filtered = filtered.filter((doc) =>
        doc.businessArea.toLowerCase().includes(businessArea.toLowerCase())
      );
    }

    if (language) {
      filtered = filtered.filter((doc) =>
        doc.language.toLowerCase().includes(language.toLowerCase())
      );
    }

    if (docType) {
      filtered = filtered.filter((doc) =>
        doc.type.toLowerCase().includes(docType.toLowerCase())
      );
    }

    if (authority) {
      filtered = filtered.filter((doc) =>
        doc.authority.toLowerCase().includes(authority.toLowerCase())
      );
    }

    setFilteredDocs(filtered);
    setCurrentPage(1);
  }, [country, businessArea, docType, authority, dateFrom, dateTo]);

  // Pagination: calculate current page data.
  const totalPages = Math.ceil(filteredDocs.length / pageSize);
  const currentDocs = filteredDocs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const clearFilters = () => {
    setCountry("");
    setBusinessArea("");
    setDocType("");
    setAuthority("");
    setDateFrom("");
    setDateTo("");
  };

  // Define columns for the shadcn DataTable.
  const columns = [
    {
      accessorKey: "title",
      header: t("table.documentName", { defaultValue: "Document Name" }),
      cell: (info: any) => (
        <div className="flex items-center space-x-2">
          <FaFileAlt className="text-blue-500" />
          <span>{info.getValue()}</span>
        </div>
      ),
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
      cell: (info: any) => (
        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
          <a href={info.getValue()} target="_blank" rel="noopener noreferrer">
            {t("table.view", { defaultValue: "View" })}
          </a>
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
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
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="USA, Germany, etc."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.businessArea", { defaultValue: "Business Area" })}
            </label>
            <input
              type="text"
              value={businessArea}
              onChange={(e) => setBusinessArea(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Finance, Technology, etc."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.type", { defaultValue: "Type" })}
            </label>
            <input
              type="text"
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="PDF, Word, etc."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.authority", { defaultValue: "Authority" })}
            </label>
            <input
              type="text"
              value={authority}
              onChange={(e) => setAuthority(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="SEC, Ministry, etc."
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.dateFrom", { defaultValue: "From" })}
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full border rounded px-3 py-2"
              max={today}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              {t("filter.dateTo", { defaultValue: "To" })}
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              max={today}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          <Button
            onClick={clearFilters}
            className="bg-gray-600 text-white hover:bg-gray-700 mt-2 cursor-pointer"
          >
            {t("filter.clear", { defaultValue: "Clear Filters" })}
          </Button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <DataTable columns={columns} data={currentDocs} />
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
