import { Row } from 'react-bootstrap';
import Node from '../node/node';
import { GridContainer } from './grid.styles';
import { useState, useContext } from 'react';
import { GridContext } from '../../context/grid';

const Grid = () => {
  const { grid, setGrid, visualGrid, setVisualGrid, finding } = useContext(GridContext);
  const [mousePressed, setMousePressed] = useState(false);

  const toggleWall = (i, j) => {
    const newVisualGrid = { ...visualGrid };
    const newGrid = [...grid];
    newVisualGrid[[i, j]].wall = !newVisualGrid[[i, j]].wall;
    newGrid[i][j] = newVisualGrid[[i, j]].wall ? 1 : 0;
    setGrid(newGrid);
    setVisualGrid(newVisualGrid);
    console.log(grid);
  };

  const mouseDownHandler = (i, j) => {
    setMousePressed(true);
    !finding && toggleWall(i, j);
  };

  const mouseEnterHandler = (i, j) => {
    if (mousePressed && !finding) {
      toggleWall(i, j);
    }
  };

  const mouseUpHandler = () => {
    setMousePressed(false);
  };

  return (
    <GridContainer>
      {grid.map((row, i) => (
        <Row key={i}>
          {row.map((val, j) => (
            <Node
              onMouseDown={() => mouseDownHandler(i, j)}
              onMouseEnter={() => mouseEnterHandler(i, j)}
              onMouseUp={mouseUpHandler}
              pos={{ row: i, col: j }}
              key={j}
            ></Node>
          ))}
        </Row>
      ))}
    </GridContainer>
  );
};

export default Grid;
