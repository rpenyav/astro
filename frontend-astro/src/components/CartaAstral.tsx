import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { fetchAstroCharts } from "../services/astroChartService";
import LoaderComponent from "./LoaderComponent";

const CartaAstral: React.FC = () => {
  const auth = useContext(AuthContext);
  const [astroCharts, setAstroCharts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    const loadAstroCharts = async () => {
      if (auth?.user?.id) {
        try {
          const data = await fetchAstroCharts(auth.user.id, page, pageSize);
          setAstroCharts(data.list);
        } catch (error) {
          setError("Failed to fetch astro charts.");
        } finally {
          setLoading(false);
        }
      }
    };

    loadAstroCharts();
  }, [auth?.user?.id, page, pageSize]);
  console.log("auth?.user?.id", auth?.user?.id);
  if (loading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Carta Astral</h1>
      {astroCharts.length > 0 ? (
        <ul>
          {astroCharts.map((chart) => (
            <li key={chart._id}>
              <p>Date of Birth: {chart.dateOfBirth}</p>
              <p>Time of Birth: {chart.timeOfBirth}</p>
              <p>Place of Birth: {chart.placeOfBirth}</p>
              {/* Muestra más detalles de la carta astral según sea necesario */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No astro charts found.</p>
      )}
      {/* Agregar botones para paginación */}
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={astroCharts.length < pageSize}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CartaAstral;
