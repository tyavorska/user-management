import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Button, Box, Paper } from '@mui/material';
import { User } from '../../utils/types';
import { createUser, getUsers } from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import UserForm from './components/UserForm';
import UserList from './components/user-list/UserList';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(() => {
    if (token) {
      (async () => {
        const data = await getUsers(1);
        setUsers(data.data);
      })();
    }
  }, [token]);

  const handleAddUser = () => {
    setOpenUserForm(true);
  };

  const handleFormSubmit = async (newUser: Partial<User>) => {
    try {
      const createdUser = await createUser(newUser);
      const formattedUser: User = {
        id: createdUser.id,
        email: createdUser.email,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
      };
      setUsers((prev) => [formattedUser, ...prev]);
      setOpenUserForm(false);
      toast.success('User created successfully!');
    } catch (error) {
      toast.error('Failed to create user!');
    }
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            sx={{ alignSelf: 'flex-end' }}
          >
            Create New User
          </Button>
          <Box sx={{ mt: 2, width: '100%' }}>
            <UserList users={users} setUsers={setUsers} />
          </Box>
        </Paper>

        {openUserForm && (
          <UserForm
            title="Create New User"
            open={openUserForm}
            setOpenForm={setOpenUserForm}
            onSubmit={handleFormSubmit}
          />
        )}
      </Container>
    </>
  );
};

export default Dashboard;
