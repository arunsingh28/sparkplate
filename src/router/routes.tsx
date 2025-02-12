import { RouteObject } from 'react-router-dom';
import React from 'react';

import Home from '@/pages/home';
import AppLayout from '@/layouts/app.layout';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <AppLayout />
            </React.Suspense>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
];
