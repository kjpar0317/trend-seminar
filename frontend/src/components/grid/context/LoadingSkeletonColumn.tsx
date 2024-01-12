import type { ReactElement } from "react";
import type { ICellRendererParams } from "ag-grid-community";

export default function LoadingSkeletonColumn(props: ICellRendererParams): ReactElement {
  return (
    <>
        {props.value && (
            props.value
        ) || (
            <div className="w-full animate-pulse">
            <p className="h-2 w-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
          </div>
        )}
    </>
  );
}