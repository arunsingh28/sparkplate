import { Drawer } from 'antd';
import React from 'react';
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
            title={`${project_id}`}
            placement="right"
            classNames={{
                wrapper: 'min-w-[calc(100vw-500px)]',
                body: '!p-0 w-full'
            }}
            onClose={onClose}
            open={open}
        >
            <div>
                <SheetTabs/>
            </div>
        </Drawer>
    );
};

export default Sheets;
