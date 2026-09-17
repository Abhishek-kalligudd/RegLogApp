import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { authService } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();

    // Check if user is already authenticated
    useEffect(() => {
        authService.getCurrentUser()
            .then(() => navigate('/home'))
            .catch(() => {});
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        setServerError('');

        try {
            await authService.login(formData);
            navigate('/home');
        } catch (err) {
            setLoading(false);
            if (err.response && err.response.status === 401) {
                setServerError('Invalid username or password.');
            } else if (err.response && err.response.data && err.response.data.message) {
                setServerError(err.response.data.message);
            } else {
                setServerError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your account</p>
                
                {serverError && <div className="alert error">{serverError}</div>}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        error={errors.username}
                    />
                    <FormInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />
                    
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                </form>
                
                <p className="auth-footer">
                    New user? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
