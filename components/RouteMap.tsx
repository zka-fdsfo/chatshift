'use client';

import { GoogleMap, LoadScriptNext, Marker, Polyline } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';

type RoutePoint = {
  lat: number;
  lng: number;
  accuracy?: number;
  speed?: number;
  timestamp?: number;
};

export default function RouteMap({ route }: { route: RoutePoint[] }) {
  const [googleObj, setGoogleObj] = useState<any>(null);

  useEffect(() => {
    console.log("------------- Route:", route);
  }, [route]);

  if (!route || !Array.isArray(route) || route.length === 0) {
    return <p>No route data available</p>;
  }

  const start = route[0];
  const end = route[route.length - 1];

  const fitBounds = (map: any) => {
    if (!googleObj || !route?.length) return;

    const bounds = new googleObj.maps.LatLngBounds();

    route.forEach((point) => bounds.extend(point));

    map.fitBounds(bounds);
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={['geometry']}
      onLoad={() => setGoogleObj((window as any).google)}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        center={start}
        zoom={13} 
        onLoad={(map) => {
          if (googleObj) fitBounds(map);
        }}
      >

        {/* START Marker */}
        {googleObj && (
          <Marker
            position={start}
            label={{
              text: "S",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              scaledSize: new googleObj.maps.Size(40, 40),
              labelOrigin: new googleObj.maps.Point(20, 14),
            }}
          />
        )}

        {/* END Marker */}
        {googleObj && (
          <Marker
            position={end}
            label={{
              text: "E",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new googleObj.maps.Size(40, 40),
              labelOrigin: new googleObj.maps.Point(20, 14),
            }}
          />
        )}

        {/* Route Polyline */}
        {googleObj && googleObj.maps && (
          <Polyline
            path={route}
            options={{
              strokeColor: "#000000",
              strokeWeight: 3.5,
              strokeOpacity: 1,
            }}
          />
        )}

      </GoogleMap>
    </LoadScriptNext>
  );
}
