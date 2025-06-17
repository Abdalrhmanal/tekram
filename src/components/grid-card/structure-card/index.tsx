"use client";
import {
  Box, Grid, Card, CardHeader, CardContent, Checkbox, Typography, IconButton, Menu, MenuItem,
  Pagination, Skeleton, CircularProgress
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { StructureTableProps, RowData } from "@/components/data-table2/type/type";
import HeardTabelActions from "@/components/data-table2/action-table";
import { renderCardCell } from "../renderCardCell/renderCardCell";

const StructureCard: React.FC<StructureTableProps> = ({
  rows, columns, totalCount, onPageChange, pageNumber,
  pageSize, pageSizeOptions = [5, 10, 25], onActionClick,
  onDelete, isDeleting = false, isShowDetailse = false,
  isLoading = false, isPassDataDetailse = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuRowId, setMenuRowId] = useState<string | null>(null);

  const handleSelectRow = (row: RowData) => {
    setSelectedRows(prev =>
      prev.some(selected => selected.id === row.id)
        ? prev.filter(selected => selected.id !== row.id)
        : [...prev, row]
    );
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, rowId: string) => {
    setAnchorEl(event.currentTarget);
    setMenuRowId(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRowId(null);
  };

  const handleNavigateToDetail = (row: RowData) => {
    const rowData = encodeURIComponent(JSON.stringify(row));
    if (isPassDataDetailse) {
      router.push(`${pathname}/${row.id}?row=${rowData}`);
    } else {
      router.push(`${pathname}/${row.id}`);
    }
  };

  const isSelected = (row: RowData) =>
    selectedRows.some(selected => selected.id === row.id);
  return (
    <Box p={2}>
      {/* Cards Grid */}
      <Grid container spacing={2}>
        {isLoading ? (
          [...Array(8)].map((_, idx) => (
            <Grid size={4} key={idx}>
              <Skeleton variant="rectangular" height={200} />
            </Grid>
          ))
        ) : (
          rows.map((row) => (
            <Grid size={4} key={row.id}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, height: '100%' }}>
                <CardHeader
                sx={{bgcolor: '#fafafa'}}
                  action={
                    <>
                      <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && menuRowId === row.id}
                        onClose={handleMenuClose}
                      >
                        {onActionClick && (
                          <MenuItem onClick={() => {
                            onActionClick(row);
                            handleMenuClose();
                          }}>
                            تعديل
                          </MenuItem>
                        )}
                        {onDelete && (
                          <MenuItem onClick={() => {
                            onDelete(row.id);
                            handleMenuClose();
                          }}>
                            {isDeleting ? <CircularProgress size={16} /> : "حذف"}
                          </MenuItem>
                        )}
                      </Menu>
                    </>
                  }
                  title={
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Checkbox
                        checked={isSelected(row)}
                        onChange={() => handleSelectRow(row)}
                      />
                    </Box>
                  }
                />
                <CardContent onClick={() => handleNavigateToDetail(row)} sx={{ cursor: "pointer" }}>
                  {columns.map((col) => (
                    <Box key={col.field} mb={1}>
                      {renderCardCell(col.field, row[col.field], row)}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination */}
      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={pageNumber + 1}
          onChange={(_, newPage) => onPageChange?.(newPage - 1, pageSize)}
          shape="rounded"
          color="primary"
        />
      </Box>

      {/* Table actions bar if needed */}
      {selectedRows.length > 0 && (
        <HeardTabelActions
          selectedRows={selectedRows}
          onDeselectAll={() => setSelectedRows([])}
        />
      )}
    </Box>
  );
};

export default StructureCard;
