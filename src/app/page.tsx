"use client";

import dynamic from "next/dynamic";
import { useOnboardingStore } from "@/lib/store";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Footer } from "@/components/sections/Footer";

// Dynamically import the modal to avoid SSR issues
const OnboardingModal = dynamic(() => import("@/components/landing/OnboardingModal").then(mod => ({ default: mod.OnboardingModal })), {
  ssr: false,
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
