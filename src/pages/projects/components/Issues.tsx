import { Button, Table, Tag, Input, Tooltip, Checkbox } from 'antd';
import type { TableProps } from 'antd';
import {
    EarthIcon,
    Key,
    DoorClosedLocked,
    CodeXml,
    BadgeCheck,
    OctagonAlert,
    Loader,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SecurityScanOutlined, SearchOutlined } from '@ant-design/icons';

interface Severity {
    C: number;
    H: number;
    M: number;
    L: number;
    I: number;
}

interface Scanners {
    SAST: boolean;
    SCA: boolean;
    SECRET: boolean;
    TPV: boolean;
}

interface DataType {
    key: React.Key;
    Project: string;
    Severity: Severity;
    Scanners: Scanners;
    tags: string[];
    lastScan?: Date;
    scanStatus?: 'FAIL' | 'PASS' | 'IN-PROGRESS';
}

const getLastScanDateString = (date: Date | undefined) => {
    // return string like 4 day ago or 2 hours ago or 1 minute ago or 1 month ago or 1 year ago
    if (!date) return 'N/A';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
};

const columns: TableProps<DataType>['columns'] = [
    // {
    //     title: <Checkbox className="h-4 w-4" />,
    //     dataIndex: 'checkbox',
    //     key: 'checkbox',
    //     render: () => (
    //         <Checkbox className="h-4 w-4 data-[state=checked]:text-primary" />
    //     ),
    //     width: 50,
    //     fixed: 'left',
    //     className: '!bg-darkSecondary',
    // },
    {
        title: <span className="!text-[12px]">PROJECT</span>,
        dataIndex: 'Project',
        key: 'project',
        onHeaderCell: () => ({
            className: '!bg-darkThird !text-textSecondary !border-[#2A2C33]',
        }),
        onCell: () => ({
            className: '!border-[#2A2C33]',
        }),
        render: (text, record) => (
            <div className="flex items-center gap-2">
                {
                    {
                        PASS: (
                            <BadgeCheck size={17} className="text-green-500" />
                        ),
                        FAIL: (
                            <OctagonAlert size={17} className="text-red-500" />
                        ),
                        'IN-PROGRESS': (
                            <Loader
                                size={17}
                                className="text-blue-500 animate-spin"
                            />
                        ),
                    }[record.scanStatus || 'PASS']
                }
                <Link to={`?project_id=${text}`} className="flex flex-col justify-center">
                    <p className="text-[13px] text-white">{text}</p>
                </Link>
            </div>
        ),
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div className="p-2 w-full">
                <Input
                    placeholder="Search Project"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                    onPressEnter={() => {
                        confirm();
                    }}
                />
                <div className="mt-2 flex gap-2 w-[300px]">
                    <Button
                        type="primary"
                        onClick={() => {
                            confirm();
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSelectedKeys([]);
                            confirm();
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        ),
        onFilter: (value, record) => {
            return record.Project.toString()
                .toLowerCase()
                .includes((value as string).toLowerCase());
        },
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        className: '!bg-darkSecondary !text-textSecondary',
    },
    {
        title: <span className="!text-[12px]">SEVERITY</span>,
        dataIndex: 'Severity',
        key: 'Severity',
         onHeaderCell: () => ({
            className: '!bg-darkThird !text-textSecondary !border-[#2A2C33]',
        }),
         onCell: () => ({
            className: '!border-[#2A2C33]',
        }),
        render: (severity: Severity) => (
            <div className="flex flex-wrap gap-0 text-sm font-medium text-gray-800">
                {Object.entries(severity).map(([key, value]) => (
                    <Tooltip
                        key={key}
                        title={
                            {
                                C: 'Critical',
                                H: 'High',
                                M: 'Medium',
                                L: 'Low',
                                I: 'Info',
                            }[key]
                        }
                        placement="top"
                        arrowPointAtCenter
                    >
                        <Tag
                            key={key}
                            color={
                                {
                                    C: 'red',
                                    H: 'orange',
                                    M: 'yellow',
                                    L: 'green',
                                    I: 'blue',
                                }[key]
                            }
                        >
                            {value} {key}
                        </Tag>
                    </Tooltip>
                ))}
            </div>
        ),
        filters: [
            {
                text: 'Critical',
                value: 'C',
            },
            {
                text: 'High',
                value: 'H',
            },
            {
                text: 'Medium',
                value: 'M',
            },
            {
                text: 'Low',
                value: 'L',
            },
            {
                text: 'Info',
                value: 'I',
            },
        ],
        onFilter: (value, record) => {
            const severity = record.Severity;
            return severity[value as keyof Severity] > 0;
        },
        className: '!bg-darkSecondary !text-textSecondary',
    },
    {
        title: <span className="!text-[12px]">SCANNERS</span>,
        dataIndex: 'Scanners',
        key: 'Scanners',
         onHeaderCell: () => ({
            className: '!bg-darkThird !text-textSecondary !border-[#2A2C33]',
        }),
         onCell: () => ({
            className: '!border-[#2A2C33]',
        }),
        render: (scanners: Scanners) => (
            <div className="flex flex-wrap gap-2">
                {Object.entries(scanners).map(([key, value]) => {
                    if (!value) return null;
                    const styles: Record<string, string> = {
                        SAST: 'bg-purple-100/70 text-primary',
                        SCA: 'bg-purple-100/70 text-primary',
                        SECRET: 'bg-purple-100/70 text-primary',
                        TPV: 'bg-purple-100/70 text-primary',
                    };

                    const IconMap: Record<string, React.ReactNode> = {
                        SAST: <EarthIcon size={15} strokeWidth={1.5} />,
                        SCA: <CodeXml size={15} strokeWidth={1.5} />,
                        SECRET: <Key size={15} strokeWidth={1.5} />,
                        TPV: <DoorClosedLocked size={15} strokeWidth={1.5} />,
                    };

                    return (
                        <Tooltip
                            key={key}
                            title={
                                {
                                    SAST: 'Static Application Security Testing',
                                    SCA: 'Software Composition Analysis',
                                    SECRET: 'Secret Scanning',
                                    TPV: 'Third Party Vulnerability',
                                }[key]
                            }
                            placement="top"
                            arrowPointAtCenter
                        >
                            <div
                                key={key}
                                className={`flex items-center justify-center p-1 rounded-lg ${styles[key]}`}
                                title={key}
                            >
                                {IconMap[key]}
                            </div>
                        </Tooltip>
                    );
                })}
            </div>
        ),
        filters: [
            {
                text: 'SAST',
                value: 'SAST',
            },
            {
                text: 'SCA',
                value: 'SCA',
            },
            {
                text: 'SECRET',
                value: 'SECRET',
            },
            {
                text: 'TPV',
                value: 'TPV',
            },
        ],
        onFilter: (value, record) => {
            const scanners = record.Scanners;
            return scanners[value as keyof Scanners] === true;
        },
        className: '!bg-darkSecondary !text-textSecondary',
    },
    {
        title: <span className="!text-[12px]">TAGS</span>,
        key: 'tags',
         onHeaderCell: () => ({
            className: '!bg-darkThird !text-textSecondary !border-[#2A2C33]',
        }),
         onCell: () => ({
            className: '!border-[#2A2C33]',
        }),
        dataIndex: 'tags',
        render: (tags: string[]) => (
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        ),
        className: '!bg-darkSecondary !text-textSecondary',
    },
    // {
    //     title: <span className="!text-[12px]">LAST SCAN</span>,
    //     dataIndex: 'lastScan',
    //     key: 'lastScan',
    //     render: (text) => (
    //         <p className="text-[12px] text-gray-800">
    //             {getLastScanDateString(text)}
    //         </p>
    //     ),
    //     sorter: (a, b) => {
    //         return (
    //             new Date(a.lastScan || '').getTime() -
    //             new Date(b.lastScan || '').getTime()
    //         );
    //     },
    // },
    {
        title: <span className="!text-[12px]">ACTION</span>,
        key: 'action',
         onHeaderCell: () => ({
            className: '!bg-darkThird !text-textSecondary !border-[#2A2C33]',
        }),
         onCell: () => ({
            className: '!border-[#2A2C33]',
        }),
        render: (_, record) => (
            <Button
                key={record.key}
                icon={<SecurityScanOutlined />}
                className="bg-primary text-white hover:!bg-primary/80 !py-3"
                type="primary"
                size="small"
            >
                Scan
            </Button>
        ),
        width: 100,
        className: '!bg-darkSecondary !text-textSecondary',
    },
];

const data: DataType[] = [
    {
        key: '1',
        Project: 'Super-Vulnerable-Org/SecureDocs-Modularized',
        Severity: {
            C: 1,
            H: 2,
            M: 3,
            L: 4,
            I: 5,
        },
        Scanners: {
            SAST: true,
            SCA: false,
            SECRET: true,
            TPV: false,
        },
        tags: ['developer'],
        lastScan: new Date('2023-10-01'),
        scanStatus: 'FAIL',
    },
    {
        key: '2',
        Project: 'dockersamples/helloworld-go-demo',
        Severity: {
            C: 2,
            H: 3,
            M: 4,
            L: 5,
            I: 6,
        },
        Scanners: {
            SAST: false,
            SCA: true,
            SECRET: false,
            TPV: true,
        },
        tags: ['devops', 'admin'],
        lastScan: new Date('2025-05-5'),
        scanStatus: 'PASS',
    },
    {
        key: '3',
        Project: 'insecure-kubernetes-deployments',
        Severity: {
            C: 3,
            H: 4,
            M: 5,
            L: 6,
            I: 7,
        },
        Scanners: {
            SAST: true,
            SCA: true,
            SECRET: true,
            TPV: true,
        },
        tags: ['admin'],
        lastScan: new Date('2025-02-03'),
        scanStatus: 'IN-PROGRESS',
    },
];

const Issues = () => {
    return (
        <div className="w-full bg-darkSecondary">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ['5', '10', '20'],
                    showTotal: (total, range) =>
                        `Total ${total} items, from ${range[0]} to ${range[1]}`,
                    total: data.length,
                    position: ['bottomRight'],
                    showQuickJumper: true,
                    className: '!bg-darkSecondary !text-textSecondary !border-[#2A2C33]',
                }}
                className="w-full"
                rowClassName="bg-darkSecondary"
                // virtual
            />
        </div>
    );
};

export default Issues;
