import React, { useState } from 'react';
import { Button, Container, Typography, TextField, Box, List, ListItem, ListItemText } from '@mui/material';

const Dashboard: React.FC = () => {
    const [specFile, setSpecFile] = useState<File | null>(null);
    const [verilogFile, setVerilogFile] = useState<File | null>(null);
    const [flags, setFlags] = useState<string[]>([]);
    const [newFlag, setNewFlag] = useState<string>('');

    const handleSpecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSpecFile(event.target.files[0]);
        }
    };

    const handleVerilogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setVerilogFile(event.target.files[0]);
        }
    };

    const handleAddFlag = () => {
        if (newFlag.trim()) {
            setFlags((prevFlags) => [...prevFlags, newFlag.trim()]);
            setNewFlag('');
        }
    };

    const handleRemoveFlag = (index: number) => {
        setFlags((prevFlags) => prevFlags.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (specFile && verilogFile) {
            console.log('Spec File:', specFile);
            console.log('Verilog File:', verilogFile);
            console.log('Flags:', flags);
            alert('Files and flags submitted! (Replace with backend logic)');
        } else {
            alert('Please upload both files.');
        }
    };

    return (
        <Container style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Verilog-Spec Dashboard
            </Typography>

            {/* File Upload */}
            <Box sx={{ margin: '20px 0' }}>
                <Typography variant="body1">Upload Spec File (.txt):</Typography>
                <input 
                    type="file" 
                    onChange={handleSpecChange} 
                    accept=".txt" 
                    style={{ display: 'block', margin: '10px auto' }} 
                />

                <Typography variant="body1">Upload Verilog File (.v, .sv):</Typography>
                <input 
                    type="file" 
                    onChange={handleVerilogChange} 
                    accept=".v,.sv" 
                    style={{ display: 'block', margin: '10px auto' }} 
                />
            </Box>

            {/* Flags Section */}
            <Box sx={{ margin: '20px 0' }}>
                <Typography variant="h5" gutterBottom>
                    Flags
                </Typography>

                <TextField
                    label="New Flag"
                    variant="outlined"
                    value={newFlag}
                    onChange={(e) => setNewFlag(e.target.value)}
                    style={{ marginBottom: '10px', width: '300px' }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddFlag}
                    style={{ marginLeft: '10px', height: '55px' }}
                >
                    Add Flag
                </Button>

                {/* List of Flags */}
                <List style={{ marginTop: '20px', textAlign: 'left', display: 'inline-block' }}>
                    {flags.map((flag, index) => (
                        <ListItem
                            key={index}
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                        >
                            <ListItemText primary={flag} />
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveFlag(index)}
                            >
                                Remove
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Submit Section */}
            <Box sx={{ margin: '20px 0' }}>
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleSubmit}
                    disabled={!specFile || !verilogFile || flags.length === 0}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
