import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import MicIcon from '@mui/icons-material/Mic';
import Person2Icon from '@mui/icons-material/Person2';
import PhoneIcon from '@mui/icons-material/Phone';
import ListIcon from '@mui/icons-material/List';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaceIcon from '@mui/icons-material/Place';
import { useState,useEffect } from 'react';
import { observer } from 'mobx-react';
import AppStore from '../../store/AppStore';

 const Details=observer(()=> {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <MicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={AppStore.listBusinessData.name} secondary="שם העסק" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Person2Icon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={AppStore.listBusinessData.owner} secondary="בעל העסק" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PlaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={AppStore.listBusinessData.address} secondary="כתובת" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={AppStore.listBusinessData.phone} secondary="טלפון" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ListAltIcon/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={AppStore.listBusinessData.description} secondary="פרטים נוספים" />
      </ListItem>
    </List>
  );
})
export default Details
