import {TodolistTitle} from "./TodolistTitle/TodolistTitle.tsx";
import {FilterValueType} from "../../../../../app/App.tsx";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch.ts";
import {Tasks} from "./Tasks/Tasks.tsx";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm.tsx";
import {addTaskAC} from "../model/tasks-reducer.ts";
import {FilterButtons} from "./FilterButtons/FilterButtons.tsx";
import styles from "./TodolistItem.module.css";

type TodolistItemProps = {
    todolist: {
        id: string;
        title: string;
        filter: FilterValueType;
    }
};
export const TodolistItem = ({todolist}: TodolistItemProps) => {
    const dispatch = useAppDispatch()

// Функции для работы с тудулистами


    const createTask = ( title: string) => {
        dispatch(addTaskAC({todolistId: todolist.id, title}))
    }
    return (
        <div className={styles.todoWrapper}>
            <div className={styles.todolistTitleWrapper}>
                {/*<TodolistTitle title={todolist.title} className={"todoTitle"}*/}
                {/*               changeTodolistTitle={(newTitle: string) => changeTodolistTitle(todolist.id, newTitle)}/>*/}
                {/*<StyledButton onClick={() => deleteTodolist(todolist.id)}><CircleX/>*/}
                {/*</StyledButton>*/}
                <TodolistTitle todolist={todolist}/>
                <Tasks todolist={todolist}/>
                <AddItemForm createTask={createTask}/>
                <FilterButtons todolist={todolist}/>
            </div>
        </div>
    );
};
