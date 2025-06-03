import {TasksList} from "./TaskList/TasksList.tsx";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector.ts";
import {selectTasks} from "../../model/tasks-selectors.ts";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch.ts";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "../../model/tasks-reducer.ts";
import {FilterValueType} from "../../../../../../app/App.tsx";
import styles from "./Tasks.module.css";

type TasksProps = {
    todolist: {
        id: string;
        title: string;
        filter: FilterValueType;
    }
}

export const Tasks = ({todolist}: TasksProps) => {
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const todolistTasks = tasks[todolist.id]
    let filteredTasks = todolistTasks
    if (todolist.filter === 'Active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'Completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }


// Функции для работы с задачами


    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    return (
            <div className={styles.todo}>
                <TasksList
                    todolistId={todolist.id}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={(taskId: string, title: string) => changeTaskTitle(todolist.id, taskId, title)}
                />
            </div>


    )
        ;
};
