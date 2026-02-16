import Hero from '@/components/sections/Hero';
import LiveActivityPreview from '@/components/sections/LiveActivityPreview';
import AnalyticsSummary from '@/components/sections/AnalyticsSummary';
import ProjectsShowcase from '@/components/sections/ProjectsShowcase';
import CallToAction from '@/components/sections/CallToAction';
import ProjectIntro from '@/components/sections/ProjectIntro';
import BioSection from '@/components/sections/BioSection';

export default function Home() {
  return (
    <>
      <Hero />
      <BioSection />
      <ProjectIntro />
      <ProjectsShowcase />
      <LiveActivityPreview />
      <AnalyticsSummary />
      <CallToAction />
    </>
  );
}
