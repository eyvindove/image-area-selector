import { Dispatch, SetStateAction, useRef, type ChangeEvent } from "react";
import styled from "@emotion/styled";
import { MdOutlineImage } from "react-icons/md";

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 355px;
  height: 156px;
  color: #9a9a9a;
  background-color: #efefef;
  border: 2px solid #d4dadf;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    border-color: #9a9a9a;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

export default function ImagePreviewUpload({
  setImageSource,
}: {
  setImageSource: Dispatch<SetStateAction<string>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick() {
    inputRef.current?.click();
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    setImageSource(URL.createObjectURL(e.target.files?.[0] as Blob));
  }

  return (
    <>
      <UploadContainer onClick={handleUploadClick}>
        <MdOutlineImage />
        Upload Image
      </UploadContainer>

      <UploadInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </>
  );
}
