import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data }) => {
  const headers = [
    { label: 'Firstname', key: 'firstname' },
    { label: 'Lastname', key: 'lastname' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Streetaddress', key: 'streetaddress' },
    { label: 'Postcode', key: 'postcode' },
    { label: 'City', key: 'city' },
  ];

  return (
    <CSVLink data={data} headers={headers}>
      Export to CSV
    </CSVLink>
  );
};

export default ExportCSV;