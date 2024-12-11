import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StoreStateI } from "../../store/reducers";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvent,
  useMap,
} from "react-leaflet";
import {
  GetMap,
  resetMap,
  setMapOnClickEventHandler,
  setPointerMarker,
  setYellowDotMarker,
} from "../../utils/getMap";
import { isServer } from "../../utils/isServer";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";
import MapInnerComponent from "./MapInnerComponent";
import L from "leaflet";

interface MapProps {
  isMapLoaded: boolean;
  onClick: (e: any) => void;
  latlng: [number, number];
  initialLatLng: [number, number];
  bounding: [number, number, number, number];
  key: number;
}

const renderMap = (
  latlng: [number, number],
  onClick: (e: any) => void,
  initialLatLng: [number, number],
  bounding: [number, number, number, number],
  key: number
) => {
  if (isServer()) {
    return <div>Map</div>;
  }

  const bounds = [
    [51.505, -0.09],
    [51.5, -0.06],
  ];
  // const bounds = L.latLngBounds(L.latLng(51.505, -0.09), L.latLng(51.5, -0.06));

  if (!isServer()) {
    return (
      <div>
        <MapContainer
          key={key}
          center={latlng[0] ? latlng : initialLatLng}
          zoom={12}
          // bounds={[
          //   [bounding[0], bounding[1]],
          //   [bounding[2], bounding[3]],
          // ]}
          // bounds={[latlng]}
          boundsOptions={{ padding: [1000, 1000] }}
          scrollWheelZoom={true}
          style={{ height: "80vh", width: "97vw" }}
        >
          {/* <Markers onClick={onClick} latlng={latlng} /> */}
          <TileLayer
            eventHandlers={{
              click: (e) => {
                onClick(e);
              },
            }}
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {latlng[0] && (
            <Marker
              position={latlng}
              icon={
                new Icon({
                  iconUrl:
                    "https://niftymarketing.com/wp-content/uploads/2015/09/map-marker-icon.png",
                  iconSize: [18, 28],
                  iconAnchor: [5, 21],
                })
              }
            ></Marker>
          )}
          {/* <MapConsumer>
            {(map: any) => {
              // console.log('map center:', map.getCenter());
              map.on("click", (e: any) => {
                onClick(e);
              });

              return null;
            }}
          </MapConsumer> */}
          <MapInnerComponent
            onClick={onClick}
            initialLatLng={initialLatLng}
            bounds={bounding}
            latlng={latlng}
          />
        </MapContainer>
      </div>
    );
  }

  return <div>Map</div>;
};

const Map: React.FC<MapProps> = ({
  isMapLoaded,
  latlng,
  onClick,
  initialLatLng,
  bounding,
  key,
}) => {
  const router = useRouter();
  useEffect(() => {
    if (isMapLoaded) {
      //   GetMap(85.32767705161245, 27.705308474955412);
      setMapOnClickEventHandler();
    }
    setYellowDotMarker(85.323323, 27.3224234);
  }, []);

  return (
    <div>
      {renderMap(latlng, onClick, initialLatLng, bounding, key)}

      <div
        className="hidden"
        id="myMap"
        style={{
          width: "600px",
          height: "500px",
          border: "2px solid black",
        }}
      ></div>
    </div>
  );
};

const mapStateToProps = (state: StoreStateI, _: any) => {
  return { isMapLoaded: state.mapLoadedForm.isMapLoaded };
};

export default connect(mapStateToProps, {})(Map) as any;
