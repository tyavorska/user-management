import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { User } from '../../../utils/types';

interface UserFormProps {
  title: string;
  open: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (user: Partial<User>) => void;
  initialData?: Partial<User>;
}

const UserForm: React.FC<UserFormProps> = ({
  title,
  open,
  setOpenForm,
  onSubmit,
  initialData = {},
}) => {
  const [email, setEmail] = useState(initialData.email || '');
  const [firstName, setFirstName] = useState(initialData.first_name || '');
  const [lastName, setLastName] = useState(initialData.last_name || '');

  const handleSubmit = () => {
    onSubmit({ email, first_name: firstName, last_name: lastName });
    setOpenForm(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpenForm(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="first_name"
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="last_name"
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenForm(false)}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {title === 'Edit User' ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
