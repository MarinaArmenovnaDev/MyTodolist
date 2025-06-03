import './App.css'
import {Task} from "../features/todolists/ui/Todolists/TodolistItem/Tasks/TaskList/TasksList.tsx";
import {Header} from "../common/components/Header/Header.tsx";
import {Main} from "./Main.tsx";

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
    return (
        <div className="app">
            <Header/>
            <Main/>
        </div>
    );
}

export default App
