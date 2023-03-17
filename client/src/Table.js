import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';

const MaterialTable = ({ rows, columns }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
      navigate("/employee/detail/" + id);
  }
  const LoadEdit = (id) => {
      navigate("/employee/edit/" + id);
  }
  const Removefunction = (id) => {
      if (window.confirm('Do you want to remove?')) {
          fetch("http://localhost:8000/employee/" + id, {
              method: "DELETE"
          }).then((res) => {
              alert('Removed successfully.')
              window.location.reload();
          }).catch((err) => {
              console.log(err.message)
          })
      }
  }




  useEffect(() => {
      fetch("http://localhost:8000/employee").then((res) => {
          return res.json();
      }).then((resp) => {
          empdatachange(resp);
      }).catch((err) => {
          console.log(err.message);
      })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow>
            
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
                            {empdata &&
                                empdata.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.firstname}</TableCell>
                                        <TableCell>{item.lastname}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell><a onClick={() => { LoadEdit(item.id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="btn btn-primary">Details</a>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default MaterialTable;
