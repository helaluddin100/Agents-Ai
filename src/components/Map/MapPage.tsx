import { useEffect, useState } from "react";
import Map from "./Map";
import Geocode from "react-geocode";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";
import Searchform from "./Searchform";

interface mapProps {}

let latitudeAndLongitudeActual: {
  latitude: number | null;
  longitude: number | null;
} = {
  latitude: null,
  longitude: null,
};

const MapPage: React.FC<mapProps> = ({}) => {
  const [latitudeAndLongitude, setLatitudeAndLongitude] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const [initialLatitudeAndLongitude, setInitialLatitudeAndLongitude] =
    useState<{
      latitude: number | null;
      longitude: number | null;
    }>({
      latitude: 27.705308474955412,
      longitude: 85.323323,
    });

  const [bounding, setBounding] = useState([]);
  const [key, setKey] = useState(0);

  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  // const geocodeCallback = (address: string) => {
  //   console.log(address);
  //   setAddress(address);
  // };

  const getCoordinates = async (address: string) => {
    setLoading(true);
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
    );
    console.log(response.data);
    setLatitudeAndLongitude({
      latitude: response.data[0].lat,
      longitude: response.data[0].lon,
    });
    setBounding(response.data[0].boundingbox);
    setKey(key + 1);
    setLoading(false);
  };

  const getAddress = async (latitude: string, longitude: string) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lon=${longitude}&lat=${latitude}&format=json`
    );
    console.log(response.data.display_name);
    if (response.data) {
      if (response.data.display_name) {
        setAddress(response.data.display_name);
      } else {
        setAddress("An error occured while getting the address");
      }
    } else {
      setAddress("An erorr occured while getting the address");
    }

    // setAddress
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude, position.coords.longitude);
        setLatitudeAndLongitude({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        latitudeAndLongitudeActual = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setInitialLatitudeAndLongitude({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        getAddress(
          position.coords.latitude.toString(),
          position.coords.longitude.toString()
        );

        // Geocode.setApiKey("AIzaSyA1eL5WysMmFb7if7R2HmUUC5PPva7vkvo");
        // Geocode.setLanguage("en");
        // Geocode.fromLatLng(
        //   position.coords.latitude.toString(),
        //   position.coords.longitude.toString()
        // ).then(
        //   (response) => {
        //     geocodeCallback(response.results[0].formatted_address);
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );
      });
    }
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between mt-4">
        {
          //@ts-ignore
        }
        <Map
          initialLatLng={[
            initialLatitudeAndLongitude.latitude,
            initialLatitudeAndLongitude.longitude,
          ]}
          latlng={[
            latitudeAndLongitude.latitude,
            latitudeAndLongitude.longitude,
          ]}
          bounding={bounding}
          onClick={(e: any) => {
            latitudeAndLongitudeActual = {
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            };
            setLatitudeAndLongitude({
              latitude: e.latlng.lat,
              longitude: e.latlng.lng,
            });
            // setAddress(null);
            getAddress(e.latlng.lat, e.latlng.lng);
            console.log(latitudeAndLongitudeActual);
          }}
        />
      </div>
      <div className="mt-8">
        <Searchform initialAddress={address} getCoordinates={getCoordinates} />
      </div>
    </div>
  );
};

export default MapPage;
