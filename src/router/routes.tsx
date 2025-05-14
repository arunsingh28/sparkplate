import { RouteObject } from 'react-router-dom';
import React from 'react';

import Projet from '@/pages/projects';

import AppLayout from '@/layouts/app.layout';
import { APP_PATHS } from '@/utils/paths';

export const routes: RouteObject[] = [
    {
        path: APP_PATHS.PROJECTS,
        element: (
            <React.Suspense fallback={<div>Loading...</div>}>
                <AppLayout />
            </React.Suspense>
        ),
        children: [
            {
                index: true,
                element: <Projet />,
            },
        ],
    },
];
