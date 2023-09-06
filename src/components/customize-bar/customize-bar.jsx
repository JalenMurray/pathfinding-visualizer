import { Container, Button, Dropdown } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { GridContext } from '../../context/grid';

const ALGORITHMS = ['Shortest Path'];

const CustomizeBar = () => {
  const { visualize, setFinding, clearPath, clearWalls, clearBoard } = useContext(GridContext);
  const [algorithm, setAlgorithm] = useState('Shortest Path');

  const startHandler = () => {
    setFinding(true);
    visualize(algorithm);
  };

  const selectHandler = (eventKey) => {
    setAlgorithm(eventKey);
  };

  return (
    <Container fluid className="bg-secondary d-flex text-center">
      <div className="d-flex justify-content-center align-items-center">
        <Container fluid className="my-2">
          <h5 className="text-light">Current Algorithm: {algorithm}</h5>
          <Dropdown onSelect={selectHandler}>
            <Dropdown.Toggle size="lg" variant="info" id="dropdown-basic">
              Select an Algorithm
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {ALGORITHMS.map((algorithm) => (
                <Dropdown.Item key={algorithm} eventKey={algorithm}>
                  {algorithm}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
        <Container fluid className="my-2">
          <h5 className="text-light">Clear Buttons</h5>
          <Button variant="warning" size="lg" className="mx-2" onClick={clearPath}>
            Path
          </Button>
          <Button variant="dark" size="lg" className="mx-2" onClick={clearWalls}>
            Walls
          </Button>
          <Button variant="danger" size="lg" className="mx-2" onClick={clearBoard}>
            Board
          </Button>
        </Container>
        <Button variant="primary" size="lg" className="mx-2" onClick={startHandler}>
          Start
        </Button>
      </div>
    </Container>
  );
};

export default CustomizeBar;
