import { useState } from "react";
import styled from "@emotion/styled";
import ImagePreviewUpload from "./ImagePreviewUpload";
import ImagePreviewViewer from "./ImagePreviewViewer";
import ImageSelector from "@/components/image-selector/ImageSelector";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
`;

export default function ImagePreviewContent() {
  const [imageSource, setImageSource] = useState("");

  return (
    <ContentContainer>
      {imageSource ? (
        <>
          <ImagePreviewViewer imageSource={imageSource} />
          <ImageSelector />
        </>
      ) : (
        <ImagePreviewUpload setImageSource={setImageSource} />
      )}
    </ContentContainer>
  );
}
