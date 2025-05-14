import { RoleIcon,UsersIcon } from '@/components/icons';
import {
    LayoutGrid,
    Settings,
    Package,
    Bug,
    Puzzle,
    Webhook,
    SearchCode,
    ScanSearch,
    ShieldUser,
    UserLock,Users
} from 'lucide-react';
import { APP_PATHS } from './paths';

export const menuItems = [
    {
        title: 'Projects',
        icon: LayoutGrid,
        path: APP_PATHS.PROJECTS,
        active: true,
    },
    {
        title: 'Dependencies',
        icon: Package,
        path: '/dependencies',
        active: false,
    },
    {
        title: 'Vulnerabilities',
        icon: Bug,
        path: '/vulnerabilities',
        active: false,
    },
    {
        title: 'Third Party',
        icon: Puzzle,
        active: false,
    },
    {
        title: 'API Inventory',
        icon: Webhook,
        active: false,
    },
    {
        title: 'SAST Rules',
        icon: SearchCode,
        active: false,
    },
    {
        title: 'Scan Policy',
        icon: ScanSearch,
        active: false,
    },
    {
        title: 'Users',
        icon: ShieldUser,
        active: false,
    },
    {
        title: 'Teams and Roles',
        icon: UserLock,
        active: false,
        children: [
            {
                title: 'Users',
                icon: UsersIcon,
            },
            {
                title: 'Roles',
                icon: RoleIcon,
            },
            {
                title: 'Teams',
                icon: Users,
            }
        ]
    },
    {
        title: 'Settings',
        icon: Settings,
        path: '/settings',
        active: false,
    },
];
