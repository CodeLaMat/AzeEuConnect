"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const serviceType = searchParams.get("serviceType");
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );

  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);

  // Fetch services if not already loaded
  useEffect(() => {
    if (serviceType && services.length === 0) {
      dispatch(fetchAllServices());
    }
  }, [dispatch, serviceType, services.length]);

  useEffect(() => {
    if (serviceType) {
      const filtered = services.filter(
        (service: any) => service.serviceType === serviceType
      );
      setFilteredServices(filtered);
    }
  }, [serviceType, services]);

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value));
  };

  useEffect(() => {
    // Apply the price filter immediately when minPrice changes
    const filtered = services.filter((service: any) => {
      return service.price >= minPrice;
    });
    setFilteredServices(filtered);
  }, [minPrice, services]); // This effect depends on both `minPrice` and `services`

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">Service Details: {serviceType}</h2>

      {/* Price Filter */}
      <div className="flex items-center gap-2">
        <label htmlFor="minPrice" className="text-lg">
          Min Price:
        </label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handlePriceFilterChange}
          className="border p-2 rounded"
          placeholder="0"
        />
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          filteredServices.map((service: any) => (
            <Card key={service.id} className="w-full">
              <CardHeader>
                <img
                  src={service.image || "/default-image.jpg"}
                  alt={service.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-xl font-bold">${service.price}</span>
                <Button
                  variant="default"
                  onClick={() =>
                    router.push(
                      `/${locale}/services/${service.serviceType}/details/${service.id}`
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
