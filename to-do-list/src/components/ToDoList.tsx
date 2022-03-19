import { useRecoilValue } from 'recoil';
import { toDoSelector } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  return (
    <div>
      <CreateToDo />
      <h1>To Dos</h1>
      <hr />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <h1>Doing</h1>
      <hr />
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>

      <h1>Done</h1>
      <hr />
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
