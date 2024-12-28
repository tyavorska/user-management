import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableRow, Button } from '@mui/material';
import { deleteUser, updateUser } from '../../../../utils/api';
import { User } from '../../../../utils/types';
import UserForm from '../UserForm';

interface UserTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserTable: React.FC<UserTableProps> = ({ users, setUsers }) => {
  const [editUser, setEditUser] = useState<User | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user!');
    }
  };

  const handleEditSubmit = async (updatedUser: Partial<User>) => {
    if (editUser) {
      try {
        const updatedData = await updateUser(editUser.id, updatedUser);
        setUsers((prev) =>
          prev.map((user) =>
            user.id === editUser.id ? { ...user, ...updatedData } : user
          )
        );
        setEditUser(null);
        toast.success('User updated successfully!');
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user!');
      }
    }
  };

  return (
    <>
      <Table>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>
                <Button variant="text" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
                <Button variant="text" onClick={() => setEditUser(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editUser && (
        <UserForm
          title="Edit User"
          open={Boolean(editUser)}
          setOpenForm={() => setEditUser(null)}
          onSubmit={handleEditSubmit}
          initialData={editUser}
        />
      )}
    </>
  );
};

export default UserTable;
