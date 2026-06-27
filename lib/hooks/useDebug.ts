import { useSearchParams } from "next/navigation";

export const useDebug = () => {
  const query = useSearchParams();
  return query.has("debug");
};
