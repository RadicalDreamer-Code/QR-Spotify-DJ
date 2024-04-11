import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSong: (trash: boolean, chill: boolean) => void;
  // onClose: (value: string) => void;
}

export function SongAddOption(props: SimpleDialogProps) {
  const { open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
  };

  const handleListItemClick = (trash: boolean, chill: boolean) => {
    props.handleSong(trash, chill);
  };

  return (
    <Dialog className='optionDialog' closeAfterTransition onClose={handleClose} open={open}>
      {/* <DialogTitle>Set backup account</DialogTitle> */}
        <button
          className='optionDialog-button'
        onClick={props.handleClose}>
          X
        </button>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick(true, false)}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add to trash music list" />
          </ListItemButton>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick(false, true)}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add to chill music list (after 12pm)" />
          </ListItemButton>
        </ListItem>
    </Dialog>
  );
}