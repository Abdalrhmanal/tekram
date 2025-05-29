import React from "react";
import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

const LodingBody = ({ rowCount = 7 }: { rowCount?: number }) => {
  return (
    <TableBody>
      {[...Array(rowCount)].map((_, index) => (
        <TableRow key={index}>
          <TableCell padding="checkbox">
            <Skeleton variant="circular" width={20} height={20} />
          </TableCell>
          <TableCell>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Skeleton variant="circular" width={32} height={32} />
              <span>
                <Skeleton width={100} height={10} />
                <Skeleton width={80} height={10} />
              </span>
            </span>
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
  );
};

export default LodingBody;
