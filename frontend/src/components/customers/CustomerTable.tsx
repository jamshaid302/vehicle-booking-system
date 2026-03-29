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
import type { ICustomer } from "../../types/customer";

interface CustomerTableProps {
  data: ICustomer[];
  onEdit: (customer: ICustomer) => void;
  onDelete: (id: string) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
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
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No Customers found
              </TableCell>
            </TableRow>
          ) : (
            data.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
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
