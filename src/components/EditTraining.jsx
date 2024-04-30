import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        customer: '', 
        date: '',  
        duration: '', 
        activity: ''
    });

    const handleClickOpen = () => {
        setTraining({
            customer: props.training.customerName,
            date: props.training.date,
            duration: props.training.duration,
            activity: props.training.activity
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const updateTraining = () => {
        props.updateTraining(training, props.training._links.training.href);
        handleClose();
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                    }
                }}
            >
                <DialogTitle>Edit training</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        value={training.customer}
                        onChange={e => handleInputChange(e)}
                        label="Customer"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={updateTraining} type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditTraining;