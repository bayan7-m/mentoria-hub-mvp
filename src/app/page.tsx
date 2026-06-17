'use client';

import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';

export default function HomePage() {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <FeaturesSection />
    </div>
  );
}
