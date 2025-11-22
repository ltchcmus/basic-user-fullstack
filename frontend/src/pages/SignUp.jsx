import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CardContent,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material';
import { 
  PersonAdd, 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  CheckCircle,
  ArrowBack
} from '@mui/icons-material';
import { registerUser } from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Success handled in the UI
      setTimeout(() => {
        navigate('/login');
      }, 500);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', py: 4, px: 2 }}>
      <Container maxWidth="sm">
        {/* Back to Home Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{
            color: 'white',
            mb: 3,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Back to Home
        </Button>

        <Paper
          elevation={24}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'white'
          }}
        >
          {/* Header */}
          <Box sx={{ bgcolor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', p: 4, textAlign: 'center', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                bgcolor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}
            >
              <PersonAdd sx={{ fontSize: 35, color: '#f093fb' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
              Create Account
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
              Join us today and get started!
            </Typography>
          </Box>

          <CardContent sx={{ p: 5 }}>
            {mutation.isSuccess && (
              <Alert 
                severity="success" 
                icon={<CheckCircle />}
                sx={{ mb: 3, borderRadius: 2, fontWeight: 500 }}
              >
                Account created successfully! Redirecting to login...
              </Alert>
            )}

            {mutation.isError && (
              <Alert 
                severity="error" 
                sx={{ mb: 3, borderRadius: 2, fontWeight: 500 }}
              >
                {mutation.error.validationErrors || mutation.error.message || 'Registration failed. Please try again.'}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={mutation.isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#f093fb' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#f093fb',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#f093fb',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#f093fb',
                    },
                  }}
                />
              </Box>

              {/* Password Field */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={mutation.isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#f093fb' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#f093fb' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#f093fb',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#f093fb',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#f093fb',
                    },
                  }}
                />
              </Box>

              {/* Confirm Password Field */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value =>
                      value === password || 'Passwords do not match'
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  disabled={mutation.isPending}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#f093fb' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: '#f093fb' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#f093fb',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#f093fb',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#f093fb',
                    },
                  }}
                />
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={mutation.isPending}
                startIcon={mutation.isPending ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                sx={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  py: 1.8,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
                    boxShadow: '0 12px 35px rgba(240, 147, 251, 0.5)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    opacity: 0.6,
                    color: 'white',
                  }
                }}
              >
                {mutation.isPending ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#4a5568' }}>
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  style={{ 
                    color: '#f093fb', 
                    textDecoration: 'none',
                    fontWeight: 600
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUp;
