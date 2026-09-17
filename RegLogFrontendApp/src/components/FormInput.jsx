import React, { useState } from 'react';

const FormInput = ({ label, type, name, value, onChange, error, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
                <input
                    id={name}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`form-input ${error ? 'input-error' : ''}`}
                    style={isPassword ? { paddingRight: '40px' } : {}}
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="password-toggle"
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 0
                        }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                <line x1="1" y1="1" x2="23" y2="23"></line>
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        )}
                    </button>
                )}
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default FormInput;
