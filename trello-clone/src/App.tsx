import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

/**
 * [Mutation]
 * const x = [1,2,3];
 * x.splice(0,1);
 * x
 * => (2) [2, 3]
 *
 * [Non-Mutation]
 * const name = 'revi';
 * name.toUpperCase();
 * name
 * => 'revi'
 */

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    // setToDos((oldToDos) => {
    //   const toDoCopy = [...oldToDos];
    //   toDoCopy.splice(source.index, 1);
    //   toDoCopy.splice(destination?.index, 0, draggableId);
    //   return toDoCopy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
