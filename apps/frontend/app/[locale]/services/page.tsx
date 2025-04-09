"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import {
  FaBuilding,
  FaGavel,
  FaCreditCard,
  FaHome,
  FaTrademark,
  FaRobot,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/store/servicesSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

export default function Services() {
  const t = useTranslations("services");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const locale = useLocale();

  const { services, loading, error } = useSelector(
    (state: RootState) => state.services
  );
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  // Fetch services from Redux store on component mount
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchAllServices());
    }
  }, [dispatch, services.length]);

  const handleServiceSelect = (serviceType: string) => {
    // Redirect to detailed service page based on selected service type
    router.push(`/${locale}/services/${serviceType}`);
  };

  // Filter services based on selected group
  const filteredServices = selectedGroup
    ? services.filter(
        (service: any) => service.serviceTypeGroup.name === selectedGroup
      )
    : services;

  // Create groups (You might need to fetch groups separately or extract from the fetched data)
  const serviceGroups = [
    "Legal",
    "Finance",
    "Tech",
    "Real Estate",
    "Healthcare",
    "Entertainment",
    "Security",
    "Food",
    "Transportation",
    "Sports",
    "Manufacturing",
    "Tutoring",
    "Other",
  ];

  return (
    <main className="container mx-auto py-12 px-6 bg-primary text-secondary">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-secondary">{t("title")}</h1>
        <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
      </motion.section>

      {/* Filter Services by Group */}
      <div className="flex gap-4 mb-8">
        <Select
          label="Select Group"
          value={selectedGroup || ""}
          onValueChange={setSelectedGroup}
          placeholder="Select Service Group"
          className="max-w-[200px]"
        >
          <SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all">All Services</SelectItem>
              {serviceGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>

      {/* Services Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          filteredServices.length > 0 &&
          filteredServices.map((service: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleServiceSelect(service.serviceType)}
            >
              <div className="text-secondary-foreground text-5xl mb-4">
                {/* Replace with dynamic icon */}
                {service.icon || <FaBuilding />}
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </motion.div>
          ))}
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-gray-800">{t("ctaText")}</p>
        <button className="mt-4 px-6 py-3 bg-primary-foreground text-primary rounded-md hover:bg-blue-700 transition">
          {t("ctaButton")}
        </button>
      </motion.section>
    </main>
  );
}
