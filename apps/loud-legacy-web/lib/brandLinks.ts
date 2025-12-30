export type BrandKey = "valora" | "venuevr" | "business" | "diy";

const defaults: Record<BrandKey, string> = {
  valora: "/valora",
  venuevr: "/venuevr",
  business: "/business-now",
  diy: "/diy",
};

export function brandUrl(key: BrandKey): string {
  switch (key) {
    case "valora":
      return (
        process.env.NEXT_PUBLIC_VALORA_URL?.trim() || defaults.valora
      );
    case "venuevr":
      return (
        process.env.NEXT_PUBLIC_VENUEVR_URL?.trim() || defaults.venuevr
      );
    case "business":
      return (
        process.env.NEXT_PUBLIC_BUSINESS_URL?.trim() || defaults.business
      );
    case "diy":
      return process.env.NEXT_PUBLIC_DIY_URL?.trim() || defaults.diy;
    default:
      return "/";
  }
}

