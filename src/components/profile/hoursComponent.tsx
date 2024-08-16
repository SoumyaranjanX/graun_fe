import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
 
interface HoursProps {
    openTime: string;
    closeTime: string;
    onChangeOpenTime: (time: string) => void;
    onChangeCloseTime: (time: string) => void;
}
 
const Hours: React.FC<HoursProps> = ({ openTime, closeTime, onChangeOpenTime, onChangeCloseTime }) => {
    const hours = [
        '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ];
 
    const [filteredCloseHours, setFilteredCloseHours] = useState<string[]>(hours);
 
    const handleOpenTimeChange = (time: string) => {
        onChangeOpenTime(time);
        const openHourIndex = hours.indexOf(time);
        setFilteredCloseHours(hours.slice(openHourIndex + 1));
    };
 
    const handleCloseTimeChange = (time: string) => {
        onChangeCloseTime(time);
    };
 
    return (
        <Box className="hours">
            <TextField
                id="open"
                select
                label="Open"
                value={openTime}
                onChange={(e) => handleOpenTimeChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '10ch', marginRight: '10px', marginTop: '-10px' }}
            >
                {hours.map((time) => (
                    <MenuItem key={time} value={time}>
                        {time}
                    </MenuItem>
                ))}
            </TextField>
            <div className="separator">TO</div>
            <TextField
                id="close"
                select
                label="Close"
                value={closeTime}
                onChange={(e) => handleCloseTimeChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ width: '10ch', marginLeft: '10px', marginTop: '-10px' }}
            >
                {filteredCloseHours.map((time) => (
                    <MenuItem key={time} value={time}>
                        {time}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};
 
export default Hours;