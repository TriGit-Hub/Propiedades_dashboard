import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployee, createEmployee, updateEmployee } from '../api/api';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const EmployeeForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        salary: '',
        hire_date: '',
    });

    useEffect(() => {
        if (id) {
            fetchEmployee(id).then(response => {
                setFormData(response.data);
            }).catch(err => console.error('Error al obtener el empleado:', err));
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
                await updateEmployee(id, formData);
            } else {
                await createEmployee(formData);
            }
            navigate('/employees');
        } catch (err) {
            console.error('Error al guardar el empleado:', err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Typography variant="h6">{id ? "Editar Empleado" : "Agregar Nuevo Empleado"}</Typography>
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
                    id="position"
                    label="Puesto"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="salary"
                    label="Salario"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="hire_date"
                    label="Fecha de Contratación"
                    name="hire_date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.hire_date}
                    onChange={handleChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    {id ? "Actualizar" : "Crear"}
                </Button>
            </Box>
        </Container>
    );
};

export default EmployeeForm;
