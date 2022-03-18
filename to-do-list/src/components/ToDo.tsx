import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      /* [기존 강의 코드] */
      // const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const newToDo = { text, id, category: name as any };
      // return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];

      /* [변형 코드 - 연산이 많이 들어가고 가독성도 좋지 않아 보여서 수정] */
      return oldToDos.map((toDo) => {
        if (toDo.id === id) {
          return { text, id, category: name as IToDo['category'] };
        }
        return toDo;
      });
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
