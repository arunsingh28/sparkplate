import { Settings2,UserRoundPen } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import {Search} from 'lucide-react'

const header = () => {
    const options = [
        {
            title: 'Settings',
            icon: <Settings2 size={18} />,
        },
        {
            title: 'Asign user',
            icon: <UserRoundPen size={18} />,
        }
    ];

    return (
        <div className="bg-white py-3 px-3 flex items-center justify-between border-b border-gray-200 rounded-md">
            <h6>Project</h6>
            <div className='flex items-center gap-4'> 
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-gray-500 hover:text-black cursor-pointer"
                    >
                        {option.icon}
                        {/* <span>{option.title}</span> */}
                    </div>
                ))}
                {/* input */}
                <Input
                  variant='underline'
                  placeholder='Search...'
                  icon={<Search size={18} className='text-gray-400' />}
                  iconPosition='right'
                  className='w-[320px]'
                />
            </div>
        </div>
    );
};

export default header;
