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
import type { IBooking } from "../../types/booking";

interface BookingTableProps {
  data: IBooking[];
  onEdit: (customer: IBooking) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const BookingTable: React.FC<BookingTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Vehicle</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Bookings found
              </TableCell>
            </TableRow>
          ) : (
            data.map((c) => (
              <TableRow key={c._id}>
                <TableCell>
                  {typeof c.customer === "object"
                    ? c.customer.name
                    : c.customer}
                </TableCell>
                <TableCell>
                  {typeof c.vehicle === "object" ? c.vehicle.name : c.vehicle}
                </TableCell>
                <TableCell>${c.totalPrice.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(c.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(c.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{c.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(c)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(c._id)}>
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
