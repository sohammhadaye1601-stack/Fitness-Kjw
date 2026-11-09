/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FitnessProvider } from './context/FitnessContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { MembershipSection } from './components/MembershipSection';
import { TrainersSection } from './components/TrainersSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TrialModal } from './components/TrialModal';
import { AdminModal } from './components/AdminModal';
import { MobileBottomBar } from './components/MobileBottomBar';

export default function App() {
  return (
    <FitnessProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
        {/* Top Announcement Offer Banner */}
        <AnnouncementBar />

        {/* Sticky 3-Zone Navigation Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero with full-width gym background image */}
          <Hero />

          {/* 2. About Fitness Point & Philosophy */}
          <AboutSection />

          {/* 3. Specialized Fitness Programs */}
          <ProgramsSection />

          {/* 4. Membership Plans with WhatsApp & Billing Toggle */}
          <MembershipSection />

          {/* 5. Certified Trainers Showcase */}
          <TrainersSection />

          {/* 6. Gym Interior & Equipment Gallery with Lightbox */}
          <GallerySection />

          {/* 7. Member Reviews & Transformation Stories */}
          <TestimonialsSection />

          {/* 8. Contact Us, Official Helpline, Maps & Enquiry Form */}
          <ContactSection />
        </main>

        {/* Official Quiet Footer */}
        <Footer />

        {/* Global Free Trial Modal */}
        <TrialModal />

        {/* Gym Owner CMS Dashboard Modal */}
        <AdminModal />

        {/* Sticky Bottom Call & WhatsApp conversion bar for mobile */}
        <MobileBottomBar />
      </div>
    </FitnessProvider>
  );
}
