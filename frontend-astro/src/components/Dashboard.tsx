import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getHoroscopeBySignCode } from "../services/horoscopeService";
import LoaderComponent from "./LoaderComponent";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [horoscope, setHoroscope] = useState<{
    daily: string | null;
    weekly: string | null;
    monthly: string | null;
  }>({ daily: null, weekly: null, monthly: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      if (auth?.user?.zodiacSignCode) {
        try {
          const horoscope = await getHoroscopeBySignCode(
            auth.user.zodiacSignCode
          );
          setHoroscope(horoscope);
        } catch (error) {
          setError("Failed to fetch horoscope prediction.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHoroscope();
  }, [auth?.user?.zodiacSignCode]);

  if (loading) {
    return <LoaderComponent />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard - Private</h1>
      {horoscope.daily && (
        <div>
          <h2>Daily Prediction</h2>
          <p>{horoscope.daily}</p>
        </div>
      )}
      {horoscope.weekly && (
        <div>
          <h2>Weekly Prediction</h2>
          <p>{horoscope.weekly}</p>
        </div>
      )}
      {horoscope.monthly && (
        <div>
          <h2>Monthly Prediction</h2>
          <p>{horoscope.monthly}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
