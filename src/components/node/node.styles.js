import styled from 'styled-components';

export const NodeContainer = styled.div`
  border: 1px solid black;
  width: calc(100% / ${({ cols }) => cols});
  height: 50px;
`;

export const Wall = styled(NodeContainer)`
  background-color: black;
`;

export const Path = styled(NodeContainer)`
  background-color: yellow;
`;

export const Visited = styled(NodeContainer)`
  background-color: aquamarine;
`;

export const Processing = styled(NodeContainer)`
  background-color: red;
`;
