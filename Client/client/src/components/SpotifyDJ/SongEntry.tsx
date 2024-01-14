import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import React from "react"
import { SpotifySong } from "../../interfaces"
import { addSong } from "../../api/QRDJ"

interface SongEntryProps {
    song: SpotifySong
}

export const SongEntry = (props: SongEntryProps) => {
    const handleAddSong = async (song: SpotifySong) => {
        const success = await addSong(song);
        console.log("success: ", success)
    }

    return(
    <ListItem 
    onClick={() => handleAddSong(props.song)}
    alignItems="flex-start">
    <ListItemAvatar>
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </ListItemAvatar>
    <ListItemText
        primary={props.song.song}
        secondary={
            <React.Fragment>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                {props.song.release_date + " // "}
            </Typography>
            {props.song.artist_name}
            </React.Fragment>
        }
    />
</ListItem>)
}