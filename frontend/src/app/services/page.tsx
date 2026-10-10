import ServicesPage from '@/components/services/ServicesPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services Catalog | Full-Stack IT, AI Agents & Advisory',
  description: 'Explore Bros Group LLC service offerings: Custom Software, AI Agents, Digital Marketing, UI/UX Design, and Cloud Infrastructure.'
};

export default function Page() {
  return <ServicesPage />;
}
