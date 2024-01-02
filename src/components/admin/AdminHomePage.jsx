import * as React from 'react';
import Button from '@mui/material/Button';
import AppStore from '../../store/AppStore';
import Details from '../details/Details';
import EditDetails from '../details/EditDetails';
import { observer } from "mobx-react"
import { Outlet, Link } from "react-router-dom"
import AppBar from '../AppBar';

const AdminHomePage = (observer(() => {
  const handleChange = () => {
    AppStore.setIsEdit(!AppStore.isEdit)
  }
  return (
    <>
     <AppBar />
      {!AppStore.isEdit ? <Details /> : <EditDetails />}
      <Button variant="contained" style={{left:'10%'}}onClick={handleChange}>עריכת פרטי העסק</Button>
        <Link to="./services">
        <Button variant="contained" style={{left:'50%'}}>רשימת שירותים</Button></Link>
        <Link to="./meetings">
        <Button variant="contained" style={{left:'50%'}} >רשימת פגישות</Button></Link>

      <Outlet />
    </>
  )
}))
export default AdminHomePage
