"use client";
import React from 'react';
import { Container, Typography, Paper } from "@mui/material";

function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                Privacy Policy for Tekram
            </Typography>
            <Typography variant="body1" align="center" paragraph>
                Tekram is a tourism-focused platform that allows users to book various services such as car rentals, hotel rooms, chalets, and other services provided by registered service providers. The platform also supports secure electronic payments using multiple digital wallets and payment methods. Our goal is to offer a seamless, safe, and user-friendly experience for all tourists.
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    1. Information We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                    When you use the Tekram app, we may collect the following information:
                </Typography>
                <ul>
                    <li><strong>Personal Information:</strong> Such as your name, email address, phone number, nationality, and any other details provided during registration or service booking.</li>
                    <li><strong>Payment Information:</strong> Data related to your payment method (e.g., wallet type, transaction ID), while ensuring that sensitive payment details are processed securely through third-party payment gateways.</li>
                    <li><strong>Device Information:</strong> Including device type, operating system, IP address, and unique device identifiers.</li>
                    <li><strong>Usage Data:</strong> Information about your interactions with the app, such as services viewed, bookings made, and session duration.</li>
                </ul>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    2. How We Use Your Information
                </Typography>
                <Typography variant="body1" paragraph>
                    The information collected is used for the following purposes:
                </Typography>
                <ul>
                    <li>To enable booking of tourism-related services through the Tekram platform.</li>
                    <li>To facilitate and confirm secure electronic payments.</li>
                    <li>To connect users with service providers and ensure proper service delivery.</li>
                    <li>To enhance user experience through personalized suggestions and service improvements.</li>
                    <li>To provide support, send notifications, and inform users about updates or policy changes.</li>
                </ul>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    3. Sharing Your Information
                </Typography>
                <Typography variant="body1" paragraph>
                    Tekram values your privacy and will not sell or rent your personal information. We may share data only under the following conditions:
                </Typography>
                <ul>
                    <li>With service providers (e.g., hotel or car rental operators) for booking fulfillment purposes.</li>
                    <li>With payment processors and gateways to complete electronic transactions.</li>
                    <li>With legal authorities when required by law or to protect platform users and rights.</li>
                </ul>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    4. Data Security
                </Typography>
                <Typography variant="body1" paragraph>
                    We implement appropriate security measures to protect your information. However, no method of electronic storage or transmission over the Internet is 100% secure. We work continuously to ensure data integrity and protection.
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    5. Your Rights
                </Typography>
                <Typography variant="body1" paragraph>
                    You may request to access, update, or delete your personal information at any time by contacting us at <a href="mailto:support@tekram.app">support@tekram.app</a>.
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    6. Changes to This Privacy Policy
                </Typography>
                <Typography variant="body1" paragraph>
                    We may update this Privacy Policy as our services evolve. Users will be notified of any significant updates through the app or our website.
                </Typography>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, mb: 2 }}>
                <Typography variant="h5" gutterBottom>
                    7. Contact Us
                </Typography>
                <Typography variant="body1" paragraph>
                    For questions or concerns regarding this Privacy Policy or your data, please contact us:
                </Typography>
                <ul>
                    <li>Email: <a href="mailto:support@tekram.app">support@tekram.app</a></li>
                    <li>Phone: <a href="tel:+1234567890">+1 234 567 890</a></li>
                </ul>
            </Paper>

            <Typography variant="body1">
                Last Updated: March 12, 2025
            </Typography>
        </Container>
    );
}

export default PrivacyPolicy;
