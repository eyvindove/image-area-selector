import { useState } from "react";
import styled from "@emotion/styled";
import { ImageAreaSelectorContext } from "@/context";
import ImagePreview from "@/components/image-preview/ImagePreview";
import DataPreview from "@/components/data-preview/DataPreview";
import type { ViewerSizeType, DataType } from "@/types";

const ImageAreaSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 135px;
  padding: 32px;
  min-width: 1200px;
  min-height: 100dvh;
`;

export default function ImageAreaSelectorPage() {
  const [viewerSize, setViewerSize] = useState<ViewerSizeType>({
    width: 0,
    height: 0,
  });
  const [dataList, setDataList] = useState<DataType[]>([]);

  return (
    <ImageAreaSelectorContext.Provider
      value={{
        viewerSize,
        setViewerSize,
        dataList,
        setDataList,
      }}
    >
      <ImageAreaSelectorContainer>
        <ImagePreview />
        <DataPreview />
      </ImageAreaSelectorContainer>
    </ImageAreaSelectorContext.Provider>
  );
}
