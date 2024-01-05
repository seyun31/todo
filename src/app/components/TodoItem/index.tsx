import React from 'react';
import styled from 'styled-components';
import Checkbox from '../CheckBox';
import Block from '../Block';
import CircleButton from '../Button/CircleButton';
import TodoInput from '../TodoInput';

const Box = styled.div<{ isEditing: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props =>
    props.isEditing ? '11px 15px 11px 25px' : '15px 15px 15px 25px'};
  width: 100%;
  font-size: 1.1em;
  border-bottom: 1px solid #eee;

  & > .delete-button {
    display: none;
  }

  &:hover {
    padding: 10px 15px 10px 25px;
    & > .delete-button {
      display: flex;
    }
  }
`;

const TodoContent = styled.span<{ checked: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-work;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  cursor: text;
  text-decoration: ${props => (props.checked ? 'Line-through' : 'initial')};
  color: ${props => (props.checked ? '#aaa' : ' #212121')};
`;
export default function TodoItem({
  todo,
  checkTodo,
  editModeTodo,
  editTodo,
  deleteTodo,
}: {
  todo: ITodoItem;
  checkTodo: () => void;
  editModeTodo: () => void;
  editTodo: (todo: string) => void;
  deleteTodo: () => void;
}) {
  return (
    <Box isEditing={todo.editing}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={todo.completed} onClick={() => checkTodo()} />
        <Block marginLeft="10px" />
        {todo.editing ? (
          <TodoInput
            editTodo={(todo: string) => {
              editTodo(todo);
              editModeTodo();
            }}
            isEditing={true}
            editContent={todo.content}
          />
        ) : (
          <TodoContent onClick={() => editModeTodo()} checked={todo.completed}>
            {todo.content}
          </TodoContent>
        )}
      </div>
      <CircleButton
        className="delete-button"
        onClick={() => deleteTodo()}
        imageSrc="https://cdn-icons-png.flaticon.com/512/1345/1345874.png"
      />
    </Box>
  );
}
