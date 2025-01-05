import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useExperimental = () => {
  const query = useSearchParams();
  return useMemo<boolean>(() => query?.has("experimental") ?? false, [query]);
};
