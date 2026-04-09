import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import type { IBooking } from "../../types/booking";
import { getCustomers } from "../../services/customerService";
import { getAvailableVehicles } from "../../services/vehicleService";
import type { ICustomer } from "../../types/customer";
import type { IVehicle } from "../../types/vehicle";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<IBooking>) => void;
  initialData?: Partial<IBooking>;
}

const getInitialState = (data?: Partial<IBooking>) => ({
  customer:
    typeof data?.customer === "object" ? data?.customer._id : data?.customer,
  vehicle:
    typeof data?.vehicle === "object" ? data?.vehicle._id : data?.vehicle,
  startDate: data?.startDate || "",
  endDate: data?.endDate || "",
  totalPrice: data?.totalPrice || 0,
  status: data?.status || "booked",
});

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<IBooking>>({});
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(getInitialState(initialData));
  }, [initialData]);

  useEffect(() => {
    if (!open) return;
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const custRes = await getCustomers(1, 1000);
        const vehRes = await getAvailableVehicles();

        setCustomers(custRes?.data?.data || []);
        setVehicles(vehRes?.data?.data || []);
      } catch (err) {
        console.error(err);
        // alert(
        //   (err as { response?: { data?: { message?: string } } }).response?.data
        //     ?.message || "Something went wrong",
        // );
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => onSave(formData);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Edit Booking" : "Add Booking"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            select
            label="Customer"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            fullWidth
          >
            {customers.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            fullWidth
          >
            {vehicles.map((v) => (
              <MenuItem key={v._id} value={v._id}>
                {v.name} ({v.vehicleModel})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate?.toString().slice(0, 10) || ""}
            onChange={handleChange}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate?.toString().slice(0, 10) || ""}
            onChange={handleChange}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
          <TextField
            label="Total Price"
            name="totalPrice"
            type="number"
            value={formData.totalPrice}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            label="Status"
            name="status"
            value={formData.status || "booked"}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="booked">Booked</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {initialData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
