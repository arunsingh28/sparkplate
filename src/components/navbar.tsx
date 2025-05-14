import React from 'react';
import { Tooltip } from 'antd';
import { ChevronUpIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/util';
import { menuItems } from '@/utils/menu';
// import fullIcon from '@/assets/icons/logo-light.png';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = ({ collapsed }: { collapsed: boolean }) => {
    const [icon, setIcon] = React.useState<string>(
        'https://codexsecurity.io/wp-content/uploads/2025/05/image-removebg-preview-3.png',
    );

    React.useEffect(() => {
        if (collapsed) {
            setIcon(
                'https://codexsecurity.io/wp-content/uploads/2025/05/image-removebg-preview-3.png',
            );
        } else {
            setIcon('https://codexsecurity.io/wp-content/uploads/2025/05/image-removebg-preview-2.png');
        }
    }, [collapsed]);

    const [expandedIndex, setExpandedIndex] = React.useState<number | null>(
        null,
    );

    const handleToggle = (index: number) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    return (
        <React.Fragment>
            <div
                className={cn(
                    'p-2 flex flex-col items-start mt-3 px-3',
                    collapsed && 'justify-center items-center',
                )}
            >
                <img src={icon} className={cn('h-7', collapsed && 'h-9')} />
            </div>

            <div className={collapsed ? 'mt-0' : 'mt-2 w-full'}>
                {menuItems.map((item, index) => (
                    <Tooltip
                        key={index}
                        title={
                            collapsed ? (item.children ? '' : item.title) : ''
                        }
                        placement="right"
                    >
                        <Link to={item.path  || ''}
                            onClick={() =>
                                !collapsed &&
                                item.children &&
                                handleToggle(index)
                            }
                            className={cn(
                                'relative group flex flex-col w-full cursor-pointer',
                                collapsed && 'items-center',
                                item.active ? 'bg-primary' : 'bg-transparent'
                            )}
                        >
                            <div
                                className={cn(
                                    'flex items-center justify-between p-3 hover:!bg-primary w-full',
                                    collapsed && 'justify-center',
                                )}
                            >
                                <div className="flex items-center gap-2 relative">
                                    <item.icon
                                        className={cn('text-2xl text-gray-400', item.active && 'text-white')}
                                        strokeWidth={1.5}
                                    />
                                    {!collapsed && (
                                        <span className="text-sm text-gray-300">
                                            {item.title}
                                        </span>
                                    )}
                                </div>

                                {/* Chevron in expanded mode */}
                                {!collapsed && item.children && (
                                    <ChevronUpIcon
                                        size={20}
                                        strokeWidth={1.5}
                                        className={cn(
                                            'text-gray-400 transition-transform duration-300',
                                            expandedIndex === index &&
                                                'rotate-180',
                                        )}
                                    />
                                )}

                                {/* ChevronRight in collapsed mode */}
                                {collapsed && item.children && (
                                    <ChevronRightIcon
                                        className="absolute right-3 text-gray-400 group-hover:text-black transition"
                                        size={16}
                                    />
                                )}
                            </div>

                            {/* Expanded menu (only when not collapsed) */}
                            <AnimatePresence initial={false}>
                                {!collapsed &&
                                    expandedIndex === index &&
                                    item.children && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                                height: 0,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                height: 'auto',
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: 10,
                                                height: 0,
                                            }}
                                            transition={{
                                                duration: 0.1,
                                                ease: 'easeInOut',
                                            }}
                                            className="px-3 py-1 flex flex-col gap-1 overflow-hidden"
                                        >
                                            {item.children.map((child, i) => (
                                                <div
                                                    key={i}
                                                    className="text-sm text-gray-300 hover:text-white rounded-md cursor-pointer flex items-center gap-2 hover:bg-primary py-1 px-2"
                                                >
                                                    <child.icon size={20} />
                                                    <span>{child.title}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                            </AnimatePresence>

                            {/* Floating submenu in collapsed mode */}
                            {collapsed && item.children && (
                                <div className="absolute left-full top-0 -ml-0 hidden group-hover:flex bg-darkPrimary rounded-md rounded-l-none shadow-lg p-2 flex-col z-10 min-w-[160px]">
                                    <h4 className="ml-2 font-semibold text-gray-100 mb-2">
                                        Teams and Roles{' '}
                                    </h4>
                                    {item.children.map((child, i) => (
                                        <div
                                            key={i}
                                            className="text-sm text-gray-300 hover:text-white rounded-md cursor-pointer even:mt-1 flex items-center gap-2 hover:bg-gray-200/20 py-1 px-2"
                                        >
                                            <child.icon
                                                className="!text-gray-100 !text-start"
                                                size={20}
                                            />
                                            <span>{child.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Link>
                    </Tooltip>
                ))}
            </div>
        </React.Fragment>
    );
};

export default Navbar;
