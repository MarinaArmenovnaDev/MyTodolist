
import type { RootState } from '../../../../../app/store.ts'
import type {TodolistsPropsType} from "../../../../../app/App.tsx";

export const selectTodolists = (state: RootState): TodolistsPropsType[] => state.todolists
