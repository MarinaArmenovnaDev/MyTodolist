import type { FilterValueType, TodolistsPropsType } from '../App';

const initialState: TodolistsPropsType[] = [];

type TodolistsActions =
    | ReturnType<typeof deleteTodolistAC>
    | ReturnType<typeof createTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>;

export const todolistsReducer = (
    state: TodolistsPropsType[] = initialState,
    action: TodolistsActions
): TodolistsPropsType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(tl => tl.id !== action.payload.todolistId);

        case 'create_todolist':
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'All'
                }
            ];

        case 'change_todolist_title':
            return state.map(tl =>
                tl.id === action.payload.todolistId
                    ? { ...tl, title: action.payload.title }
                    : tl
            );

        case 'change_todolist_filter':
            return state.map(tl =>
                tl.id === action.payload.todolistId
                    ? { ...tl, filter: action.payload.filter }
                    : tl
            );

        default:
            return state;
    }
};

export const deleteTodolistAC = (todolistId: string) => ({
    type: 'delete_todolist' as const,
    payload: { todolistId }
});

export const createTodolistAC = (id: string, title: string) => ({
    type: 'create_todolist' as const,
    payload: { id, title }
});

export const changeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'change_todolist_title' as const,
    payload: { todolistId, title }
});

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValueType) => ({
    type: 'change_todolist_filter' as const,
    payload: { todolistId, filter }
});
