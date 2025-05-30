"use client";
import React, { useState, useEffect } from "react";
import StructureTable from "./structure-table";
import {
  TextField, Box, Button, Autocomplete, Popover, IconButton, Grid, Checkbox, List, ListItem, ListItemText, ListItemIcon, Typography, Badge,
  ListItemButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import ViewColumnIcon from "@mui/icons-material/ViewColumn"; // أيقونة الأعمدة
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useGlobalData from "@/hooks/git-global";
import { useTheme } from "@mui/material/styles";
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { ComparisonOperator, FilterType, GlobalDataType, GridTableProps } from "./type/type";
import Loding from "./loading/loding-body";

const GridTable: React.FC<GridTableProps> = ({
  dataSourceName,
  columns,
  onActionClick,
  onDelete,
  isDeleting,
  isCreated,
  toCreateURLPage,
  isShowDetailse,
  fixedFilter
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortItem, setSortItem] = useState({
    field: "is_active",
    sort: "desc",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>("");
  const [filterData, setFilterData] = useState<FilterType[]>([]);
  const [filterLogic, setFilterLogic] = useState("AND");

  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>(columns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {}));


  useEffect(() => {
    const field = searchParams.get("field");
    const operator = searchParams.get("operator");
    const value = searchParams.get("value");

    const dynamicFilters = [];

    if (field && operator && value) {
      dynamicFilters.push({ field, operator, value });
      setSelectedField(field);
      setSelectedOperator(operator);
      setFilterValue(value);
    } else {
      setSelectedField(null);
      setSelectedOperator(null);
      setFilterValue("");
    }

    setFilterData(
      [fixedFilter, ...dynamicFilters]
        .filter((f): f is FilterType => !!f && typeof f === "object" && "field" in f && "operator" in f && "value" in f)
    );
  }, [searchParams]);
  useEffect(() => {
    if (filterData.length > 1) {
      setFilterLogic("OR");
    } else {
      setFilterLogic("AND");
    }
  }, [filterData]);

  console.log(searchQuery, "searchQuery");

  const { data: GlobalData, isLoading: GlobalLoading, refetch, isError } = useGlobalData<GlobalDataType>({
    dataSourceName,
    enabled: true,
    pageNumber,
    pageSize,
    keyword: searchQuery,
    sort_SortBy: sortItem.field,
    sort_Ascending: sortItem.sort === "asc",
    filter_Conditions: filterData,
    filter_Logic: filterLogic,
    setOldDataAsPlaceholder: true,
  });

  useEffect(() => {
    if (GlobalData?.data) {
      setFilteredRows(GlobalData.data);
    } else {
      setFilteredRows([]);
    }
  }, [GlobalData]);

  useEffect(() => {
    const handleUsersDeleted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const deletedIds = customEvent.detail.ids;
      console.log("استقبال حدث الحذف:", deletedIds);
      refetch();
    };

    window.addEventListener("usersDeleted", handleUsersDeleted);

    return () => {
      window.removeEventListener("usersDeleted", handleUsersDeleted);
    };
  }, []);

  const applyFilter = () => {
    if (selectedField && selectedOperator && filterValue) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("field", selectedField);
      newParams.set("operator", selectedOperator);
      newParams.set("value", filterValue);

      const newFilterData = [
        fixedFilter,
        {
          field: selectedField,
          operator: selectedOperator,
          value: filterValue,
        },
      ];

      router.push(`${pathname}?${newParams.toString()}`);
      setFilterData(newFilterData.filter((f): f is FilterType => !!f && typeof f === "object" && "field" in f && "operator" in f && "value" in f));
      setFilterLogic(newFilterData.length > 2 ? "OR" : "AND");

      refetch();
      handleCloseFilter();
    }
  };



  const clearFilter = () => {
    setSelectedField(null);
    setSelectedOperator(null);
    setFilterValue("");
    setFilterData([fixedFilter].filter((f): f is FilterType => !!f && typeof f === "object" && "field" in f && "operator" in f && "value" in f));

    const newParams = new URLSearchParams(searchParams);
    newParams.delete("field");
    newParams.delete("operator");
    newParams.delete("value");

    router.push(`${pathname}?${newParams.toString()}`);
    setFilterLogic("AND");
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
  }, [sortItem, pageNumber, pageSize, searchQuery, searchParams]);

  //if (GlobalLoading) return <Loding />;
  // if (!GlobalData) return <p>No Data Available</p>;

  // Get totalCount from GlobalData or fallback to filteredRows length
  const totalCount = GlobalData?.pagination?.totalCount ?? filteredRows.length;
  const numberFillters = filterData.length - [fixedFilter].length;
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
                <Badge badgeContent={filterData.length > 1 ? filterData.length - 1 : 0} color="secondary">
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
                <Badge badgeContent={numberFillters} color="secondary">
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

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2} width={300}>
          <Autocomplete
            options={columns.map((col) => col.field)}
            value={selectedField}
            onChange={(_, newValue) => setSelectedField(newValue)}
            renderInput={(params) => <TextField {...params} label="Field" size="small" fullWidth />}
            sx={{ mb: 2 }}
          />
          <Autocomplete
            options={Object.values(ComparisonOperator)}
            value={selectedOperator}
            onChange={(_, newValue) => setSelectedOperator(newValue)}
            renderInput={(params) => <TextField {...params} label="Operator" size="small" fullWidth />}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Value"
            size="small"
            fullWidth
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" onClick={applyFilter}>Apply</Button>
            <Button variant="outlined" onClick={clearFilter} startIcon={<ClearIcon />}>Clear</Button>
          </Box>
        </Box>
      </Popover>

      {/* قائمة الأعمدة */}
      <Popover
        open={Boolean(columnAnchorEl)}
        anchorEl={columnAnchorEl}
        onClose={handleCloseColumnMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box p={2} width={250}>
          <Typography variant="subtitle1" mb={1}>Toggle Columns</Typography>
          <List>
            {columns.map((col) => (
              <ListItem key={col.field} dense disablePadding>
                <ListItemButton onClick={() => toggleColumnVisibility(col.field)}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={visibleColumns[col.field]} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={col.headerName || col.field} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      <StructureTable
        rows={filteredRows}
        columns={columns.filter((col) => visibleColumns[col.field])}
        totalCount={totalCount}
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
        isShowDetailse={isShowDetailse}
        isLoading={GlobalLoading}
      />
    </Box>
  );
};

export default GridTable;
