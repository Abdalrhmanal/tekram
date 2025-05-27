import React from "react";
import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";

const LodingHead = () => {
  const columnCount = 6; // عدد الأعمدة بدون الـ checkbox
  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Skeleton variant="circular" width={20} height={20} />
            </TableCell>
            <TableCell><Skeleton variant="text" width={100} /></TableCell> {/* Name */}
            <TableCell><Skeleton variant="text" width={80} /></TableCell>  {/* City */}
            <TableCell><Skeleton variant="text" width={120} /></TableCell> {/* Phone */}
            <TableCell><Skeleton variant="text" width={150} /></TableCell> {/* Address */}
            <TableCell><Skeleton variant="text" width={70} /></TableCell>  {/* Status */}
            <TableCell><Skeleton variant="text" width={60} /></TableCell>  {/* Wallet */}
          </TableRow>
        </TableHead>
      </Table>
    </Box>
  );
};

export default LodingHead;