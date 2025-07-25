import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  IconButton,
  Badge,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery
} from '@mui/material';
import {
  Send as SendIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Assignment as StatusIcon,
  LocalFireDepartment as FireIcon,
  LocalPolice as PoliceIcon,
  MedicalServices as MedicalIcon,
  Chat as ChatIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Assignment as ReportIcon
} from '@mui/icons-material';

const DetailLaporan = ({ darkMode = false }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [laporan, setLaporan] = useState({
    id: 'LAP-20250724-001',
    nama: 'Ahmad Setiawan',
    email: 'ahmad@example.com',
    tanggal: '2025-07-24',
    kategori: 'Kebakaran',
    status: 'Diproses',
    petugas: 'Rudi',
    lokasi: 'Jl. Merdeka No.12, Jakarta',
    deskripsi: 'Api terlihat di lantai 2 gedung sekolah.',
    durasi: '32 menit',
    chatList: [
      { from: 'pelapor', text: 'Tolong segera, api mulai besar!', time: '10:12' },
      { from: 'petugas', text: 'Kami segera menuju lokasi!', time: '10:13' },
      { from: 'pelapor', text: 'Sudah terdengar suara sirine.', time: '10:14' },
      { from: 'petugas', text: 'Tim sudah sampai lokasi.', time: '10:15' },
    ]
  });
  const [chatInput, setChatInput] = useState('');

  const statusColors = {
    'Belum Diproses': '#ef4444',
    'Diproses': '#fbbf24',
    'Selesai': '#22c55e',
  };

  const statusIcons = {
    'Belum Diproses': <ErrorIcon />,
    'Diproses': <PendingIcon />,
    'Selesai': <CompletedIcon />,
  };

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLaporan(prev => ({
      ...prev,
      chatList: [...prev.chatList, { from: 'petugas', text: chatInput.trim(), time }],
    }));
    setChatInput('');
  };

  const handleStatusChange = (event) => {
    setLaporan(prev => ({ ...prev, status: event.target.value }));
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      bgcolor: darkMode ? '#101624' : '#F3F4F6',
      p: isMobile ? 1 : 3,
    }}>
      {/* Header with Report ID and Status */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        p: 2,
        bgcolor: darkMode ? '#232946' : '#fff',
        borderRadius: 3,
        boxShadow: 3,
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          color: darkMode ? '#1E90FF' : '#1E3A8A',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <ReportIcon /> Laporan #{laporan.id}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge
            badgeContent={laporan.durasi}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                bgcolor: darkMode ? '#1E90FF' : '#1E3A8A',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12,
                padding: '4px 8px',
                borderRadius: 12,
              },
            }}
          >
            <TimeIcon fontSize="medium" />
          </Badge>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-label" sx={{ color: darkMode ? '#fff' : '#1E3A8A' }}>Status</InputLabel>
            <Select
              labelId="status-label"
              value={laporan.status}
              onChange={handleStatusChange}
              label="Status"
              sx={{
                color: darkMode ? '#fff' : '#1E3A8A',
                fontWeight: 600,
                '& .MuiSelect-icon': {
                  color: statusColors[laporan.status],
                },
              }}
            >
              {Object.keys(statusColors).map(status => (
                <MenuItem key={status} value={status} sx={{ color: statusColors[status] }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {statusIcons[status]}
                    {status}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column - Report Information and Chat */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: 3,
            bgcolor: darkMode ? '#232946' : '#fff',
            color: darkMode ? '#fff' : '#1E3A8A',
            borderRadius: 3,
            boxShadow: 3,
            mb: 3,
          }}>
            <Typography variant="h6" fontWeight="bold" mb={3} sx={{
              color: darkMode ? '#1E90FF' : '#1E3A8A',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}>
              <ChatIcon /> Informasi Laporan
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Reporter Information */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Pelapor
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: darkMode ? '#1E90FF' : '#1E3A8A' }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography fontWeight="bold">{laporan.nama}</Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <EmailIcon sx={{ color: darkMode ? '#fbbf24' : '#f59e0b' }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Email</Typography>
                        <Typography>{laporan.email}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CalendarIcon sx={{ color: darkMode ? '#22c55e' : '#16a34a' }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Tanggal</Typography>
                        <Typography>{laporan.tanggal}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <FireIcon sx={{ color: darkMode ? '#ef4444' : '#dc2626' }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Kategori</Typography>
                        <Typography>{laporan.kategori}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <PersonIcon sx={{ color: darkMode ? '#8b5cf6' : '#7c3aed' }} />
                      <Box>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>Petugas</Typography>
                        <Typography>{laporan.petugas}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* Location */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Lokasi
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <LocationIcon sx={{ color: darkMode ? '#ec4899' : '#db2777' }} />
                  <Typography>{laporan.lokasi}</Typography>
                </Box>
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Deskripsi
                </Typography>
                <Paper elevation={0} sx={{ 
                  p: 2, 
                  bgcolor: darkMode ? '#1a2236' : '#f1f5f9',
                  borderRadius: 2
                }}>
                  <Typography>{laporan.deskripsi}</Typography>
                </Paper>
              </Box>
            </Box>
          </Paper>

          {/* Map */}
          <Paper elevation={3} sx={{
              flex: 1,
              p: 0,
              height: 400,
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: 3,
              border: '2px solid #fff2',
            }}>  
            <iframe
                title="Google Maps"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(laporan.lokasi)}&output=embed`}
                allowFullScreen
              />
          </Paper>
        </Grid>

        {/* Right Column - Map and Emergency Buttons */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            {/* Emergency Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}>
              <Button 
                variant="contained" 
                startIcon={<FireIcon />}
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 16px #ef4444aa',
                  px: 3,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 4px 24px #ef4444cc',
                  },
                }}
              >
                PEMADAM
              </Button>
              <Button 
                variant="contained" 
                startIcon={<PoliceIcon />}
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 16px #2563ebaa',
                  px: 3,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 4px 24px #2563ebcc',
                  },
                }}
              >
                POLISI
              </Button>
              <Button 
                variant="contained" 
                startIcon={<MedicalIcon />}
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 16px #22c55eaa',
                  px: 3,
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 4px 24px #22c55ecc',
                  },
                }}
              >
                AMBULAN
              </Button>
            </Box>

          {/* Chat Section */}
          <Paper elevation={3} sx={{
            p: 3,
            bgcolor: darkMode ? '#232946' : '#fff',
            color: darkMode ? '#fff' : '#1E3A8A',
            borderRadius: 3,
            boxShadow: 3,
          }}>
            <Typography variant="h6" fontWeight="bold" mb={3} sx={{
                color: darkMode ? '#1E90FF' : '#1E3A8A',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                }}>
                <ChatIcon /> Riwayat Komunikasi
                </Typography>

                <Box sx={{
                height: 300,
                overflowY: 'auto',
                p: 1,
                mb: 2,
                bgcolor: darkMode ? '#1a2236' : '#f8fafc',
                borderRadius: 2,
                }}>
                {laporan.chatList.map((chat, idx) => (
                    <Box
                    key={idx}
                    sx={{
                        alignSelf: chat.from === 'pelapor' ? 'flex-start' : 'flex-end',
                        bgcolor: chat.from === 'pelapor' 
                        ? (darkMode ? '#2a3655' : '#e2e8f0') 
                        : (darkMode ? '#1E90FF' : '#1E3A8A'),
                        color: chat.from === 'pelapor' 
                        ? (darkMode ? '#fff' : '#1E3A8A')
                        : '#fff',
                        px: 2,
                        py: 1.5,
                        borderRadius: chat.from === 'pelapor' 
                        ? '20px 20px 20px 4px' 
                        : '20px 20px 4px 20px',
                        maxWidth: '80%',
                        mb: 2,
                        position: 'relative',
                    }}
                    >
                    <Typography sx={{ fontSize: 14 }}>
                        {chat.text}
                    </Typography>
                    <Typography
                        sx={{
                        fontSize: 10,
                        position: 'absolute',
                        bottom: 4,
                        right: 8,
                        opacity: 0.7,
                        color: chat.from === 'pelapor' 
                            ? (darkMode ? '#a1a1aa' : '#64748b')
                            : 'rgba(255,255,255,0.7)',
                        }}
                    >
                        {chat.time}
                    </Typography>
                    </Box>
                ))}
                </Box>

                {/* Quick Reply Buttons */}
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button variant="outlined" size="small" sx={{ borderRadius: 3, borderColor: darkMode ? '#2a3655' : '#e2e8f0', color: darkMode ? '#fff' : '#1E3A8A', textTransform: 'none', fontSize: 13, '&:hover': { borderColor: darkMode ? '#1E90FF' : '#1E3A8A' }}}>
                    Tim sedang menuju lokasi
                </Button>
                <Button variant="outlined" size="small" sx={{ borderRadius: 3, borderColor: darkMode ? '#2a3655' : '#e2e8f0', color: darkMode ? '#fff' : '#1E3A8A', textTransform: 'none', fontSize: 13, '&:hover': { borderColor: darkMode ? '#1E90FF' : '#1E3A8A' }}}>
                    Mohon tunggu
                </Button>
                </Box>

                {/* Chat Input */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Ketik pesan..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSend();
                    }}
                    sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: darkMode ? '#1a2236' : '#f1f5f9',
                        '& fieldset': {
                        borderColor: darkMode ? '#2a3655' : '#e2e8f0',
                        },
                        '&:hover fieldset': {
                        borderColor: darkMode ? '#1E90FF' : '#1E3A8A',
                        },
                    },
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    sx={{
                    bgcolor: darkMode ? '#1E90FF' : '#1E3A8A',
                    color: '#fff',
                    '&:hover': {
                        bgcolor: darkMode ? '#3b82f6' : '#2563eb',
                    },
                    }}
                >
                    <SendIcon />
                </IconButton>
                </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailLaporan;