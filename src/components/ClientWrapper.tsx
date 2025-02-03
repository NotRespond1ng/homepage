'use client';

import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(() => import('./ParticlesBackground'), {
  ssr: false
});

export default function ClientWrapper() {
  return <ParticlesBackground />;
} 