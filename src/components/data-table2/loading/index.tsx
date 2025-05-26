// components/Loding.tsx
import React from "react";
import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";

const Loding = ({ rowCount = 10 }: { rowCount?: number }) => {
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

        <TableBody>
          {[...Array(rowCount)].map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Skeleton variant="circular" width={20} height={20} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                  <Skeleton variant="circular" width={32} height={32} />
                  <Box>
                    <Skeleton width={100} height={10} />
                    <Skeleton width={80} height={10} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell><Skeleton width={40} /></TableCell>
              <TableCell><Skeleton width={90} /></TableCell>
              <TableCell><Skeleton width={100} /></TableCell>
              <TableCell>
                <Skeleton variant="rounded" width={50} height={20} />
              </TableCell>
              <TableCell><Skeleton width={40} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Skeleton */}
      <Box display="flex" justifyContent="flex-end" mt={1} px={2}>
        <Skeleton variant="rectangular" width={200} height={36} />
      </Box>
    </Box>
  );
};

export default Loding;
