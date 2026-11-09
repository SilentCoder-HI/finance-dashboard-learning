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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login, useAppDispatch, useAppSelector } from '../store/store';
import { Day1LearningPage } from './day1';
import { invoices } from '../data/invoices';

export default function LoginForm() {
    const user = useAppSelector((state) => state.auth.user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();

    const users = invoices.map(user => user.customer.toLowerCase())
    const uniqeUser = [... new Set(users)]

    // fixed: submit event type is FormEvent, not FocusEvent
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email === "" && password == "") {
            setError("Write ")
        }
        if (uniqeUser.includes(email)) {
            dispatch(login({ id: "u1", name: email, role: "user" }))
        }
        else{
            setError("User don't exit")
        }
    }

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
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
                            Welcome back
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Sign in to your finance workspace
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>

                            {/* Email Field */}
                            <TextField
                                name="email"
                                label="User Name"
                                placeholder="abccdeabc"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {/* Password Field */}
                            <TextField
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="123@G222G"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 3,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                }}
                            >
                                Sign In
                            </Button>

                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}