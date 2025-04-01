"use client";
import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  useWatch,
  useFieldArray,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  serviceCategories,
  countryToTimezone,
  currencies,
} from "@/lib/options";
import { ServiceFormData } from "@/types/types";

const MAX_PACKAGES = 3;

const UploadServiceWizard: React.FC = () => {
  const t = useTranslations("dashboard.services");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    defaultValues: {
      packages: [{ name: "", description: "", price: 0, conditions: "" }],
    },
  });

  // Manage dynamic package fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages",
  });

  // Watch the selected category to filter service types.
  const selectedCategory = useWatch({ control, name: "category" });
  const currentServiceTypes =
    serviceCategories.find((cat) => cat.value === selectedCategory)
      ?.serviceTypes || [];

  // Sorted options (if desired)
  const sortedCategories = [...serviceCategories].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const sortedCountries = Object.keys(countryToTimezone).sort((a, b) =>
    a.localeCompare(b)
  );
  const sortedCurrencies = [...currencies].sort((a, b) =>
    a.label.localeCompare(b.label)
  );
  const sortedServiceTypes = [...currentServiceTypes].sort((a, b) =>
    a.labelKey.localeCompare(b.labelKey)
  );

  const [step, setStep] = useState(1);
  const [collectedData, setCollectedData] = useState<ServiceFormData | null>(
    null
  );

  const onSubmit: SubmitHandler<ServiceFormData> = (data) => {
    if (step < 3) {
      setCollectedData(data);
      setStep(step + 1);
    } else {
      // Final submission logic (e.g., API call)
      console.log("Submitting final data:", data);
      reset();
      setStep(1);
    }
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="mx-auto p-6 bg-card text-card-foreground rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{t("uploadServiceTitle")}</h2>

      {/* Tabs header */}
      <div className="flex space-x-4 mb-6 border-b border-border">
        <div
          className={`py-2 px-4 cursor-pointer ${
            step === 1
              ? "border-b-2 border-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("step1Title")}
        </div>
        <div
          className={`py-2 px-4 cursor-pointer ${
            step === 2
              ? "border-b-2 border-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("step2Title")}
        </div>
        <div
          className={`py-2 px-4 cursor-pointer ${
            step === 3
              ? "border-b-2 border-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("step3Title")}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("serviceDetails")}
            </h3>
            <div className="mb-4">
              <label className="block mb-1">{t("title")}</label>
              <input
                {...register("title", { required: t("titleRequired") })}
                className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                placeholder={t("titlePlaceholder")}
              />
              {errors.title && (
                <span className="text-destructive">{errors.title.message}</span>
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-1">{t("description")}</label>
              <textarea
                {...register("description", {
                  required: t("descriptionRequired"),
                })}
                className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                placeholder={t("descriptionPlaceholder")}
              />
              {errors.description && (
                <span className="text-destructive">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t("category")}</label>
                <select
                  {...register("category", { required: t("categoryRequired") })}
                  className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                >
                  <option value="">{t("categoryPlaceholder")}</option>
                  {sortedCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-destructive">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1">{t("country")}</label>
                <select
                  {...register("country", { required: t("countryRequired") })}
                  className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                >
                  <option value="">{t("countryPlaceholder")}</option>
                  {sortedCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <span className="text-destructive">
                    {errors.country.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">{t("serviceType")}</label>
              <select
                {...register("serviceType", {
                  required: t("serviceTypeRequired"),
                })}
                className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
              >
                <option value="">{t("selectType")}</option>
                {sortedServiceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {t(type.labelKey)}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <span className="text-destructive">
                  {errors.serviceType.message}
                </span>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("pricingAndPackages")}
            </h3>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t("fixedPriceOptional")}</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price")}
                  className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                  placeholder={t("pricePlaceholder")}
                />
                {errors.price && (
                  <span className="text-destructive">
                    {errors.price.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1">
                  {t("currency") || "Currency"}
                </label>
                <select
                  {...register("currency", {
                    required: "Currency is required",
                  })}
                  className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                >
                  <option value="">Select a currency</option>
                  {sortedCurrencies.map((cur) => (
                    <option key={cur.value} value={cur.value}>
                      {cur.label} ({cur.symbol})
                    </option>
                  ))}
                </select>
                {errors.currency && (
                  <span className="text-destructive">
                    {errors.currency.message}
                  </span>
                )}
              </div>
            </div>

            {/* Package fields */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">{t("packageDetails")}</h4>
              {fields.map((field, index) => (
                <div key={field.id} className="border p-4 rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      {t("package")} {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-destructive text-sm"
                    >
                      {t("removePackage") || "Remove"}
                    </button>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">{t("packageName")}</label>
                    <input
                      {...register(`packages.${index}.name` as const, {
                        required: t("packageNameRequired"),
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                      placeholder={t("packageNamePlaceholder")}
                    />
                    {errors.packages && errors.packages[index]?.name && (
                      <span className="text-destructive">
                        {errors.packages[index]?.name?.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">
                      {t("packageDescription")}
                    </label>
                    <textarea
                      {...register(`packages.${index}.description` as const)}
                      className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                      placeholder={t("packageDescriptionPlaceholder")}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">{t("packagePrice")}</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register(`packages.${index}.price` as const, {
                        required: t("packagePriceRequired"),
                      })}
                      className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                      placeholder={t("packagePricePlaceholder")}
                    />
                    {errors.packages && errors.packages[index]?.price && (
                      <span className="text-destructive">
                        {errors.packages[index]?.price?.message}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">{t("conditions")}</label>
                    <textarea
                      {...register(`packages.${index}.conditions` as const)}
                      className="w-full px-3 py-2 border rounded-md bg-input text-foreground"
                      placeholder={t("conditionsPlaceholder")}
                    />
                  </div>
                </div>
              ))}
              {fields.length < MAX_PACKAGES && (
                <button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      description: "",
                      price: 0,
                      conditions: "",
                    })
                  }
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md"
                >
                  {t("addPackage") || "Add Package"}
                </button>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {t("reviewAndSubmit")}
            </h3>
            <div className="mb-4">
              <p>{t("reviewPrompt")}</p>
              {/* Optionally display a summary of the data collected from previous steps */}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={previousStep}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md"
            >
              {t("back")}
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md"
          >
            {step === 3 ? t("submitService") : t("next")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadServiceWizard;
