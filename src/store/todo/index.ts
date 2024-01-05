import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TodoState } from './types';
import { useInjectReducer } from 'redux-injectors';

export const initalState: TodoState = {
  todolist: [],
};

const slice = createSlice({
  name: 'todo',
  initialState: initalState,
  reducers: {
    addTodo: {
      reducer: (state, acction: PayloadAction<ITodoItem>) => {
        state.todolist.push(acction.payload);
      },
      prepare: (content: string) => {
        const id = nanoid();
        return {
          payload: {
            id: id,
            content: content,
            completed: false,
            editing: false,
          },
        };
      },
    },
    checkTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editModeTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;

      for (const todo of state.todolist) {
        if (todo.id === id) continue;
        if (todo.editing === true) todo.editing = false;
      }

      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.editing = !todo.editing;
      }
    },
    editTodo(state, action: PayloadAction<{ id: string; content: string }>) {
      const id = action.payload.id;
      const content = action.payload.content;

      const todo = state.todolist.find(todo => todo.id === id);
      if (todo) {
        todo.content = content;
      }
    },
    deleteTodo(state, action: PayloadAction<{ id: string }>) {
      const id = action.payload.id;
      const filteredTodos = state.todolist.filter(todo => todo.id !== id);
      state.todolist = filteredTodos;
    },
  },
});

export const { actions: TodoActions } = slice;
export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { TodoActions: slice.actions };
};
