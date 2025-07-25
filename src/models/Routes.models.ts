

export  const Routes = {
    LOGIN: {
        path: '/',
        name: 'Login',
    },
    REGISTRO: {
        path: '/user/sign_up',
        name: 'sign_up',
    },
    NEWPASSWORD: {
        path: '/user/password_new',
        name: 'New Password',
    },
    HOME: {
        path: '/dashboard',
        name: 'Home',
    },
    DASHBOARD: {
        path: '/dashboard',
        name: 'Home',
    }
}

export interface Route {
    path: string,
    name: string
}