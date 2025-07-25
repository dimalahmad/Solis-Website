import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Stack,
  Paper,
  Snackbar,
  Alert,
  useTheme,
  CssBaseline,
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';

function ProfileSettingsPage() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('petugas123');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Optional: set <body> background globally if necessary
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#0f172a' : '#f9fafb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [darkMode]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewPic(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (!username.trim()) {
      setSnackbar({
        open: true,
        message: 'Nama pengguna tidak boleh kosong!',
        severity: 'error',
      });
      return;
    }

    setSnackbar({
      open: true,
      message: 'Perubahan berhasil disimpan!',
      severity: 'success',
    });
    setIsEditing(false);
  };

  return (
    <>
      <CssBaseline />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          bgcolor: darkMode ? '#0f172a' : '#f9fafb', // Super gelap
          transition: 'background 0.3s',
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 420,
            borderRadius: 4,
            textAlign: 'center',
            bgcolor: darkMode ? '#1e293b' : '#ffffff',
            color: darkMode ? '#e2e8f0' : '#1E3A8A',
            boxShadow: darkMode
              ? '0 4px 24px rgba(0,0,0,0.5)'
              : '0 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Profil Petugas
          </Typography>

          <Stack direction="column" spacing={2} alignItems="center" mb={3}>
            <Avatar
              src={previewPic || '/default-avatar.png'}
              sx={{
                width: 80,
                height: 80,
                border: darkMode
                  ? '2px solid #facc15'
                  : '2px solid #1E3A8A',
                boxShadow: darkMode ? '0 0 12px #facc15aa' : undefined,
              }}
            />
            {isEditing && (
              <Button variant="outlined" component="label" size="small">
                Ganti Foto
                <input hidden accept="image/*" type="file" onChange={handlePhotoChange} />
              </Button>
            )}
          </Stack>

          {!isEditing ? (
            <>
              <Typography variant="body1" gutterBottom>
                👤 <strong>{username}</strong>
              </Typography>
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEdit}
                sx={{
                  background: darkMode
                    ? 'linear-gradient(90deg, #ef4444 0%, #facc15 100%)'
                    : 'linear-gradient(90deg, #f87171 0%, #fbbf24 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
              >
                Edit Profil
              </Button>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Nama Pengguna"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  input: { color: darkMode ? '#fff' : '#000' },
                  label: { color: darkMode ? '#ccc' : '#666' },
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? '#475569' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: darkMode ? '#64748b' : '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? '#facc15' : '#1E3A8A',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password Baru"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  input: { color: darkMode ? '#fff' : '#000' },
                  label: { color: darkMode ? '#ccc' : '#666' },
                  '.MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: darkMode ? '#475569' : '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: darkMode ? '#64748b' : '#888',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: darkMode ? '#facc15' : '#1E3A8A',
                    },
                  },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  mt: 2,
                  textTransform: 'none',
                  background: darkMode
                    ? 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)'
                    : 'linear-gradient(90deg, #22d3ee 0%, #4ade80 100%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  boxShadow: darkMode ? '0 2px 12px #22c55e77' : undefined,
                  '&:hover': {
                    filter: 'brightness(1.1)',
                    boxShadow: darkMode ? '0 4px 20px #22c55ecc' : undefined,
                  },
                }}
              >
                Simpan Perubahan
              </Button>
            </>
          )}
        </Paper>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{
              width: '100%',
              backgroundColor: darkMode ? '#334155' : undefined,
              color: darkMode ? '#facc15' : undefined,
              border: darkMode ? '1px solid #facc1544' : undefined,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default ProfileSettingsPage;
