import {addTaskAC, tasksReducer} from "../tasks-reducer";
import { expect, test } from 'vitest';
import type {TasksStateType} from "../../../../../../app/App";

const startState: TasksStateType = {
    todolistId1: [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
        { id: '1', title: 'bread', isDone: false },
        { id: '2', title: 'milk', isDone: true },
        { id: '3', title: 'tea', isDone: false },
    ],
};


test('should add new task to the beginning', () => {
    const newTaskTitle = 'Redux';
    const action = addTaskAC({
        todolistId: 'todolistId1',
        title: newTaskTitle
    });
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(4);
    expect(endState['todolistId1'][0]).toEqual({
        id: expect.any(String),
        title: newTaskTitle,
        isDone: false
    });
    expect(endState['todolistId1'].slice(1)).toEqual(startState['todolistId1']);
    expect(endState['todolistId2']).toBe(startState['todolistId2']);
});
