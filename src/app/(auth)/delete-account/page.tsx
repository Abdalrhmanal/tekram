import React from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const DeleteAccount: React.FC = () => {
    const handleDeleteAccount = async () => {
        if (!confirm("Are you sure you want to permanently delete your account?")) return;

        try {
            // Replace this with your real API call
            // Example: await axios.delete('/api/account');
            console.log("Account deletion request sent.");
            alert("Your account has been deleted.");
            // Redirect or logout logic here
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <Container component="main" maxWidth="sm" dir="ltr">
            <Paper elevation={3} style={{ padding: '20px', borderRadius: '8px' }}>
                <Typography variant="h4" align="center" color="error">
                    Delete User Account
                </Typography>
                <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
                    To delete your account, please follow these steps:
                </Typography>
                <Box component="ol" sx={{ paddingLeft: 2 }}>
                    <li>
                        <Typography variant="h5">Open the app and go to your profile page and Choose the "Delete Account" option.</Typography>
                        <Box display="flex" justifyContent="center">
                            <img src="/delete-account/image1.png" alt="Step 2" style={{ width: '300px', height: '600px', borderRadius: '8px' }} />
                        </Box>
                    </li>
                    <li>
                        <Typography variant="h5">Confirm the deletion by clicking the confirm button in the popup.</Typography>
                        <Box display="flex" justifyContent="center">
                            <img src="/delete-account/image2.png" alt="Step 3" style={{ width: '300px', height: '600px', borderRadius: '8px' }} />
                        </Box>
                    </li>
                </Box>

                <Typography variant="body1" align="center" style={{ margin: '20px 0' }}>
                    Please note that deleting your account will:
                </Typography>
                <Box component="ul" sx={{ paddingLeft: 2 }}>
                    <li>
                        <Typography variant="body2">Permanently remove all your data from our servers.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">Immediately log you out of the app.</Typography>
                    </li>
                </Box>

                {/* Data Security Section */}
                <Typography variant="h5" align="center" style={{ margin: '20px 0', color: '#1976d2' }}>
                    🔒 Your Data Security
                </Typography>
                <Typography variant="body1" align="center" style={{ margin: '10px 0' }}>
                    We are committed to protecting your privacy and ensuring a secure experience.
                </Typography>

                <Typography variant="h6" style={{ margin: '20px 0' }}>
                    📍 Data We Collect:
                </Typography>
                <Box component="ul" sx={{ paddingLeft: 2 }}>
                    <li>
                        <Typography variant="body2"><b>Location</b> (optional): To enhance the services we provide.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2"><b>Email</b> (required): For login and updates.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2"><b>City of residence</b></Typography>
                    </li>
                    <li>
                        <Typography variant="body2"><b>Phone number</b> (optional)</Typography>
                    </li>
                </Box>

                <Typography variant="h6" style={{ margin: '20px 0' }}>
                    🔐 How We Protect Your Data:
                </Typography>
                <Box component="ul" sx={{ paddingLeft: 2 }}>
                    <li>
                        <Typography variant="body2">We use AES-256 encryption for data transmission.</Typography>
                    </li>
                    <li>
                        <Typography variant="body2">We never share your data with third parties unless absolutely necessary (e.g., payment providers).</Typography>
                    </li>
                </Box>

                <Typography variant="h6" style={{ margin: '20px 0' }}>
                    📜 Privacy Policy
                </Typography>

                <Box textAlign="center" marginTop={2}>
                    <Button variant="outlined" color="primary" href="/privacypolicy">
                        Read the App Privacy Policy
                    </Button>
                </Box>

                <Box textAlign="center" marginTop={4}>
                    <Button variant="contained" color="error" onClick={handleDeleteAccount}>
                        Permanently Delete My Account
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default DeleteAccount;
