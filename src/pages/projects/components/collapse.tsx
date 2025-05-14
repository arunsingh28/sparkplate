import { Collapse, CollapseProps,Checkbox } from 'antd';
import {ChevronUp} from 'lucide-react';

interface CollapseItem {}

const collapse: React.FC<CollapseItem> = () => {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className='text-[13px] text-gray-800'>Sererity</p>,
            children: <div className="flex flex-col gap-2 items-start">
                {
                    ['Critical', 'High', 'Medium', 'Low'].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <Checkbox type="checkbox" className='h-4 w-4'/>
                            <p className='text-gray-700'>{item}</p>
                        </div>
                    ))
                }
            </div>,
             className: '!border-none mt-1',
             classNames: {
                 body: 'bg-[#f5f5f5] !border-none',
                 header: 'bg-white !border-none !py-1 !rounded-md',
             },
        },
        {
            key: '2',
            label: <p className='text-[13px] text-gray-800'>Show</p>,
            children: <div className="flex flex-col gap-2 items-start">
            {
                ['With Issues', 'Without Issues'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                        <Checkbox type="checkbox" className='h-4 w-4'/>
                        <p className='text-gray-700'>{item}</p>
                    </div>
                ))
            }
        </div>,
            className: '!bg-[#f5f5f5] !border-none mt-1',
            classNames: {
                body: 'bg-[#f5f5f5] !border-none',
                header: 'bg-white !border-none !py-1 !rounded-md',
            },
        },
        {
            key: '3',
            label: <p className='text-[13px] text-gray-800'>Scan type</p>,
            children: <div className="flex flex-col gap-2 items-start">
            {
                ['SAST', 'SCA', 'Secret'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                        <Checkbox type="checkbox" className='h-4 w-4'/>
                        <p className='text-gray-700'>{item}</p>
                    </div>
                ))
            }
        </div>,
            className: '!bg-[#f5f5f5] !border-none mt-1',
            classNames: {
                body: 'bg-[#f5f5f5] !border-none',
                header: 'bg-white !border-none !py-1 !rounded-md',
            },
        },
        {
            key: '4',
            label: <p className='text-[13px] text-gray-800'>Language</p>,
            children: <div className="flex flex-col gap-2 items-start">
            {
                ['Javascript', 'Python', 'C++','Java', 'Typescript', 'Shell'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                        <Checkbox type="checkbox" className='h-4 w-4'/>
                        <p className='text-gray-700'>{item}</p>
                    </div>
                ))
            }
        </div>,
            className: '!bg-[#f5f5f5] !border-none mt-1',
            classNames: {
                body: 'bg-[#f5f5f5] !border-none',
                header: 'bg-white !border-none !py-1 !rounded-md',
            },
        },
    ];

    return (
        <div className="w-[300px]">
            <Collapse
                items={items}
                className="!border-none bg-transparent"
                defaultActiveKey={['1']}
                bordered={false}
                expandIconPosition="right"
                expandIcon={({ isActive }) => (
                    <ChevronUp
                        className={`text-gray-700 ${!isActive ? 'rotate-180' : ''}`}
                        size={20}
                    />
                )}
            />
        </div>
    );
};
export default collapse;
