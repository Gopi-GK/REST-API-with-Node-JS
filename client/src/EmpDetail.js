import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Grid, Typography, Button, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainDiv: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        position: "absolute",
        top: "50%",
        bottom: "50%",
        transform: "translate(" - 50 % "," - 50 % ")",
        marginTop:"-80px"
    },
    root: {
        background: 'rgba(255, 255, 255, 0.39)',
        borderRadius: '10px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(16.1px)',
        webkitBackdropFilter: 'blur(16.1px)',
        border: '1px solid rgba(255, 255, 255, 0.78)',

    },

    title: {
        padding: "20px 0px 10px 0px"
    },
    fields:{
        padding:"10px 0px",
        display:"flex"
       // alignItems:"flex-start"
    },
    action:{
        
        display:"flex",
        justifyContent:"center",
        margin:"10px 0px",
        
        
 
    },
    fieldBox:{
        display:"flex",
        padding:"0px 10px"
    },
    button:{
        backgroundColor:"#0080FF",
        color:"#ffffff",
        '&:hover': {
            backgroundColor:"#58ACFA",
            color:"#ffffff",
          },
    }
    
}));


const EmpDetail = () => {
    const classes = useStyles();
    const { empid } = useParams();
    console.log(empid);

    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:7000/getemployee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp.message);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div className={classes.mainDiv} style={{ display: "flex" }}>
            <Container maxWidth="sm" className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.title}>
                            <h3>
                                Customer Details
                            </h3>
                        </div>



                    </Grid>
                    <Grid container className={classes.fieldBox}>
                        <Grid item xs={12} className={classes.fields}>
                            <Typography variant="h6" >First Name: <b>{empdata.firstname}</b> </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fields}>
                            <Typography variant="h6" >Last Name: <b>{empdata.lastname}</b> </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.fields}>
                            <Typography variant="h6" >Email ID: <b>{empdata.email}</b> </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.action}>
                    <Button className={classes.button}
                                 href="/employee"
                                 size="large"
                                variant="outlined"
                                color="primary"
                                
                            >
                                Back To Listings
                            </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default EmpDetail;