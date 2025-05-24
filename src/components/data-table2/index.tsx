"use client";
import React, { useState, useEffect } from "react";
import StructureTable from "./structure-table";
import {
  TextField, Box, Button, Autocomplete, Popover, IconButton, Grid, Checkbox, List, ListItem, ListItemText, ListItemIcon, Typography, Badge,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import ViewColumnIcon from "@mui/icons-material/ViewColumn"; // أيقونة الأعمدة
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useGlobalData from "@/hooks/git-global";
import { useTheme } from "@mui/material/styles";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

interface GridTableProps {
  dataSourceName: string;
  columns: { field: string; headerName: string; sortable?: boolean }[];
  onActionClick?: (row: any) => void;
  onDelete?: (id: number | string) => void;
  isDeleting?: boolean;
  isCreated?: boolean;
  toCreateURLPage?: string; // رابط إنشاء جديد
}

const GridTable: React.FC<GridTableProps> = ({
  dataSourceName,
  columns,
  onActionClick,
  onDelete,
  isDeleting,
  isCreated,
  toCreateURLPage
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortItem, setSortItem] = useState({
    field: "created_at",
    sort: "desc",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterData, setFilterData] = useState<
    { field: string; operator: string; value: string }[]
  >([]);
  const [filterLogic, setFilterLogic] = useState("AND");

  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>(columns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {})); // حالة الأعمدة المرئية

  const filterOperators = ["=", "!=", ">", "<", "LIKE"];

  useEffect(() => {
    const field = searchParams.get("field");
    const operator = searchParams.get("operator");
    const value = searchParams.get("value");

    if (field && operator && value) {
      setSelectedField(field);
      setSelectedOperator(operator);
      setFilterValue(value);
      setFilterData([{ field, operator, value }]);
    }
  }, [searchParams]);

  interface GlobalDataType {
    data: any[];
    pagination?: {
      totalCount: number;
      next_page_url?: string | null;
      prev_page_url?: string | null;
    };
  }

  const { data: GlobalData, isLoading: GlobalLoading, refetch, isError } = useGlobalData<GlobalDataType>({
    dataSourceName,
    enabled: true,
    pageNumber,
    pageSize,
    sort_SortBy: sortItem.field,
    sort_Ascending: sortItem.sort === "asc",
    filter_Conditions: filterData,
    filter_Logic: filterLogic,
    setOldDataAsPlaceholder: true,
  });

  useEffect(() => {
    if (GlobalData?.data) {
      setFilteredRows(GlobalData.data);
    }
  }, [GlobalData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredRows(GlobalData?.data || []);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredData = GlobalData?.data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );

    setFilteredRows(filteredData || []);
  }, [searchQuery, GlobalData]);

  const handleActionClick = (row: any) => {
    if (onActionClick) {
      onActionClick(row);
    }
  };

  const handleDelete = (id: number | string) => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const applyFilter = () => {
    if (selectedField && selectedOperator && filterValue) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("field", selectedField);
      newParams.set("operator", selectedOperator);
      newParams.set("value", filterValue);

      router.push(`${pathname}?${newParams.toString()}`);

      setFilterData([
        {
          field: selectedField,
          operator: selectedOperator,
          value: filterValue,
        },
      ]);
      refetch();
      handleCloseFilter();
    }
  };

  const clearFilter = () => {
    setSelectedField(null);
    setSelectedOperator(null);
    setFilterValue("");
    setFilterData([]);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("field");
    newParams.delete("operator");
    newParams.delete("value");

    router.push(`${pathname}?${newParams.toString()}`);

    refetch();
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [columnAnchorEl, setColumnAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleOpenColumnMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColumnAnchorEl(event.currentTarget);
  };

  const handleCloseColumnMenu = () => {
    setColumnAnchorEl(null);
  };

  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns((prev) => ({ ...prev, [field]: !prev[field] }));
  };
const handleOpenCreateNew = () => {
    setColumnAnchorEl(null);
    router.push(`${toCreateURLPage}`); 
  };

  useEffect(() => {
    refetch();
  }, [sortItem, pageNumber, pageSize, searchParams]);

  if (GlobalLoading) return <p>Loading...</p>;
  if (!GlobalData) return <p>No Data Available</p>;

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 2, padding: 2 }}>
      <Grid container spacing={2} sx={{ pl: 3, pr: 3 }}>

        {isCreated ? (
          <>
            <Grid size={7.5}>
              <TextField
                label="Search in Table"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={1.3}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Badge badgeContent={filterData.length} color="secondary">
                  <IconButton onClick={handleOpenFilter} color="primary">
                    <FilterListIcon fontSize="large" />
                    <Typography variant="body2" color="textSecondary">
                      Filters
                    </Typography>
                  </IconButton>

                </Badge>
              </Box>
            </Grid>
            <Grid size={1.3}>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton onClick={handleOpenColumnMenu} color="primary">
                  <ViewColumnIcon fontSize="large" />
                  <Typography variant="body2" color="textSecondary">
                    Columns
                  </Typography>
                </IconButton>

              </Box>
            </Grid>
            <Grid size={1.9}>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" onClick={handleOpenCreateNew} endIcon={<ControlPointOutlinedIcon />}>
                  Create New
                </Button>
              </Box>
            </Grid>
          </>) : (<>
            <Grid size={9.4}>
              <TextField
                label="Search in Table"
                variant="outlined"
                size="small"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={1.3}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Badge badgeContent={filterData.length} color="secondary">
                  <IconButton onClick={handleOpenFilter} color="primary">
                    <FilterListIcon fontSize="large" />
                    <Typography variant="body2" color="textSecondary">
                      Filters
                    </Typography>
                  </IconButton>

                </Badge>
              </Box>
            </Grid>
            <Grid size={1.3}>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton onClick={handleOpenColumnMenu} color="primary">
                  <ViewColumnIcon fontSize="large" />
                  <Typography variant="body2" color="textSecondary">
                    Columns
                  </Typography>
                </IconButton>

              </Box>
            </Grid>
          </>)}
      </Grid>

      {/* Popover القائمة المنسدلة للفلتر */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 600, padding: 2 } }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Filter Data</Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<ClearIcon />}
            onClick={clearFilter}
            disabled={filterData.length === 0}
          >
            Clear Filter
          </Button>
        </Box>
        <hr />
        <Box display="flex" flexDirection="column" gap={2}>
          <Autocomplete
            options={columns.map((col) => col.field)}
            value={selectedField}
            onChange={(event, newValue) => setSelectedField(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Column"
                variant="outlined"
                size="small"
              />
            )}
          />

          <Autocomplete
            options={filterOperators}
            value={selectedOperator}
            onChange={(event, newValue) => setSelectedOperator(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Operator"
                variant="outlined"
                size="small"
              />
            )}
          />

          <TextField
            label="Filter Value"
            variant="outlined"
            size="small"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={applyFilter}
            disabled={!selectedField || !selectedOperator || !filterValue}
          >
            Apply Filters
          </Button>
        </Box>
      </Popover>

      {/* Popover القائمة المنسدلة للأعمدة */}
      <Popover
        open={Boolean(columnAnchorEl)}
        anchorEl={columnAnchorEl}
        onClose={handleCloseColumnMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 300, padding: 2 } }}
      >
        <List>
          {columns.map((column) => (
            <ListItem
              key={column.field}
              component="div"
              onClick={() => toggleColumnVisibility(column.field)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={visibleColumns[column.field]}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={column.headerName} />
            </ListItem>
          ))}
        </List>
      </Popover>

      {/* 🏷️ جدول البيانات مع بيانات البحث */}
      <StructureTable
        rows={filteredRows}
        columns={columns.filter((col) => visibleColumns[col.field])} // عرض الأعمدة المرئية فقط
        totalCount={filteredRows.length}
        pageNumber={pageNumber - 1}
        pageSize={pageSize}
        onPageChange={(newPage, newPageSize) => {
          setPageNumber(newPage + 1);
          setPageSize(newPageSize);
        }}
        onSort={(field, order) => {
          setSortItem({ field, sort: order });
        }}
        onActionClick={onActionClick}
        onDelete={onDelete}
        isDeleting={isDeleting}
      />
    </Box>
  );
};

export default GridTable;
