'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Document = {
  id: string;
  title: string;
  url: string;
};

interface DocumentGalleryProps {
  documents: Document[];
}

const isImage = (url: string) =>
  /\.(png|jpe?g|gif|bmp|webp)$/i.test(url);

const isPDF = (url: string) =>
  /\.pdf$/i.test(url);

const DocumentGallery: React.FC<DocumentGalleryProps> = ({ documents }) => {
  const router = useRouter();

  const handleOpen = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Provided Documents
      </Typography>
      <Grid container spacing={2}>
        {documents.map((doc) => (
          <Grid key={doc.id} size={4} >
            <Card>
              <CardActionArea onClick={() => handleOpen(doc.url)}>
                {isImage(doc.url) ? (
                  <CardMedia sx={{ height: 300, position: 'relative' }}>
                    <Image
                      src={doc.url}
                      alt={doc.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </CardMedia>
                ) : isPDF(doc.url) ? (
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2'
                    }}
                  >
                    <PictureAsPdfIcon sx={{ fontSize: 80, color: '#d32f2f' }} />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      height: 300,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#f2f2f2'
                    }}
                  >
                    <Typography>Unsupported</Typography>
                  </Box>
                )}
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    fontWeight="bold"
                  >
                    {doc.title}
                  </Typography>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DocumentGallery;
