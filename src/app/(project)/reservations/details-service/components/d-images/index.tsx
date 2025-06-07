import useGlobalData from '@/hooks/get-global';
import React from 'react';
import { Grid, Box } from '@mui/material';

type MediaItem = {
    id: string;
    media: string;
    media_type: string;
};

type MediaResponse = {
    data?: MediaItem[];
};

function DImages({ id }: { id: any; }) {
    const { data, isLoading, isFetching, isError, refetch } = useGlobalData<MediaResponse>({
        dataSourceName: `api/service-units/${id}/media`
    });

    const images: MediaItem[] = data?.data?.filter(item => item.media_type === "image") || [];

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading images.</div>;
    if (!images.length) return <div>No images found.</div>;

    return (
        <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {images.map((img) => (
                    <Grid size={4} key={img.id}>
                        <Box
                            component="img"
                            src={img.media}
                            alt={`image-${img.id}`}
                            sx={{
                                width: '100%',
                                height: 180,
                                objectFit: 'cover',
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default DImages;