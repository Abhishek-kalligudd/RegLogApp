import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { authService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authService.getCurrentUser();
                setUser(response.data);
            } catch (err) {
                setError('Failed to load user details.');
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <div className="home-container">
                <Navbar showLogout={true} />
                <div className="home-content">
                    <div className="alert error">{error}</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="home-container">
                <Navbar />
                <LoadingSpinner fullScreen />
            </div>
        );
    }

    return (
        <div className="home-container">
            <Navbar showLogout={true} />
            <div className="home-content">
                <div className="dashboard-card">
                    <h2>Welcome, {user.name}!</h2>
                    <p className="success-text">You're successfully logged in.</p>
                    
                    <div className="user-details">
                        <h3>Your Profile</h3>
                        <div className="detail-item">
                            <span className="detail-label">Email:</span>
                            <span className="detail-value">{user.email}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">{user.phoneNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
