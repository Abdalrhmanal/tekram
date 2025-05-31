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
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { renderCell } from "../renderCell/renderCell";
import HeardTabelActions from "../action-table";
import { usePathname, useRouter } from "next/navigation";
import LodingBody from "../loading/loding-body";
import LodingHead from "../loading/loding-head";

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
  isShowDetailse?: boolean;
  isLoading?: boolean;
  isPassDataDetailse?: boolean;
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
  isShowDetailse = false,
  isLoading = false,
  isPassDataDetailse = false,
}) => {
  const [orderBy, setOrderBy] = useState<string | null>("created_at");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const router = useRouter();
  const pathname = usePathname();
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
        {isLoading ? (<LodingHead />) : (
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
        )}
        {isLoading ? (<LodingBody />) : (<TableBody>
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
              {columns.map((column) => (<>
                {isShowDetailse ? (<>
                  <TableCell
                    key={`${row.id}-${index}`}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("button") || target.closest("svg")) return;
                      const rowData = encodeURIComponent(JSON.stringify(row));
                      if (isPassDataDetailse) {
                        router.push(`${pathname}/${row.id}?row=${rowData}`);
                      } else {
                        router.push(`${pathname}/${row.id}`);
                      }
                    }}
                  >
                    {renderCell(column.field, row[column.field], row)}
                  </TableCell>
                </>) : (<>
                  <TableCell key={`${row.id}-${column.field}`} >
                    {renderCell(column.field, row[column.field], row)}
                  </TableCell>
                </>)}

              </>))}
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
        </TableBody>)}

      </Table>
      {
        isLoading ? (
          <Box display="flex" justifyContent="flex-end" mt={1} px={2}>
            <Skeleton variant="rectangular" width={200} height={36} />
          </Box>
        ) : (
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
        )
      }

      {
        selectedRows.length > 0 && (
          <HeardTabelActions
            selectedRows={selectedRows}
            onDeselectAll={() => setSelectedRows([])}
          />
        )
      }
    </Box >
  );
};

export default StructureTable;
