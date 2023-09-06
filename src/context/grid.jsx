import { createContext, useEffect, useState } from 'react';
import { shortestPath } from '../utils/algorithms';

const ROWS = 20;
const COLS = 50;

export const GridContext = createContext({
  grid: [[]],
});

export const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState([[]]);
  const [startNode, setStartNode] = useState({ row: Math.floor(ROWS / 2), col: Math.floor(COLS / 5) });
  const [endNode, setEndNode] = useState({ row: Math.floor(ROWS / 2), col: Math.floor(COLS * 0.7) });
  const [finding, setFinding] = useState(false);
  const [visualGrid, setVisualGrid] = useState({});

  useEffect(() => {
    const initialGrid = [];
    const initialVisualGrid = {};
    for (let i = 0; i < ROWS; i++) {
      const gridRow = [];
      for (let j = 0; j < COLS; j++) {
        gridRow.push(0);
        initialVisualGrid[[i, j]] = {
          wall: false,
          visited: false,
          processing: false,
          onPath: false,
        };
      }
      initialGrid.push(gridRow);
    }
    setVisualGrid(initialVisualGrid);
    setGrid(initialGrid);
  }, []);

  const clearPath = () => {
    if (!finding) {
      const newVisualGrid = { ...visualGrid };
      for (const node in newVisualGrid) {
        newVisualGrid[node].visited = false;
        newVisualGrid[node].processing = false;
        newVisualGrid[node].onPath = false;
      }
      setVisualGrid(newVisualGrid);
    }
  };

  const clearWalls = () => {
    if (!finding) {
      const newVisualGrid = { ...visualGrid };
      const newGrid = [];
      for (let i = 0; i < ROWS; i++) {
        const gridRow = [];
        for (let j = 0; j < COLS; j++) {
          gridRow.push(0);
          newVisualGrid[[i, j]] = {
            wall: false,
          };
        }
        newGrid.push(gridRow);
      }
      setVisualGrid(newVisualGrid);
      setGrid(newGrid);
    }
  };

  const clearBoard = () => {
    if (!finding) {
      const newGrid = [];
      const newVisualGrid = {};
      for (let i = 0; i < ROWS; i++) {
        const gridRow = [];
        for (let j = 0; j < COLS; j++) {
          gridRow.push(0);
          newVisualGrid[[i, j]] = {
            wall: false,
            visited: false,
            processing: false,
            onPath: false,
          };
        }
        newGrid.push(gridRow);
      }
      setVisualGrid(newVisualGrid);
      setGrid(newGrid);
    }
  };

  const visualize = (algorithm) => {
    switch (algorithm) {
      case 'Shortest Path':
        shortestPath(grid, startNode, endNode, visualGrid, setVisualGrid, setFinding);
        break;
      default:
        shortestPath(grid, startNode, endNode, visualGrid, setVisualGrid, setFinding);
        break;
    }
  };

  const value = {
    ROWS,
    COLS,
    grid,
    visualGrid,
    setVisualGrid,
    setGrid,
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    visualize,
    clearPath,
    clearWalls,
    clearBoard,
    finding,
    setFinding,
  };
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};
