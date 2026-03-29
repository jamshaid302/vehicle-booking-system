import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import type { IVehicle } from "../../types/vehicle";

interface VehicleTableProps {
  data: IVehicle[];
  onEdit: (vehicle: IVehicle) => void;
  onDelete: (id: string) => void;
}

export const VehicleTable: React.FC<VehicleTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Plate Number</TableCell>
            <TableCell>Rent / Day</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Vehicles found
              </TableCell>
            </TableRow>
          ) : (
            data.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.name}</TableCell>
                <TableCell>{vehicle.vehicleModel}</TableCell>
                <TableCell>{vehicle.plateNumber}</TableCell>
                <TableCell>Rs {vehicle.rentPrice.toLocaleString()}</TableCell>
                <TableCell>{vehicle.available ? "Yes" : "No"}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(vehicle)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(vehicle._id!)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
