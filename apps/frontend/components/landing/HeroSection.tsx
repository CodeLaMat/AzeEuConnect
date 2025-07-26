"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Link from 'next/link';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';


interface Stat {
  label: string;
  value: string;
}

export default function HeroSection() {
  const t = useTranslations();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
    const locale = useLocale();
  

  const stats: Stat[] = [
    { label: t('hero.stats.activeUsers'), value: '10K+' },
    { label: t('hero.stats.serviceProviders'), value: '500+' },
    { label: t('hero.stats.euCountries'), value: '15+' },
    { label: t('hero.stats.successRate'), value: '98%' },
  ];


  return (
    <section className=" min-h-screen flex items-center justify-center overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 hero-gradient"></div>
    <div className="absolute inset-0 bg-black/20"></div>
    
    {/* Animated Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
    </div>

    <div className="relative z-10 container-max section-padding text-center">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
          Connecting Azerbaijanis Across Europe
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-slide-up">
          {t('hero.title')}
          <span className="block bg-gradient-to-r from-accent-500 to-yellow-300 bg-clip-text text-transparent">
            {t('hero.subtitle')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link href={`/${locale}/signup`} className="btn-accent text-lg px-8 py-4 group">
            {t('hero.startJourney')}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <button
            onClick={() => setIsVideoOpen(true)}
            className="flex items-center space-x-2 text-white hover:text-accent-300 transition-colors group"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <PlayIcon className="w-5 h-5 ml-0.5" />
            </div>
            <span className="font-medium">{t('hero.watchDemo')}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/70 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Video Modal */}
    {isVideoOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="relative max-w-4xl w-full mx-4">

          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <PlayIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Demo video coming soon...</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )}
  </section>
  );
}
