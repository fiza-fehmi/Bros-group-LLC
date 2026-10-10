import AboutPage from '@/components/about/AboutPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | 2019–2026 Journey & Leadership Vision',
  description: 'Chronicle of Bros Group LLC evolution from 2019 to 2026, 1,800+ clients globally, and Founder & CEO Muhammad Ali vision.'
};

export default function Page() {
  return <AboutPage />;
}
