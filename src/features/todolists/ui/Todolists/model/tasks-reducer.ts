
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import type {TasksStateType} from "../../../../../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";


export const addTaskAC = createAction<{todolistId: string, title: string}>('tasks/addTask');

export const changeTaskTitleAC = createAction<{todolistId: string, taskId: string, title: string}>('tasks/changeTaskTitle')

export const changeTaskStatusAC = createAction<{todolistId: string, taskId: string, isDone: boolean}>('tasks/changeTaskStatus');

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask');




const initialState:TasksStateType = {}

export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC,(state, action) => {
      delete state[action.payload.todolistId]
    })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(addTaskAC, (state, action) => {
            const {todolistId, title} = action.payload;
            if (state[todolistId]) {
                state[todolistId].unshift({
                    id: nanoid(),
                    title,
                    isDone: false
                });
            }
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId];
            if(tasks){
                const taskIndex =tasks.findIndex(t=> t.id === action.payload.taskId)
                if (taskIndex !== -1) tasks.splice(taskIndex, 1)
            }
        })

        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                const task = tasks.find(t => t.id === action.payload.taskId);
                if (task) task.title = action.payload.title;
            }
        })

        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            if (tasks) {
                const task = tasks.find(t => t.id === action.payload.taskId);
                if (task) task.isDone = action.payload.isDone;
            }
        })

})


// export const tasksReducer = (
//     state: TasksStateType,
//     action: TasksActions
// ): TasksStateType => {
//     switch (action.type) {
//         case 'create_todolist_tasks':
//             return {
//                 ...state,
//                 [action.payload.todolistId]: []
//             };
//
//         case 'delete_task':
//             return ({
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter(
//                     t => t.id !== action.payload.taskId
//                 )
//             })
//
//         case "change_task_status" :
//             return ({
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId]
//                     .map(t => t.id === action.payload.taskId
//                         ? {...t,isDone: action.payload.isDone}
//                         : t
//                 )})
//
//         case 'change_task_title':
//             return(
//                 {
//                     ...state,
//                     [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
//                         t.id === action.payload.taskId ? {...t, title: action.payload.title} : t
//                     )
//                 }
//             )
//
//         case "add_taskAC":
//             const newTask = {id: nanoid, title: action.payload.title, isDone: false};
//             return(
//                 {
//                 ...state,
//                 [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
//             })
//
//         case 'delete_todolist_tasks': {
//             const newState = {...state};
//             delete newState[action.payload.todolistId];
//             return newState;
//         }
//
//         default:
//             return state;
//     }
// };
//
