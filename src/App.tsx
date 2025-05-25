import './App.css'
import {TodolistItem} from "./Components/TodolistItem.tsx";
import {v1} from "uuid";
import {useReducer} from "react";
import {Task} from "./Components/TasksList.tsx";
import {AddItemForm} from "./Components/AddItemForm.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTodolistTasksAC,
    deleteTaskAC, deleteTodolistTasksAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type FilterValueType = "All" | "Active" | "Completed"

export type TodolistsPropsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [todolistId: string]: Task[]
}

function App() {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const initialStateForTasks: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }
    const [tasks, dispatchTasks] = useReducer(tasksReducer, initialStateForTasks)

    // Функции для работы с задачами
    const createTask = (todolistId: string, title: string) => {
      dispatchTasks(addTaskAC(todolistId, title))
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatchTasks(deleteTaskAC(todolistId, taskId))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
     dispatchTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    dispatchTasks(changeTaskTitleAC( todolistId,taskId, title))
    }

    // Функции для работы с тудулистами
    const changeFilter = (todolistId: string, filter: FilterValueType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    const createTodolist = (title: string) => {
        const newId = v1();
        dispatchToTodolists(createTodolistAC(newId, title))
        dispatchTasks(createTodolistTasksAC(newId))
    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const deleteTodolist = (todolistId: string) => {
        dispatchToTodolists(deleteTodolistAC(todolistId))
        dispatchTasks(deleteTodolistTasksAC(todolistId))
    }

    return (
        <div className="app">
            <div className="addTodoContainer">
                <AddItemForm
                    createTask={createTodolist}
                    placeholder="Add new Todolist"
                />
            </div>
            <div className="todolistContainer">
                {todolists.length > 0 ? (
                    todolists.map(tl => {
                        const tasksForTodolist = tasks[tl.id] || [];
                        const filteredTasks = tl.filter === "Active"
                            ? tasksForTodolist.filter(task => !task.isDone)
                            : tl.filter === "Completed"
                                ? tasksForTodolist.filter(task => task.isDone)
                                : tasksForTodolist;

                        return (
                            <TodolistItem
                                key={tl.id}
                                todolistId={tl.id}
                                title={tl.title}
                                tasks={filteredTasks}
                                createTask={(title) => createTask(tl.id, title)}
                                deleteTask={deleteTask}
                                changeTaskStatus={changeTaskStatus}
                                changeFilter={changeFilter}
                                currentFilter={tl.filter}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                deleteTodolist={deleteTodolist}
                            />
                        );
                    })
                ) : (
                    <p>No todolists yet. Create your first one!</p>
                )}
            </div>
        </div>
    );
}

export default App
