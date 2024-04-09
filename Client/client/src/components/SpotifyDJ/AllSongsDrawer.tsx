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
  // Drawer list not close
  const DrawerList = (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          80s
        </AccordionSummary>
        <AccordionDetails>
        <List>
          {props.songs.length > 0 ? props.songs.map((song, index) => (
            <ListItem key={song.uri} disablePadding>
              <ListItemButton onClick={() => handleSong(song)}>
                <ListItemText primary={song.name} />
              </ListItemButton>
            </ListItem>
          )) : <Typography>Keine Songs vorhanden</Typography>}
        </List>
        </AccordionDetails>
      </Accordion>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          90s
        </AccordionSummary>
        <AccordionDetails>
        <List>
          {props.songs.map((song, index) => (
            <ListItem key={song.uri} disablePadding>
              <ListItemButton onClick={() => handleSong(song)}>
                <ListItemText primary={song.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </AccordionDetails>
      </Accordion>
    </>
  );

  return (
    <Drawer
      //   variant="persistent"
      anchor={"left"}
      open={props.open}
      onClose={() => props.toggleDrawer(false)}
    >
      <DrawerHeader>
        <IconButton onClick={() => props.toggleDrawer(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      {DrawerList}
    </Drawer>
  );
};
