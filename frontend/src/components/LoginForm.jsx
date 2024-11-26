import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/v1/login', {
                email,
                password,
            });
            console.log(response);
            const token = response.data;
            localStorage.setItem('token', token);

            // Decode the JWT to extract user ID
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken);
            const userId = decodedToken.employee_id;
            localStorage.setItem('Id', userId);

            navigate('/employee'); // Redirect to landing page
        } catch (err) {
            setError('Invalid email or password.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f2f5',
            padding: '20px',
        },
        card: {
            width: '100%',
            maxWidth: '450px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '30px',
            boxSizing: 'border-box',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333',
        },
        formControl: {
            marginBottom: '20px',
        },
        input: {
            width: '100%',
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        },
        inputFocus: {
            borderColor: '#007bff',
            outline: 'none',
            boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
        },
        button: {
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            padding: '12px',
            width: '100%',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        error: {
            color: '#721c24',
            backgroundColor: '#f8d7da',
            borderColor: '#f5c6cb',
            borderRadius: '5px',
            padding: '10px',
            marginBottom: '20px',
            fontSize: '14px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.title}>Login</h3>
                {error && <div style={styles.error}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div style={styles.formControl}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                        />
                    </div>
                    <div style={styles.formControl}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                            onFocus={(e) => e.target.style.borderColor = '#007bff'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                        />
                    </div>
                    <button type="submit" style={styles.button} onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'} onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
