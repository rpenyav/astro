import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getHoroscopeBySign } from "../services/horoscopeService";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [horoscopeData, setHoroscopeData] = useState<{
    daily: string;
    weekly: string;
    monthly: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      if (auth?.user?.zodiacSign) {
        try {
          const data = await getHoroscopeBySign(auth.user.zodiacSign);
          setHoroscopeData({
            daily: data.daily,
            weekly: data.weekly,
            monthly: data.monthly,
          });
        } catch (error) {
          setError("Failed to fetch horoscope prediction.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [auth?.user?.zodiacSign]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Dashboard - Private</h1>
      {horoscopeData ? (
        <div>
          <h2>Your Zodiac Sign Predictions</h2>
          <div>
            <h3>Daily Prediction</h3>
            <p>{horoscopeData.daily}</p>
          </div>
          <div>
            <h3>Weekly Prediction</h3>
            <p>{horoscopeData.weekly}</p>
          </div>
          <div>
            <h3>Monthly Prediction</h3>
            <p>{horoscopeData.monthly}</p>
          </div>
        </div>
      ) : (
        <div>No prediction available.</div>
      )}
    </div>
  );
};

export default Dashboard;
