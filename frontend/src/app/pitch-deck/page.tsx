import PitchDeckPage from '@/components/pitch-deck/PitchDeckPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Startup Pitch Deck | Technical Partnership & Advisory',
  description: 'Submit business proposals, pitch decks, and startup ideas to Bros Group LLC evaluation committee.'
};

export default function Page() {
  return <PitchDeckPage />;
}
