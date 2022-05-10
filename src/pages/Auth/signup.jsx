import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const Signup = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const { user, session, error } = await supabase.auth.signUp({
        email: data.get("email"),
        password: data.get("password"),
      },{
        data: { 
          user_name: data.get('name')
        }
      });
      console.log("user", user);
      console.log("session", session);
      console.log("error", error);
      if(error.status === 422){
        console.log('password length should be more than 6 char');
      }
    } catch (error) {
      console.error("something went wrong",error);
    } finally {
      console.log("all went well");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
                <Link to="/login">
                  <Box
                    sx={{
                      color: "#1976d2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    have an account? Login
                  </Box>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
