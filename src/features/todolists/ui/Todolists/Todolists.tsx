import {TodolistItem} from "./TodolistItem/TodolistItem.tsx";
import {useAppSelector} from "../../../../common/hooks/useAppSelector.ts";
import {selectTodolists} from "./model/todolists-selectors.ts";
import styles from "./Todolists.module.css"

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <div className={styles.todolistContainer}>
            <div className={styles.todo}>
                {todolists.length > 0 ? (
                    todolists.map(tl => {
                        return (
                            <TodolistItem
                                todolist={tl}
                                key={tl.id}
                            />
                        );
                    })
                ) : (
                    <p className={styles.notification}>No todolists yet. Create your first one!</p>
                )}
            </div>

        </div>
    );
};
