import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { signup } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

export const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await signup(email, password);

      if (res.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error("err", err);

      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // const handleClose = (
  //   event: React.SyntheticEvent | Event,
  //   reason?: SnackbarCloseReason,
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenToast(false);
  // };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={3}>
          Signup
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Signup"}
        </Button>

        <Typography mt={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Paper>

      {/* <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Signup Successfull. Please Login"
      /> */}
    </Box>
  );
};
