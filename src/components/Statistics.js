import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';
import { fetchProperties } from '../api/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getValueRanges = (properties) => {
    const ranges = {
        low: 0,
        medium: 0,
        high: 0,
        veryHigh: 0
    };

    properties.forEach(property => {
        const value = property.value;
        if (value < 100000) {
            ranges.low += 1;
        } else if (value < 300000) {
            ranges.medium += 1;
        } else if (value < 500000) {
            ranges.high += 1;
        } else {
            ranges.veryHigh += 1;
        }
    });

    return [
        { name: 'Under $100k', value: ranges.low },
        { name: '$100k - $300k', value: ranges.medium },
        { name: '$300k - $500k', value: ranges.high },
        { name: 'Over $500k', value: ranges.veryHigh }
    ];
};

const Statistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchProperties()
            .then(response => {
                const valueRanges = getValueRanges(response.data);
                setData(valueRanges);
            })
            .catch(error => console.error('Error fetching properties:', error));
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
            <Box>
                <Typography variant="h6" align="center">Property Value Ranges</Typography>
                <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                        <Pie data={data} dataKey="value" outerRadius={100} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default Statistics;
