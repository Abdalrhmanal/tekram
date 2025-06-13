import { Box, Divider, IconButton, Modal, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function PopUp({
    open,
    onClose,
    title,
    message,
    body
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    body?: React.ReactNode;
}) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                minWidth: 350,
                maxWidth: 400,
                p: 0,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                    <Typography fontWeight="bold">{title}</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ p: 3 }}>
                    {message && <Typography>{message}</Typography>}
                    {body}
                </Box>
            </Box>
        </Modal>
    )
}

export default PopUp

