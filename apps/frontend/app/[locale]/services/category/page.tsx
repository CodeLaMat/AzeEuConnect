"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllServices } from "@/store/servicesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useLocale } from "next-intl";

export default function ServiceDetailPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );

  const [minPrice, setMinPrice] = useState<number>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  useEffect(() => {
    const filtered = services
      .filter((s: any) => s.category === category?.toUpperCase())
      .filter((s: any) =>
        selectedSubCategory ? s.subCategory === selectedSubCategory : true
      )
      .filter((s: any) => s.price >= minPrice);

    setFilteredServices(filtered);
  }, [selectedSubCategory, minPrice, category, services]);

  useEffect(() => {
    if (!loading && category) {
      const normalizedCategory = category.toUpperCase();

      const categoryServices = services.filter(
        (service: any) => service.category === normalizedCategory
      );

      const uniqueSubCategories = Array.from(
        new Set(categoryServices.map((s: any) => s.subCategory))
      );

      setSubCategories(uniqueSubCategories);
    }
  }, [loading, category, services]);

  console.log("Subcategories:", subCategories);
  console.log("Filtered Services:", filteredServices);
  console.log("Selected Category:", category);

  const formatTitle = (key: string) =>
    key
      .split("_")
      .map((w) => w[0] + w.slice(1).toLowerCase())
      .join(" ");

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">
        Services in: {category ? formatTitle(category) : "All"}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="minPrice" className="text-lg mr-2">
            Min Price:
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border p-2 rounded"
            placeholder="0"
          />
        </div>

        <div>
          <label htmlFor="subCategory" className="text-lg mr-2">
            Subcategory:
          </label>
          <select
            id="subCategory"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All</option>
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {formatTitle(sub)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          filteredServices.map((service: any) => (
            <Card key={service.id} className="w-full">
              <CardHeader>
                <img
                  src={
                    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">€{service.price}</span>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push(
                      `/${locale}/services/${service.subCategory}/details/${service.id}`
                    )
                  }
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
