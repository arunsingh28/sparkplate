import { Drawer,Button } from 'antd';
import React from 'react';
import {SquareArrowOutUpRight,Megaphone} from 'lucide-react'
import { useSearchParams,useNavigate } from 'react-router-dom';
import SheetTabs from './components/tabs';

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
                    <SquareArrowOutUpRight size={15} className="text-primary" />
                </div>
            }
            placement="right"
            classNames={{
                wrapper: 'min-w-[calc(100vw-500px)]',
                body: '!p-0 w-full'
            }}
            onClose={onClose}
            open={open}
            extra={
                <div className='flex gap-2'>
                <Button
                    type="primary"
                    size="middle"
                    onClick={onClose}
                    className="!rounded-md !px-4 !py-2 !bg-primary/10 !text-primary/80"
                    icon={<Megaphone size={15} className="text-white" />}
                >
                    105 SAST
                </Button>
                <Button
                    type="primary"
                    size="middle"
                    onClick={onClose}
                    className="!rounded-md !px-4 !py-2 !bg-primary/10 !text-primary/80"
                    icon={<Megaphone size={15} className="text-white" />}
                >
                    105 SCA
                </Button>
                </div>
            }
        >
            <div>
                <SheetTabs/>
            </div>
        </Drawer>
    );
};

export default Sheets;
