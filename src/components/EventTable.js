import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { fetchEvents } from '../api/api';

const EventTable = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents()
            .then(response => setEvents(response.data))
            .catch(error => console.error('Error al obtener los eventos:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/events/edit/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'date', headerName: 'Fecha', width: 150 },
        { field: 'description', headerName: 'Descripción', width: 250 },
        { field: 'photos', headerName: 'Fotos (URL)', width: 250 },
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
                Lista de Eventos
            </Typography>
            <DataGrid
                rows={events}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default EventTable;
