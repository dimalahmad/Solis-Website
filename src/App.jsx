import { useState, useEffect } from 'react';
import {
  Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton,
  List, ListItem, ListItemIcon, ListItemText, Avatar, Badge, InputBase,
  Switch, Paper, ListItemButton, useMediaQuery, useTheme
} from '@mui/material';
import {
  Dashboard, ListAlt, Assessment, Settings, Notifications,
  Search, Person, Brightness4, Brightness7, Menu
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import ReportsPage from './pages/Reports';
import RecapPage from './pages/Recap';
import SettingsPage from './pages/Settings';
import './App.css';
import logo from './assets/react.svg';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Daftar Laporan', icon: <ListAlt />, path: '/laporan' },
  { text: 'Rekap Laporan', icon: <Assessment />, path: '/rekap' },
  { text: 'Pengaturan', icon: <Settings />, path: '/pengaturan' },
];

const petugasList = [
  { name: 'Ahmad', online: true },
  { name: 'Budi', online: true },
  { name: 'Citra', online: false },
  { name: 'Dewi', online: true },
  { name: 'Eka', online: false },
  { name: 'Fajar', online: true },
  { name: 'Gita', online: true },
  { name: 'Hana', online: false },
  { name: 'Indra', online: true },
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('solis_dark_mode');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('solis_dark_mode', darkMode);
  }, [darkMode]);

  const themeMui = useTheme();
  const isMobile = useMediaQuery(themeMui.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#1E3A8A' },
      background: {
        default: darkMode ? '#101624' : '#F3F4F6',
        paper: darkMode ? 'rgba(16,22,36,0.85)' : '#fff',
      },
    },
    typography: {
      fontFamily: 'Poppins, Roboto, Arial',
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
    },
  });

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: 'center', mt: 2, mb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="SOLIS Logo" style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            boxShadow: darkMode ? '0 0 16px #60a5fa' : '0 0 8px #1E3A8A',
            marginBottom: 8
          }} />
          <Typography variant="h6" sx={{
            fontWeight: 700, letterSpacing: 1,
            color: darkMode ? '#fff' : '#1E3A8A',
            fontSize: 22,
            fontFamily: 'Poppins, Roboto'
          }}>
            SOLIS Petugas
          </Typography>
        </Box>
      </Toolbar>
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1, borderRadius: 2 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={active}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  background: active
                    ? (darkMode
                      ? 'linear-gradient(90deg, #ef4444 60%, #f59e42 100%)'
                      : 'linear-gradient(90deg, #f87171 60%, #fbbf24 100%)')
                    : 'none',
                  boxShadow: active ? '0 0 16px 2px #ef4444, 0 0 8px #fbbf24' : 'none',
                  color: active ? '#fff' : (darkMode ? '#c7d2fe' : '#1E3A8A'),
                  fontWeight: active ? 800 : 500,
                  fontSize: 18,
                  letterSpacing: 0.5,
                  transition: '0.2s',
                  '& .MuiListItemIcon-root': {
                    color: active ? '#fff' : (darkMode ? '#c7d2fe' : '#1E3A8A'),
                    filter: active ? 'drop-shadow(0 0 6px #ef4444)' : 'none',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, pt: 0, textAlign: 'center' }}>
        <Typography variant="subtitle2" sx={{ color: darkMode ? '#a5b4fc' : '#1E3A8A', fontWeight: 600, mb: 1, fontSize: 15 }}>
          Petugas Online
        </Typography>
        <Box sx={{
          maxHeight: 220,
          overflowY: 'auto',
          pr: 1,
          scrollbarWidth: 'thin',
          scrollbarColor: darkMode ? '#334155 #232946' : '#1E3A8A #e0e7ef',
          '&::-webkit-scrollbar': {
            width: 8,
            background: darkMode ? '#232946' : '#e0e7ef',
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb': {
            background: darkMode ? '#334155' : '#1E3A8A',
            borderRadius: 8,
          },
        }}>
          {petugasList.map((p) => (
            <Box key={p.name} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: p.online ? '#22d3ee' : '#64748b', fontSize: 15 }}>{p.name[0]}</Avatar>
              <Typography sx={{ color: darkMode ? (p.online ? '#fff' : '#cbd5e1') : (p.online ? '#1E293B' : '#64748b'), fontWeight: 500, fontSize: 15 }}>{p.name}</Typography>
              {p.online && <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#4ade80', ml: 1 }} />}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', background: theme.palette.background.default }}>
        
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: darkMode
                  ? 'linear-gradient(160deg, #1E3A8A 60%, #991B1B 100%)'
                  : 'linear-gradient(160deg, #fff 60%, #fca5a5 100%)',
                color: darkMode ? '#fff' : '#1E3A8A',
                border: 'none',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Mobile Sidebar */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                background: darkMode
                  ? 'linear-gradient(160deg, #1E3A8A 60%, #991B1B 100%)'
                  : 'linear-gradient(160deg, #fff 60%, #fca5a5 100%)',
                color: darkMode ? '#fff' : '#1E3A8A',
                border: 'none',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, ml: 0 }}>
          {/* AppBar */}
          <AppBar position="static" elevation={0} sx={{
            background: darkMode ? 'rgba(16,22,36,0.95)' : '#fff',
            color: '#1E3A8A',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <Toolbar>
              {isMobile && (
                <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                  <Menu />
                </IconButton>
              )}
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                <InputBase
                  placeholder="Cari laporan, pengguna..."
                  sx={{
                    ml: 1,
                    flex: 1,
                    background: darkMode ? '#232946' : '#F1F5F9',
                    px: 2, py: 0.5, borderRadius: 2,
                    fontSize: 16,
                    width: isMobile ? '100%' : 320,
                    color: darkMode ? '#fff' : '#1E3A8A'
                  }}
                  startAdornment={<Search sx={{ mr: 1, color: '#94A3B8' }} />}
                />
              </Box>
              {!isMobile && (
                <>
                  <IconButton color="inherit" sx={{ mr: 2 }}>
                    <Badge badgeContent={3} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                  <IconButton color="inherit">
                    <Avatar sx={{ bgcolor: '#1E3A8A' }}>A</Avatar>
                  </IconButton>
                </>
              )}
            </Toolbar>
          </AppBar>

          {/* Konten */}
          <Box sx={{ p: 3, width: '100%', mx: 0 }}>
            <Routes>
              <Route path="/" element={<DashboardPage darkMode={darkMode} />} />
              <Route path="/laporan" element={<ReportsPage />} />
              <Route path="/rekap" element={<RecapPage />} />
              <Route path="/pengaturan" element={<SettingsPage />} />
            </Routes>
          </Box>
        </Box>

        {/* Theme Switcher */}
        <Paper elevation={6} sx={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          p: 1.5, borderRadius: 8, display: 'flex', alignItems: 'center',
          background: darkMode ? '#232946' : '#fff',
          boxShadow: '0 4px 24px #0002'
        }}>
          <Brightness7 sx={{ color: darkMode ? '#c7d2fe' : '#1E3A8A' }} />
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="primary" />
          <Brightness4 sx={{ color: darkMode ? '#facc15' : '#a21caf' }} />
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
