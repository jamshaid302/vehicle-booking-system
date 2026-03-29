import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import type { ICustomer } from "../../types/customer";

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<ICustomer>) => void;
  initialData?: Partial<ICustomer>;
}

const getInitialState = (data?: Partial<ICustomer>) => ({
  name: data?.name || "",
  email: data?.email || "",
  phone: data?.phone || "",
});

export const CustomerModal: React.FC<CustomerModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<ICustomer>>({});

  useEffect(() => {
    setFormData(getInitialState(initialData));
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Edit Customer" : "Add Customer"}
      </DialogTitle>
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
            label="Email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            type="number"
            value={formData?.phone}
            onChange={handleChange}
            fullWidth
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
