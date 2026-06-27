import { useSearchParams } from "next/navigation";

export const useExperimental = () => {
  const query = useSearchParams();
  return query.has("experimental");
};
