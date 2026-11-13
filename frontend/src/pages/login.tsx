import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Alert,
    Avatar,
    Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login, useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { dummyUser } from '../data/dummyUser';

type User = {
    id: string;
    username: string;
    email: string;
    role?: "admin" | "user";
};

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDummyLogin = () => {
        dispatch(login(dummyUser));
        navigate('/', { replace: true });
    };

    const toggleMode = () => {
        setIsLogin((prev) => !prev);
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        
        // Basic validation
        if (isLogin) {
            if (!email.trim() || !password.trim()) {
                setError('Please fill in all required fields.');
                return;
            }
        } else {
            if (!username.trim() || !email.trim() || !password.trim()) {
                setError('Please fill in all required fields.');
                return;
            }
        }

        const endpoint = isLogin
            ? 'http://localhost:2000/auth/login'
            : 'http://localhost:2000/auth/register';

        const payload = isLogin
            ? { email, password }
            : { username, email, password };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || (isLogin ? "User doesn't exist or invalid credentials." : 'Registration failed.'));
                return;
            }

            dispatch(login((data.user ?? data) as User));
            navigate('/', { replace: true });
        } catch (err) {
            setError('Network error: ' + String(err));
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={12}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant="h5">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        {!isLogin && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, borderRadius: 2 }}
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </Button>

                        <Button
                            type="button"
                            fullWidth
                            variant="outlined"
                            size="large"
                            sx={{ mb: 2, borderRadius: 2 }}
                            onClick={handleDummyLogin}
                        >
                            Continue as Dummy User
                        </Button>

                        <Box>
                            <Link
                                component="button"
                                type="button"
                                variant="body2"
                                onClick={toggleMode}
                            >
                                {isLogin
                                    ? "Don't have an account? Register"
                                    : 'Already have an account? Login'}
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
