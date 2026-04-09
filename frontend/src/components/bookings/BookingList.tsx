import React, { useEffect, useState, memo, useCallback, useRef } from "react";
import { BookingTable } from "../../components/bookings/BookingTable";
import { BookingModal } from "../../components/bookings/BookingModal";
import type { IBooking } from "../../types/booking";
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../services/bookingService";
import {
  Button,
  Box,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Loader } from "../common/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "../../utils/hook";

export const BookingList: React.FC = memo(() => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<IBooking | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchBookings = async (signal?: AbortSignal) => {
    setLoading(true);
    try {
      const res = await getBookings(page, 10, debouncedSearchTerm, signal);
      setBookings(res?.data?.data || []);
      setTotalPages(res?.data?.pages || 1);
    } catch (err: any) {
      if (err.name === "CanceledError") return;
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
    const controller = new AbortController();
    fetchBookings(controller.signal);

    return () => controller.abort();
  }, [page, debouncedSearchTerm]);

  const handleSave = async (booking: Partial<IBooking>) => {
    try {
      if (editingBooking) await updateBooking(editingBooking._id, booking);
      else await createBooking(booking);
      setModalOpen(false);
      setEditingBooking(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
      // alert(
      //   (err as { response?: { data?: { message?: string } } }).response?.data
      //     ?.message || "Something went wrong",
      // );
    }
  };

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Are you sure you want to delete this booking?")) return;
      try {
        await deleteBooking(id);
        fetchBookings();
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
            Add Booking
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

        <BookingTable
          data={bookings}
          onEdit={(b) => {
            setEditingBooking(b);
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

      <BookingModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSave}
        initialData={editingBooking || undefined}
      />
    </div>
  );
});
