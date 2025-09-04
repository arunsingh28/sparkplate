import { Drawer } from 'antd';
import React from 'react';
<CloseOutlined />
import { SquareArrowOutUpRight } from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import SheetTabs from './components/tabs';
import { CloseOutlined } from '@ant-design/icons';

const Sheets = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const project_id = searchParams.get('project_id');

    const [open, setOpen] = React.useState(() => {
        return project_id?.length ? true : false;
    });

    React.useEffect(() => {
        if (project_id) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        return () => {
            setOpen(false);
        };
    }, [project_id]);

    const onClose = () => {
        navigate('/projects');
        setOpen(false);
    };

    return (
        <Drawer
            title={
                <div className="flex items-center gap-3">
                    <h6>{project_id}</h6>
                    <SquareArrowOutUpRight size={15} className="text-textSecondary" />
                </div>
            }
            placement="right"
            classNames={{
                wrapper: 'min-w-[calc(100vw-500px)] !bg-darkPrimary',
                body: '!p-0 w-full bg-darkSecondary',
                header: '!bg-darkPrimary !border-b !border-darkThird !p-4 text-textSecondary',
            }}
            onClose={onClose}
            open={open}
            closeIcon={
                <CloseOutlined className='text-textSecondary'/>
            }
        >
            <div>
                <SheetTabs />
            </div>
        </Drawer>
    );
};

export default Sheets;
