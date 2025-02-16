import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Box, Button, CssBaseline, Divider, FormControl, FormLabel, TextField, Typography, Stack, styled, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { loginAuth } from '@/services/authService';
import { login } from '@/stores/authSlice';

const Card = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '450px',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    background: theme.palette.background.default,
}));

export default function SignIn() {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateInputs = (data) => {
        const newErrors = {};
        if (!data.userName) newErrors.userName = 'Please enter your username.';
        // if (!data.password || data.password.length <= 5) newErrors.password = 'Password must be at least 6 characters long.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const record = {
            userName: data.get('userName'),
            password: data.get('password'),
        };

        if (!validateInputs(record)) return;

        setLoading(true);
        try {
            const response = await loginAuth(record);
            if (response) {
                console.log('Login successfully:', response);

                dispatch(login(response));
                toast.success('Login successfully!');
                console.log("role", response.role);

                if (response.role === 'Admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignInContainer>
            <CssBaseline />
            <Card>
                <Typography variant="h4" gutterBottom>Sign in</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControl>
                        <FormLabel htmlFor="userName">Username</FormLabel>
                        <TextField
                            id="userName"
                            name="userName"
                            type="text"
                            required
                            fullWidth
                            error={!!errors.userName}
                            helperText={errors.userName}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            required
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign in'}
                    </Button>
                    <Link href="#" variant="body2" sx={{ alignSelf: 'center' }}>
                        Forgot your password?
                    </Link>
                </Box>
                <Divider>or</Divider>
                <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={() => alert('Sign in with Google')}>
                    Sign in with Google
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" variant="body2">
                        Sign up
                    </Link>
                </Typography>
            </Card>
        </SignInContainer>
    );
}