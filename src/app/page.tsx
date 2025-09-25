"use client";

import dynamic from "next/dynamic";
import { useOnboardingStore } from "@/lib/store";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
// import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Footer } from "@/components/sections/Footer";

// Dynamically import components to avoid SSR issues
const OnboardingModal = dynamic(() => import("@/components/landing/OnboardingModal").then(mod => ({ default: mod.OnboardingModal })), {
  ssr: false,
});

const Pricing = dynamic(() => import("@/components/sections/Pricing").then(mod => ({ default: mod.Pricing })), {
  ssr: false,
  loading: () => (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto"></div>
        </div>
        <div className="text-center">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8 max-w-xs mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading pricing information...</p>
        </div>
      </div>
    </section>
  ),
});

export default function Home() {
  const { isModalOpen, selectedService, openModal, closeModal } = useOnboardingStore();

  const handleGetStarted = (serviceType: string) => {
    openModal(serviceType);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero onGetStarted={() => handleGetStarted('landing_page')} />
        <Features />
        <Pricing onGetStarted={handleGetStarted} />
        <Process />
      </main>
      <Footer />

      <OnboardingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedService={selectedService}
      />
    </div>
  );
}
