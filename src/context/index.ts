import { Dispatch, SetStateAction, createContext } from "react";
import type { ViewerSizeType, DataType } from "@/types";

export const ImageAreaSelectorContext = createContext<{
  viewerSize: ViewerSizeType;
  setViewerSize: Dispatch<SetStateAction<ViewerSizeType>>;
  dataList: DataType[];
  setDataList: Dispatch<SetStateAction<DataType[]>>;
}>({
  viewerSize: { width: 0, height: 0 },
  setViewerSize: () => {},
  dataList: [],
  setDataList: () => {},
});
