import React from 'react';
import { Outlet } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Moon, User, CircleHelp } from 'lucide-react';
import Navbar from '@/components/navbar';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = React.useState(false);
  

    return (
        <React.Fragment>
            <Layout>
                <Sider
                    className="w-full bg-darkPrimary"
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <Navbar collapsed={collapsed} />
                </Sider>
                <Layout>
                    <Header
                        style={{ padding: 0, background: '#050505' }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-5">
                            <Button
                                type="text"
                                icon={
                                    collapsed ? (
                                        <MenuUnfoldOutlined className='text-white'/>
                                    ) : (
                                        <MenuFoldOutlined className='text-white'/>
                                    )
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                className="h-full !rounded-none bg-none ml-2 px-2"
                                style={{
                                    padding: '0 24px !important',
                                }}
                            />
                            {/* <Select
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
                            /> */}
                        </div>

                        <div className="flex items-center justify-center gap-4 mr-3">
                            <Button type="dashed" icon={<PlusOutlined />}>
                                New Project
                            </Button>
                            <CircleHelp size={18} className='text-white'/>
                            <Moon size={18} className='text-white'/>
                            <User size={18} className='text-white'/>
                        </div>
                    </Header>
                    <Content className="h-[calc(100vh-64px)] p-2 bg-darkPrimary">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </React.Fragment>
    );
};

export default AppLayout;
