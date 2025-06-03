import {Button} from "../../../../../../common/components/Button/Button.tsx";
import {FilterValueType} from "../../../../../../app/App.tsx";
import {changeTodolistFilterAC} from "../../model/todolists-reducer.ts";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";
import styles from './FilterButtons.module.css'

type Props = {
    todolist: {
        id: string;
        title: string;
        filter: FilterValueType;
    }
};

export const FilterButtons = ({todolist}: Props) => {
    const dispatch = useAppDispatch()
    const changeFilter = (todolistId: string, filter: FilterValueType) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    return (
        <div className={styles.btnWrapper}>
            <Button
                className={`${styles.btn} ${todolist.filter === "All" ? styles.active : ""}`}
                onClick={() => changeFilter(todolist.id, "All")}
            >
                All
            </Button>
            <Button
                className={`${styles.btn} ${todolist.filter === "Active" ? styles.active : ""}`}
                onClick={() => changeFilter(todolist.id, "Active")}
            >
                Active
            </Button>
            <Button
                className={`${styles.btn} ${todolist.filter === "Completed" ? styles.active : ""}`}
                onClick={() => changeFilter(todolist.id, "Completed")}
            >
                Completed
            </Button>
        </div>
    );
};
