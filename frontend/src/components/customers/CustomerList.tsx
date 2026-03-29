import React, { useEffect, useState, memo, useCallback } from "react";
import { CustomerTable } from "./CustomerTable";
import { CustomerModal } from "./CustomerModal";
import type { ICustomer } from "../../types/customer";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";
import {
  Button,
  Box,
  Pagination,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Loader } from "../common/Loader";
import SearchIcon from "@mui/icons-material/Search";

export const CustomerList: React.FC = memo(() => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await getCustomers(page, 10, searchTerm);
      setCustomers(res?.data?.data);
      setTotalPages(res?.data?.pages);
    } catch (err) {
      console.error(err);
      alert(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page, searchTerm]);

  const handleSave = async (customer: Partial<ICustomer>) => {
    try {
      if (editingCustomer) await updateCustomer(editingCustomer._id, customer);
      else await createCustomer(customer);
      setModalOpen(false);
      setEditingCustomer(null);
      fetchCustomers();
    } catch (err) {
      console.error(err);
      alert(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Something went wrong",
      );
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure?")) return;
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (err) {
        console.error(err);
        alert(
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message || "Something went wrong",
        );
      }
    },
    [page],
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={4}
          gap={2}
        >
          <TextField
            name="search"
            variant="outlined"
            size="small"
            placeholder="Search booking"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" onClick={() => setModalOpen(true)}>
            Add Customer
          </Button>
        </Box>
      </div>

      <Box position="relative">
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.6)",
              zIndex: 10,
            }}
          >
            <Loader />
          </Box>
        )}

        <CustomerTable
          data={customers}
          onEdit={(c) => {
            setEditingCustomer(c);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        {totalPages && (
          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>

      <CustomerModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSave}
        initialData={editingCustomer || undefined}
      />
    </div>
  );
});
