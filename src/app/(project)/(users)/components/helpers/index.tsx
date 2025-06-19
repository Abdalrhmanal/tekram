import { Avatar } from "@mui/material";
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AssistantDirectionOutlinedIcon from '@mui/icons-material/AssistantDirectionOutlined';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; 
import SouthIcon from '@mui/icons-material/South'; 
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; 
import NorthIcon from '@mui/icons-material/North';

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
        case 'deposit':
            return <><Avatar sx={{ bgcolor: '#3bcf7a' }}><DownloadForOfflineOutlinedIcon /></Avatar></>;
        case 'withdraw':
            return <><Avatar sx={{ bgcolor: 'red' }}><RemoveCircleOutlineOutlinedIcon /></Avatar></>;
        case 'Refund':
            return <><Avatar sx={{ bgcolor: 'blue' }}><AssistantDirectionOutlinedIcon /></Avatar></>;
        case 'Deduction':
            return <><Avatar sx={{ bgcolor: '#000' }}><ArrowCircleUpOutlinedIcon /></Avatar></>;
        case 'tour':
            return <><Avatar sx={{ bgcolor: '#000' }}><ArrowCircleUpOutlinedIcon /></Avatar></>;
        case 'car':
            return <><Avatar sx={{ bgcolor: '#6548da' }}><ArrowCircleUpOutlinedIcon /></Avatar></>;
        case 'cafe':
            return <><Avatar sx={{ bgcolor: '#f18d51' }}><ArrowCircleUpOutlinedIcon /></Avatar></>;
        default:
            return <><Avatar ><CurrencyExchangeOutlinedIcon /></Avatar></>;
    }
};

export function formatDateTime(dateTimeStr: string) {
    if (!dateTimeStr) return '';
    // يدعم كل من "2025-05-26 13:00:00" أو "2025-05-26T13:00:00"
    const dateObj = new Date(dateTimeStr.replace(' ', 'T'));
    if (isNaN(dateObj.getTime())) return dateTimeStr;

    const date = dateObj.toISOString().slice(0, 10);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    return `${date}  ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export const truncateText = (text: string, maxLength: number = 25) =>
    text != null
        ? (text.length > maxLength ? text.substring(0, maxLength) + "..." : text)
        : "";
export function getCurrentDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // الأشهر تبدأ من 0
    const day = now.getDate();
    return `${year}-${month}-${day}`;
}

export const getWalletName = (currency: string) => {
    switch (currency) {
        case "USD":
            return "Cash USD Wallet";
        case "TRY":
            return "Cash TRY Wallet";
        case "SYP":
            return "ShamCash Wallet";
        default:
            return currency;
    }
};

// Format date using Intl.DateTimeFormat
export const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    }).format(new Date(dateString));
};


export const iconByType = (type: string) => {
    switch (type) {
        case 'transfer':
            return <CompareArrowsIcon color="success" />;
        case 'withdraw':
            return <SouthIcon color="primary" />;
        case 'deduction':
            return <RemoveCircleOutlineIcon color="error" />;
        case 'deposit':
            return <NorthIcon color="info" />;
        default:
            return null;
    }
};