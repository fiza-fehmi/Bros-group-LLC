import TeamPage from '@/components/team/TeamPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team & Leadership | Bros Group LLC Hierarchy',
  description: 'Meet Bros Group LLC executive leadership Muhammad Ali, Anus Ahmed Khan, and department leads.'
};

export default function Page() {
  return <TeamPage />;
}
