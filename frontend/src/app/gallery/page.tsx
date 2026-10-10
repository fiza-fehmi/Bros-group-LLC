import GalleryPage from '@/components/gallery/GalleryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Official Event Gallery | MoU Signings, Expos & Summits',
  description: 'View photos and milestone highlights from Bros Group LLC MoU signings, INDUS AI WEEK, and Global Summits.'
};

export default function Page() {
  return <GalleryPage />;
}
