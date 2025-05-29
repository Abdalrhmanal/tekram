import { Box, Button, Checkbox, Chip, Divider, FormControlLabel, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import DocumentGallery from '../../components/document-gallery';

function DetailsOrderSProv() {
    const user = {
        fullName: 'Amer Ahmed Al-Mohammad',
        email: 'kareem.happal@gmail.com',
        mobile: '0934565412',
        city: 'Aleppo',
        address: 'Al-Zahra Association',
        registerDate: '2025/05/10',
        image: '/images/image.png',
    };
    const typeServe = {
        title: 'Service Type',
        type: [
            { name: 'Delivery', value: 'delivery' },
            { name: 'Pickup', value: 'pickup' },
            { name: 'In-Store', value: 'in-store' },
            { name: 'Online', value: 'online' }
        ]
    };
    const documents = [
        { id: '1', url: '/imagis/image.png', title: 'documint 1' },
        { id: '2', url: '/imagis/image.png', title: 'documint 2' },
        { id: '3', url: '/imagis/image.png', title: 'documint 3' },

    ]
    const truncateText = (text: string, maxLength: number = 25) =>
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    return (
        <>
            <Box >
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Order Details
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={8}>
                        <Box sx={{ mb: 4, bgcolor: '#fff', padding: 2, borderRadius: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Profile Image Section */}
                                <Grid size={4} display="flex" justifyContent="center" alignItems="center">
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <Image
                                                alt={user.fullName}
                                                src={user.image.trim()}
                                                width={150}
                                                height={150}
                                                style={{ borderRadius: '5%' }}
                                            />
                                        </Grid>
                                        <Grid size={12} display="flex" justifyContent="center" alignItems="center">
                                            <Typography variant="h5" fontWeight="bold" align="center">
                                                {user.fullName}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/* Info Section */}
                                <Grid size={8}>
                                    <Grid container spacing={2} direction="column">
                                        <Grid size={12}>
                                            <Grid container spacing={2}>
                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Email
                                                    </Typography>
                                                    <Typography align="right">{truncateText(user.email)}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Mobile Number
                                                    </Typography>
                                                    <Typography align="right">{user.mobile}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        City
                                                    </Typography>
                                                    <Typography align="right">{user.city}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Address
                                                    </Typography>
                                                    <Typography align="right">{truncateText(user.address)}</Typography>
                                                </Grid>

                                                <Grid size={4}>
                                                    <Typography color="textSecondary" align="right">
                                                        Registration Date
                                                    </Typography>
                                                    <Typography align="right">{user.registerDate}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid size={4}>
                        <Box sx={{ mb: 4, bgcolor: '#fff', padding: 2, borderRadius: 2 }}>
                            <Typography variant="h5" fontWeight="bold" align="left" >
                                {typeServe.title}
                            </Typography>
                            <Divider />
                            <Grid container spacing={2} sx={{ p: 2 }}>
                                {typeServe.type.map((item, index) => (
                                    <Grid key={index} display="flex" justifyContent="center">
                                        <Chip
                                            label={item.name}
                                            color="primary"
                                            variant="outlined"
                                            sx={{ margin: '0 5px' }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Order Details
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <DocumentGallery documents={documents} />
                    </Grid>
                    <Grid size={12}>
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactMailOutlinedIcon />
                                <Typography variant="h5" fontWeight="bold" align="left">
                                    Order Details
                                </Typography>
                            </Box>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid size={12}>
                        <Typography textAlign="end" mb={1}>
                            Approval for:
                        </Typography>

                        <Grid container spacing={2} justifyContent="flex-end">
                            {[
                                "Car Rental",
                                "Hotel Room Rental",
                                "Chalet Rental",
                                "Farm Rental",
                                "Swimming Pool Rental",
                                "House Rental",
                            ].map((label, index) => (
                                <Grid size={3} key={index}>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked={label === "Car Rental" || label === "Farm Rental"} />}
                                        label={label}
                                        sx={{ justifyContent: "end", width: "100%", m: 0 }}
                                        labelPlacement="start"
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box mt={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(to right, #2196f3, #4fc3f7)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: 2,
                                    py: 1.2,
                                }}
                            >
                                Approve
                            </Button>
                        </Box>

                        <Divider sx={{ my: 3, borderColor: "error.main" }} />

                        <Typography color="error" fontWeight="bold" textAlign="end" mb={1}>
                            Reject Order
                        </Typography>

                        <Typography color="textSecondary" textAlign="end">
                            The order is not compatible, delete the order
                        </Typography>

                        <Box mt={2}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="error"
                                sx={{ fontWeight: "bold", borderRadius: 2, py: 1.2 }}
                            >
                                Delete Order Completely
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default DetailsOrderSProv