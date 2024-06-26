import {
  Avatar,
  AvatarGroup,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { SpotifySong } from "../../interfaces";
import { addSong, removeSong } from "../../api/QRDJ";
import "./index.css";
import { Fade, Slide } from "react-awesome-reveal";
import { SongAddOption } from "./SongAddOption";

const selectClassNameBasedOnYear = (releaseDate: string) => {
  const year = parseInt(releaseDate.split("-")[0]);
  if (year < 1990) {
    return "anim-80s";
  } else if (year < 2000) {
    return "anim-90s";
  } else if (year < 2010) {
    return "anim-2000s";
  } else if (year < 2020) {
    return "anim-2010s";
  } else {
    return "anim-2020s";
  }
};

interface SongEntryProps {
  song: SpotifySong;
  selected: boolean;
  handleSelect: (song: SpotifySong, message: string, success: boolean) => void;
  handleRemove: (song: SpotifySong, message: string, success: boolean) => void;
}

interface EntryWithDiagonalImageProps {
  imageUrl: string;
  selected: boolean;
}

const EntryWithDiagonalImage = (props: EntryWithDiagonalImageProps) => {
  return (
    <div className="frame">
      {props.selected ? (
        <div className="song-entry-selected">
          <img src={"check.png"} alt="Your Image" width={50} height={"50%"} />
        </div>
      ) : null}
      <div className="fade-80s "></div>
      <img src={props.imageUrl} alt="Your Image" width={100} height={"100%"} />
    </div>
  );
};

export const SongEntry = (props: SongEntryProps) => {
  // Trash or Chill Option Dialog
  const [openOptionDialog, setOpenOptionDialog] = React.useState(false);
  
  const handleOptionClickOpen = () => {
    setOpenOptionDialog(true);
  };

  const handleOptionClose = () => {
    setOpenOptionDialog(false);
  };
  const hashUser = localStorage.getItem("validHash");
  const MAX_LENGTH = 25;
  const shortenedText =
    props.song.name.length > MAX_LENGTH
      ? `${props.song.name.slice(0, MAX_LENGTH)}...`
      : props.song.name;

  const handleSong = async (song: SpotifySong, trash: boolean = false, chill: boolean = false) => {
    song.user = hashUser as string;
    let success = false;
    handleOptionClose();

    if (!props.selected) {
      success = await addSong(song, trash, chill);
      song.trash = trash;
      song.chill = chill;
      console.log(success);

      if (success) {
        props.handleSelect(song, "Song hinzugefügt", success);
      } else {
        props.handleSelect(
          song,
          "Song konnte nicht hinzugefügt werden",
          success
        );
      }
    } else {
      success = await removeSong(song);

      if (success) {
        props.handleRemove(song, "Song entfernt", success);
      } else {
        props.handleRemove(song, "Song konnte nicht entfernt werden", success);
      }
    }
  };

  const goToSpotify = (uri: string) => {
    const trackId = uri.split(":")[2];
    const url = "https://open.spotify.com/intl-de/track/" + trackId;
    window.open(url, "_blank");
  };

  return (
    <>
      <Slide triggerOnce>
        <div className="song-entry-container">
          <div className="song-entry">
            <div className="image-display">
              <img
                src={props.song.album.images[0].url}
                alt="Your Image"
                width={50}
                height={"50%"}
              />
            </div>
            <div className="song-entry-text">
              <div className="song-entry-text-upper">
                <div className="song-entry-text-upper-left">
                  <p>{shortenedText}</p>
                  <p>{props.song.artists[0]?.name}</p>
                </div>
                <div className="song-entry-text-upper-right">
                  <p>
                    {Math.floor(props.song.duration_ms / 60000)}:
                    {Math.floor((props.song.duration_ms % 60000) / 1000)}
                  </p>
                </div>
              </div>
              <div className="song-entry-text-lower">
                <div className="song-entry-text-lower-left">
                  <p>{props.song.release_date}</p>
                </div>
                <div className="song-entry-text-lower-right">
                  <Button
                    onClick={() => goToSpotify(props.song.uri)}
                    variant="contained"
                    color="primary"
                  >
                    Play
                  </Button>
                  <Button
                    onClick={() => handleSong(props.song)}
                    variant="contained"
                    color="primary"
                  >
                    {!props.selected ? "Add" : "Remove"}
                  </Button>
                  {
                    !props.selected ? <Button
                    onClick={() => handleOptionClickOpen()}
                    variant="contained"
                    color="primary"
                  >
                    :
                  </Button> : null
                  }
                  
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              "song-entry-half-background " +
              (!props.selected
                ? selectClassNameBasedOnYear(props.song.release_date)
                : "song-entry-selected")
            }
          ></div>
        </div>
      </Slide>
      <SongAddOption
       open={openOptionDialog}
       handleClose={handleOptionClose}
       handleSong={(trash, chill) => handleSong(props.song, trash, chill)}
       />
    </>
  );

  // return (
  //   // flex div
  //   <div className="song-entry-container">
  //   <ListItem
  //     className={
  //       "song-entry " + selectClassNameBasedOnYear(props.song.release_date) + " sticky-state"
  //     }
  //     onClick={() => handleSong(props.song)}
  //     alignItems="flex-start"
  //   >
  //     {
  //       // Background image for the song
  //     }
  //     <EntryWithDiagonalImage imageUrl={props.song.album.images[0].url} selected={props.selected} />
  //     <ListItemText
  //       primary={shortenedText}
  //       secondary={
  //         <React.Fragment>
  //           <Typography
  //             className="song-entry-text"
  //             sx={{ display: "inline" }}
  //             component="span"
  //             variant="subtitle2"
  //             color="text.primary"
  //           >
  //             {props.song.release_date + " // "}
  //           </Typography>
  //           <Typography
  //             className="song-entry-text"
  //             sx={{ display: "inline" }}
  //             component="span"
  //             variant="subtitle2"
  //             color="text.secondary"
  //           >
  //             {props.song.artists[0]?.name}
  //           </Typography>
  //         </React.Fragment>
  //       }
  //     />
  //     {/* <AvatarGroup max={2}>
  //       <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
  //       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  //       <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
  //       <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
  //     </AvatarGroup> */}
  //     <Typography>
  //       Länge: {Math.floor(props.song.duration_ms / 60000)}:
  //       {Math.floor((props.song.duration_ms % 60000) / 1000)}
  //     </Typography>
  //   </ListItem>
  //   <Button
  //     onClick={() => goToSpotify(props.song.uri)}
  //     variant="contained"
  //     color="primary"
  //   >
  //     Play
  //   </Button>
  //   <Button>
  //     :
  //   </Button>
  //   </ div>
  // );
};
