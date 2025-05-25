import {EditableSpan} from "./EditableSpan.tsx";


type TodolistTitleProps = {
    title: string;
    className?: string;
    changeTodolistTitle: (newTitle: string) => void
};
export const TodolistTitle = ({title, changeTodolistTitle, className}: TodolistTitleProps) => {
    return (
        <EditableSpan
            className={className}
            title={title}
            isDone={false}
            changeTitleCallback={changeTodolistTitle}
        />

    );
};
