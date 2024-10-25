import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovement, createMovement, updateMovement } from '../api/api';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const MovementForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        value: '',
        date: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            fetchMovement(id).then(response => {
                setFormData(response.data);
            }).catch(err => console.error('Error al obtener el movimiento:', err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMovement(id, formData);
            } else {
                await createMovement(formData);
            }
            navigate('/movements');
        } catch (err) {
            console.error('Error al guardar el movimiento:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6">{id ? "Editar Movimiento" : "Agregar Nuevo Movimiento"}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="value"
                    label="Valor"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="date"
                    label="Fecha"
                    name="date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.date}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="description"
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </Box>
        </Container>
    );
};

export default MovementForm;
