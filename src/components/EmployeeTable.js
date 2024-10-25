import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../api/api';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees()
            .then(response => setEmployees(response.data))
            .catch(error => console.error('Error al obtener los empleados:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/employees/edit/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'position', headerName: 'Puesto', width: 150 },
        { field: 'salary', headerName: 'Salario', width: 150 },
        { field: 'hire_date', headerName: 'Fecha de Contratación', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Lista de Empleados
            </Typography>
            <DataGrid
                rows={employees}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default EmployeeTable;
