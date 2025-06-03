import { ChangeEvent, KeyboardEvent, useState } from "react";
import styles from "./EditableSpan.module.css";

type EditableSpanProps = {
    title: string;
    isDone: boolean;
    className?: string;
    changeTitleCallback: (title: string) => void;
};

export const EditableSpan = ({
                                 title,
                                 className,
                                 isDone,
                                 changeTitleCallback,
                             }: EditableSpanProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState<string>(title);
    const [error, setError] = useState<string | null>(null);
    const MAX_LENGTH = 18;

    const isEditableOn = () => {
        setInputValue(title);
        setIsEditable(true);
        setError(null);
    };

    const isEditableOff = () => {
        const trimmedTitle = inputValue.trim();

        if (trimmedTitle === "") {
            setError("Title cannot be empty");
            return;
        }

        if (trimmedTitle.length > MAX_LENGTH) {
            setError(`Title cannot exceed ${MAX_LENGTH} `);
            return;
        }

        setIsEditable(false);
        setError(null);
        changeTitleCallback(trimmedTitle);
    };

    const addOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            isEditableOff();
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInputValue(newValue);

        if (newValue.trim().length > MAX_LENGTH) {
            setError(`Title cannot exceed ${MAX_LENGTH} `);
        } else if (error) {
            setError(null);
        }
    };

    const isCounterHighlighted = inputValue.length > MAX_LENGTH * 0.8;

    return isEditable ? (
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
        <span
            className={`${styles.charCounter} ${
                isCounterHighlighted || inputValue.length > MAX_LENGTH
                    ? styles.highlight
                    : ""
            }`}
        >
          {inputValue.length}/{MAX_LENGTH}
        </span>
                <input
                    className={`${styles.input} ${
                        inputValue.length > MAX_LENGTH ? styles.inputError : ""
                    }`}
                    value={inputValue}
                    autoFocus
                    onBlur={isEditableOff}
                    onChange={handleChange}
                    onKeyDown={addOnEnterHandler}
                />
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    ) : (
        <span
            onDoubleClick={isEditableOn}
            className={`${className} ${isDone ? styles.taskTitleDone : ""}`}
        >
      {title}
    </span>
    );
};
