import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core/styles';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AppStore from '../../store/AppStore';
import { observer } from 'mobx-react';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const AddressForm = (observer((props) =>{
 const handleChangeOrder = props.handleChangeOrder;
  const [type, setType] = React.useState('');
  const classes = useStyles();
  const handleChange = (event) => {
    setType(event.target.value);
    handleChangeOrder(event);
  };
  const handleDateTimeChange = (dateTime) => {
    const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss');
    let obj={
      target:{
        value:formattedDateTime,
        name:"deliveryDate"
      }
     }
    handleChangeOrder(obj);
  }
  return (
    <>
    <React.Fragment >
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
      <FormControl variant="standard" sx={{ minWidth: 220 }}>
        <InputLabel id="demo-simple-select-standard-label">סוג שירות</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChange}
          required
          name="type"
          autoComplete="given-name"
          variant="standard"
          fullWidth
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value="">
            </MenuItem>
            {AppStore.services &&
              AppStore.services.map((service, index) => (
                <MenuItem key={index} value={service.name}>
                  {service.name}
                  {service.price}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="username"
            label="שם"
            autoComplete="given-name"
            variant="standard"
            fullWidth
            onChange={(e)=>{
             handleChangeOrder(e)
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address"
            label="כתובת"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={(e)=>{
              handleChangeOrder(e)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phon"
            name="phone"
            label="טלפון"
            variant="standard"
            fullWidth
            required
            onChange={(e)=>{
              handleChangeOrder(e)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="כתובת מייל"
            variant="standard"
            fullWidth
            required
            onChange={(e)=>{
              handleChangeOrder(e)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="מועד פגישה" 
            required
               onChange={handleDateTimeChange}
/>
      </DemoContainer>
    </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid item xs={12}>
    </Grid>
    </React.Fragment>
    </>
  );
}))
export default AddressForm
