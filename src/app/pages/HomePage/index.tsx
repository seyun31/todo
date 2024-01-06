import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/TodoInput';
import TodoItem from 'app/components/TodoItem';
import { TodoListSelector } from 'store/todo/selectors';
import { useTodoSlice } from 'store/todo';
import { useDispatch, useSelector } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
`;

const Box = styled.div`
  width: 400px;
  height: 600px;
  background: white;
  box-shadow: 0px 25px 100px -60px rgba(0, 0, 0, 0.18);
  border-radius: 15px;
  @media (max-width: 425px) {
    width: 100%;
    height: 100vh;
  }
`;

const Tittle = styled.h1`
  margin: 0;
  padding: 15px 25px;
`;

const TodoList = styled.div`
  height: 450px;
  overflow-y: auto;
  @media (max-width: 425px) {
    height: calc(100vh - 128px);
  }
`;

const TodoCheck = styled.input`
  margin-right: 15px;
`;

export function HomePage() {
  const { TodoActions } = useTodoSlice();
  const todoList = useSelector(TodoListSelector);
  const dispatch = useDispatch();
  return (
    <>
      <Helmet>
        <title>Main</title>
        <meta name="description" content="Todo Main app" />
      </Helmet>
      <Wrapper>
        <Box>
          <Tittle>할 일</Tittle>
          <TodoInput
            addTodo={(content: string) =>
              dispatch(TodoActions.addTodo(content))
            }
          />
          <TodoList>
            {todoList.map(todo => (
              <TodoItem
                todo={todo}
                checkTodo={() =>
                  dispatch(TodoActions.checkTodo({ id: todo.id }))
                }
                editModeTodo={() =>
                  dispatch(TodoActions.editModeTodo({ id: todo.id }))
                }
                editTodo={(content: string) =>
                  dispatch(
                    TodoActions.editTodo({ id: todo.id, content: content }),
                  )
                }
                deleteTodo={() =>
                  dispatch(TodoActions.deleteTodo({ id: todo.id }))
                }
              />
            ))}
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
