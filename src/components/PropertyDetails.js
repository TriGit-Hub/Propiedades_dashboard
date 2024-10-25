import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProperty, fetchEmployees, fetchOwners, fetchMovements, fetchEvents, assignEmployee, assignOwner } from '../api/api';
import { TextField, Button, Box, Typography, Container, Grid, MenuItem, List, ListItem, ListItemText, Divider } from '@mui/material';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const [employees, setEmployees] = useState([]);
    const [owners, setOwners] = useState([]);
    const [movements, setMovements] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');

    useEffect(() => {
        fetchProperty(id).then(response => setProperty(response.data)).catch(err => console.error('Error al obtener la propiedad:', err));
        fetchEmployees(id).then(response => setEmployees(response.data)).catch(err => console.error('Error al obtener empleados:', err));
        fetchOwners(id).then(response => setOwners(response.data)).catch(err => console.error('Error al obtener propietarios:', err));
        fetchMovements(id).then(response => setMovements(response.data)).catch(err => console.error('Error al obtener movimientos:', err));
        fetchEvents(id).then(response => setEvents(response.data)).catch(err => console.error('Error al obtener eventos:', err));
    }, [id]);

    const handleAssignEmployee = () => {
        assignEmployee(id, selectedEmployee)
            .then(() => {
                alert('Empleado asignado exitosamente');
                setSelectedEmployee('');
            })
            .catch(err => console.error('Error al asignar empleado:', err));
    };

    const handleAssignOwner = () => {
        assignOwner(id, selectedOwner)
            .then(() => {
                alert('Propietario asignado exitosamente');
                setSelectedOwner('');
            })
            .catch(err => console.error('Error al asignar propietario:', err));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Detalles de la Propiedad
            </Typography>
            <Box>
                <Typography variant="h6">Dirección: {property.address}</Typography>
                <Typography variant="body1">Descripción: {property.description}</Typography>
                <Typography variant="body1">Ubicación: {property.location}</Typography>
                <Typography variant="body1">Área en m²: {property.area_m2}</Typography>
                <Typography variant="body1">Área en varas: {property.area_varas}</Typography>
                <Typography variant="body1">Valor: {property.value}</Typography>
                <Typography variant="body1">Número de Registro: {property.registration_number}</Typography>
                <Typography variant="body1">Estado: {property.status}</Typography>
            </Box>

            {/* Lista de Empleados */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Empleados Asignados</Typography>
                <List>
                    {employees.map(employee => (
                        <ListItem key={employee.id}>
                            <ListItemText primary={employee.name} secondary={`Puesto: ${employee.position}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Asignar Empleado */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Asignar Empleado</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            select
                            label="Seleccionar Empleado"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            fullWidth
                        >
                            {employees.map((employee) => (
                                <MenuItem key={employee.id} value={employee.id}>
                                    {employee.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleAssignEmployee}>
                            Asignar Empleado
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Lista de Propietarios */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Propietarios Asignados</Typography>
                <List>
                    {owners.map(owner => (
                        <ListItem key={owner.id}>
                            <ListItemText primary={owner.name} secondary={`Contacto: ${owner.contact}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Asignar Propietario */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Asignar Propietario</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TextField
                            select
                            label="Seleccionar Propietario"
                            value={selectedOwner}
                            onChange={(e) => setSelectedOwner(e.target.value)}
                            fullWidth
                        >
                            {owners.map((owner) => (
                                <MenuItem key={owner.id} value={owner.id}>
                                    {owner.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleAssignOwner}>
                            Asignar Propietario
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Lista de Movimientos */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Movimientos Financieros</Typography>
                <List>
                    {movements.map(movement => (
                        <ListItem key={movement.id}>
                            <ListItemText primary={`Valor: ${movement.value}`} secondary={`Fecha: ${movement.date} - ${movement.description}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Lista de Eventos */}
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h6">Eventos</Typography>
                <List>
                    {events.map(event => (
                        <ListItem key={event.id}>
                            <ListItemText primary={`Fecha: ${event.date}`} secondary={`Descripción: ${event.description}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default PropertyDetails;
