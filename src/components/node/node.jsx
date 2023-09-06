import { NodeContainer, Path, Processing, Visited, Wall } from './node.styles';
import { useContext, useEffect, useState } from 'react';
import { GridContext } from '../../context/grid';

const Node = ({ pos, ...otherProps }) => {
  const { COLS, visualGrid, startNode, endNode } = useContext(GridContext);
  const [isWall, setIsWall] = useState(false);
  const [isPath, setIsPath] = useState(false);
  const [isVisited, setIsVisited] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isStartNode = startNode.row === pos.row && startNode.col === pos.col;
  const isEndNode = endNode.row === pos.row && endNode.col === pos.col;

  useEffect(() => {
    const node = visualGrid[[pos.row, pos.col]];
    setIsWall(node.wall);
    setIsPath(node.onPath);
    setIsVisited(node.visited);
    setIsProcessing(node.processing);
  }, [pos, isWall, isPath, isVisited, visualGrid]);

  const containerProps = { cols: COLS, className: 'text-center', ...otherProps };
  const startProps = { style: { fontSize: '28px' }, className: 'mt-2 fa fa-play' };
  const endProps = { style: { fontSize: '28px' }, className: 'mt-2 fa fa-bullseye' };

  if (isStartNode) {
    return (
      <NodeContainer {...containerProps}>
        <i {...startProps}></i>
      </NodeContainer>
    );
  }
  if (isEndNode) {
    return (
      <NodeContainer {...containerProps}>
        <i {...endProps}></i>
      </NodeContainer>
    );
  }
  if (isWall) {
    return <Wall {...containerProps}></Wall>;
  }
  if (isPath) {
    return <Path {...containerProps}></Path>;
  }
  if (isProcessing) {
    return <Processing {...containerProps}></Processing>;
  }
  if (isVisited) {
    return <Visited {...containerProps}></Visited>;
  }
  return <NodeContainer cols={COLS} className="text-center" {...otherProps}></NodeContainer>;
};

export default Node;
