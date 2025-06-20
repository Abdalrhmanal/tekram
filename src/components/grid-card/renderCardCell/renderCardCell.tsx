import UnitCardDetails from "./request-booking-card";
import ServisecCard from "./servisec-card";

export const renderCardCell = (
    field: string,
    value: any,
    row: any,
    isProfileProvider: boolean,
    onSuccess?: (response?: any) => void
): React.ReactNode => {
    const truncateText = (text?: string, maxLength: number = 15) => {
        if (!text) return "-";
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };
    const handerSuccess = () => {
        if (onSuccess) {
            onSuccess();
        }
    }
    switch (field) {
        case "unitId":
            return (
                <UnitCardDetails value={value} row={row} isProfileProvider={isProfileProvider} onSuccess={handerSuccess} />
            );
        case "guestid":
            return (
                <>
                    <ServisecCard value={value} row={row} isProfileProvider={isProfileProvider} onSuccess={handerSuccess} />
                </>
            );
        default:
            return;
    }
};
