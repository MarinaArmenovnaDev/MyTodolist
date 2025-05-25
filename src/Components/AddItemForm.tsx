import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent , useState} from "react";
import styled from "styled-components";
import {CircleFadingPlus,} from "lucide-react";

type AddItemFormProps = {
    createTask: (title: string) => void;
    placeholder?: string;
};

export const AddItemForm = ({createTask, placeholder = "Add new Task"}: AddItemFormProps) => {
    const [titleInput, setTitleInput] = useState('')
    const [error, setError] = useState(false)

    const idButtonDisabled = !titleInput || titleInput.length > 18

    const createItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInput(e.currentTarget.value)
    }

    const addItemHandler = () => {
        const trimmedTitle = titleInput.trim()
        if (trimmedTitle && trimmedTitle.length <= 18) {
            createTask(trimmedTitle)
            setTitleInput('')
            setError(false)
        } else {
            setError(true)
        }

    }
    const addTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemHandler()
        }
    }
    return (
        <FormContainer>
            <InputContainer>
                <Input value={titleInput} onChange={createItemHandler} onKeyDown={addTaskOnEnterHandler} placeholder={placeholder} />
                <Button onClick={addItemHandler} disabled={idButtonDisabled}>
                    <CircleFadingPlus/>
                </Button>
            </InputContainer>

            <MessageContainer>
                {titleInput.length > 18 && <div style={{color: "#fdfdfd"}}>your title is too long</div>}
                {error && <div style={{color: "#94efe7"}}>enter valid title</div>}
            </MessageContainer>
        </FormContainer>

    );
};
const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;`

const InputContainer = styled.div`
    display: flex;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;`

const Input = styled.input`
    flex: 1;
    border: none;
    padding: 10px;
    outline-color: black;
`
const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
`
