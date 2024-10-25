import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEvent, createEvent, updateEvent } from '../api/api';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const EventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        description: '',
        photos: '',
    });

    useEffect(() => {
        if (id) {
            fetchEvent(id).then(response => {
                setFormData(response.data);
            }).catch(err => console.error('Error al obtener el evento:', err));
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
                await updateEvent(id, formData);
            } else {
                await createEvent(formData);
            }
            navigate('/events');
        } catch (err) {
            console.error('Error al guardar el evento:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6">{id ? "Editar Evento" : "Agregar Nuevo Evento"}</Typography>
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
                    autoFocus
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
                <TextField
                    margin="normal"
                    fullWidth
                    id="photos"
                    label="Fotos (URL)"
                    name="photos"
                    value={formData.photos}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </Box>
        </Container>
    );
};

export default EventForm;
