import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
//import { Link, useNavigate,createSearchParams } from "react-router-dom";


const useStyles = makeStyles({
  homepage: {    
    //backgroundColor:'#BAFDE3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '40px',
    position:"absolute",
    top:"50%",
    bottom:"50%",
    transform:"translate("-50%","-50%")",
    
    '& h1': {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    '& p': {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    '& ul': {
      textAlign: 'left',
      listStyleType: 'none',
      padding: '0',
      marginBottom: '20px',
      display:"inline-flex",
      '& li': {
        fontSize: '1.2rem',
        marginBottom: '10px',
        '&:before': {
          content: '•',
          color: '#4CAF50',
          display: 'inline-block',
          width: '1em',
          marginLeft: '-1em',
        },
      },
    },
    '& button': {
      backgroundColor: '#0080FF',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      
      '&:hover': {
        backgroundColor: '#58ACFA',
      },

      
      
      
    },
   
  },
  button:{
    color:"#ffffff",
    textDecoration:"none",
  }
});

function HomePage() {
  const classes = useStyles();

  return (
    <div className={classes.homepage}>
      <div style={{marginBottom:"80px"}}>
      <h1>Welcome to our Customer Management Application!</h1>
      <p>Click here to manage your customers</p>
      <ul>
        <li><button><a className={classes.button} href='/employee'>Manage customers</a></button></li>        
      </ul>
      </div>
            
    </div>
  );
}
export default HomePage;
