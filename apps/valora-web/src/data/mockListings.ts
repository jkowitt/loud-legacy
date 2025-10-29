export interface MockListing {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
  beds: number;
  baths: number;
  sqft: number;
  price: string;
  estimate: string;
  confidence: string;
  capRate: string;
  lat: number;
  lng: number;
}

export const mockListings: MockListing[] = [
  {
    id: "val_01H7X",
    address: "123 Main St",
    city: "DeKalb",
    state: "IL",
    zip: "60115",
    photo: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    beds: 3,
    baths: 2,
    sqft: 1820,
    price: "$245,000",
    estimate: "$248,900",
    confidence: "0.82",
    capRate: "5.8%",
    lat: 41.9293,
    lng: -88.7504
  },
  {
    id: "val_01H7Y",
    address: "56 Birch Ln",
    city: "Naperville",
    state: "IL",
    zip: "60540",
    photo: "https://images.unsplash.com/photo-1570129476815-ba368ac77013?auto=format&fit=crop&w=1200&q=80",
    beds: 4,
    baths: 3,
    sqft: 2640,
    price: "$612,500",
    estimate: "$618,000",
    confidence: "0.88",
    capRate: "4.7%",
    lat: 41.7508,
    lng: -88.1535
  },
  {
    id: "val_01H8A",
    address: "861 W Armitage",
    city: "Chicago",
    state: "IL",
    zip: "60614",
    photo: "https://images.unsplash.com/photo-1600585154340-0ef3c08bf559?auto=format&fit=crop&w=1200&q=80",
    beds: 2,
    baths: 2,
    sqft: 1420,
    price: "$825,000",
    estimate: "$832,100",
    confidence: "0.90",
    capRate: "4.1%",
    lat: 41.9181,
    lng: -87.6516
  }
];
