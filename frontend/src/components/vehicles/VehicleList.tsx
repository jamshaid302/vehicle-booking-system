import React, { useEffect, useState, memo, useCallback } from "react";
import type { IVehicle } from "../../types/vehicle";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../../services/vehicleService";
import {
  Button,
  Box,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Loader } from "../common/Loader";
import { VehicleTable } from "./VehicleTable";
import { VehicleModal } from "./VehicleModal";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../utils/hook";

export const VehicleList: React.FC = memo(() => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await getVehicles(page, 10, debouncedSearchTerm);
      setVehicles(res?.data?.data);
      setTotalPages(res?.data?.pages || 1);
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

  useEffect(() => {
    fetchVehicles();
  }, [page, debouncedSearchTerm]);

  const handleSave = async (vehicle: Partial<IVehicle>) => {
    try {
      if (editingVehicle) await updateVehicle(editingVehicle._id!, vehicle);
      else await createVehicle(vehicle);
      setModalOpen(false);
      setEditingVehicle(null);
      fetchVehicles();
    } catch (err) {
      console.error(err);
      console.error(err);
      alert(
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Something went wrong",
      );
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to delete this vehicle?")) return;
      try {
        await deleteVehicle(id);
        fetchVehicles();
      } catch (err) {
        console.error(err);
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
            Add Vehicle
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

        <VehicleTable
          data={vehicles}
          onEdit={(v) => {
            setEditingVehicle(v);
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

      <VehicleModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingVehicle(null);
        }}
        onSave={handleSave}
        initialData={editingVehicle || undefined}
      />
    </div>
  );
});
