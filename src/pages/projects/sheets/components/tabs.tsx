import { Tabs, ConfigProvider } from 'antd';
import type { TabsProps } from 'antd';
import { User } from 'lucide-react';

const SheetNav = () => {

    const menus = [
        {
            icon: <User size={18} className="text-inherit" />,
            title: 'SAST',
            components: <div>SAST</div>
        },
        {
            icon: <User size={18} className="text-inherit" />,
            title: 'SCA',
            components: <div>SCA</div>
        }
    ]

    const items: TabsProps['items'] = menus.map((menu, index) => {
        return {
            key: `${index}`,
            label: (
                <span className="flex items-center gap-2 text-sm">
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
