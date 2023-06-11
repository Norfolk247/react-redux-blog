import Main from "./main";
import User from "./user";
import About from "./about";

export const pages = [
    {
        path: '/',
        element: <Main/>,
        name: 'Главная',
        shouldBeInHeader: true
    },
    {
        path: '/user/:id',
        element: <User/>,
        name: 'Пользователь',
        shouldBeInHeader: false,
    },
    {
        path: '/me',
        element: <About/>,
        name: 'Обо мне',
        shouldBeInHeader: true
    }
]