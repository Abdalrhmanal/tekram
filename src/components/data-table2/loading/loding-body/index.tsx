// components/LodingBody.tsx
import React from "react";
import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";

const LodingBody = ({ rowCount = 7 }: { rowCount?: number }) => {
  return (
    <Box>
      <Table>
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
    </Box>
  );
};

export default LodingBody;