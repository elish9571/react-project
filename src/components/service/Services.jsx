import { observer } from "mobx-react";
import AddService from '../addService/AddService';
import AppStore from '../../store/AppStore';
import { useState,useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Services = observer(() => {
  useEffect(() => {
    AppStore.getService();
  },[])
    return (
      <>
    <List
      className='list'
        sx={{
          direction:'rtl',
          width: '100%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          position: 'absolute',
          right: '3%',
          top: '25%',
          overflow: 'auto',
          maxHeight:400,
        }}
        subheader={<li />}
      >
        <li>
          <ul>
          {AppStore.services && AppStore.services.map((service, index) => (
          <ListItem key={index}>
            <ListItemText primary={service.name} />
                 {service.price}
                 {service.description}
          </ListItem>
            ))}
          </ul>
        </li>
      </List>
      <AddService/>
      </>
    )
  
})

export default Services

