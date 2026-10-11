
import * as React from "react";
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212020",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
    button: {
      textTransform: "none",
    },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } =
    React.useContext(AuthContext);

  const isSignUp = formState === 1;

  const handleAuth = async () => {
    setError("");

    try {
      if (!isSignUp) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(
          name,
          username,
          password
        );

        setMessage(result || "Registration successful");
        setOpen(true);
        setName("");
        setUsername("");
        setPassword("");
        setFormState(0);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    }
  };

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
      backgroundColor: "#ecf3f6",
      fontSize: "15px",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "1px solid #bec3c5",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#555",
      fontSize: "13px",
    },
    "& .MuiInputBase-input": {
      color: "#222",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, md: 4 },
          boxSizing: "border-box",
          background:
            " #eeeef3 ",
        }}
      >
        {/* Main white card */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1020,
            minHeight: { xs: "auto", md: 530 },
            display: "flex",
            overflow: "hidden",
            borderRadius: "22px",
            backgroundColor: "#ffffff",
            boxShadow: "0 15px 45px rgba(0,0,0,0.10)",
          }}
        >
          {/* Left side: Authentication form */}
          <Box
            sx={{
              width: { xs: "100%", md: "64%" },
              p: { xs: 3, sm: 5, md: 9 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "#111111",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                color: "orange",
                textAlign:'center',
                // marginTop:'10px',
                fontWeight: 600,
                fontSize: 30,
                mb: 1,
              }}
            >
              Meetly
            </Typography>

            {/* <Typography
              sx={{
                fontSize: 11,
                mb: 1,
                color: "#555555",
              }}
            >
              {isSignUp ? "Get started with Meetly" : ""}
            </Typography> */}

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                mb: 2,
                color: "#080808",
              }}
            >
              {isSignUp ? "Sign Up" : "Log In"}
            </Typography>

            {/* Sign In / Sign Up tabs */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
              }}
            >
              {["Sign In", "Sign Up"].map((label, index) => (
                <Button
                  key={label}
                  onClick={() => {
                    setFormState(index);
                    setError("");
                  }}
                  sx={{
                    p: 0,
                    minWidth: "auto",
                    fontSize: 14,
                    color:
                      formState === index ? "#3C76D2" : "#3C76D2",
                    borderBottom:
                      formState === index
                        ? "1px solid #3C76D2"
                        : "1px solid transparent",
                    borderRadius: 0,
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {/* Form */}
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAuth();
              }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                maxWidth: 390,
                width: "100%",
              }}
            >
              {isSignUp && (
                <TextField
                  fullWidth
                  required
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  sx={inputStyle}
                />
              )}

              <TextField
                fullWidth
                required
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                sx={inputStyle}
              />

              <TextField
                fullWidth
                required
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={
                  isSignUp ? "new-password" : "current-password"
                }
                sx={inputStyle}
              />

              {error && (
                <Typography
                  sx={{
                    color: "#d32f2f",
                    fontSize: 13,
                  }}
                >
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  alignSelf: "center",
                  minWidth: 110,
                  borderRadius: "10px",
                  backgroundColor: "#3C76D2",
                  padding:'10px',
                  color: "#ffffff",
                  fontSize: 15,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#4b87e9",
                    boxShadow: "none",
                  },
                }}
              >
                {isSignUp ? "SIGN UP" : "LOGIN  →"}
              </Button>
            </Box>

            {/* Switch between login and registration */}
            <Typography
              sx={{
                mt: 3,
                textAlign: "center",
                fontSize: 14,
                color: "#8f8b8b",
                maxWidth: 390,
              }}
            >
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account yet?"}{" "}

              <Box
                component="span"
                onClick={() => {
                  setFormState(isSignUp ? 0 : 1);
                  setError("");
                }}
                sx={{
                  color: "orange",
                  cursor: "pointer",
                  ml: 0.5,
                }}
              >
                {isSignUp ? "Sign in" : "Sign up for free"}
              </Box>
            </Typography>
          </Box>

          {/* Right side: Add your illustration here */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "50%",
              m: 0,
              backgroundColor: "#b8dfeb",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "22px",
              overflow: "hidden",
            }}
          >
            {/* Import your image and place it here when ready.
                Example: */}

                 <Box
                  component="img"
                  src={'undraw_remote-worker_0l91.svg'}
                  alt="Meetly illustration"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
          </Box>
        </Box>
      </Box>

      {/* Registration success message */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
