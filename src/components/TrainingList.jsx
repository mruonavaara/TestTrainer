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
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();

    useEffect(() => {
        fetchData();
        fetchCustomers();
    }, []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            .then(response => response.json())
            .then(data => {
                const updatedTrainings = data._embedded.trainings.map(async training => {
                    if (training._links.customer && training._links.customer.href) {
                        const customerResponse = await fetch(training._links.customer.href);
                        if (customerResponse.ok) {
                            const customerData = await customerResponse.json();
                            training.customerName = `${customerData.firstname} ${customerData.lastname}`;
                        } else {
                            training.customerName = 'No Customer Data'; 
                        }
                    }
                    return training;
                });
                Promise.all(updatedTrainings)
                    .then(updatedTrainings => {
                        setTrainings(updatedTrainings);
                    })
                    .catch(error => console.error('Error updating trainings: ', error));
            })
            .catch(error => console.error('Error fetching data: ', error));
    }

    const fetchCustomers = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error('Error fetching customers: ', error));
    }

    const renderEditTraining = (params) => {
        return (
            <EditTraining updateTraining={updateTraining} training={params.data} />
        );
    }

    const renderDeleteButton = (params) => {
        return (
            <Button size='small' color='error' onClick={() => deleteTraining(params.data)}>Delete</Button>
        );
    }

    const saveTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(response => fetchData())
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
            .then(response => fetchData())
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
            valueFormatter: (params) => format(new Date(params.value), 'dd.MM.yyyy HH:mm') 
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
            field: '_links.self.href',
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