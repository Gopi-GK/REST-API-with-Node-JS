import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid,TextField,Container,Button,makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainDiv:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    
    position:"absolute",
      top:"50%",
      bottom:"50%",
      transform:"translate("-50%","-50%")",
      
  },
    root: {
      background: 'rgba(255, 255, 255, 0.39)',
    borderRadius: '10px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(16.1px)',
    webkitBackdropFilter: 'blur(16.1px)',
    border: '1px solid rgba(255, 255, 255, 0.78)',
    marginTop:"-80px"
      
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    back: {
      margin: theme.spacing(3, 0, 2),
      //backgroundColor: theme.palette.secondary.main,
      color:"#3f51b5",
      '&:hover': {
        //backgroundColor: theme.palette.secondary.dark,
      },
    },
    action:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
      padding:"20px 0px 10px 0px"
    },
  }));

const EmpCreate = () => {
    const classes = useStyles();
    const[id,idchange]=useState("");
    const[firstname,setFirstname]=useState("");
    const[lastname,setLastname]=useState("");
    const[email,emailchange]=useState("");
    //const[phone,phonechange]=useState("");
    //const[active,activechange]=useState(true);
    //const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={firstname,lastname,email};
      

      axios({
        method: 'post',
        url: 'http://localhost:7000/addemployee',
        data: empdata,
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        alert('Saved successfully.');
        navigate('/employee');
      })
      .catch(error => {
        console.error(error.message);
      });

    }

    return (
        <div className={classes.mainDiv} style={{display:"flex"}}>
        <Container maxWidth="sm" className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className={classes.title}>
                    <h4>
                      Add New Customer
                    </h4>
                  </div>
                   
                    <form className={classes.form} onSubmit={handlesubmit}>
                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                name="firstname"
                                type="text"
                                //autoComplete="email"
                                autoFocus
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="lastname"
                                label="Last Name"
                                type="text"
                                id="lastname"
                                //autoComplete="current-password"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                //autoFocus
                                value={email}
                                onChange={(e) => emailchange(e.target.value)}
                            />

                            <div className={classes.action} >
                                <div>
                                <Button
                                 href="/employee"
                                 size="large"
                                variant="outlined"
                                color="primary"
                                className={classes.back}
                            >
                                Back
                            </Button>
                                </div>

                            <div>
                            <Button
                                type="submit"
                                size="large"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
                            </Button>
                            </div>
                           
                           
                            </div>
                            
                        </form>

                    
                </Grid>
            </Grid>
        </Container>
        </div>
    );
}

export default EmpCreate;