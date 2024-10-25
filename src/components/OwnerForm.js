import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOwner, createOwner, updateOwner } from '../api/api';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const OwnerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        email: '',
    });

    useEffect(() => {
        if (id) {
            fetchOwner(id).then(response => {
                setFormData(response.data);
            }).catch(err => console.error('Error al obtener el propietario:', err));
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
                await updateOwner(id, formData);
            } else {
                await createOwner(formData);
            }
            navigate('/owners');
        } catch (err) {
            console.error('Error al guardar el propietario:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6">{id ? "Editar Propietario" : "Agregar Nuevo Propietario"}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="contact"
                    label="Contacto"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </Box>
        </Container>
    );
};

export default OwnerForm;
