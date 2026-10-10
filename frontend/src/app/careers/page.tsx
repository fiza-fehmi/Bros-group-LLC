import CareersPage from '@/components/careers/CareersPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers & Job Portal | Join Bros Group LLC',
  description: 'Explore open engineering, design, and growth roles at Bros Group LLC and apply directly with your resume.'
};

export default function Page() {
  return <CareersPage />;
}
