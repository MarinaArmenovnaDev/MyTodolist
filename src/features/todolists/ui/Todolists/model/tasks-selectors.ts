import type { TasksStateType} from '../../../../../app/App.tsx'
import type { RootState } from '../../../../../app/store.ts'

export const selectTasks = (state: RootState): TasksStateType => state.tasks
