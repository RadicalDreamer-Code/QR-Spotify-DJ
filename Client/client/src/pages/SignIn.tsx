import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { setUsername } from "../api/account";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Let's go"}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

interface SignInProps {
  validHash: string;
}

export default function SignIn({ validHash }: SignInProps) {
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("name"),
      // password: data.get('password'),
    });

    if (!data.get("name")) {
      return;
    }

    setUsername(validHash, data.get("name") as string, data.get("birthyear") as string)
      .then((res) => {
        console.log(res);
        if (res.valid) {
          window.location.replace("/spotify");
        }

        // setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (success) {
    return <Navigate to="/spotify" replace />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="spotify-dj-header">
            <img src="../spotify/header_complete@2x-8.png"></img>
          </div>
          <Typography component="h1" variant="h5">
            Anmelden
          </Typography>
          <Box
            className="sign-in"
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              className="search-song-input"
              type="text"
              name="name"
              placeholder="\\\\ ENTER YOUR NAME"
            />
            <label>Birthyear</label>
            <input
              className="search-song-input"
              type="text"
              name="birthyear"
              placeholder="\\\\ (optional) birth year"
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Name"
              name="name"
            //   autoComplete="email"
              autoFocus
            /> */}

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <input type="submit" value="Submit"></input>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
          <div className="spotify-dj-footer">
            <div>
              <img src="./swirlheader@2x-8.png"></img>
            </div>
            <p>Design BY FAB</p>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
