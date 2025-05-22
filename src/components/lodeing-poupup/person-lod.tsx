import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import Image from "next/image";
import CharactersLodeing from "../../../public/characters/characters-see.avif";

function PersonLod({ messag }: { messag: string }) {
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{
            height: 500,
            padding: 4,
        }}
        >
            {/* قسم الصورة */}
            <Grid size={4}  sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <Box sx={{ width: "100%", maxWidth: 300 }}>
                    <Image
                        src={CharactersLodeing.src}
                        alt="Characters"
                        width={300}
                        height={500}
                        style={{ objectFit: "contain" }}
                    />
                </Box>
            </Grid>

            {/* قسم النص */}
            <Grid size={8} sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
            >
                <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", mb: 2 }}>
                    {messag}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default PersonLod;
