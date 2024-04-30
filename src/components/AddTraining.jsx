import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        customer: '',
        date: '',
        duration: '',
        activity: ''
    });
    const [isDateFieldFocused, setIsDateFieldFocused] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDateFieldFocus = () => {
        setIsDateFieldFocused(true);
    }

    const handleDateFieldBlur = () => {
        setIsDateFieldFocused(false);
    }

    const addTraining = () => {
        props.saveTraining(training);
        handleClose();
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Button variant="contained" style={{ margin: 15 }} onClick={handleClickOpen}>
                Add training
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
                <DialogTitle>New training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="customer"
                        value={training.customer || ''}
                        onChange={e => handleInputChange(e)}
                        label="Customer"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        type={isDateFieldFocused ? "date" : "text"}
                        value={training.date || ''}
                        onChange={e => handleInputChange(e)}
                        onFocus={handleDateFieldFocus}
                        onBlur={handleDateFieldBlur}
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration || ''}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity || ''}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addTraining} type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTraining;