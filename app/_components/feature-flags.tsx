"use client";

import { Suspense } from "react";
import type { ReactNode } from "react";
import { useDebug } from "~/lib/hooks/useDebug";
import { useExperimental } from "~/lib/hooks/useExperimental";

const Debug = ({ children }: { readonly children: ReactNode }) => {
  const debug = useDebug();
  if (!debug) return null;

  return <>{children}</>;
};

const DebugSuspense = ({ children }: { readonly children: ReactNode }) => (
  <Suspense fallback={null}>
    <Debug>{children}</Debug>
  </Suspense>
);

export { DebugSuspense as Debug };

const Experimental = ({ children }: { readonly children: ReactNode }) => {
  const experimental = useExperimental();
  if (!experimental) return null;

  return <>{children}</>;
};

const ExperimentalSuspense = ({
  children,
}: {
  readonly children: ReactNode;
}) => (
  <Suspense fallback={null}>
    <Experimental>{children}</Experimental>
  </Suspense>
);

export { ExperimentalSuspense as Experimental };
