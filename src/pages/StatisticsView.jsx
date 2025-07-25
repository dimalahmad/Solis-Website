import {
    Typography,
    Box,
    Grid,
  } from "@mui/material";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid,
    Legend,
  } from "recharts";
  
  const COLORS = ["#42A5F5", "#66BB6A", "#FFA726", "#EF5350", "#8E24AA"];
  
  export default function StatisticsView({ data }) {
    const statusOptions = ["Belum Diproses", "Diproses", "Selesai"];
    const kategoriOptions = ["Kebakaran", "Kriminal", "Medis", "Kecelakaan"];
  
    const laporanPerStatus = statusOptions.map((s) => ({
      name: s,
      value: data.filter((lap) => lap.status === s).length,
    }));
  
    const laporanPerKategori = kategoriOptions.map((k) => ({
      name: k,
      value: data.filter((lap) => lap.kategori === k).length,
    }));
  
    const laporanPerHari = [...data]
      .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
      .reduce((acc, curr) => {
        const tanggal = curr.tanggal;
        const found = acc.find((d) => d.tanggal === tanggal);
        if (found) found.jumlah += 1;
        else acc.push({ tanggal, jumlah: 1 });
        return acc;
      }, []);
  
    return (
      <Box sx={{ my: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          📊 Statistik Visual
        </Typography>
  
        <Grid container spacing={3}>
          {/* Bar Chart: per Status */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Laporan per Status</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={laporanPerStatus}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1E88E5" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
  
          {/* Pie Chart: per Kategori */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Laporan per Kategori</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={laporanPerKategori}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={70}
                  label
                >
                  {laporanPerKategori.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
  
          {/* Line Chart: Tren Laporan */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">Tren Laporan per Hari</Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={laporanPerHari}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tanggal" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jumlah" stroke="#8E24AA" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    );
  }
  