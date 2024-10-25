import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { fetchProperties } from '../api/api';

const PropertyTable = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties()
            .then(response => {
                const data = response.data.map((property) => ({
                    id: property.id,
                    address: property.address,
                    status: property.status || 'N/A',
                    value: property.value,
                    lastEdited: property.updatedAt || 'N/A',
                }));
                setProperties(data);
            })
            .catch(error => console.error('Error al obtener las propiedades:', error));
    }, []);

    const handleEdit = (id) => {
        navigate(`/properties/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/properties/${id}`);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'address', headerName: 'Dirección', width: 200 },
        { field: 'status', headerName: 'Estado', width: 150 },
        { field: 'value', headerName: 'Valor', width: 150 },
        { field: 'lastEdited', headerName: 'Última Edición', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton color="primary" onClick={() => handleView(params.row.id)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Lista de Propiedades
            </Typography>
            <DataGrid
                rows={properties}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};

export default PropertyTable;
