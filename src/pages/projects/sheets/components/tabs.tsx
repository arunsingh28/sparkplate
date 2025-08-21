import { Tabs, ConfigProvider } from 'antd';
import type { TabsProps } from 'antd';
import {
    Package,
    Webhook,
    SearchCode,
    Code2,SquareFunction,Key,Puzzle,Cone,Tag,List,Github
} from 'lucide-react';

const SheetNav = () => {

    const menus = [
        {
            icon: <List size={18} className="text-inherit" />,
            title: 'General Info',
            components: <div>General Info</div>
        },
        {
            icon: <SearchCode size={18} className="text-inherit" />,
            title: 'SAST',
            components: <div>SAST</div>
        },
        {
            icon: <Tag size={18} className="text-inherit" />,
            title: 'Tags',
            components: <div>Tags</div>
        },
        {
            icon: <Code2 size={18} className="text-inherit" />,
            title: 'SCA',
            components: <div>SCA</div>
        },
        {
            icon: <Webhook size={18} className="text-inherit" />,
            title: 'API Inventory',
            components: <div>API</div>
        },
        {
            icon: <Github size={18} className="text-inherit" />,
            title: 'GitHub',
            components: <div>GitHub</div>
        },
        {
            icon: <Puzzle size={18} className="text-inherit" />,
            title: 'Third Party',
            components: <div>Third Party</div>
        },
        {
            icon: <Key size={18} className="text-inherit" />,
            title: 'Secrets',
            components: <div>Secrets</div>
        },
        {
            icon: <SquareFunction size={18} className="text-inherit" />,
            title: 'Functions',
            components: <div>Functions</div>
        },
        {
            icon: <Package size={18} className="text-inherit" />,
            title: 'Dependencies',
            components: <div>Dependencies</div>
        },
        {
            icon: <Cone size={18} className="text-inherit" />,
            title: 'Dependency graph',
            components: <div>Dependency graph</div>
        }
    ]

    const items: TabsProps['items'] = menus.map((menu, index) => {
        return {
            key: `${index}`,
            label: (
                <span className="flex items-center gap-2">
                    {menu.icon}
                    <span className='!text-[12px]'>{menu.title}</span>
                </span>
            ),
            children: menu.components,
            className: 'h-[calc(100vh-80px)] overflow-hidden',
        }
    })

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#4121e9',
                    margin: 5,
                    
                },
            }}
            componentSize={'small'}
        >
            <div className="my-2">
                <Tabs tabPosition={'left'} items={items} />
            </div>
        </ConfigProvider>
    );
};

export default SheetNav;
