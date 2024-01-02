import * as React from 'react';
import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from "mobx-react"
import AppStore from "../../store/AppStore"
import logo from '../image/logo.png'
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: theme.spacing(8),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Login = (observer(()=> {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async () => {
    const response = await fetch("http://localhost:8787/login", {
      method: "POST",
      body: JSON.stringify({
        name:name, password:password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      AppStore.setIsLogin(true)
      localStorage.setItem("Admin", true);
      Store.setIsLogin(JSON.parse(localStorage.getItem("Admin")));

    }
    else if(response.status == 401){
      setName('')
      setPassword('')
      AppStore.setIsLogin(false)

    }
  }

  const classes = useStyles();
      return (
        <>
              <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={logo} style={{width:'15%'}}></img>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box className={classes.form} noValidate >
          <TextField
          onChange={(e) => setName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="User Name"
            name="name"
            autoFocus
            value={name}
          />
          <TextField
          onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}>
            Sign In
          </Button>
        </Box>
        </div>
        </Container>
</>
)
}))
export default Login