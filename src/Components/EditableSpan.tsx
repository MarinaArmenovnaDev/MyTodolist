import {ChangeEvent, KeyboardEvent, useState} from "react";
import styled, {css} from "styled-components";

type EditableSpanProps = {
    title: string;
    isDone: boolean;
    className?: string;
    changeTitleCallback: (title: string) => void;
};

export const EditableSpan = ({title, className, changeTitleCallback, isDone}: EditableSpanProps) => {
    const [isEditable, setIsEditable] = useState(false);
    const [inputValue, setInputValue] = useState<string>(title);
    const [error, setError] = useState<string | null>(null);
    const MAX_LENGTH = 15;

    const isEditableOn = () => {
        setInputValue(title);
        setIsEditable(true);
        setError(null);
    };

    const isEditableOff = () => {
        const trimmedTitle = inputValue.trim();

        if (trimmedTitle === '') {
            setError('Title cannot be empty');
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
            isEditableOff()
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setInputValue(newValue);

        if (newValue.trim().length > MAX_LENGTH) {
            setError(`Title cannot exceed ${MAX_LENGTH} `);
        } else if (error) {
            setError(null);
        }
    };

    // Определяем, нужно ли подсвечивать счетчик
    const isCounterHighlighted = inputValue.length > MAX_LENGTH * 0.8; // Подсвечиваем при 80% заполнения

    return (
        isEditable
            ? <InputContainer>
                <InputWrapper>
                    <CharCounter $highlight={isCounterHighlighted || inputValue.length > MAX_LENGTH}>
                        {inputValue.length}/{MAX_LENGTH}
                    </CharCounter>
                    <StyledInput
                        value={inputValue}
                        autoFocus
                        onBlur={isEditableOff}
                        onChange={handleChange}
                        onKeyDown={addOnEnterHandler}
                        $hasError={inputValue.length > MAX_LENGTH}
                    />
                </InputWrapper>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </InputContainer>
            : <TaskTitle
                onDoubleClick={isEditableOn}
                className={className}
                isDone={isDone}
            >
                {title}
            </TaskTitle>
    );
};


const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
`;

const InputWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
    ${({ $hasError }) => $hasError && css`
        border-color: #ff4d4f;
    `}
`;

const CharCounter = styled.span<{ $highlight?: boolean }>`
    position: absolute;
    right: 8px;
    top: 5px;
    font-size: 10px;
    color: ${props => props.$highlight ? '#1890ff' : '#888'};
    transition: color 0.3s;
`;

const ErrorMessage = styled.div`
    color: #610607;
    font-size: 12px;
`;

const TaskTitle = styled.span<{ isDone: boolean }>`
    text-decoration: ${props => props.isDone ? 'line-through' : 'none'};
    color: ${props => props.isDone ? '#888' : 'black'};
`;
