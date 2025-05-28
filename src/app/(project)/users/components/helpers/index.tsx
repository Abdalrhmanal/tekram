import { Avatar } from "@mui/material";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
export const getStatusStyle = (status: string) => {
    switch (status) {
        case 'Scheduled':
            return { backgroundColor: '#E1F5FE', color: '#0288D1' };
        case 'Active':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case 'active':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case 'In Progress':
            return { backgroundColor: '#FFF3E0', color: '#0288D1' };
        case 'Locked':
            return { backgroundColor: '#FEEBEE', color: '#D32F2F' };
        case 'Pending':
            return { backgroundColor: '#FFF3E0', color: '#F57C00' };
        case 'Completed':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case 'Delivered':
            return { backgroundColor: '#A1F5FE', color: '#white' };
        case 'Planned':
            return { backgroundColor: '#FFF3E0', color: '#0288D1' };
        case 'inactive':
            return { backgroundColor: '#E1F5FE', color: '#0288D1' };
        case 'pending':
            return { backgroundColor: '#FFF3E0', color: '#F57C00' };
        case 'Failed':
            return { backgroundColor: '#FEEBEE', color: '#D32F2F' };
        case 'OutForDelivery':
            return { backgroundColor: '#FFF3E0', color: '#F57C00' };
        case 'ShipTo':
            return { backgroundColor: '#FFF3E0', color: '#F57C00' };
        case 'BillTo':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case 'FinalContract':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case 'Open':
            return { backgroundColor: '#E0F2F1', color: '#00796B' };
        case "Reserved":
            return { backgroundColor: "#FEEBEE", color: "#D32F2F" };
        case "Available":
            return { backgroundColor: "#E0F2F1", color: "#00796B" };
        case "partialOpen":
            return { backgroundColor: "#FFF3E0", color: "#F57C00" };
        case "Renting":
            return { backgroundColor: "#EF6C00", color: "#EF6C00" };
        case "Waiting":
            return { backgroundColor: "#FFF3E0", color: "#F57C00" };
        default:
            return {};
    }
};


export const getIcon = (type: string) => {
    switch (type) {
        case 'Deposit':
            return <><Avatar sx={{ bgcolor: '#3bcf7a' }}><DownloadForOfflineOutlinedIcon /></Avatar></>;
        case 'Withdrawal':
            return <><Avatar sx={{ bgcolor: 'red' }}><RemoveCircleOutlineOutlinedIcon /></Avatar></>;
        case 'Refund':
            return <><Avatar sx={{ bgcolor: 'blue' }}><AssistantDirectionOutlinedIcon /></Avatar></>;
        case 'Deduction':
            return <><Avatar sx={{ bgcolor: '#000' }}><ArrowCircleUpOutlinedIcon /></Avatar></>;
        default:
            return <><Avatar ><CurrencyExchangeOutlinedIcon /></Avatar></>;
    }
};