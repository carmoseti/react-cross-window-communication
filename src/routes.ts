import {RouteProps} from "react-router-dom";
import {lazy} from "react";

/**
 * Application routes
 *
 * @public
 * */
export const routes :RouteProps[] = [
    {
        path: '/users',
        exact: true,
        strict: true,
        component: lazy(()=>import('./pages/userList')),
    },
    {
        path: '/users/:id',
        exact: true,
        strict: true,
        component: lazy(()=>import('./pages/userView')),
    }
];