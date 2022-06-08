

export const getGrid = (rowsCount, columnsCount, isRandom) => {
  const rows = [];
  for (let i = 0; i < columnsCount; i++) {
    rows.push(Array.from(Array(rowsCount), () => isRandom ? (
      Math.random() > 0.7 ? 1 : 0) : 0)
    );
  }
  return rows;
}

export const getCoord = (val, maxVal) => {
  if (val < 0) return maxVal;
  if (val > maxVal) return 0;
  return val;
}

export const getNextGen = grid => {
  const COLS = grid.length;
  const ROWS = grid[0].length;
  let anyChanges = false;

  const nextGen = grid.map(arr => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) continue;
          const x_cell = getCoord(col + i, COLS-1);
          const y_cell = getCoord(row + j, ROWS-1);
          const currentNeighbour = grid[x_cell][y_cell];
          numNeighbours += currentNeighbour;
        }
      }

      // rules
      if (cell === 1) {
        if (numNeighbours < 2 || numNeighbours > 3) {
          nextGen[col][row] = 0;
          anyChanges = true;
        }
      } else {
        if (numNeighbours === 3) {
          nextGen[col][row] = 1;
          anyChanges = true;
        }
      }
    }
  }
  return [ nextGen, anyChanges ];
}
