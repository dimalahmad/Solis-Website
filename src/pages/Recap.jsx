import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  IconButton,
  Badge,
  Avatar,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
} from '@mui/material';
import {
  Send as SendIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  AccessTime as TimeIcon,
  Chat as ChatIcon,
  LocalFireDepartment as FireIcon,
  Assignment as ReportIcon,
} from '@mui/icons-material';

const statusColors = {
  'Belum Diproses': '#ef4444',
  'Diproses': '#fbbf24',
  'Selesai': '#22c55e',
};

const statusIcons = {
  'Belum Diproses': <ErrorIcon />,
  'Diproses': <PendingIcon />,
  'Selesai': <CheckCircleIcon />,
};

const DetailLaporan = ({ darkMode = false }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [laporan, setLaporan] = useState({
    id: 'LAP-20250724-001',
    nama: 'Ahmad Setiawan',
    status: 'Diproses',
    durasi: '32 menit',
    chatList: [
      { from: 'pelapor', text: 'Tolong segera, api mulai besar!', time: '10:12' },
      { from: 'petugas', text: 'Kami segera menuju lokasi!', time: '10:13' },
      { from: 'pelapor', text: 'Sudah terdengar suara sirine.', time: '10:14' },
      { from: 'petugas', text: 'Tim sudah sampai lokasi.', time: '10:15' },
    ],
  });
  const [chatInput, setChatInput] = useState('');

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
      height: '100vh',
      bgcolor: darkMode ? '#101624' : '#F3F4F6',
      p: isMobile ? 1 : 3,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header with Report ID */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
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

      {/* Chat Container */}
      <Paper elevation={3} sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: darkMode ? '#232946' : '#fff',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 3,
      }}>
        {/* Chat Header */}
        <Box sx={{
          p: 2,
          bgcolor: darkMode ? '#1E90FF' : '#1E3A8A',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          <Avatar sx={{ bgcolor: '#fff', color: darkMode ? '#1E90FF' : '#1E3A8A' }}>
            <FireIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Chat dengan {laporan.nama}</Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                bgcolor: '#4ade80', 
                borderRadius: '50%',
                display: 'inline-block',
              }} />
              Sedang online
            </Typography>
          </Box>
        </Box>

        {/* Chat Messages */}
        <Box sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: darkMode ? '#1a2236' : '#f8fafc',
        }}>
          {/* System Message */}
          <Box sx={{
            alignSelf: 'center',
            bgcolor: darkMode ? '#2a3655' : '#e2e8f0',
            color: darkMode ? '#fff' : '#1E3A8A',
            px: 2,
            py: 1,
            borderRadius: 3,
            maxWidth: '80%',
            textAlign: 'center',
            mb: 2,
          }}>
            <Typography variant="caption">Ada yang bisa kami bantu?</Typography>
          </Box>

          {/* Chat Messages */}
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
                position: 'relative',
                boxShadow: 1,
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

          {/* Quick Reply Options */}
          <Box sx={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            width: '80%',
            mt: 2,
          }}>
            <Typography variant="caption" sx={{ 
              textAlign: 'center',
              color: darkMode ? '#a1a1aa' : '#64748b',
            }}>
              Pilih respon cepat:
            </Typography>
            <Button 
              variant="outlined" 
              size="small"
              sx={{
                borderRadius: 3,
                borderColor: darkMode ? '#2a3655' : '#e2e8f0',
                color: darkMode ? '#fff' : '#1E3A8A',
                textTransform: 'none',
                fontSize: 13,
                '&:hover': {
                  borderColor: darkMode ? '#1E90FF' : '#1E3A8A',
                },
              }}
            >
              Tim sudah dalam perjalanan
            </Button>
            <Button 
              variant="outlined" 
              size="small"
              sx={{
                borderRadius: 3,
                borderColor: darkMode ? '#2a3655' : '#e2e8f0',
                color: darkMode ? '#fff' : '#1E3A8A',
                textTransform: 'none',
                fontSize: 13,
                '&:hover': {
                  borderColor: darkMode ? '#1E90FF' : '#1E3A8A',
                },
              }}
            >
              Mohon tunggu, sedang memproses
            </Button>
          </Box>
        </Box>

        {/* Chat Input */}
        <Box sx={{
          p: 2,
          borderTop: `1px solid ${darkMode ? '#2a3655' : '#e2e8f0'}`,
          bgcolor: darkMode ? '#232946' : '#fff',
        }}>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default DetailLaporan;