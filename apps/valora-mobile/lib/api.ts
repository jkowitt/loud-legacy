const BASE_URL = process.env.EXPO_PUBLIC_GATEWAY_URL ?? "http://localhost:8000";

type ValuationResponse = {
  valuation_id: string;
  estimate: number;
  status: string;
};

const defaultAttributes = {
  class: "real_estate",
  attributes: {
    address: "123 Mobile Ave",
    city: "DeKalb",
    state: "IL",
    zip: "60115",
    bedrooms: 3,
    bathrooms: 2,
    living_area_sqft: 1680,
    lot_size_sqft: 5200,
    year_built: 2005
  }
};

export const createValuation = async () => {
  const response = await fetch(`${BASE_URL}/valuations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(defaultAttributes)
  });

  if (!response.ok) {
    throw new Error(`Valuation creation failed: ${response.status}`);
  }

  const payload: ValuationResponse = await response.json();
  if (!payload.valuation_id) {
    throw new Error("Gateway did not return a valuation identifier");
  }
  return payload.valuation_id;
};

export const uploadPropertyImages = async (valuationId: string, fileUri: string) => {
  const formData = new FormData();
  formData.append("image", {
    uri: fileUri,
    type: "image/jpeg",
    name: "property.jpg"
  } as any);

  const response = await fetch(`${BASE_URL}/valuations/${valuationId}/images`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status}`);
  }

  return response.json();
};
