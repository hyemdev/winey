/*
  작업자 : 김아영
  노션 : https://www.notion.so/kimaydev
  깃허브 : https://github.com/kimaydev
*/
import styled from "@emotion/styled";
import { Maincolor, opacity } from "./GlobalStyle";

export const LayoutWrap = styled.div`
  position: relative;
  background: ${Maincolor.white};
  max-width: 560px;
  min-height: 100vh;
  margin: 0 auto;
  border-left: 0.05rem solid ${opacity.white};
  border-right: 0.05rem solid ${opacity.white};
  overflow: hidden;
`;
