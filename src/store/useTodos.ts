import { computed, reactive } from "vue";
import { Todo, TodoStatus } from "../types";

interface TodoStore {
    [TodoStatus.Pending]: Todo[];
    [TodoStatus.InProgress]: Todo[];
    [TodoStatus.Completed]: Todo[];
}

const defaultVal = {
    [TodoStatus.Pending]: [
        {
            id: 1,
            title: "learn smth new",
            description: "track more time",
            status: TodoStatus.Pending,
        },
    ],
    [TodoStatus.InProgress]: [],
    [TodoStatus.Completed]: [],
};

const todoStore = reactive<TodoStore>(defaultVal);

export default () => {
    const getTodosByStatus = (todoStatus: TodoStatus) => {
        return computed(() => todoStore[todoStatus]);
    };

    const addNewTodo = (todo: Todo) => {
        todoStore[todo.status].push(todo);
    };

    const deleteTodo = (todoToDelete: Todo) => {
        todoStore[todoToDelete.status] = todoStore[todoToDelete.status].filter(
            (todo) => todo.id !== todoToDelete.id
        );
    };

    const updateTodo = (todo: Todo, newStatus: TodoStatus) => {
        todo.status = newStatus;
    };

    return { getTodosByStatus, addNewTodo, deleteTodo, updateTodo };
};
