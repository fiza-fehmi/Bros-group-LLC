import ConsultancyPage from '@/components/consultancy/ConsultancyPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Strategic Consultancy | Muhammad Ali & Anus Ahmed Khan',
  description: 'Schedule a strategic consultancy booking session for Startup Scalability, AI Infrastructure, Tech Stack Advisory, and Marketing Strategy.'
};

export default function Page() {
  return <ConsultancyPage />;
}
