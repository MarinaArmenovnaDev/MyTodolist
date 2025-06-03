import { ChangeEvent, KeyboardEvent, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../Button/Button.tsx";
import styles from "./AddItemForm.module.css";

type AddItemFormProps = {
    createTask: (title: string) => void;
    placeholder?: string;
};

export const AddItemForm = ({
                                createTask,
                                placeholder = "Add new Task"
                            }: AddItemFormProps) => {
    const [titleInput, setTitleInput] = useState('');
    const [error, setError] = useState(false);

    const idButtonDisabled = !titleInput || titleInput.length > 18;

    const createItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value);
    };

    const addItemHandler = () => {
        const trimmedTitle = titleInput.trim();
        if (trimmedTitle && trimmedTitle.length <= 18) {
            createTask(trimmedTitle);
            setTitleInput('');
            setError(false);
        } else {
            setError(true);
        }
    };

    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler();
        }
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={titleInput}
                    onChange={createItemHandler}
                    onKeyDown={addTaskOnEnterHandler}
                    placeholder={placeholder}
                />
                <Button onClick={addItemHandler} disabled={idButtonDisabled}>
                    <CircleFadingPlus />
                </Button>
            </div>

            <div className={styles.messageContainer}>
                {titleInput.length > 18 && (
                    <div className={styles.longTitleMessage}>your title is too long</div>
                )}
                {error && (
                    <div className={styles.errorMessage}>enter valid title</div>
                )}
            </div>
        </div>
    );
};
