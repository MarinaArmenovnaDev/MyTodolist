import {TodolistTitle} from "./TodolistTitle.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {StyledButton, Task, TasksList} from "./TasksList.tsx";
import {Button} from "./Button.tsx";
import {FilterValueType} from "../App.tsx";
import styled from "styled-components";
import {CircleX} from "lucide-react";

type TodolistItemProps = {
    todolistId: string,
    title: string;
    tasks: Task[]
    createTask: (title: string) => void;
    deleteTask: (todolistId: string, id: string) => void;
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void;
    changeFilter: (todolistId: string, filter: FilterValueType) => void;
    currentFilter: FilterValueType;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    deleteTodolist: (todolistId: string) => void
};
export const TodolistItem = ({
                                 todolistId,
                                 title,
                                 tasks,
                                 createTask,
                                 deleteTask,
                                 changeTaskStatus,
                                 changeFilter,
                                 currentFilter,
                                 changeTaskTitle,
                                 changeTodolistTitle,
                                 deleteTodolist
                             }: TodolistItemProps) => {
    return (
        <div className={"todoWrapper"}>
            <div className={"todolistTitleWrapper"}>
                <TodolistTitle title={title} className={"todoTitle"}
                               changeTodolistTitle={(newTitle: string) => changeTodolistTitle(todolistId, newTitle)}/>
                <StyledButton onClick={()=>deleteTodolist(todolistId)}>
                    <CircleX />
                </StyledButton>
            </div>
            <div className={"todoApp"}>
                <TasksList
                    todolistId={todolistId}
                    tasks={tasks}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={(taskId: string, title: string) => changeTaskTitle(todolistId, taskId, title)}
                />
                <BtnWrapper>
                    <Button
                        className={`btn ${currentFilter === "All" ? "active" : ""}`}
                        onClick={() => {
                            changeFilter(todolistId, "All")
                        }}>All</Button>
                    <Button
                        className={`btn ${currentFilter === "Active" ? "active" : ""}`}
                        onClick={() => {
                            changeFilter(todolistId, "Active")
                        }}>Active</Button>
                    <Button
                        className={`btn ${currentFilter === "Completed" ? "active" : ""}`}
                        onClick={() => {
                            changeFilter(todolistId, "Completed")
                        }}>Completed</Button>
                </BtnWrapper>
            </div>

            <AddItemForm createTask={createTask}/>
        </div>
    );
};


const BtnWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`
