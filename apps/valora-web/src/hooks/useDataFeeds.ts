import { useQuery } from "@tanstack/react-query";

import { dataFeedsApi } from "../lib/apiClient";

const fetcher = (path: string) => dataFeedsApi.get(path);

export const useInterestRates = () =>
  useQuery({
    queryKey: ["interest-rates"],
    queryFn: () => fetcher("/feeds/interest-rates"),
    staleTime: 5 * 60 * 1000
  });

export const useResidentialSales = () =>
  useQuery({
    queryKey: ["residential-sales"],
    queryFn: () => fetcher("/feeds/property-sales/residential"),
    staleTime: 10 * 60 * 1000
  });

export const useCommercialSales = () =>
  useQuery({
    queryKey: ["commercial-sales"],
    queryFn: () => fetcher("/feeds/property-sales/commercial"),
    staleTime: 10 * 60 * 1000
  });
