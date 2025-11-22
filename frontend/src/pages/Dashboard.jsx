import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
} from '@mui/material';
import {
  Logout,
  Email,
  CalendarToday,
  Dashboard as DashboardIcon,
  Person,
  ArrowBack,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Main Dashboard Card */}
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            bgcolor: 'white',
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              p: 4,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'white',
                color: '#667eea',
                fontSize: '3rem',
                fontWeight: 700,
              }}
            >
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', mb: 1 }}>
              Welcome Back!
            </Typography>
            <Chip
              label="Active User"
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
              }}
            />
          </Box>

          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <DashboardIcon sx={{ fontSize: 40, color: '#667eea', mr: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a202c' }}>
                User Dashboard
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* User Information Grid */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid #e2e8f0',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#667eea',
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.2)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Person sx={{ fontSize: 30, color: '#667eea', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c' }}>
                        User ID
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#4a5568',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        bgcolor: '#f7fafc',
                        p: 2,
                        borderRadius: 2,
                        wordBreak: 'break-all',
                      }}
                    >
                      {user?.userId || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: '2px solid #e2e8f0',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#667eea',
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.2)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ fontSize: 30, color: '#667eea', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c' }}>
                        Email Address
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#4a5568',
                        fontSize: '1rem',
                        bgcolor: '#f7fafc',
                        p: 2,
                        borderRadius: 2,
                        wordBreak: 'break-word',
                      }}
                    >
                      {user?.email || 'N/A'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: '2px solid #e2e8f0',
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#667eea',
                      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.2)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CalendarToday sx={{ fontSize: 30, color: '#667eea', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c' }}>
                        Account Created
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#4a5568',
                        fontSize: '1rem',
                        bgcolor: '#f7fafc',
                        p: 2,
                        borderRadius: 2,
                      }}
                    >
                      {formatDate(user?.createdAt)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Account Stats */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a202c', mb: 3 }}>
                Account Status
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#667eea', mb: 1 }}>
                      ✓
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }}>
                      Verified
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#f093fb', mb: 1 }}>
                      🔒
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }}>
                      Secure
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#4facfe', mb: 1 }}>
                      ⚡
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500 }}>
                      Active
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Paper>

       
      </Container>
    </Box>
  );
};

export default Dashboard;
