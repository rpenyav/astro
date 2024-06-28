import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getHoroscopeBySignCode } from "../services/horoscopeService";
import LoaderComponent from "./LoaderComponent";

const Dashboard: React.FC = () => {
  const auth = useContext(AuthContext);
  const [horoscope, setHoroscope] = useState<{
    daily: string;
    weekly: string;
    monthly: string;
  }>({ daily: "", weekly: "", monthly: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHoroscope = async () => {
      if (auth?.user?.zodiacSignCode) {
        try {
          const horoscope = await getHoroscopeBySignCode(
            auth.user.zodiacSignCode
          );
          setHoroscope(horoscope);
        } catch (error) {
          // Handle error silently or log it
          console.error("Failed to fetch horoscope:", error);
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

  return (
    <div>
      <h1>Dashboard - Private</h1>
      {horoscope.daily ? (
        <div>
          <h2>Daily Prediction</h2>
          <p>{horoscope.daily}</p>
        </div>
      ) : (
        <div>
          <h2>Daily Prediction</h2>
          <p>No daily prediction available yet.</p>
        </div>
      )}
      {horoscope.weekly ? (
        <div>
          <h2>Weekly Prediction</h2>
          <p>{horoscope.weekly}</p>
        </div>
      ) : (
        <div>
          <h2>Weekly Prediction</h2>
          <p>No weekly prediction available yet.</p>
        </div>
      )}
      {horoscope.monthly ? (
        <div>
          <h2>Monthly Prediction</h2>
          <p>{horoscope.monthly}</p>
        </div>
      ) : (
        <div>
          <h2>Monthly Prediction</h2>
          <p>No monthly prediction available yet.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
