import type {FilterValueType, TodolistsPropsType} from '../../../../../app/App.tsx';
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ todolistId: string }>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolis', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{
    todolistId: string,
    title: string
}>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValueType
}>('todolists/changeTodolistFilter')


const initialState: TodolistsPropsType[] = [];


export const todolistsReducer = createReducer(initialState, (builder) => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.todolistId);
        if (index !== -1) state.splice(index, 1)
    })
        .addCase(createTodolistAC, (state, action) => {
            const newTodolist: TodolistsPropsType = {...action.payload, filter: "All"}
            state.push(newTodolist)
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const todolist = state.find(todo => todo.id === action.payload.todolistId)
            if (todolist) {
                todolist.title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state,action) => {
            const todolist = state.find(todo => todo.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })


})
