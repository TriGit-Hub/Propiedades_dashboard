import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PropertyTable from './PropertyTable';
import OwnerTable from './OwnerTable';
import EmployeeTable from './EmployeeTable';
import MovementTable from './MovementTable';
import EventTable from './EventTable';
import { Box, Container, Typography, Button } from '@mui/material';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <TopBar />
                <Container>
                    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                        Dashboard de Gestión de Propiedades
                    </Typography>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Propiedades
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/properties/new')}
                            sx={{ mb: 2 }}
                        >
                            Agregar Propiedad
                        </Button>
                        <PropertyTable />
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Propietarios
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/owners/new')}
                            sx={{ mb: 2 }}
                        >
                            Agregar Propietario
                        </Button>
                        <OwnerTable />
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Empleados
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/employees/new')}
                            sx={{ mb: 2 }}
                        >
                            Agregar Empleado
                        </Button>
                        <EmployeeTable />
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Movimientos Financieros
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/movements/new')}
                            sx={{ mb: 2 }}
                        >
                            Agregar Movimiento
                        </Button>
                        <MovementTable />
                    </Box>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Eventos
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/events/new')}
                            sx={{ mb: 2 }}
                        >
                            Agregar Evento
                        </Button>
                        <EventTable />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboard;
