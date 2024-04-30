import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { format } from 'date-fns';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";
import EditTraining from "./EditTraining";

function TrainingList() {
    const [trainings, setTrainings] = useState([]);
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const gridRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings')
            .then(response => response.json())
            .then(data => {
                const updatedTrainings = data.map(training => ({
                    ...training,
                    customerName: training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : 'Unknown Customer'
                }));
                setTrainings(updatedTrainings);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }

    const renderEditTraining = (params) => {
        return (
            <EditTraining updateTraining={updateTraining} training={params.data} />
        );
    }

    const renderDeleteButton = (params) => {
        if (!params.data) {
            return null; 
        }
    
        return (
            <Button size='small' color='error' onClick={() => deleteTraining(params.data)}>Delete</Button>
        );
    }

    const deleteTraining = (training) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/' + training.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setSnackbarOpen(true); 
                        fetchData();
                    } else {
                        throw new Error('Failed to delete training');
                    }
                })
                .catch(error => console.error(error))
        }
    }
    
    const saveTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    fetchData();
                } else {
                    throw new Error('Failed to save training');
                }
            })
            .catch(error => console.error(error))
    }
    
    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    fetchData(); 
                } else {
                    throw new Error('Failed to update training');
                }
            })
            .catch(error => console.error(error))
    }

    const columnDefs = [
        { 
            field: 'customerName', 
            headerName: 'Customer',
            filter: true,
            sortable: true 
        },
        { 
            field: 'date', 
            filter: true, 
            sortable: true, 
            valueFormatter: (params) => params.value ? format(new Date(params.value), 'dd.MM.yyyy HH:mm') : ''
        },
        { field: 'duration', filter: true, sortable: true }, 
        { field: 'activity', filter: true, sortable: true }, 
        {
            sortable: false,
            width: 90,
            cellRenderer: renderEditTraining
        },
        {
            sortable: false,
            width: 90,
            headerName: '',
            field: 'id',
            cellRenderer: renderDeleteButton
        }
    ];

    return (
        <div>
            <AddTraining saveTraining={saveTraining} />
            <div className="ag-theme-material" style={{ width: '100vw', height: '100vw' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowData={trainings}
                    columnDefs={columnDefs}
                    rowSelection="single"
                />
            </div>
            <Snackbar
                open={SnackbarOpen}
                autoHideDuration={6000}
                message='Training deleted successfully'
                action={
                    <Button color="error" size="small" onClick={() => setSnackbarOpen(false)}>
                        Close
                    </Button>
                }
            />
        </div>
    );
}

export default TrainingList;