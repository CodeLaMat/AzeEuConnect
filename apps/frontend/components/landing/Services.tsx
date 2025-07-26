'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useServiceCategories } from '../../lib/options';




const Services: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'az';

  // Get all categories dynamically, already localized and ready
  const categories = useServiceCategories(currentLocale);

  console.log('Service Categories:', categories);

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            {t('services.title')}
            <span className="block text-primary-600">{t('services.subtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.value}
                href={service.href}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {service.providers}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-1">
                    {Array.isArray(service.features) ? service.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    )) : null}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-primary-600 hover:text-primary-700 font-medium text-sm group-hover:underline transition-all">
                      {t('services.browseProviders')} →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {t("Can't find what you're looking for?")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`/${currentLocale}/services`} className="btn-primary">
              {t("Browse All Services")}
            </Link>
            <Link href={`/${currentLocale}/request-service`} className="btn-secondary">
              {t('services.requestCustom')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
