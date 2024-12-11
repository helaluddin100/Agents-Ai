import React, { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface SearchformProps {
  initialAddress: string | null;
  getCoordinates: (address: string) => void;
}

const Searchform: React.FC<SearchformProps> = ({
  initialAddress,
  getCoordinates,
}) => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setAddress(initialAddress);
  }, [initialAddress]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (address) {
          getCoordinates(address as string);
        }
      }}
    >
      {address === null ? (
        <LoadingSpinner />
      ) : (
        <input
          className="text-center w-full border border-black p-2"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        ></input>
      )}
    </form>
  );
};

export default Searchform;
