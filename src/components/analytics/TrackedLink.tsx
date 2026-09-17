'use client';

import Link from 'next/link';
import type React from 'react';
import { type AnalyticsEvent, track, trackOnce } from '@/lib/analytics';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean | undefined | null>;
  onceKey?: string;
};

export default function TrackedLink({ href, children, event, params, onceKey, ...props }: Props) {
  const onClick = () => {
    if (onceKey) trackOnce(onceKey, event, params);
    else track(event, params);
  };

  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link href={href} onClick={onClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
}
