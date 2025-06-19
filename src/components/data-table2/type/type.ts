
export type FilterType = {
  field: string;
  operator: ComparisonOperator;
  value: string | number | boolean | (string | number)[];
};

export interface GridTableProps {
  dataSourceName: string;
  columns: { field: string; headerName: string; sortable?: boolean }[];
  onActionClick?: (row: any) => void;
  onDelete?: (id: number | string) => void;
  isDeleting?: boolean;
  isCreated?: boolean;
  toCreateURLPage?: string;
  isShowDetailse?: boolean;
  fixedFilter?: FilterType[];
  isPassDataDetailse?: boolean;
  isProfileProvider?: boolean;
  withCard?: number;
}
export enum ComparisonOperator {
  Equals = "Equals",
  GreaterThan = "GreaterThan",
  LessThan = "LessThan",
  NotEquals = "NotEquals",
  Contains = "Contains",
  StartsWith = "StartsWith",
  EndsWith = "EndsWith",
  In = "In",
  NotIn = "NotIn",
  GreaterThanOrEqual = "GreaterThanOrEqual",
  LessThanOrEqual = "LessThanOrEqual",
  Between = "<=",
}

export interface GlobalDataType {
  data: any[];
  pagination?: {
    totalCount: number;
    next_page_url?: string | null;
    prev_page_url?: string | null;
  };
}


export interface Column {
  field: string;
  headerName: string;
  sortable?: boolean;
}

export interface RowData {
  id: string;
  [key: string]: any;
}

export interface StructureTableProps {
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
  isProfileProvider?: boolean;
  withCard?: number;
  onSuccess?: (response?: any) => void 
}
