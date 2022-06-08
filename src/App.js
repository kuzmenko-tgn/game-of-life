import {useRef, useState} from "react";
import { Pause, Play } from "react-feather";
import SizeInput from "./components/NumberInput";
import Button from "./components/Button";
import {getGrid, getNextGen} from "./helpers";
import styles from "./App.module.css"


const App = () => {
  const [columnsCount, setColumnsCount] = useState(20);
  const [rowsCount, setRowsCount] = useState(20);
  const [intervalTime, setIntervalTime] = useState(500);
  const [grid, setGrid] = useState(getGrid(rowsCount, columnsCount));
  const [running, setRunning] = useState(false);

  const intervalRef = useRef();

  const startGame = () => {
    intervalRef.current = setInterval(liveProcess, intervalTime);
    setRunning(true);
  }

  const stopGame = () => {
    clearInterval(intervalRef.current);
    setRunning(false  );
  }

  const liveProcess = () => {
    setGrid(prevGen => {
      const [ newGen, anyChanges ] = getNextGen(prevGen);
      if (!anyChanges) stopGame();
      return newGen
    });
  }

  const generateNewGrid = isRandom => {
    setGrid(getGrid(rowsCount, columnsCount, isRandom))
  }

  const addLiveCell = (x, y) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y] = grid[x][y] ? 0 : 1;
    setGrid(newGrid);
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>
          <SizeInput
            value={columnsCount}
            onChange={setColumnsCount}
            label="Columns"
          />
          <SizeInput
            value={rowsCount}
            onChange={setRowsCount}
            label="Rows"
          />
          <SizeInput
            value={intervalTime}
            onChange={setIntervalTime}
            label="Interval msec"
          />
        </div>
        <div>
          <Button onClick={() => generateNewGrid(true)} >
            Random Grid
          </Button>
          <Button onClick={() => generateNewGrid()} >
            Pure Grid
          </Button>

          {running ? (
            <Button onClick={stopGame}>
              Stop <Pause/>
            </Button>
          ) : (
            <Button onClick={startGame}>
              Start <Play/>
            </Button>
          )}
        </div>
      </header>
      <section
        className={styles.board}
        style={{ gridTemplateColumns: `repeat(${grid.length}, 20px)`}}
      >
        {grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
              key={`${x} ${y}`}
              onClick={() => addLiveCell(x, y)}
              className={styles.cell + (grid[x][y] ? ` ${styles.activeCell}` : '')}
            />
          ))
        )}
      </section>
    </div>
  )
}

export default App;
