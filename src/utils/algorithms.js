const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const getPath = (prev, start, end) => {
  const path = [];
  let curr = [end.row, end.col];

  while (curr) {
    path.unshift(curr);
    curr = prev[curr[0]][curr[1]];
  }

  if (path[0][0] === start.row && path[0][1] === start.col) {
    return path;
  } else {
    return null;
  }
};

export const shortestPath = async (grid, start, end, visualGrid, setVisualGrid, setFinding) => {
  const n = grid.length;
  const m = grid[0].length;

  const visited = new Array(n).fill(null).map(() => new Array(m).fill(false));
  const previous = new Array(n).fill(null).map(() => new Array(m).fill(null));

  const q = [[start.row, start.col]];

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (q.length > 0) {
    const [row, col] = q.shift();

    if (row === end.row && col === end.col) {
      const finalPath = getPath(previous, start, end);
      for (const [i, j] of finalPath) {
        await sleep(50);
        const newVisualGrid = { ...visualGrid };
        newVisualGrid[[i, j]].onPath = true;
        setVisualGrid(newVisualGrid);
      }
      console.log(visualGrid);
      setFinding(false);
      return;
    }

    visited[row][col] = true;
    console.log(`Visiting [${row}, ${col}]`);

    for (const [x, y] of directions) {
      const newRow = row + x;
      const newCol = col + y;

      if (
        newRow >= 0 &&
        newRow < n &&
        newCol >= 0 &&
        newCol < m &&
        !visited[newRow][newCol] &&
        grid[newRow][newCol] === 0
      ) {
        q.push([newRow, newCol]);
        const newVisualGrid = { ...visualGrid };
        newVisualGrid[[newRow, newCol]].processing = true;
        await sleep(50);
        visited[newRow][newCol] = true;
        previous[newRow][newCol] = [row, col];
        newVisualGrid[[newRow, newCol]].processing = false;
        newVisualGrid[[newRow, newCol]].visited = true;
        setVisualGrid(newVisualGrid);
      }
    }
  }

  return null;
};
