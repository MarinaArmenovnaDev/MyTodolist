import {SquareCheckBig, Trash2} from "lucide-react";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan.tsx";
import styles from './TasksList.module.css';
import {Button} from "../../../../../../../common/components/Button/Button.tsx";

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

type TasksListProps = {
    todolistId: string
    tasks: Task[]
    deleteTask: (todolistId: string, id: string) => void;
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
    changeTaskTitle: (taskId: string, title: string) => void;
};

export const TasksList = (
    {todolistId, tasks, deleteTask, changeTaskStatus, changeTaskTitle}: TasksListProps) => {
    if(tasks.length === 0){
        return <p className={styles.noTasks}>No tasks</p>
    }
    return (
        <ul className={styles.list}>
            {tasks.map(t => (
                <li key={t.id} className={styles.listItem}>
                    <div className={styles.taskContent}>
                        <div className={styles.checkboxWrapper}>
                            <SquareCheckBig
                                size={20}
                                onClick={() => changeTaskStatus(todolistId, t.id, !t.isDone)}
                                color={t.isDone ? "#a3a3a3" : "#2c2a2c"}
                            />
                        </div>
                        <EditableSpan
                            isDone={t.isDone}
                            title={t.title}
                            changeTitleCallback={(title) => changeTaskTitle(t.id, title)}
                            className={t.isDone ? styles.taskTitleDone : ''}
                        />
                    </div>
                    <Button
                        className={styles.button}
                        onClick={() => deleteTask(todolistId, t.id)}
                        aria-label="Delete task"
                    >
                        <Trash2 size={20} />
                    </Button>
                </li>
            ))}
        </ul>
    );
};
