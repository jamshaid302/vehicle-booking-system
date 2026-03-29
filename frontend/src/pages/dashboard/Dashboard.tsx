import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Tabs, Tab } from "@mui/material";
import { getDashboardSummary } from "../../services/dashboardService";
import { CustomerList } from "../../components/customers/CustomerList";
import { Loader } from "../../components/common/Loader";
import { BookingList } from "../../components/bookings/BookingList";
import { VehicleList } from "../../components/vehicles/VehicleList";

interface DashboardSummary {
  totalCustomers: number;
  totalVehicles: number;
  totalBookings: number;
  totalRevenue: number;
}

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalCustomers: 0,
    totalVehicles: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await getDashboardSummary();
      setSummary(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const cardClasses = "p-4 rounded shadow text-white";

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <Box p={6}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3} mb={4}>
        <Paper
          className={`${cardClasses} bg-blue-600`}
          sx={{ flex: "1 1 220px" }}
        >
          <Typography>Total Customers</Typography>
          <Typography variant="h5">{summary.totalCustomers}</Typography>
        </Paper>

        <Paper
          className={`${cardClasses} bg-green-600`}
          sx={{ flex: "1 1 220px" }}
        >
          <Typography>Total Vehicles</Typography>
          <Typography variant="h5">{summary.totalVehicles}</Typography>
        </Paper>

        <Paper
          className={`${cardClasses} bg-yellow-600`}
          sx={{ flex: "1 1 220px" }}
        >
          <Typography>Total Bookings</Typography>
          <Typography variant="h5">{summary.totalBookings}</Typography>
        </Paper>

        <Paper
          className={`${cardClasses} bg-red-600`}
          sx={{ flex: "1 1 220px" }}
        >
          <Typography>Total Revenue</Typography>
          <Typography variant="h5">
            ${summary.totalRevenue.toLocaleString()}
          </Typography>
        </Paper>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Bookings" />
        <Tab label="Customers" />
        <Tab label="Vehicles" />
      </Tabs>

      <Box>
        <Box hidden={tab !== 0}>
          <BookingList />
        </Box>

        <Box hidden={tab !== 1}>
          <CustomerList />
        </Box>

        <Box hidden={tab !== 2}>
          <VehicleList />
        </Box>
      </Box>
    </Box>
  );
};
