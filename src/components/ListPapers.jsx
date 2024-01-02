import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppStore from '../store/AppStore';
import { observer } from 'mobx-react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const ListPapers = observer(() => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 180,
            height: 180,
          },
        }}
      >
        {AppStore.services.map((service, index) => (
          <Paper elevation={4}>
            <div style={{fontSize:'x-large',color:'#af52bf',textAlign:'center',marginTop:'15%'}}>{service.name}</div>
            <div style={{textAlign:'center'}}>{service.description}</div>
            <div style={{fontSize:'large',color:'#af52bf',textAlign:'center'}}>{service.price}</div>
          </Paper>
        ))}
      </Box>

    </>
  )
})
export default ListPapers