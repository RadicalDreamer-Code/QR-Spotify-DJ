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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
} from "@mui/material";
import { Timeline } from "../components/SpotifyDJ/Timeline";
import { getSelectedSongsFromUser, removeSong, searchSong } from "../api/QRDJ";
import { SpotifySong } from "../interfaces";
import { SongEntry } from "../components/SpotifyDJ/SongEntry";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AllSongsDrawer } from "../components/SpotifyDJ/AllSongsDrawer";
import { DecadeLegend } from "../components/SpotifyDJ/DecadeLegend";

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

interface SpotifyDJProps {
  validHash: string;
}

export default function SpotifyDJ({ validHash }: SpotifyDJProps) {
  console.log(validHash);
  const [songs, setSongs] = React.useState<SpotifySong[]>([]);
  const [selectedSongs, setSelectedSongs] = React.useState<SpotifySong[]>([]);

  // snackbar
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string>("");

  // all songs drawer
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  useEffect(() => {
    // get all selected songs
    const getSelectedSongs = async () => {
      const selectedSongs = await getSelectedSongsFromUser(validHash);
      console.log(selectedSongs);
      setSelectedSongs(selectedSongs);
    };

    getSelectedSongs();
  }, []);

  if (!validHash) {
    return <Navigate to="/unauthorized" replace />;
  }

  // song results state
  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // search for song
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // call api
    try {
      const requestedSongs = await searchSong(data.get("song") as string);
      setSongs(requestedSongs);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfSelected = (song: SpotifySong) => {
    return selectedSongs.some((selectedSong) => selectedSong.uri === song.uri);
  };

  const handleSelect = (song: SpotifySong, message: string) => {
    if (selectedSongs.length < 25) {
      setSelectedSongs([...selectedSongs, song]);
    }

    setMessage(message);
    setOpen(true);
  };

  const handleRemove = (song: SpotifySong, message: string) => {
    setSelectedSongs(
      selectedSongs.filter((selectedSong) => selectedSong.uri !== song.uri)
    );

    setMessage(message);
    setOpen(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" className="spotify-container">
        <div>
          <CssBaseline />
          <div className="spotify-dj-header">
            <img src="./header_complete@2x-8.png"></img>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Box
              className="search-bar"
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <input
                className="search-song-input"
                type="text"
                name="song"
                placeholder="\\\\ SEARCH FOR SONGS HERE"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <button className="search-button">Search</button>
              {/* 
              <DecadeLegend />
              <Button onClick={() => toggleDrawer(true)} fullWidth>
                All Songs <ExpandMoreIcon />
              </Button>
              
              */}
            </Box>
          </Box>
          <div className="song-list-container">
            <List className="song-list" sx={{ width: "100%", maxWidth: 580 }}>
              {songs?.map((song) => (
                <SongEntry
                  key={song.uri}
                  song={song}
                  selected={checkIfSelected(song)}
                  handleSelect={handleSelect}
                  handleRemove={handleRemove}
                />
              ))}
            </List>
            <img
              className="song-list-img"
              src="./results_horizontal@2x-8.png"
            ></img>
          </div>
          <div className="spotify-dj-footer">
            <div>
              <img src="./swirlheader@2x-8.png"></img>
            </div>
            <p>Design BY FAB</p>
          </div>
          <div className="spotify-summary-sticky-footer">
            <p>Selected Songs: {selectedSongs.length} / 25</p>
            <button
              className="spotify-summary-button"
              onClick={() => toggleDrawer(true)}
            > Open all selected Songs</button>
          </div>
        </div>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
      <AllSongsDrawer
        open={drawerOpen}
        toggleDrawer={toggleDrawer}
        songs={selectedSongs}
        handleRemove={handleRemove}
      />
      <Box
        sx={{
          marginTop: 8,
          display: "fixed",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {"Selected Songs: " + selectedSongs.length + " / 25"}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}
