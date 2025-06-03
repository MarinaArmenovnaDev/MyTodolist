import { describe, expect, test } from 'vitest';
import {
    todolistsReducer,
    createTodolistAC,
    deleteTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC
} from './../todolists-reducer.ts';
import type { FilterValueType, TodolistsPropsType } from '../../../../../../app/App.tsx';

describe('todolistsReducer', () => {
    const initialState: TodolistsPropsType[] = [
        { id: '1', title: 'First Todolist', filter: 'All' },
        { id: '2', title: 'Second Todolist', filter: 'Active' },
    ];

    test('should return initial state when state is undefined', () => {
        const action = { type: 'unknown' };
        const result = todolistsReducer(undefined, action);
        expect(result).toEqual([]);
    });

    test('should handle createTodolistAC correctly', () => {
        const title = 'New Todolist';
        const action = createTodolistAC(title);
        const result = todolistsReducer(initialState, action);

        expect(result.length).toBe(3);
        expect(result[0].title).toBe(title);
        expect(result[0].filter).toBe('All');
        expect(typeof result[0].id).toBe('string');
        // Проверяем что исходные тудулисты не изменились
        expect(result[1]).toEqual(initialState[0]);
        expect(result[2]).toEqual(initialState[1]);
    });

    test('should handle deleteTodolistAC correctly', () => {
        const action = deleteTodolistAC({ todolistId: '1' });
        const result = todolistsReducer(initialState, action);

        expect(result.length).toBe(1);
        expect(result[0].id).toBe('2');
        // Проверяем что оставшийся тудулист не изменился
        expect(result[0]).toEqual(initialState[1]);
    });

    test('should not change state when deleting non-existent todolist', () => {
        const action = deleteTodolistAC({ todolistId: '999' });
        const result = todolistsReducer(initialState, action);

        expect(result).toEqual(initialState);
    });

    test('should handle changeTodolistTitleAC correctly', () => {
        const newTitle = 'Updated Title';
        const action = changeTodolistTitleAC({
            todolistId: '1',
            title: newTitle
        });
        const result = todolistsReducer(initialState, action);

        expect(result.length).toBe(2);
        expect(result[0].title).toBe(newTitle);
        // Проверяем что другие свойства не изменились
        expect(result[0].id).toBe('1');
        expect(result[0].filter).toBe('All');
        // Проверяем что второй тудулист не изменился
        expect(result[1]).toEqual(initialState[1]);
    });

    test('should handle changeTodolistFilterAC correctly', () => {
        const newFilter: FilterValueType = 'Completed';
        const action = changeTodolistFilterAC({
            todolistId: '2',
            filter: newFilter
        });
        const result = todolistsReducer(initialState, action);

        expect(result.length).toBe(2);
        expect(result[1].filter).toBe(newFilter);
        // Проверяем что другие свойства не изменились
        expect(result[1].id).toBe('2');
        expect(result[1].title).toBe('Second Todolist');
        // Проверяем что первый тудулист не изменился
        expect(result[0]).toEqual(initialState[0]);
    });

    test('should not change state when changing non-existent todolist', () => {
        const titleAction = changeTodolistTitleAC({
            todolistId: '999',
            title: 'New Title'
        });
        const filterAction = changeTodolistFilterAC({
            todolistId: '999',
            filter: 'Completed'
        });

        const titleResult = todolistsReducer(initialState, titleAction);
        const filterResult = todolistsReducer(initialState, filterAction);

        expect(titleResult).toEqual(initialState);
        expect(filterResult).toEqual(initialState);
    });

    test('should maintain immutability of unchanged todolists', () => {
        const titleAction = changeTodolistTitleAC({
            todolistId: '1',
            title: 'Updated'
        });
        const titleResult = todolistsReducer(initialState, titleAction);

        // Проверяем что второй тудулист остался тем же объектом (reference equality)
        expect(titleResult[1]).toBe(initialState[1]);

        const filterAction = changeTodolistFilterAC({
            todolistId: '2',
            filter: 'Completed'
        });
        const filterResult = todolistsReducer(initialState, filterAction);

        // Проверяем что первый тудулист остался тем же объектом
        expect(filterResult[0]).toBe(initialState[0]);
    });
});
