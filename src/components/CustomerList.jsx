import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ExportCSV from "./ExportCSV";


function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const gridRef = useRef();

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error('Error fetching data: ', error));
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link._links.self.href, { method: 'DELETE' })
                .then(response => fetchData(), setSnackbarOpen(true))
                .catch(error => console.error(error))
        }
    }

    const renderEditCustomer = (params) => {
        return (
            <EditCustomer updateCustomer={updateCustomer} customer={params.data} />
        );
    }

    const renderDeleteButton = (params) => {
        return (
            <Button size='small' color='error' onClick={() => deleteCustomer(params.data)}>Delete</Button>
        );
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
            .catch(error => console.error(error))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
            .catch(error => console.error(error))
    }

    const columnDefs = [
        { field: 'firstname', filter: true, width: 160 },
        { field: 'lastname', filter: true, width: 160 },
        { field: 'streetaddress', filter: true },
        { field: 'postcode', filter: true, width: 160 },
        { field: 'city', filter: true, width: 160 },
        { field: 'email', filter: true },
        { field: 'phone', filter: true, width: 160 },
        {
            sortable: false,
            width: 100,
            cellRenderer: renderEditCustomer
        },
        {
            sortable: false,
            width: 90,
            headerName: '', field: '_links.self.href',
            cellRenderer: renderDeleteButton
        }
    ];

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ExportCSV data={customers} />
            <div className="ag-theme-material" style={{ width: '100vw', height: '100vw' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowData={customers}
                    columnDefs={columnDefs}
                    rowSelection="single"
                />
            </div>
            <Snackbar
                open={SnackbarOpen}
                autoHideDuration={6000}
                message='Customer deleted successfully'
                action={
                    <Button color="error" size="small" onClick={() => setSnackbarOpen(false)}>
                        Close
                    </Button>
                }
            />
        </div>
    );
}

export default CustomerList;