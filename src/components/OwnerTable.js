import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { fetchOwners } from '../api/api';

const OwnerTable = () => {
    const [owners, setOwners] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOwners()
            .then(response => setOwners(response.data))
            .catch(error => console.error('Error al obtener los propietarios:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/owners/edit/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Nombre', width: 200 },
        { field: 'contact', headerName: 'Contacto', width: 150 },
        { field: 'email', headerName: 'Correo Electrónico', width: 200 },
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
                Lista de Propietarios
            </Typography>
            <DataGrid
                rows={owners}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default OwnerTable;
