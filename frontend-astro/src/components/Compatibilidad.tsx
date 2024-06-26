import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getCompatibilitiesBySign } from "../services/compatibilityService";
import LoaderComponent from "./LoaderComponent";

const Compatibilidad: React.FC = () => {
  const auth = useContext(AuthContext);
  const [compatibilities, setCompatibilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchCompatibilities = async () => {
      if (auth?.user?.zodiacSignCode) {
        try {
          const data = await getCompatibilitiesBySign(
            auth.user.zodiacSignCode,
            page,
            pageSize
          );
          setCompatibilities(data.list);
        } catch (error) {
          setError("Failed to fetch compatibilities.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompatibilities();
  }, [auth?.user?.zodiacSignCode, page, pageSize]);

  if (loading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Compatibilidad</h1>
      {compatibilities.length > 0 ? (
        <ul>
          {compatibilities.map((compatibility) => (
            <li key={compatibility._id}>
              <p>Signo 1: {compatibility.sign1}</p>
              <p>Signo 2: {compatibility.sign2}</p>
              <p>Amor: {compatibility.love}</p>
              <p>Amistad: {compatibility.friendship}</p>
              <p>Negocios: {compatibility.business}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No compatibilities found.</p>
      )}
      {/* Pagination buttons */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={compatibilities.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Compatibilidad;
