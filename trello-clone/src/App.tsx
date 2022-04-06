import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import DragabbleCard from './Components/DragabbleCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
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

    setToDos((oldToDos) => {
      const toDoCopy = [...oldToDos];
      // 1) Delete item on source.index
      console.log('Delete item on', source.index);
      console.log(toDoCopy);
      toDoCopy.splice(source.index, 1);
      console.log('Delete item');
      console.log(toDoCopy);
      // 2) Put back the item on the destination.index
      console.log('Put back', draggableId, 'on ', destination.index);
      toDoCopy.splice(destination?.index, 0, draggableId);
      return toDoCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DragabbleCard key={toDo} toDo={toDo} index={index} />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;