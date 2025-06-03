import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan.tsx";
import {CircleX} from "lucide-react";
import {changeTodolistTitleAC, deleteTodolistAC} from "../../model/todolists-reducer.ts";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";
import type {TodolistsPropsType} from "../../../../../../app/App.tsx";
import styles from "./TodolistTitle.module.css"
import {Button} from "../../../../../../common/components/Button/Button.tsx";


type Props = {
    todolist: TodolistsPropsType
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist
    const dispatch = useAppDispatch()

    const changeTodolistTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({todolistId: id, title: newTitle}))
    }

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({todolistId: id}))
    }

    return (
        <div className={styles.todolistTitleWrapper}>
            <h3 className={styles.title}>
                <EditableSpan
                    title={title}
                    isDone={false}
                    changeTitleCallback={changeTodolistTitle}
                />
            </h3>
            <Button onClick={deleteTodolist} className={styles.btn}>
                <CircleX size={30}/>
            </Button>
        </div>
    )
}
