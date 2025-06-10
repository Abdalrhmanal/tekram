
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
  fixedFilter? : FilterType[];
  isPassDataDetailse?:boolean;
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

export  interface GlobalDataType {
    data: any[];
    pagination?: {
      totalCount: number;
      next_page_url?: string | null;
      prev_page_url?: string | null;
    };
  }