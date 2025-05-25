import styled from "styled-components";
import {SquareCheckBig, Trash2} from "lucide-react";
import {EditableSpan} from "./EditableSpan.tsx";

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
        return <p>No tasks</p>
    }
    return (
        <List>
            {tasks.map(t => {
                    return (
                        <ListItem key={t.id}>
                            <TaskContent>
                                <CheckboxWrapper>
                                    {t.isDone ? (
                                        <SquareCheckBig
                                            size={20}
                                            onClick={() => changeTaskStatus(todolistId,t.id, false)}
                                        />
                                    ) : (
                                        <SquareCheckBig
                                            size={20}
                                            color="#ccc"
                                            onClick={() => changeTaskStatus(todolistId, t.id, true)}
                                        />
                                    )}
                                </CheckboxWrapper>
                                <EditableSpan title={t.title} changeTitleCallback={(title: string)=>changeTaskTitle(t.id, title)} className={"taskTitle"} isDone={t.isDone}/>
                                {/*<TaskTitle isDone={t.isDone}>{t.title}</TaskTitle>*/}
                            </TaskContent>
                            <StyledButton onClick={() => deleteTask(todolistId, t.id)}>
                                <Trash2 size={20} />
                            </StyledButton>
                        </ListItem>
                    )
            })}
        </List>
    );
};

// Стилизованные компоненты
const List = styled.ul`
    list-style: none;
    width: 100%;
    padding: 0;
    margin: 0;
`


const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 2px solid #6d31b1;
`

const TaskContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; 
`



export const StyledButton = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.7;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

const CheckboxWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: 0.7;
    }
`;
