import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, CssBaseline, Divider, FormControl, FormLabel, TextField, Typography, Stack, styled } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import axiosInstance from '@/configs/axiosInstance';
import { signup } from '@/services/authService';

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    justifyContent: 'center',
    background: theme.palette.background.default,
}));

export default function SignUp() {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateInputs = (data) => {
        const newErrors = {};
        if (!data.FullName) newErrors.FullName = 'Full Name is required.';
        if (!data.username) newErrors.username = 'User Name is required.';
        if (!data.phonenumber) newErrors.phonenumber = 'Phone number is required.';
        // ... other validations
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const record = {
            FullName: data.get('fullName'),
            username: data.get('userName'),
            email: data.get('email'),
            password: data.get('password'),
            phonenumber: data.get('phoneNumber')
        };

        console.log('Form data:', record.FullName, record.username, record.email, record.password, record.phonenumber);

        const FullName = record.FullName;
        const username = record.username;
        const email = record.email;
        const password = record.password;
        const phonenumber = record.phonenumber;
        if (!validateInputs(record)) return;

        setLoading(true);
        try {
            // await axiosInstance.post('https://coursesystem.azurewebsites.net/Auth/register',);
            await signup({
                FullName,
                username,
                email,
                password,
                phonenumber
            });
            toast.success('Sign up successful');
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Sign up failed. Please try again.');
            console.error('Sign up error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignUpContainer>
            <CssBaseline />
            <Card>
                <Typography variant="h4" gutterBottom>Sign up</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {['fullName', 'userName', 'email', 'password', 'phoneNumber'].map((field) => (
                        <FormControl key={field}>
                            <FormLabel htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').trim()}</FormLabel>
                            <TextField
                                id={field}
                                name={field}
                                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                                required
                                fullWidth
                                error={!!errors[field]}
                                helperText={errors[field]}
                            />
                        </FormControl>
                    ))}
                    <Button type="submit" fullWidth variant="contained" disabled={loading}>
                        {loading ? 'Loading...' : 'Sign up'}
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} onClick={() => alert('Sign up with Google')}>
                    Sign up with Google
                </Button>
                <Typography textAlign="center">
                    Already have an account? <Link to="/login">Sign in</Link>
                </Typography>
            </Card>
        </SignUpContainer>
    );
}