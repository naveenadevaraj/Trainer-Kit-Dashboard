import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import "./Live.css";
import debounce from "lodash.debounce";

const Live = () => {
  const [sensorData, setSensorData] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
    // Function to format sensor value with leading zeroes
    const formatSensorValue = (value) => {
      return value.toString().padStart(2, "0"); // Ensure two digits
    };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Resize handler (optional, can add functionality)
  useEffect(() => {
    const handleResize = debounce(() => {}, 300);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update sensor data every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newReading = {
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        value: formatSensorValue(Math.floor(Math.random() * 40)), // Random sensor value
      };

      setSensorData((prevData) => {
        const updatedData = [...prevData, newReading];
        // Limit to 10 readings for display
        return updatedData.slice(-5);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Handle mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const currentDate = currentTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Get the latest temperature value or show a default
  const latestTemperature = sensorData.length > 0 ? sensorData[sensorData.length - 1].value : 0;

  return (
    <div className="live-dashboard">
      <div className="live-container">
        {/* Historical Data Chart */}
        <div className="card chart-card">
          <div className="chart-header">
            <span className="date">{currentDate}</span>
          </div>
          <div className="chart-container">
            {isMounted && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={sensorData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <XAxis
                    dataKey="time"
                    stroke="#8b92a5"
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#8b92a5"
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 10, 20, 30, 40]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#252b3b",
                      border: "none",
                      borderRadius: "4px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={true}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="flex-container">
          {/* Temperature Gauge */}
          <div className="card gauge-card">
            <div className="temperature-gauge">
              <div className="gauge-circle">
                <div className="gauge-border">
                  <div className="gauge-content">
                    <div className="temperature">{latestTemperature} F</div>
                    <div className="temperature-label">Temperature</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamp and Sensor Data Display */}
          <div className="card timestamp-card">
            <div className="timestamp-container">
              <div className="timestamp-header">Sensor Data</div>
              <ul className="timestamp-list">
                {sensorData.map((entry, index) => (
                  <li key={index} className="timestamp-item">
                    {entry.time} - {entry.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
