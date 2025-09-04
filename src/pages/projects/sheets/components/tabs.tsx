import { Tabs, ConfigProvider } from 'antd';
import type { TabsProps } from 'antd';
import {
    Package,
    Webhook,
    SearchCode,
    Code2, SquareFunction, Key, Puzzle, Cone, Tag, List, Github
} from 'lucide-react';

const SheetNav = () => {

    const menus = [
        {
            icon: <List size={18} className="text-inherit" />,
            title: 'General Info',
            components: <div className='text-textSecondary'>General Info</div>
        },
        {
            icon: <SearchCode size={18} className="text-inherit" />,
            title: 'SAST',
            components: <div className='text-textSecondary'>SAST</div>
        },
        {
            icon: <Tag size={18} className="text-inherit" />,
            title: 'Tags',
            components: <div> className='text-textSecondary'Tags</div>
        },
        {
            icon: <Code2 size={18} className="text-inherit" />,
            title: 'SCA',
            components: <div className='text-textSecondary'>SCA</div>
        },
        {
            icon: <Webhook size={18} className="text-inherit" />,
            title: 'API Inventory',
            components: <div className='text-textSecondary'>API</div>
        },
        {
            icon: <Github size={18} className="text-inherit" />,
            title: 'GitHub',
            components: <div className='text-textSecondary'>GitHub</div>
        },
        {
            icon: <Puzzle size={18} className="text-inherit" />,
            title: 'Third Party',
            components: <div className='text-textSecondary'>Third Party</div>
        },
        {
            icon: <Key size={18} className="text-inherit" />,
            title: 'Secrets',
            components: <div className='text-textSecondary'>Secrets</div>
        },
        {
            icon: <SquareFunction size={18} className="text-inherit" />,
            title: 'Functions',
            components: <div className='text-textSecondary'>Functions</div>
        },
        {
            icon: <Package size={18} className="text-inherit" />,
            title: 'Dependencies',
            components: <div className='text-textSecondary'>Dependencies</div>
        },
        {
            icon: <Cone size={18} className="text-inherit" />,
            title: 'Dependency graph',
            components: <div className='text-textSecondary'>Dependency graph</div>
        }
    ]

    const items: TabsProps['items'] = menus.map((menu, index) => {
        return {
            key: `${index}`,
            label: (
                <span className="flex items-center gap-2 text-textSecondary">
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
                    colorPrimary: '#ffffff',
                    margin: 5,
                },
                components: {
                    Tabs: {
                        colorBorder: '#2A2D30',
                    }
                }
            }}
            componentSize={'small'}
        >
            <div className="my-2">
                <Tabs
                    tabPosition={'left'}
                    items={items}
                    // className="[&_.ant-tabs-content-holder]:border-0 [&_.ant-tabs-content]:border-0 [&_.ant-tabs-tabpane]:border-0"
                />
            </div>
        </ConfigProvider>
    );
};

export default SheetNav;
