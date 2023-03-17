import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid,TextField,Container,Button } from "@material-ui/core";

const EmpCreate = () => {

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
        url: 'http://localhost:8000/employee',
        data: empdata,
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        alert('Saved successfully.');
        navigate('/');
      })
      .catch(error => {
        console.error(error.message);
      });

    }

    return (
        <Container>
            <Grid>
                <Grid>
                    <Grid>
                    <form className={classes.form} onSubmit={handlesubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="id"
                                label="ID"
                                name="fiidrstname"
                                type="text"
                                //autoComplete="email"
                                //autoFocus
                                value={firstname}
                                disabled
                                //onChange={(e) => setFirstname(e.target.value)}
                            />
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
                                autoFocus
                                value={email}
                                onChange={(e) => emailchange(e.target.value)}
                            />

                            <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
                            </Button>
                            <Button
                                 href="/"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.back}
                            >
                                Back
                            </Button>
                            </div>
                            
                        </form>

                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EmpCreate;