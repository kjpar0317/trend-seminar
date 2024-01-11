import type { Column, ColDef, IRowNode, GridApi, ColumnApi } from "ag-grid-community";

export type TData = any;
export type TContext = any;
export type RowPinnedType = "top" | "bottom" | null | undefined;
export type TContextInAction = any;

export interface IGridApi extends GridApi {}
export interface IColDef extends ColDef {}

export interface FilterModelItem {
  type: string;
  filterType: string;
  filter?: string | number;
  dateFrom?: string;
  dateTo?: string;
}

export interface GridReadyEvent<TData = any, TContext = any> {
  // The grid api.
  api: GridApi<TData>;
  // The column api.
  columnApi: ColumnApi;
  // Application context as set on `gridOptions.context`.
  context: TContext;
  // Event identifier
  type: string;
}

export interface CellClickedEvent<TData = any, TValue = any> {
  column: Column;
  colDef: ColDef<TData>;
  // The value for the cell if available otherwise undefined.
  value: TValue | undefined;
  // The user provided data for the row. Data is `undefined` for row groups.
  data: TData | undefined;
  // The row node.
  node: IRowNode<TData>;
  // The visible row index for the row
  rowIndex: number | null;
  // Either 'top', 'bottom' or null / undefined (if not set)
  rowPinned: RowPinnedType;
  // If event was due to browser event (eg click), this is the browser event
  event?: Event | null;
  // If the browser `event` is present the `eventPath` persists the `event.composedPath()` result for access within AG Grid event handlers.
  eventPath?: EventTarget[];
  // The grid api.
  api: GridApi<TData>;
  // The column api.
  columnApi: ColumnApi;
  // Application context as set on `gridOptions.context`.
  // context: TContext;
  context: any;
  // Event identifier
  type: string;
}

export interface GridSizeChangedEvent<TData = any, TContext = any> {
  // The grid's DIV's clientWidth
  clientWidth: number;
  // The grid's DIV's clientHeight
  clientHeight: number;
  // The grid api.
  api: GridApi<TData>;
  // The column api.
  columnApi: ColumnApi;
  // Application context as set on `gridOptions.context`.
  context: TContext;
  // Event identifier
  type: string;
}

export interface PaginationChangedEvent<TData = any, TContext = any> {
  // True if rows were animated to new position
  animate?: boolean;
  // True if rows were kept (otherwise complete redraw)
  keepRenderedRows?: boolean;
  // True if data was new (i.e user set new data)
  newData?: boolean;
  // True if user went to a new page
  newPage: boolean;
  // The grid api.
  api: GridApi<TData>;
  // The column api.
  columnApi: ColumnApi;
  // Application context as set on `gridOptions.context`.
  context: TContext;
  // Event identifier
  type: string;
}

export interface IGetRowsParams {
  // The first row index to get.
  startRow: number;
  // The first row index to NOT get.
  endRow: number;
  // Callback to call for the result when successful.
  successCallback(rowsThisBlock: any[], lastRow?: number): void;
  // Callback to call when the request fails.
  failCallback(): void;
  // If doing server side sorting, contains the sort model
  sortModel: SortModelItem[];
  // If doing server side filtering, contains the filter model
  filterModel: FilterModelItem[];
  // The context as provided on `gridOptions.context`
  context: any;
}

export interface SortModelItem {
  // Column Id to apply the sort to.
  colId: string;
  // Sort direction
  sort: "asc" | "desc";
}

export interface GridPageInfo {
  page: number;
  itemInPage: number;
  filters?: FilterModelItem[];
  orderBy?: SortModelItem[];
  successCallback?: ((rowsThisBlock: any[], lastRow?: number | undefined) => void) | undefined;
}