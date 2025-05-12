import React from 'react';
import { Outlet } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme, Select } from 'antd';
import { Moon, User, CircleHelp } from 'lucide-react';
import Navbar from '@/components/navbar';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <React.Fragment>
            <Layout>
                <Sider
                    className="w-full bg-[#080f33] "
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Navbar collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: colorBgContainer }}
                        className="flex items-center justify-between"
                    >
                        <div className='flex items-center gap-5'>
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            className='h-full !rounded-none px-3 hover:!bg-none'
                        />
                        <Select
                                showSearch
                                placeholder="Select a project"
                                filterOption={(input, option) =>
                                    (option?.label ?? '')
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={[
                                    { value: '1', label: 'Jack' },
                                    { value: '2', label: 'Lucy' },
                                    { value: '3', label: 'Tom' },
                                ]}
                                className='w-[230px]'
                            />
                        </div>

                        <div className="flex items-center justify-center gap-4 mr-3">
                            

                            <Button type="dashed" icon={<PlusOutlined />}>
                                New Project
                            </Button>
                            <CircleHelp size={18} />
                            <Moon size={18} />
                            <User size={18} />
                        </div>
                    </Header>
                    <Content className="h-[calc(100vh-64px)] p-2">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default AppLayout;
