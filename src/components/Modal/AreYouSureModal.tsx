import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Typography } from '@mui/material';
import IconWrapper from '../IconWrapper/IconWrapper';

interface AreYouSureModalProps {
  text?: string;
  item?: string;
  handleDelete: () => void;
}

const AreYouSureModal = ({ text, item, handleDelete }: AreYouSureModalProps) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onConfirm = () => {
    handleDelete();
    handleClose();
  };

  return (
    <React.Fragment>
      <IconWrapper onClick={handleOpen} type={'delete'} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            {text ? text : `Are you sure you want to delete this ${item ? item : 'item'}?`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={onConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AreYouSureModal;
