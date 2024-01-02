import AppBar from "../AppBar"
import Details from "../details/Details"
import './UserHomePage.css'
import ListPapers from "../ListPapers"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import AppStore from "../../store/AppStore";
import DeliveryOrder from "../addOrder/DeliveryOrder";
function UserHomePage() {
    useEffect(() => {
        AppStore.getOrders();
        localStorage.removeItem("Admin");
    }, [])
    const [orderData, setOrderData] = useState({
        identity: "#12123",
        type: '',
        username: '',
        address: '',
        phone: '',
        email: '',
        deliveryDate: ''
    });
    const handleChangeOrder = e => {
        setOrderData[e.target.name] = e.target.value;
    };
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOrderData["identity"] = "#12123";
        setOpen(false);
        AppStore.postOrders(setOrderData);
    }
    return (
        <>
            <AppBar />
            <div id="container">
                <div id="details"> <Details /> </div>
                <div id="listPapers"> <ListPapers /> </div>
            </div>

            <React.Fragment>
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    sx={{
                        position: "absolute",
                        top: '82%',
                        left: '15%',
                        width: '30%',
                        color:'black',
                        backgroundColor:'#af52bf'
                    }}
                >
                     לקביעת  פגישה  לחץ  כאן
                </Button>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <DeliveryOrder handleChangeOrder={handleChangeOrder} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={() => { setOpen(false) }}>חזרה</Button>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={handleClose} autoFocus>
                            סיום
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
export default UserHomePage