import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  LockOutlinedIcon,
  Typography,
  Container,
} from "../../../getUi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requireData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    await dispatch(loginUser(requireData));
    navigate("/");
  };

  const guestHandler = async () => {
    const requireData = {
      email: "harshit@gmail.com",
      password: "123456",
    };
    await dispatch(loginUser(requireData));
    navigate("/");
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box
          component="form"
          onSubmit={loginHandleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            checked
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Login In
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 0, mb: 2 }}
            onClick={guestHandler}
          >
            Login As Guest
          </Button>
          <Grid container>
            <Grid item xs>
              <Box
                sx={{
                  color: "#1976d2",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Forgot password?
              </Box>
            </Grid>
            <Grid item>
              <Link to="/signup">
                <Box
                  sx={{
                    color: "#1976d2",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Don't have an account? Sign Up
                </Box>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
