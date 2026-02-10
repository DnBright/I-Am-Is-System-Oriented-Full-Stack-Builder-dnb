import Hero from '@/components/sections/Hero';
import LiveActivityPreview from '@/components/sections/LiveActivityPreview';
import AnalyticsSummary from '@/components/sections/AnalyticsSummary';
import ProjectsShowcase from '@/components/sections/ProjectsShowcase';
import CallToAction from '@/components/sections/CallToAction';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveActivityPreview />
      <AnalyticsSummary />
      <ProjectsShowcase />
      <CallToAction />
    </>
  );
}
