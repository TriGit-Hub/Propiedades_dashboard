import axios from 'axios';

const baseURL = 'https://agro-cornejo.site';

// Propiedades
export const fetchProperties = () => axios.get(`${baseURL}/propiedades`);
export const fetchProperty = (id) => axios.get(`${baseURL}/propiedades/${id}`);
export const createProperty = (propertyData) => axios.post(`${baseURL}/propiedades`, propertyData);
export const updateProperty = (id, propertyData) => axios.put(`${baseURL}/propiedades/${id}`, propertyData);

// Propietarios
export const fetchOwners = () => axios.get(`${baseURL}/propietarios`);
export const fetchOwner = (id) => axios.get(`${baseURL}/propietarios/${id}`);
export const createOwner = (ownerData) => axios.post(`${baseURL}/propietarios`, ownerData);
export const updateOwner = (id, ownerData) => axios.put(`${baseURL}/propietarios/${id}`, ownerData);

// Empleados
export const fetchEmployees = () => axios.get(`${baseURL}/empleados`);
export const fetchEmployee = (id) => axios.get(`${baseURL}/empleados/${id}`);
export const createEmployee = (employeeData) => axios.post(`${baseURL}/empleados`, employeeData);
export const updateEmployee = (id, employeeData) => axios.put(`${baseURL}/empleados/${id}`, employeeData);

// Movimientos
export const fetchMovements = () => axios.get(`${baseURL}/movimientos`);
export const fetchMovement = (id) => axios.get(`${baseURL}/movimientos/${id}`);
export const createMovement = (propertyId, movementData) => axios.post(`${baseURL}/propiedades/${propertyId}/movimientos`, movementData);
export const updateMovement = (id, movementData) => axios.put(`${baseURL}/movimientos/${id}`, movementData);

// Eventos
export const fetchEvents = () => axios.get(`${baseURL}/eventos`);
export const fetchEvent = (id) => axios.get(`${baseURL}/eventos/${id}`);
export const createEvent = (propertyId, eventData) => axios.post(`${baseURL}/propiedades/${propertyId}/eventos`, eventData);
export const updateEvent = (id, eventData) => axios.put(`${baseURL}/eventos/${id}`, eventData);

// Asignación de empleados y propietarios a propiedades
export const assignEmployee = (propertyId, employeeId) => axios.post(`${baseURL}/propiedades/${propertyId}/empleados`, { employeeId });
export const assignOwner = (propertyId, ownerId) => axios.post(`${baseURL}/propiedades/${propertyId}/propietarios`, { ownerId });
