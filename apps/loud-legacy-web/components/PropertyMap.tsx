/// <reference types="@types/google.maps" />
"use client";

import { useEffect, useRef, useState } from 'react';

interface PropertyMapProps {
  address: string;
  propertyValue?: number;
  comparables?: Array<{
    address: string;
    salePrice: number;
    distance: string;
  }>;
}

export default function PropertyMap({ address, propertyValue, comparables }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [geocodedLocation, setGeocodedLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock geocoding function (simulates Google Geocoding API)
  const geocodeAddress = async (addr: string) => {
    // In production, use Google Geocoding API:
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addr)}&key=${API_KEY}`);

    // For demo purposes, generate mock coordinates based on address
    const hash = addr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      lat: 37.7749 + (hash % 100) / 1000, // San Francisco area
      lng: -122.4194 + (hash % 100) / 1000,
    };
  };

  // Load Google Maps script
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!API_KEY) {
      setError('Google Maps API key not configured. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.');
      return;
    }

    // Check if script already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    script.onerror = () => setError('Failed to load Google Maps');
    document.head.appendChild(script);

    return () => {
      // Cleanup handled by browser
    };
  }, []);

  // Initialize map when loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !address) return;

    const initMap = async () => {
      try {
        // Guard against google not being available
        if (typeof window === 'undefined' || !window.google || !window.google.maps) {
          setError('Google Maps is not loaded');
          return;
        }

        const location = await geocodeAddress(address);
        setGeocodedLocation(location);

        const map = new google.maps.Map(mapRef.current!, {
          center: location,
          zoom: 14,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add marker for main property
        const mainMarker = new google.maps.Marker({
          position: location,
          map,
          title: address,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(40, 40),
          },
          animation: google.maps.Animation.DROP,
        });

        // Info window for main property
        const mainInfoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Subject Property</h3>
              <p style="margin: 0 0 4px 0; font-size: 12px;">${address}</p>
              ${propertyValue ? `<p style="margin: 0; font-size: 12px; font-weight: 600; color: #3b82f6;">Value: $${propertyValue.toLocaleString()}</p>` : ''}
            </div>
          `,
        });

        mainMarker.addListener('click', () => {
          mainInfoWindow.open(map, mainMarker);
        });

        // Add markers for comparables
        if (comparables && comparables.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(location);

          comparables.forEach(async (comp, index) => {
            const compLocation = await geocodeAddress(comp.address);
            bounds.extend(compLocation);

            const compMarker = new google.maps.Marker({
              position: compLocation,
              map,
              title: comp.address,
              icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: new google.maps.Size(32, 32),
              },
              label: {
                text: `${index + 1}`,
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              },
            });

            const compInfoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">Comparable #${index + 1}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 12px;">${comp.address}</p>
                  <p style="margin: 0 0 2px 0; font-size: 12px;">Sale Price: <strong>$${comp.salePrice.toLocaleString()}</strong></p>
                  <p style="margin: 0; font-size: 11px; color: #64748b;">${comp.distance} away</p>
                </div>
              `,
            });

            compMarker.addListener('click', () => {
              compInfoWindow.open(map, compMarker);
            });
          });

          // Fit map to show all markers
          map.fitBounds(bounds);
        }
      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize map');
      }
    };

    initMap();
  }, [mapLoaded, address, propertyValue, comparables]);

  if (error && !process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div style={{
        padding: '2rem',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#856404' }}>
          🗺️ Google Maps Integration Ready
        </h3>
        <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#856404' }}>
          To enable maps, add your Google Maps API key to environment variables:
        </p>
        <code style={{
          display: 'block',
          padding: '0.5rem',
          background: 'white',
          borderRadius: '4px',
          fontSize: '0.75rem',
          marginBottom: '1rem'
        }}>
          NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
        </code>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#856404' }}>
          Get your API key at: <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer">Google Cloud Console</a>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '1.5rem',
        background: '#fee',
        border: '1px solid #fcc',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, color: '#c00', fontSize: '0.875rem' }}>
          {error}
        </p>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div style={{
        height: '400px',
        background: 'var(--bg-tertiary)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Loading map...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)'
        }}
      />
      {geocodedLocation && (
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          background: 'white',
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          fontSize: '0.75rem'
        }}>
          📍 {geocodedLocation.lat.toFixed(6)}, {geocodedLocation.lng.toFixed(6)}
        </div>
      )}
    </div>
  );
}

// TypeScript declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}
