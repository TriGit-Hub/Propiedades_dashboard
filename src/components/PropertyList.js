import React, { useEffect, useState } from 'react';
import { fetchProperties } from '../api/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchProperties()
            .then(response => {
                console.log(response.data);
                setProperties(response.data);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }, []);

    return (
        <List component="nav" aria-label="mailbox folders">
            {properties.map((property) => (
                <React.Fragment key={property.id}>
                    <ListItem button>
                        <ListItemText primary={property.address} secondary={`Valor: $${property.value}`} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </List>
    );
};

export default PropertyList;
