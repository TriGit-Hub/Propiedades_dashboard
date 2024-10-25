import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProperty, createProperty, updateProperty } from '../api/api';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const PropertyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: '',
        description: '',
        location: '',
        area_m2: '',
        area_varas: '',
        value: '',
        registration_number: '',
        status: '',
        deed: ''
    });

    useEffect(() => {
        if (id) {
            fetchProperty(id).then(response => {
                setFormData(response.data);
            }).catch(err => console.error('Error al obtener la propiedad:', err));
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
                await updateProperty(id, formData);
            } else {
                await createProperty(formData);
            }
            navigate('/');
        } catch (err) {
            console.error('Error al guardar la propiedad:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6">{id ? "Editar Propiedad" : "Agregar Nueva Propiedad"}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
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
                    id="location"
                    label="Ubicación"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="area_m2"
                    label="Área en metros cuadrados"
                    name="area_m2"
                    type="number"
                    value={formData.area_m2}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="area_varas"
                    label="Área en varas cuadradas"
                    name="area_varas"
                    type="number"
                    value={formData.area_varas}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="value"
                    label="Valor"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="registration_number"
                    label="Número de Registro"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="status"
                    label="Estado"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    id="deed"
                    label="Escritura (URL)"
                    name="deed"
                    value={formData.deed}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </Box>
        </Container>
    );
};

export default PropertyForm;
