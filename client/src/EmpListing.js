import { useEffect, useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import axios from "axios";
//import DataTable from './DataTable';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
     marginTop: '60px',
      width:"1200px",
      backgroundColor:"#ffffff",
      
    },
    card: {
      maxWidth: "1200",
      margin: '0 auto',
      borderRadius: 10,
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      minHeight:"636px"
    },
    cardTitle: {
      //backgroundColor: '#f2f2f2',
      padding: '15px 20px',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      //boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      '& h2': {
        margin: 0,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
      },
    },
    cardBody: {
      padding: 20,
    },
    table: {
      //minWidth:"1200",
    },
    tableHead: {
      backgroundColor: '#f2f2f2',
      '& th': {
        fontWeight: 'bold',
        color: '#333',
      },
    },
    tableRow: {
      '&:nth-of-type(even)': {
        backgroundColor: '#f2f2f2',
      },
      '&:hover': {
        backgroundColor: '#e6e6e6',
      },
    },
    tableCell: {
      padding: '12px 20px',
      '& button': {
        margin: '0 5px',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'none',
      },
      '& .btn-success': {
        backgroundColor: '#28a745',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#218838',
        },
      },
      '& .btn-danger': {
        backgroundColor: '#dc3545',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#c82333',
        },
      },
      '& .btn-primary': {
        backgroundColor: '#007bff',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#0069d9',
        },
      },
    },
    button:{
        float:"left",
        paddingBottom:"10px"
    }
  });


const EmpListing = () => {

    const classes = useStyles();
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
        console.log(id)
        //const params = { _id: id};
        navigate("/employee/detail/" + id);
        // navigate({
        //     pathname: '/employee/detail',
        //     search: `?${createSearchParams(params)}`,
        //   });
    }
    const LoadEdit = (_id) => {
        navigate("/employee/edit/" + _id);
    }
    // const Removefunction = (_id) => {
    //     if (window.confirm('Do you want to remove?')) {
    //         fetch("http://localhost:7000/deleteemployee/:id" + _id, {
    //             method: "DELETE"
    //         }).then((res) => {
    //             alert('Removed successfully.')
    //             window.location.reload();
    //         }).catch((err) => {
    //             console.log(err.message)
    //         })
    //     }
    // }

    const removeFunction = (_id) => {
        if (window.confirm('Do you want to remove?')) {
            axios.delete(`http://localhost:7000/deleteemployee/${_id}`)
                .then((res) => {
                    alert('Removed successfully.')
                    window.location.reload();
                }).catch((err) => {
                    console.log(err.message)
                })
        }
    }




    useEffect(() => {
        fetch("http://localhost:7000/employees").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp.message);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return (
        <div className={classes.container} >
            <div className={classes.card}>
                <div className={classes.cardTitle}>
                    <h2>Customer Listing</h2>
                </div>

                <div className={classes.cardBody}>
                    <div className={classes.button}>
                        <Link to="/employee/create" className="btn btn-success">Add New (+)</Link>
                    </div>


                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customer table">
                            <TableHead>
                                <TableRow className={classes.tableHead}>

                                    {/* <TableCell align="justify">ID</TableCell> */}
                                    <TableCell align="justify">First Name</TableCell>
                                    <TableCell align="justify">Last Name</TableCell>
                                    <TableCell align="justify">Email</TableCell>
                                    <TableCell align="justify">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {empdata &&
                                    empdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(item => (
                                            <TableRow key={item._id}>
                                                {/* <TableCell>{item.id}</TableCell> */}
                                                <TableCell>{item.firstname}</TableCell>
                                                <TableCell>{item.lastname}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell><a onClick={() => { LoadEdit(item._id) }} className="btn btn-success">Edit</a>
                                                    <a onClick={() => { removeFunction(item._id) }} className="btn btn-danger">Remove</a>
                                                    <a onClick={() => { LoadDetail(item._id) }} className="btn btn-primary">Details</a>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            count={empdata ? empdata.length : 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};


export default EmpListing;