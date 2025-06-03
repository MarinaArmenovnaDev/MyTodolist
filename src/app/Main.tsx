import {AddItemForm} from "../common/components/AddItemForm/AddItemForm.tsx";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {Todolists} from "../features/todolists/ui/Todolists/Todolists.tsx";
import {createTodolistAC} from "../features/todolists/ui/Todolists/model/todolists-reducer.ts";

export const Main = () => {
    const dispatch = useAppDispatch()


    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }
    return (
        <>
            <div>
                <AddItemForm
                    createTask={createTodolist}
                    placeholder="Add new Todolist"
                />
                <Todolists/>
            </div>

        </>

    )

};
