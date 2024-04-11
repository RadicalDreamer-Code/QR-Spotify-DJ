import * as React from "react";
import Box from "@mui/material/Box";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { SpotifySong } from "../../interfaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { removeSong } from "../../api/QRDJ";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CloseRounded } from "@mui/icons-material";

interface TemporaryDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  songs: SpotifySong[];
  handleRemove: (song: SpotifySong, message: string) => void;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const AllSongsDrawer = (props: TemporaryDrawerProps) => {
  const hashUser = localStorage.getItem("validHash");
  const handleSong = async (song: SpotifySong) => {
    song.user = hashUser as string;
    console.log(song);
    let success = false;
    success = await removeSong(song);

    console.log(success);
    if (success) {
      props.handleRemove(song, "Song entfernt");
    } else {
      props.handleRemove(song, "Song konnte nicht entfernt werden");
    }
  };

  const filteredSongsByDecade = (decade: string): SpotifySong[] => {
    // get year
    const filteredSongs: SpotifySong[] = [];

    for (let song of props.songs) {
      const year = parseInt(song.release_date.slice(0, 4));
      console.log(year);
      if (song.trash) {
        if (decade == "Trash") {
            filteredSongs.push(song);
            console.log("ITS TRASH")
          }
          continue;
      } else if (song.chill) {
          if (decade == "Chill") {
            filteredSongs.push(song);
          }
          continue;
      }

      if (decade == "80s") {
        if (year < 1990 && year >= 1980) {
          filteredSongs.push(song);
        }
      } else if (decade == "90s") {
        if (year < 2000 && year >= 1990) {
          filteredSongs.push(song);
        }
      } else if (decade == "2000s") {
        if (year < 2010 && year >= 2000) {
          filteredSongs.push(song);
        }
      } else if (decade == "2010s") {
        if (year < 2020 && year >= 2010) {
          filteredSongs.push(song);
        }
      } else if (decade == "2020s") {
        if (year >= 2020) {
          filteredSongs.push(song);
        }
      }
    }

    return filteredSongs;
  };
  // Drawer list not close
  const DrawerList = (
    <div
    //  className="selection-drawer"
    >
      <p className="selection-drawer-title">////// SELECTED</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          80s
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("80s").length > 0 ? (
              filteredSongsByDecade("80s").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          90s
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("90s").length > 0 ? (
              filteredSongsByDecade("90s").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          2000s
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("2000s").length > 0 ? (
              filteredSongsByDecade("2000s").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          2010s
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("2010s").length > 0 ? (
              filteredSongsByDecade("2010s").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          2020s
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("2020s").length > 0 ? (
              filteredSongsByDecade("2020s").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          Trash
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("Trash").length > 0 ? (
              filteredSongsByDecade("Trash").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="selection-drawer-accordion-title"
        >
          Chill
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {filteredSongsByDecade("Chill").length > 0 ? (
              filteredSongsByDecade("Chill").map((song: SpotifySong, index) => (
                <ListItem key={song.uri} disablePadding>
                  <ListItemButton onClick={() => handleSong(song)}>
                    <ListItemText primary={song.name} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography style={{ color: "white" }}>
                Keine Songs vorhanden
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  return (
    <Drawer
      anchor={"bottom"}
      open={props.open}
      onClose={() => props.toggleDrawer(false)}
    >
      <DrawerHeader>
        <IconButton onClick={() => props.toggleDrawer(false)}>
          <CloseRounded color="info" />
        </IconButton>
      </DrawerHeader>
      {DrawerList}
    </Drawer>
  );
};
