import { useState } from "react";
import { observer } from 'mobx-react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AppStore from "../../store/AppStore";
import Swal from 'sweetalert2';


const AddService = observer(() => {
   
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        id:   String(AppStore.services.length),
        name: '',
        description: '',
        price: '',
        during: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
        if (formData.name !== '' && formData.description !== '' && formData.price !== ''&&formData.during!=='') {
            AppStore.addService(formData);
        }
        else {
            Swal.fire({
                title: "Error!",
                text: "required filds",
                // imageUrl: X,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "image"
            });

        }

        // Reset the form after submitting
        setFormData({
            id:   String(AppStore.services.length),
            name: '',
            description: '',
            price: '',
            during: ''
        });
        setIsOpen(false);
    };



    return (
        <>
            <Button variant="contained" style={{left:'85%'}} onClick={() => setIsOpen(true)}>הוסף שירות</Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>Set service</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="Form">
                        <div className="PopupsInput">
                            <TextField
                                fullWidth
                                label="service Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder=" service Name"
                            />
                        </div>
                        <p></p>
                        <div className="PopupsInput">
                            <TextField
                                fullWidth
                                label=" service Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="service Description"
                            />
                        </div>
                        <p></p>
                        <div className="PopupsInput">
                            <TextField
                                fullWidth
                                label="service Price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="service Price"
                            />
                        </div>
                        <p></p>
                        <div className="PopupsInput">
                            <TextField
                                fullWidth
                                label="service During"
                                name="during"
                                value={formData.during}
                                onChange={handleInputChange}
                                placeholder="service During"
                            />
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
            
        </>
    )
})

export default AddService
