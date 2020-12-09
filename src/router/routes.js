import TodoList from "../components/TodoList.js";

export const routes = (t) => (
    [
        {
            path: "/",
            exact: true,
            name: 'Todos',
            sidebar: () => <div>{t('routeTaskName')}</div>,
            main: () => <TodoList todosCompletionFilter={(todo) => !todo.completed}/>
        },
        {
            path: "/completed",
            name: 'Completed',
            sidebar: () => <div>{t('routeCompletedName')}</div>,
            main: () => <TodoList todosCompletionFilter={(todo) => todo.completed}/>
        }
    ]
);
