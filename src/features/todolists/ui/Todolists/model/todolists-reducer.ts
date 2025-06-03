import type { FilterValueType, TodolistsPropsType } from '../../../../../app/App.tsx';
import { createAction, createReducer, nanoid } from "@reduxjs/toolkit";

// Action creators
export const deleteTodolistAC = createAction<{ todolistId: string }>('todolists/deleteTodolist');

export const createTodolistAC = createAction(
    'todolists/createTodolist',
    (title: string) => ({
        payload: {
            id: nanoid(),
            title,
            filter: 'All' as FilterValueType
        }
    })
);

export const changeTodolistTitleAC = createAction<{
    todolistId: string;
    title: string;
}>('todolists/changeTodolistTitle');

export const changeTodolistFilterAC = createAction<{
    todolistId: string;
    filter: FilterValueType;
}>('todolists/changeTodolistFilter');

const initialState: TodolistsPropsType[] = [];

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(deleteTodolistAC, (state, { payload }) => {
            const index = state.findIndex(tl => tl.id === payload.todolistId);
            if (index !== -1) state.splice(index, 1);
        })
        .addCase(createTodolistAC, (state, { payload }) => {
            state.unshift(payload);
        })
        .addCase(changeTodolistTitleAC, (state, { payload }) => {
            const todolist = state.find(todo => todo.id === payload.todolistId);
            if (todolist) todolist.title = payload.title;
        })
        .addCase(changeTodolistFilterAC, (state, { payload }) => {
            const todolist = state.find(todo => todo.id === payload.todolistId);
            if (todolist) todolist.filter = payload.filter;
        });
});
