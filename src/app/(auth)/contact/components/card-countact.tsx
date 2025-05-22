"use client";
import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    Grid,
    TextField,
    Snackbar,
    Container,
} from '@mui/material';
import { Facebook, Instagram, Twitter, Mail } from '@mui/icons-material';
import Image from 'next/image';

interface ContactFormFields {
    name: string;
    email: string;
    message: string;
}
interface ContactProps {
    title: string;
    description: string;
    imageUrl: string;
}

const HeroSection = ({ title, description, imageUrl }: ContactProps) => {
    const [formFields, setFormFields] = useState<ContactFormFields>({
        name: '',
        email: '',
        message: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Update form fields when user types
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = () => {
        // Here you can add logic to send the data via email or API
        console.log('Message sent:', formFields);
        setSnackbarOpen(true); // Show success message
    };

    return (
        <Box
            sx={{
                position: 'relative',
                padding: '4rem 2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
            }}
        >
            <Container maxWidth="lg">
                {/* Snackbar for success notification */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    message="Your message has been sent successfully!"
                />

                <Grid container spacing={4} alignItems="center">
                    {/* Right Side (Profile Picture and Tagline) */}
                    <Grid size={3} textAlign="center">
                        <Stack direction="column" spacing={2} alignItems="center">
                            {/* Profile Picture */}
                            <Image
                                alt="Support Team"
                                src={imageUrl} // Replace with your image
                                width={200}
                                height={200}
                            />

                            {/* Agency Tagline */}
                            <Typography variant="h5" component="h2">
                                Our Support Team
                            </Typography>

                            {/* Email Address */}
                            <Typography variant="body1">
                                admin.Templeat@Templeat.com
                            </Typography>

                            {/* Social Media Icons */}
                            <Stack direction="row" spacing={2}>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <Instagram />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <Facebook />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <Twitter />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <Mail />
                                </a>
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Left Side (Contact Form) */}
                    <Grid size={9}>
                        <Stack direction="column" spacing={2} textAlign="left">
                            <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
                                {title}
                            </Typography>
                            <Typography variant="body1" sx={{ maxWidth: 600 }}>
                                {description}
                            </Typography>

                            {/* Contact Form Fields */}
                            <TextField
                                fullWidth
                                label="Your Name"
                                name="name"
                                size='small'
                                value={formFields.name}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Your Email"
                                name="email"
                                size='small'
                                value={formFields.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Your Message"
                                name="message"
                                value={formFields.message}
                                onChange={handleInputChange}
                                variant="outlined"
                                multiline
                                rows={4}
                                margin="normal"
                            />

                            {/* Submit Button */}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                size="small"
                            >
                                Send Message
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;