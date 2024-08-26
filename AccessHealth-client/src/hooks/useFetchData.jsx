import React, { useEffect, useState } from "react";

const useFetchData = (url, trigger) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setToken(tkn);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // Hanya fetch data jika token tersedia

      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.errors);
        }

        setData(result.data);
      } catch (error) {
        setErrors(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, trigger, token]); // Menambahkan token ke dependency array

  return { data, loading, errors };
};

export default useFetchData;
