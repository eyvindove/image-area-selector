import styled from "@emotion/styled";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
  height: 56px;
  background-color: #ebf0f3;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  background-color: #d4dadf;
  border-radius: 100%;
`;

export default function ImagePreviewHeader() {
  return (
    <HeaderContainer>
      <Avatar></Avatar>
    </HeaderContainer>
  );
}
