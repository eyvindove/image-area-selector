import { ImageAreaSelectorContext } from "@/context";
import styled from "@emotion/styled";
import { useContext } from "react";

const DataPreviewContainer = styled.div`
  padding: 32px;
  width: 548px;
  height: 703px;
  color: #fafafa;
  background-color: #2a3948;
  border-radius: 4px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default function DataPreview() {
  const { dataList } = useContext(ImageAreaSelectorContext);

  return (
    <DataPreviewContainer>
      <pre>
        <code>{JSON.stringify(dataList, null, 2)}</code>
      </pre>
    </DataPreviewContainer>
  );
}
