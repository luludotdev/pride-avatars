import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useDebug = () => {
  const query = useSearchParams();
  return useMemo<boolean>(() => query?.has("debug") ?? false, [query]);
};
