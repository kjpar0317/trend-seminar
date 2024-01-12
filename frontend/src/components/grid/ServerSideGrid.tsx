import type { ReactElement } from "react";
import type { GridSizeChangedEvent } from "ag-grid-community";
import type { GridReadyEvent, CellClickedEvent, PaginationChangedEvent, IGetRowsParams, IGridApi, IColDef, TContext, FilterModelItem } from "@/type/aggrid";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { throttle } from "lodash-es";

import LoadingSkeletonColumn from "./context/LoadingSkeletonColumn";

interface IServerSideGrid {
  components?: TContext;
  columnDefs: IColDef[];
  defaultColDef: IColDef;
  rowHeight?: number;
  suppressPaginationPanel?: boolean;
  suppressMultiSort?: boolean;
  quickFilterModel?: FilterModelItem;
  skeleton?: boolean;
  onMutate: (params: IGetRowsParams) => void;
  onGridReady?: (event: GridReadyEvent) => void;
  onGridClick?: (event: CellClickedEvent) => void;
  onPageChanged?: (page: number, totPage: number) => void;
}

export default function ServerSideGrid(props: IServerSideGrid): ReactElement {
    const { rowHeight = 46 } = props;
    const [gridApi, setGridApi] = useState<IGridApi>();
    const [quickFilterModel, setQuickFilterModel] = useState<any>(props.quickFilterModel);
    const [inHeight, setInHeight] = useState<number>(0);

    const calcPageSize = useCallback((clientHeight: number) => {
        console.log(clientHeight);
        const gridHeight: number = clientHeight - rowHeight - ((props.suppressPaginationPanel && 17) || rowHeight);
        console.log(gridHeight);
        console.log(gridHeight / rowHeight);
        const rowNum: number = Math.round(gridHeight / rowHeight) - 1;
        // console.log(rowNum);
        return rowNum;
    }, [props.suppressPaginationPanel, rowHeight]);

    const defComponents = useMemo(() => {
        if (props.skeleton) {
        if (props.components) {
            return { ...props.components, LoadingSkeletonColumn: LoadingSkeletonColumn };
        } else {
            return { LoadingSkeletonColumn: LoadingSkeletonColumn };
        }
        } else {
            return props.components;
        }
    }, [props.skeleton, props.components]);

    const defColDef = useMemo((): IColDef => {
        if (props.skeleton) {
        return { ...props.defaultColDef, cellRenderer: LoadingSkeletonColumn };
        } else {
        return props.defaultColDef;
        }
    }, [props.defaultColDef, props.skeleton]);

    const cacheBlockSize = useMemo(() => calcPageSize(inHeight), [calcPageSize, inHeight]);

    const throttleGridSizeFit = throttle(() => {
        gridApi?.sizeColumnsToFit();
    }, 5000);

    useEffect(() => {
        return () => gridApi?.destroy();
    }, [gridApi]);

    useEffect(() => {
        throttleGridSizeFit();
    }, [inHeight, throttleGridSizeFit]);

    useEffect((): void => {
        if (props.quickFilterModel) {
        gridApi?.purgeInfiniteCache();
        setQuickFilterModel(props.quickFilterModel);
        }
    }, [gridApi, props.quickFilterModel]);


    function updateGridData(): void {
        const dataSource = {
            getRows: function (params: IGetRowsParams): void {
                gridApi?.showLoadingOverlay();

                setTimeout((): void => {
                    if (quickFilterModel()) {
                        params = { ...params, filterModel: quickFilterModel() };
                    }

                    props.onMutate(params);
                }, 0);
            },
        };

        gridApi?.setGridOption("datasource", dataSource);
    }

    function handleGridReady(event: GridReadyEvent): void {
        setGridApi(event.api);
        // setPageSizeChange(event.api);

        updateGridData();

        event.api.sizeColumnsToFit();

        props.onGridReady && props.onGridReady(event);
    }
    function handleGridClick(event: CellClickedEvent): void {
        props.onGridClick && props.onGridClick(event);
    }
    function handleGridPageChanged(event: PaginationChangedEvent): void {
        props.onPageChanged && props.onPageChanged(event.api.paginationGetCurrentPage(), event.api.paginationGetTotalPages());
        gridApi?.hideOverlay();
    }
    function handleGridSizeChanged(event: GridSizeChangedEvent): void {
        const pageSize: number = calcPageSize(event.clientHeight);
        setInHeight(event.clientHeight);
        gridApi?.paginationSetPageSize(pageSize);
    }

    return (
        <AgGridReact
        rowModelType="infinite"
        components={defComponents}
        columnDefs={props.columnDefs}
        defaultColDef={defColDef}
        animateRows
        pagination
        rowHeight={rowHeight}
        headerHeight={rowHeight}
        cacheBlockSize={cacheBlockSize}
        infiniteInitialRowCount={props.skeleton ? cacheBlockSize : 1}
        maxConcurrentDatasourceRequests={1}
        suppressPaginationPanel={props.suppressPaginationPanel}
        suppressMultiSort={props.suppressMultiSort}
        multiSortKey="ctrl"
        paginationAutoPageSize
        onGridReady={handleGridReady}
        onCellClicked={handleGridClick}
        onPaginationChanged={handleGridPageChanged}
        onGridSizeChanged={handleGridSizeChanged}
        />
    );
}