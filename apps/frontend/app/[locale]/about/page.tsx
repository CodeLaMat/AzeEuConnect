"use client";

import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("about");

  return (
    <main className="container mx-auto py-10 px-6 text-gray-900">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary">{t("title")}</h1>
        <p className="mt-4 text-lg text-gray-600">{t("description")}</p>
      </section>

      {/* Our Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-accent 0">
          {t("mission.title")}
        </h2>
        <p className="mt-2 text-gray-700">{t("mission.description")}</p>
      </section>

      {/* Our Values */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-accent">
          {t("values.title")}
        </h2>
        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700">
          <li>{t("values.integrity")}</li>
          <li>{t("values.transparency")}</li>
          <li>{t("values.innovation")}</li>
          <li>{t("values.customerFocus")}</li>
        </ul>
      </section>

      {/* Meet the Team */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-accent">
          {t("team.title")}
        </h2>
        <p className="mt-2 text-secondary">{t("team.description")}</p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            {
              name: "John Doe",
              position: t("team.ceo"),
              image: "/team/john.jpg",
            },
            {
              name: "Emma Smith",
              position: t("team.cfo"),
              image: "/team/emma.jpg",
            },
            {
              name: "Alex Johnson",
              position: t("team.cto"),
              image: "/team/alex.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <p className="text-lg text-gray-800">{t("ctaText")}</p>
        <button className="mt-4 px-6 py-3 bg-primary-foreground text-primary rounded-md hover:bg-blue-700 transition">
          {t("ctaButton")}
        </button>
      </section>
    </main>
  );
}
