import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

import { mockListings } from "../data/mockListings";

const containerStyle: google.maps.MapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#0f1216" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0f1216" }] },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#1f2933" }]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#121c25" }]
    }
  ]
};

export const ValoraMap = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const center = useMemo(
    () => ({ lat: mockListings[0]?.lat ?? 41.85, lng: mockListings[0]?.lng ?? -87.65 }),
    []
  );

  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });

  if (loadError) {
    return <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-6 text-sm text-warning">Failed to load map.</div>;
  }

  if (!apiKey) {
    return (
      <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-6 text-sm text-neutral-400">
        Set <code>VITE_GOOGLE_MAPS_API_KEY</code> to render the interactive map.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="rounded-xl border border-brand-800/60 bg-brand-900/30 p-6 text-sm text-neutral-400">
        Loading map…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-800 shadow-hard">
      <GoogleMap
        center={center}
        zoom={9}
        mapContainerStyle={{ width: "100%", height: "380px" }}
        options={containerStyle}
      >
        {mockListings.map((listing) => (
          <MarkerF
            key={listing.id}
            position={{ lat: listing.lat, lng: listing.lng }}
            title={`${listing.address}, ${listing.city}`}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#88ffc7",
              fillOpacity: 0.9,
              strokeColor: "#0c0d0f",
              strokeWeight: 2
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};
/* global google */
