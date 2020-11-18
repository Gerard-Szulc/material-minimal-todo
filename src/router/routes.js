import TodoList from "../components/TodoList.js";

export const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>Tasks</div>,
        main: () => <TodoList todosCompletionFilter={(todo) => !todo.completed}/>
    },
    {
        path: "/completed",
        sidebar: () => <div>Completed</div>,
        main: () => <TodoList todosCompletionFilter={(todo) => todo.completed}/>
    }
];
