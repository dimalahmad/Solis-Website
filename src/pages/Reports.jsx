import {
  Box, Typography, Grid, TextField, Select, MenuItem, Checkbox,
  FormControlLabel, FormGroup, Button, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, FormControl, InputLabel, OutlinedInput,
  Collapse, Pagination, Switch
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import StatisticsView from './StatisticsView';
import { useTheme } from '@mui/material/styles';

// Dummy data
const laporanDummy = [...Array(15)].map((_, i) => {
  const randomHour = Math.floor(Math.random() * 24);
  const randomMinute = Math.floor(Math.random() * 60);
  const fullTimestamp = dayjs()
    .subtract(i, 'day')
    .hour(randomHour)
    .minute(randomMinute)
    .second(0);

  return {
    id: `LAP-00${i + 1}`,
    tanggal: fullTimestamp.format('YYYY-MM-DD'),
    waktu: fullTimestamp.format('HH:mm'),
    user: ['Ahmad', 'Budi', 'Citra', 'Dewi'][i % 4],
    email: `user${i}@example.com`,
    kategori: ['Kebakaran', 'Kriminal', 'Medis', 'Kecelakaan'][i % 4],
    respon: `${2 + (i % 5)}m`,
    status: ['Belum Diproses', 'Diproses', 'Selesai'][i % 3],
    petugas: ['Rudi', 'Sari', 'Ani'][i % 3],
  };
});


const kategoriOptions = ['Kebakaran', 'Kriminal', 'Medis', 'Kecelakaan'];
const petugasOptions = ['Rudi', 'Sari', 'Ani'];
const statusColors = {
  'Belum Diproses': '#ef4444',
  'Diproses': '#fbbf24',
  'Selesai': '#22c55e',
};

function ReportsPage({ darkMode }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState(['Semua']);
  const [status, setStatus] = useState([]);
  const [petugas, setPetugas] = useState('Semua');
  const [sort, setSort] = useState('tanggal-desc');
  const [showStats, setShowStats] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setPage(1);
  }, [perPage]);

  const filtered = laporanDummy
    .filter((lap) =>
      (lap.user.toLowerCase().includes(search.toLowerCase()) ||
        lap.email.toLowerCase().includes(search.toLowerCase()) ||
        lap.kategori.toLowerCase().includes(search.toLowerCase()) ||
        lap.petugas.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((lap) => kategori.includes('Semua') || kategori.includes(lap.kategori))
    .filter((lap) => status.length === 0 || status.includes(lap.status))
    .filter((lap) => petugas === 'Semua' || lap.petugas === petugas)
    .filter((lap) => {
      const tanggal = dayjs(lap.tanggal);
      return (!startDate || tanggal.isAfter(dayjs(startDate).subtract(1, 'day'))) &&
             (!endDate || tanggal.isBefore(dayjs(endDate).add(1, 'day')));
    })
    .sort((a, b) => {
      const aDate = dayjs(a.tanggal);
      const bDate = dayjs(b.tanggal);
      if (sort === 'tanggal-desc') return bDate.diff(aDate);
      if (sort === 'tanggal-asc') return aDate.diff(bDate);
      if (sort === 'nama-asc') return a.user.localeCompare(b.user);
      if (sort === 'nama-desc') return b.user.localeCompare(a.user);
      if (sort === 'respon-asc') return parseInt(a.respon) - parseInt(b.respon);
      if (sort === 'respon-desc') return parseInt(b.respon) - parseInt(a.respon);
      return 0;
    });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Box
        elevation={3}
        sx={{
          minWidth: 900,
          p: { xs: 1, md: 2 },
          display: 'flex',
          flexDirection: 'column',
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: darkMode ? '#1E3A8A' : theme.palette.text.primary }}
        >
          Daftar Laporan
        </Typography>

        {/* FILTER */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Cari (Nama / Email / Kategori / Petugas)"
              variant="outlined"
              fullWidth
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Tanggal Mulai"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Tanggal Akhir"
              type="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Kategori</InputLabel>
              <Select
                multiple
                value={kategori}
                onChange={(e) => {
                  const value = e.target.value;
                  setKategori(value.includes('Semua') ? ['Semua'] : value.filter(v => v !== 'Semua'));
                }}
                input={<OutlinedInput label="Kategori" />}
              >
                <MenuItem value="Semua"><em>Semua</em></MenuItem>
                {kategoriOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Petugas</InputLabel>
              <Select
                value={petugas}
                onChange={(e) => setPetugas(e.target.value)}
                label="Petugas"
              >
                <MenuItem value="Semua"><em>Semua</em></MenuItem>
                {petugasOptions.map((opt) => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormGroup row>
              {['Belum Diproses', 'Diproses', 'Selesai'].map((s) => (
                <FormControlLabel
                  key={s}
                  control={
                    <Checkbox
                      checked={status.includes(s)}
                      onChange={() =>
                        setStatus((prev) =>
                          prev.includes(s) ? prev.filter((v) => v !== s) : [...prev, s]
                        )
                      }
                    />
                  }
                  label={s}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Urutkan</InputLabel>
              <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                <MenuItem value="tanggal-desc">Tanggal: Terbaru</MenuItem>
                <MenuItem value="tanggal-asc">Tanggal: Terlama</MenuItem>
                <MenuItem value="respon-asc">Respon: Cepat → Lambat</MenuItem>
                <MenuItem value="respon-desc">Respon: Lambat → Cepat</MenuItem>
                <MenuItem value="nama-asc">Nama: A-Z</MenuItem>
                <MenuItem value="nama-desc">Nama: Z-A</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              variant="contained"
              sx={{
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
              }}
            >
              Export Laporan
            </Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControlLabel
              control={<Switch checked={showStats} onChange={() => setShowStats(!showStats)} />}
              label="Tampilkan Statistik"
            />
          </Grid>
        </Grid>

        {/* Statistik */}
        <Collapse in={showStats}>
          <StatisticsView data={filtered} />
        </Collapse>

        {/* Tabel */}
        <Paper
          sx={{
            mt: 3,
            borderRadius: 3,
            overflowX: 'auto',
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ minWidth: 900 }}>
            <Table>
              <TableHead sx={{ backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200] }}>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Tanggal</TableCell>
                  <TableCell align="center">Waktu</TableCell>
                  <TableCell align="center">Nama</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Kategori</TableCell>
                  <TableCell align="center">Respon</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Petugas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((lap, i) => (
                  <TableRow
                    key={lap.id}
                    hover
                    onClick={() => navigate(`/detail-laporan?id=${lap.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell align="center">{(page - 1) * perPage + i + 1}</TableCell>
                    <TableCell align="center">{lap.id}</TableCell>
                    <TableCell align="center">{lap.tanggal}</TableCell>
                    <TableCell align="center">{lap.waktu}</TableCell>
                    <TableCell align="center">{lap.user}</TableCell>
                    <TableCell align="center">{lap.email}</TableCell>
                    <TableCell align="center">{lap.kategori}</TableCell>
                    <TableCell align="center">{lap.respon}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: 12,
                          background: statusColors[lap.status],
                          textAlign: 'center',
                          display: 'inline-block',
                        }}
                      >
                        {lap.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">{lap.petugas}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Paper>

        {/* Footer */}
        <Box mt={3} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Box flexGrow={1}>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Jumlah Per Halaman</InputLabel>
              <Select
                value={perPage}
                onChange={(e) => {
                  setPage(1);
                  setPerPage(parseInt(e.target.value));
                }}
                label="Jumlah Per Halaman"
              >
                {[5, 10, 20, 50].map((jumlah) => (
                  <MenuItem key={jumlah} value={jumlah}>
                    {jumlah}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box flexGrow={2} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Box>

          <Box flexGrow={1} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReportsPage;
