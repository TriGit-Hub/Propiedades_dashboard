import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { fetchMovements } from '../api/api';

const MovementTable = () => {
    const [movements, setMovements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovements()
            .then(response => setMovements(response.data))
            .catch(error => console.error('Error al obtener los movimientos:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/movements/edit/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'value', headerName: 'Valor', width: 150 },
        { field: 'date', headerName: 'Fecha', width: 150 },
        { field: 'description', headerName: 'Descripción', width: 250 },
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
                Lista de Movimientos
            </Typography>
            <DataGrid
                rows={movements}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default MovementTable;
