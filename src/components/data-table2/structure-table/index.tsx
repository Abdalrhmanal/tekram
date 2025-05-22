import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Checkbox,
  Box,
  TableSortLabel,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { renderCell } from "../renderCell/renderCell";
import HeardTabelActions from "../head-table-action";

interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
}

interface RowData {
  id: string;
  [key: string]: any;
}

interface StructureTableProps {
  rows: RowData[];
  columns: Column[];
  totalCount: number;
  onSort?: (field: string, order: "asc" | "desc") => void;
  onPageChange?: (page: number, pageSize: number) => void;
  pageNumber: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onActionClick?: (row: RowData) => void;
  onDelete?: (id: string | number) => void;
  isDeleting?: boolean;
}

const StructureTable: React.FC<StructureTableProps> = ({
  rows,
  columns,
  totalCount,
  onSort,
  onPageChange,
  pageNumber,
  pageSize,
  pageSizeOptions = [5, 10, 25],
  onActionClick,
  onDelete,
  isDeleting = false,
}) => {
  const [orderBy, setOrderBy] = useState<string | null>("created_at");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);

  const hasActions = !!onActionClick || !!onDelete;

  const handleSort = (field: string) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";
    setOrderBy(field);
    setOrderDirection(direction);
    onSort?.(field, direction);
  };

  const handleSelectRow = (row: RowData) => {
    setSelectedRows((prevSelected) =>
      prevSelected.some((selectedRow) => selectedRow.id === row.id)
        ? prevSelected.filter((selectedRow) => selectedRow.id !== row.id)
        : [...prevSelected, row]
    );
  };

  return (
    <Box p={1}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={
                  selectedRows.length > 0 && selectedRows.length < rows.length
                }
                checked={selectedRows.length === rows.length && rows.length > 0}
                onChange={() =>
                  setSelectedRows(
                    selectedRows.length === rows.length ? [] : rows
                  )
                }
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.field}
                    direction={orderDirection}
                    onClick={() => handleSort(column.field)}
                  >
                    {column.headerName}
                  </TableSortLabel>
                ) : (
                  column.headerName
                )}
              </TableCell>
            ))}
            {hasActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id || `row-${index}`}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedRows.some(
                    (selectedRow) => selectedRow.id === row.id
                  )}
                  onChange={() => handleSelectRow(row)}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.field}`}>
                  {renderCell(column.field, row[column.field], row)}
                </TableCell>
              ))}
              {hasActions && (
                <TableCell>
                  <Box display="flex" gap={1}>
                    {onActionClick && (
                      <IconButton
                        color="primary"
                        onClick={() => onActionClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton
                        color="error"
                        onClick={() => onDelete(row.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <DeleteOutline />
                        )}
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={totalCount}
        rowsPerPage={pageSize}
        page={pageNumber}
        onPageChange={(event, newPage) => onPageChange?.(newPage, pageSize)}
        onRowsPerPageChange={(event) =>
          onPageChange?.(0, parseInt(event.target.value, 10))
        }
      />

      {selectedRows.length > 0 && (
        <HeardTabelActions
          selectedRows={selectedRows}
          onDeselectAll={() => setSelectedRows([])}
        />
      )}
    </Box>
  );
};

export default StructureTable;
