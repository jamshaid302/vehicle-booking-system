import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import type { IVehicle } from "../../types/vehicle";

interface VehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<IVehicle>) => void;
  initialData?: Partial<IVehicle>;
}

const getInitialState = (data?: Partial<IVehicle>) => ({
  name: data?.name || "",
  vehicleModel: data?.vehicleModel || "",
  plateNumber: data?.plateNumber || "",
  rentPrice: data?.rentPrice || 0,
  available: data?.available ?? true,
});

export const VehicleModal: React.FC<VehicleModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<IVehicle>>({});

  useEffect(() => {
    setFormData(getInitialState(initialData));
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    });
  };

  const handleSave = () => onSave(formData);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Edit Vehicle" : "Add Vehicle"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Model"
            name="vehicleModel"
            value={formData?.vehicleModel}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Plate Number"
            name="plateNumber"
            value={formData?.plateNumber}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Rent Price"
            name="rentPrice"
            type="number"
            value={formData?.rentPrice}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                name="available"
                checked={formData?.available ?? true}
                onChange={handleChange}
              />
            }
            label="Available"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          {initialData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
