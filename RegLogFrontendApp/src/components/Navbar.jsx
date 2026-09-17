import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar = ({ showLogout = false }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>RegLog App</h1>
            </div>
            {showLogout && (
                <div className="navbar-menu">
                    <button onClick={handleLogout} className="btn-secondary">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
