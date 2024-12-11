import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export const useFetch = (url: string) => {
  const [data, setData] = useState<null | any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(API_URL + "/api" + url);
        const json = await res.json();

        setData(json.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
};
