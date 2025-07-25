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
              Dashboard Petugas
            </Typography>
            <Typography variant="body1" sx={{ color: darkMode ? '#fbbf24' : '#991B1B', fontWeight: 600 }}>
              Selamat datang di panel petugas SOLIS
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center', gap: 2, ml: { md: 'auto' }}}>
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
      {/* Layout utama 2 kolom 50:50, stretch tinggi penuh dan responsif */}
      <Grid container spacing={0} sx={{ minHeight: 'calc(100vh - 120px)', width: '100%', p: 0, m: 0, display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {/* Kiri: Judul dan satu card laporan besar di kiri atas */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 50%' }, maxWidth: { md: '50%' }, display: 'flex', flexDirection: 'column', height: '100%', p: 0, m: 0}}>
          <Paper elevation={3} sx={{ p: { xs: 1, md: 2 }, height: { xs: 'auto', md: '100%' }, display: 'flex', flexDirection: 'column', bgcolor: darkMode ? '#232946' : '#fff', minWidth: 0, minHeight: 0 }}>
            <Typography fontWeight={700} mb={2} fontSize={20} color={darkMode ? '#1E90FF' : '#1E3A8A'}>
              Laporan Terbaru
            </Typography>
            <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 2, pr: 1,}}>

              {[...notifikasi.filter(n => n.unread)].sort((a, b) => {
                // Urutkan waktu terbaru ke atas (format waktu: 'HH:MM')
                const [ah, am] = a.waktu.split(':').map(Number);
                const [bh, bm] = b.waktu.split(':').map(Number);
                return (bh * 60 + bm) - (ah * 60 + am);
              }).map((notif, idx) => (
                <Paper elevation={2} key={notif.id} sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', md: '93%' },
                  minWidth: 0,
                  height: 120,
                  ml: { xs: 0, md: 3 },
                  mt: idx === 0 ? { xs: 0, md: 3 } : 2,
                  display: 'flex',
                  alignItems: 'center',
                  px: 3,
                  borderRadius: 3,
                  background: notif.status === 'Belum Diproses'
                    ? 'linear-gradient(90deg, #ef4444 60%, #fbbf24 100%)'
                    : notif.status === 'Diproses'
                    ? 'linear-gradient(90deg, #fbbf24 60%, #fde68a 100%)'
                    : 'linear-gradient(90deg, #22c55e 60%, #4ade80 100%)',
                  color: '#fff',
                  boxShadow: '0 2px 16px #ef4444aa',
                  fontSize: 15,
                  border: '2px solid #fff2',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 4px 24px #ef4444cc',
                    transform: 'scale(1.03)',
                    border: '2px solid #fff',
                  },
                }}>
                  <Box>
                    <Typography fontWeight={700} fontSize={16}>{notif.kategori}</Typography>
                    <Typography fontSize={14}>ID: {notif.id} | {notif.user}</Typography>
                    <Typography fontSize={13}>Waktu: {notif.waktu}</Typography>
                    <Typography fontSize={13} fontWeight={600} color="#fff">Status: {notif.status}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        {/* Kanan: 6 card (4 statistik utama + 2 chart), grid 2 kolom x 3 baris, stretch penuh */}
        <Grid item xs={12} md={6} sx={{ flex: { md: '0 0 50%' }, maxWidth: { md: '50%' }, display: 'flex', flexDirection: 'column', height: '100%', p: 0, m: 0}}>
          <Box sx={{ flex: 1, height: { xs: 'auto', md: '100%' }, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: { xs: 2, md: 4 }, minWidth: 0, minHeight: 0, p: { xs: 1, md: 3 } }}>
            {/* 4 card statistik utama */}
            {stats.map((stat, idx) => (
              <Paper
                key={stat.label}
                elevation={6}
                sx={{
                  width: '100%',
                  height: '100%',
                  minWidth: 0,
                  minHeight: 0,
                  p: 2,
                  borderRadius: 4,
                  background: stat.color,
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 32px ${stat.shadow}99, 0 0 16px #fff1`,
                  border: '2px solid #fff2',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    boxShadow: `0 8px 32px ${stat.shadow}cc, 0 0 24px #fff2`,
                  },
                }}
              >
                <Box sx={{ fontSize: 36, mb: 1 }}>{stat.icon}</Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ mb: 0.5, textAlign: 'center', fontSize: 24 }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ textAlign: 'center', fontWeight: 700, fontSize: 15 }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            ))}
            {/* Card Chart: PieChart */}
            <Paper elevation={6} sx={{
              width: '100%',
              height: '100%',
              minWidth: 0,
              minHeight: 0,
              p: 2,
              borderRadius: 4,
              background: darkMode ? '#232946' : '#fff',
              color: darkMode ? '#fff' : '#1E3A8A',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 32px #0001',
              border: '2px solid #fff2',
            }}>
              <Typography fontWeight={700} mb={1} fontSize={15}>Laporan per Kategori</Typography>
              <ResponsiveContainer width="100%" height={120}>
                <PieChart>
                  <Pie
                    data={kategoriData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={35}
                    labelLine={false}
                    label={({ name, percent }) => `${Math.round(percent * 100)}%`}
                  >
                    {kategoriData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={kategoriColors[idx % kategoriColors.length]} />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    formatter={(value, entry) => (
                      <span style={{ fontSize: 12 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
            {/* Card Chart: BarChart */}
            <Paper elevation={6} sx={{
              width: '100%',
              height: '100%',
              minWidth: 0,
              minHeight: 0,
              p: 2,
              borderRadius: 4,
              background: darkMode ? '#232946' : '#fff',
              color: darkMode ? '#fff' : '#1E3A8A',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 32px #0001',
              border: '2px solid #fff2',
            }}>
              <Typography fontWeight={700} mb={1} fontSize={15}>Status Laporan</Typography>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={statusData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
                  <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#1E3A8A'} />
                  <YAxis stroke={darkMode ? '#fff' : '#1E3A8A'} allowDecimals={false} />
                  <Tooltip />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    iconType="square"
                    formatter={(value) => <span style={{ fontSize: 12 }}>{value}</span>}
                  />
                  <Bar dataKey="value">
                    {statusData.map((entry, idx) => (
                      <Cell key={`cell-status-${idx}`} fill={statusColors[idx % statusColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Grid>
      </Grid>

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