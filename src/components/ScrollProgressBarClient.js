"use client";

import dynamic from 'next/dynamic';

const ScrollProgressBar = dynamic(() => import('./ScrollProgressBar'), {
  ssr: false
});

export default function ClientScrollProgressBar() {
  return <ScrollProgressBar />;
}