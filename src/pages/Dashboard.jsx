import { Typography, Box, Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl, Badge, IconButton, Snackbar, Alert } from '@mui/material';
import { People, Category, Assessment, LocalAtm, Notifications } from '@mui/icons-material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'Total Laporan Hari Ini', value: 18, icon: <Assessment fontSize="large" />, color: 'linear-gradient(135deg, #ef4444 0%, #f59e42 100%)', shadow: '#ef4444' },
  { label: 'Kategori', value: 4, icon: <Category fontSize="large" />, color: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)', shadow: '#2563eb' },
  { label: 'User/Konsumen', value: 512, icon: <People fontSize="large" />, color: 'linear-gradient(135deg, #22d3ee 0%, #4ade80 100%)', shadow: '#22d3ee' },
  { label: 'Rata-rata Waktu Respon', value: '2m 15s', icon: <LocalAtm fontSize="large" />, color: 'linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)', shadow: '#fbbf24' },
];

const kategoriData = [
  { name: 'Kebakaran', value: 5 },
  { name: 'Kriminal', value: 4 },
  { name: 'Kecelakaan', value: 6 },
  { name: 'Medis', value: 3 },
];
const kategoriColors = ['#ef4444', '#2563eb', '#fbbf24', '#22d3ee'];

const statusData = [
  { name: 'Belum Diproses', value: 7 },
  { name: 'Diproses', value: 6 },
  { name: 'Selesai', value: 5 },
];
const statusColors = ['#ef4444', '#fbbf24', '#22c55e'];

const notifikasiDummy = [
  { id: 'LAP-001', user: 'Ahmad', kategori: 'Kebakaran', waktu: '09:12', status: 'Belum Diproses', unread: true },
  { id: 'LAP-002', user: 'Budi', kategori: 'Kriminal', waktu: '09:10', status: 'Diproses', unread: true },
  { id: 'LAP-003', user: 'Citra', kategori: 'Medis', waktu: '08:55', status: 'Selesai', unread: false },
];

function DashboardPage({ darkMode }) {
  const [notifikasi, setNotifikasi] = useState(notifikasiDummy);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Simulasi notifikasi baru masuk
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifikasi((prev) => [
        { id: 'LAP-004', user: 'Dewi', kategori: 'Kecelakaan', waktu: '09:20', status: 'Belum Diproses', unread: true },
        ...prev,
      ]);
      setOpenSnackbar(true);
      // Suara notifikasi (placeholder)
      const audio = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa1c82.mp3');
      audio.play();
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifikasi.filter((n) => n.unread).length;

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: darkMode ? '#101624' : '#F3F4F6' }}>
      {/* Sticky Header */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 10, bgcolor: darkMode ? '#101624ee' : '#F3F4F6ee', backdropFilter: 'blur(6px)', boxShadow: '0 2px 12px #0001', px: { xs: 1, sm: 2, md: 4 }, py: { xs: 1, sm: 2 }, mb: 3 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: darkMode ? '#fff' : '#1E3A8A', mb: 0.5 }}>
              Dashboard Admin
            </Typography>
            <Typography variant="body1" sx={{ color: darkMode ? '#fbbf24' : '#991B1B', fontWeight: 600 }}>
              Selamat datang di panel admin SOLIS
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Badge badgeContent={unreadCount} color="error">
                <Notifications sx={{ fontSize: 32 }} />
              </Badge>
            </IconButton>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="filter-label" sx={{ color: darkMode ? '#fff' : '#1E3A8A' }}>7 Hari Terakhir</InputLabel>
              <Select labelId="filter-label" label="7 Hari Terakhir" defaultValue={7} sx={{ color: darkMode ? '#fff' : '#1E3A8A', fontWeight: 600 }}>
                <MenuItem value={7}>7 Hari Terakhir</MenuItem>
                <MenuItem value={30}>30 Hari Terakhir</MenuItem>
                <MenuItem value={90}>3 Bulan Terakhir</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" sx={{
              background: darkMode ? 'linear-gradient(90deg, #ef4444 0%, #fbbf24 100%)' : 'linear-gradient(90deg, #f87171 0%, #fbbf24 100%)',
              color: '#fff',
              fontWeight: 'bold',
              boxShadow: darkMode ? '0 2px 16px #ef4444aa' : '0 2px 16px #fbbf24aa',
              px: 3,
              textTransform: 'none',
              fontSize: 16,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                filter: 'brightness(1.1)',
                boxShadow: '0 4px 24px #ef4444cc',
              },
            }}>
              Export Laporan
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Statistik */}
      <Grid container spacing={3} sx={{ mb: 2, px: { xs: 1, sm: 2, md: 4 } }}>
        {stats.map((stat, idx) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper elevation={6} sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              background: stat.color,
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: `0 4px 32px ${stat.shadow}99, 0 0 16px #fff1`,
              minHeight: { xs: 100, sm: 120, md: 140 },
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
              border: '2px solid #fff2',
              transition: 'all 0.2s',
              cursor: 'pointer',
              minWidth: 0,
              '&:hover': {
                boxShadow: `0 8px 32px ${stat.shadow}cc, 0 0 24px #fff2`,
                transform: 'scale(1.04)',
              },
            }}>
              <Box sx={{ fontSize: { xs: 32, sm: 40, md: 48 }, mb: 1, filter: 'drop-shadow(0 0 8px #fff8)' }}>{stat.icon}</Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5, textShadow: '0 2px 8px #0005', letterSpacing: 1, fontSize: { xs: 20, sm: 24, md: 28 } }}>{stat.value}</Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: 13, sm: 15, md: 16 } }}>{stat.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Chart */}
      <Grid container spacing={3} sx={{ mb: 2, px: { xs: 1, sm: 2, md: 4 } }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, minHeight: { xs: 180, sm: 220, md: 280 }, background: darkMode ? '#232946' : '#fff', color: darkMode ? '#fff' : '#1E3A8A', boxShadow: '0 2px 12px #0001', transition: 'all 0.2s', width: '100%', minWidth: 0 }}>
            <Typography fontWeight={700} mb={2} fontSize={18}>Laporan per Kategori</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={kategoriData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {kategoriData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={kategoriColors[idx % kategoriColors.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, minHeight: { xs: 180, sm: 220, md: 280 }, background: darkMode ? '#232946' : '#fff', color: darkMode ? '#fff' : '#1E3A8A', boxShadow: '0 2px 12px #0001', transition: 'all 0.2s', width: '100%', minWidth: 0 }}>
            <Typography fontWeight={700} mb={2} fontSize={18}>Status Laporan</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={statusData}>
                <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#1E3A8A'} />
                <YAxis stroke={darkMode ? '#fff' : '#1E3A8A'} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value">
                  {statusData.map((entry, idx) => (
                    <Cell key={`cell-status-${idx}`} fill={statusColors[idx % statusColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Notifikasi */}
      <Box sx={{ px: { xs: 1, sm: 2, md: 4 }, mb: 4, overflowX: 'auto' }}>
        <Typography fontWeight={700} mb={2} fontSize={18} color={darkMode ? '#fff' : '#1E3A8A'}>
          Notifikasi Laporan Terbaru
        </Typography>
        <Grid container spacing={2} wrap="nowrap" sx={{ flexWrap: { xs: 'nowrap', sm: 'wrap' } }}>
          {notifikasi.filter(n => n.unread).map((notif) => (
            <Grid item xs={10} sm={6} md={4} lg={3} key={notif.id} sx={{ minWidth: { xs: 260, sm: 'auto' } }}>
              <Paper elevation={4} sx={{
                p: { xs: 1.5, sm: 2.5 },
                borderRadius: 3,
                background: notif.status === 'Belum Diproses'
                  ? 'linear-gradient(90deg, #ef4444 60%, #fbbf24 100%)'
                  : notif.status === 'Diproses'
                  ? 'linear-gradient(90deg, #fbbf24 60%, #fde68a 100%)'
                  : 'linear-gradient(90deg, #22c55e 60%, #4ade80 100%)',
                color: '#fff',
                boxShadow: '0 2px 16px #ef4444aa',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                minWidth: 0,
                border: '2px solid #fff2',
                transition: 'all 0.2s',
                cursor: 'pointer',
                fontSize: { xs: 13, sm: 15 },
                '&:hover': {
                  boxShadow: '0 4px 24px #ef4444cc',
                  transform: 'scale(1.03)',
                  border: '2px solid #fff',
                },
              }}>
                <Typography fontWeight={700} fontSize={16}>{notif.kategori}</Typography>
                <Typography fontSize={15}>ID: {notif.id} | {notif.user}</Typography>
                <Typography fontSize={14}>Waktu: {notif.waktu}</Typography>
                <Typography fontSize={14} fontWeight={600} color="#fff">Status: {notif.status}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Snackbar Pop-up Notifikasi */}
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          Laporan baru masuk!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardPage; 