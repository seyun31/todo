import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import TodoInput from 'app/components/TodoInput';
import TodoItem from 'app/components/TodoItem';

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
`;

const Tittle = styled.h1`
  margin: 0;
  padding: 15px 25px;
`;

const TodoList = styled.div``;

const TodoCheck = styled.input`
  margin-right: 15px;
`;

export function HomePage() {
  const [todoList, setTodoList] = React.useState<ITodoItem[]>([
    { id: '1', completed: false, content: '투두입니다 1', editing: false },
    { id: '1', completed: false, content: '투두입니다 1', editing: false },
  ]);
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
            setTodoList={(todo: ITodoItem) => setTodoList([todo, ...todoList])}
          />
          <TodoList>
            {todoList.map(todo => (
              <TodoItem todo={todo} />
            ))}
            <TodoItem
              todo={{
                id: '1',
                completed: false,
                content: '투두입니다 1',
                editing: false,
              }}
            ></TodoItem>
          </TodoList>
        </Box>
      </Wrapper>
    </>
  );
}
