import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import './Basic.css';
import Live from './Live';

const Basic = () => {
    // Sensor and actuator data
    const sensorData = {
        sensors: {
            'LDR': true,
            'PIR': true,
            'IR': false,
            'DHT11': false,
            'ULTRASONIC': false,
            'SOUND SENSOR': false,
            'TOF': false,
            'TOUCH': false,
            'MPU6050 GYRO': false,
            'ROTARY SENSOR': false,
        },
        actuators: {
            'BUZZER': false,
            'RGB LEDS': true,
            'SERVO MOTOR': false,
            'STEPPER MOTOR': true,
        }
    };

    // State hooks for dialog functionality
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // Dialog functions
    const handleDialogOpen = (type, item) => {
        setDialogType(type);
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className='basic'>
            <Sidebar />
            <div className="container">
                <div className="content">
                    <h1 className="title">Trainer Kit Platform</h1>
                    <div className="floating-card">
                        <p className="card-content">
                            This basic trainer kit is designed for beginners to explore essential sensors 
                            and actuators. It provides an easy-to-use platform for understanding fundamental 
                            electronics and data collection.
                        </p>
                    </div>
                </div>
            </div> 

            {/* Sensors and Actuators Table */}
            <div className="sensors-actuators-container">
                <div className="sensor-section">
                    <h2>SENSORS</h2><br/>
                    <table className="status-table">
                        <tbody>
                            {Object.entries(sensorData.sensors).map(([sensor, status]) => (
                                <tr key={sensor}>
                                    <td>{sensor}</td>
                                    <td className="status-cell">
                                        <div 
                                            className={`status-circle ${status ? 'status-active' : 'status-inactive'}`}
                                            onClick={() => status && handleDialogOpen('sensor', sensor)}
                                        ></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Actuators Section */}
                <div className="actuator-section">
                    <h2>ACTUATORS</h2>
                    <table className="status-table">
                        <br />
                        <tbody>
                            {Object.entries(sensorData.actuators).map(([actuator, status]) => (
                                <tr key={actuator}>
                                    <td>{actuator}</td>
                                    <td className="status-cell">
                                        <div 
                                            className={`status-circle ${status ? 'status-active' : 'status-inactive'}`}
                                            onClick={() => status && handleDialogOpen('actuator', actuator)}
                                        ></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dialog Box */}
            {isDialogOpen && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <button className="close-button" onClick={handleDialogClose}>✖</button>
                        <h3>{dialogType === 'sensor' ? 'Sensor Details' : 'Actuator Details'}</h3><br/>
                        <p>{selectedItem} is currently active.</p><br/>
                        <Live /> {/* Render the Live component inside the dialog */}
                    </div>
                </div>
            )}
        </div>
    );
};
export default Basic;
