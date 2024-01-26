import styled from "@emotion/styled";
import ImagePreviewHeader from "./_components/ImagePreviewHeader";
import ImagePreviewContent from "./_components/ImagePreviewContent";

const ImagePreviewContainer = styled.div`
  width: 433px;
  height: 792px;
  background-color: #f4f9fa;
  border-radius: 8px;
  box-shadow: 0 5px 10px 0 darkgrey;
  overflow: hidden;
`;

export default function ImagePreview() {
  return (
    <ImagePreviewContainer>
      <ImagePreviewHeader />

      <ImagePreviewContent />
    </ImagePreviewContainer>
  );
}
