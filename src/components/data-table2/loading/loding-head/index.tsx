import React from "react";
import { Skeleton, TableCell, TableHead, TableRow } from "@mui/material";

const LodingHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Skeleton variant="circular" width={20} height={20} />
        </TableCell>
        <TableCell><Skeleton variant="text" width={100} /></TableCell>
        <TableCell><Skeleton variant="text" width={80} /></TableCell>
        <TableCell><Skeleton variant="text" width={120} /></TableCell>
        <TableCell><Skeleton variant="text" width={150} /></TableCell>
        <TableCell><Skeleton variant="text" width={70} /></TableCell>
        <TableCell><Skeleton variant="text" width={60} /></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LodingHead;
