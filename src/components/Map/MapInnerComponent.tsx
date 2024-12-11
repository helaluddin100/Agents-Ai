import React, { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";

interface MapInnerComponentProps {
  onClick: (e: any) => void;
  initialLatLng: [number, number];
  bounds: [number, number, number, number];
  latlng: [number, number];
}

const MapInnerComponent: React.FC<MapInnerComponentProps> = ({
  onClick,
  initialLatLng,
  bounds,
  latlng,
}) => {
  const mapEvents = useMapEvents({
    click: (e) => {
      onClick(e);
    },
  });
  const map = useMap();

  // useEffect(() => {
  //   map.fitBounds([initialLatLng]);
  //   map.zoomOut(4);
  // }, [initialLatLng]);

  useEffect(() => {
    if (bounds[0] && bounds[1] && bounds[2] && bounds[3]) {
      map.fitBounds([
        [bounds[0], bounds[2]],
        [bounds[1], bounds[3]],
      ]);
      // map.zoomOut(6);
    } else {
      map.fitBounds([initialLatLng]);
      map.zoomOut(5);
    }
  }, [bounds]);

  useEffect(() => {
    if (latlng[0] && latlng[1]) {
      map.flyTo(latlng);
    }
  }, [latlng]);

  return null;
};

export default MapInnerComponent;
