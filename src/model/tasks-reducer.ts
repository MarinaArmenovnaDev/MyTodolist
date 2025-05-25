import { Task } from "../Components/TasksList.tsx";
import {v1} from "uuid";

export type TasksStateType = {
    [todolistId: string]: Task[]
}

type TasksActions =
    | ReturnType<typeof deleteTaskAC>
    | ReturnType<typeof createTodolistTasksAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof deleteTodolistTasksAC>;

export const tasksReducer = (
    state: TasksStateType,
    action: TasksActions
): TasksStateType => {
    switch (action.type) {
        case 'create_todolist_tasks':
            return {
                ...state,
                [action.payload.todolistId]: []
            };

        case 'delete_task':
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    t => t.id !== action.payload.taskId
                )
            })

        case "change_task_status" :
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId
                        ? {...t,isDone: action.payload.isDone}
                        : t
                )})

        case 'change_task_title':
            return(
                {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
                        t.id === action.payload.taskId ? {...t, title: action.payload.title} : t
                    )
                }
            )

        case "add_taskAC":
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            return(
                {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            })

        case 'delete_todolist_tasks': {
            const newState = {...state};
            delete newState[action.payload.todolistId];
            return newState;
        }

        default:
            return state;
    }
};

export const createTodolistTasksAC = (todolistId: string) => ({
    type: 'create_todolist_tasks' as const,
    payload: { todolistId }
});

export const deleteTaskAC = (todolistId: string, taskId: string) => ({
    type: 'delete_task' as const,
    payload: { todolistId , taskId}
});

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => (
    {
        type: 'change_task_status' as const,
        payload: {todolistId, taskId, isDone}
    }
)

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => ({
    type: 'change_task_title' as const,
    payload: {todolistId, taskId, title}
})

export const addTaskAC = (todolistId: string, title: string) => ({
    type: "add_taskAC" as const,
    payload: {todolistId, title}


})

export const deleteTodolistTasksAC = (todolistId: string) => (
    {
        type: 'delete_todolist_tasks' as const,
        payload: {todolistId}

    }
)
