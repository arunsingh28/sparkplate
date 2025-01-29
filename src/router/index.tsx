import { useRoutes } from 'react-router-dom';

import { routes } from './routes';

export const Router = () => {
    const route = useRoutes(routes);

    return route;
};
