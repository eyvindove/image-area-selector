import { useContext, type SyntheticEvent } from "react";
import styled from "@emotion/styled";
import { ImageAreaSelectorContext } from "@/context";

const ViewerContainer = styled.img`
  width: 355px;
  border: 2px solid #d4dadf;
  border-radius: 4px;
  object-fit: contain;
`;

export default function ImagePreviewViewer({
  imageSource,
}: {
  imageSource: string;
}) {
  const { setViewerSize } = useContext(ImageAreaSelectorContext);

  function handleImageLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
    const size = {
      width: e.currentTarget.clientWidth,
      height: e.currentTarget.clientHeight,
    };

    setViewerSize(size);
  }

  return <ViewerContainer src={imageSource} onLoad={handleImageLoad} />;
}
