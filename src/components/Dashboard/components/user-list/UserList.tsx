import React, { useState } from 'react';
import { TableContainer, TablePagination } from '@mui/material';
import { User } from '../../../../utils/types';
import UserTable from './UserTable';

interface UserListProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <UserTable
          users={users.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          setUsers={setUsers}
        />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[6, 12, 24]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UserList;
