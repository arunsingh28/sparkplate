import { Button, Table, Tag, Input, Tooltip } from 'antd';
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

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'PROJECT',
        dataIndex: 'Project',
        key: 'project',
        render: (text, record) => (
            <div className="flex items-center gap-2">
                {
                    {
                        PASS: <BadgeCheck className="text-green-500" />,
                        FAIL: <OctagonAlert className="text-red-500" />,
                        'IN-PROGRESS': (
                            <Loader className="text-blue-500 animate-spin" />
                        ),
                    }[record.scanStatus || 'PASS']
                }
                <div className="flex flex-col justify-center">
                    <p className="text-sm font-medium text-gray-800">{text}</p>

                    {/* here i want to show the lastScan detail  */}
                    {record.lastScan && (
                        <span className="text-xs text-gray-500">
                            {`Last Scan: ${record.lastScan.toLocaleDateString()}`}
                        </span>
                    )}
                </div>
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
    },
    {
        title: 'SEVERITY',
        dataIndex: 'Severity',
        key: 'Severity',
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
    },
    {
        title: 'SCANNERS',
        dataIndex: 'Scanners',
        key: 'Scanners',
        render: (scanners: Scanners) => (
            <div className="flex flex-wrap gap-2">
                {Object.entries(scanners).map(([key, value]) => {
                    if (!value) return null;
                    const styles: Record<string, string> = {
                        SAST: 'bg-purple-100 text-purple-600',
                        SCA: 'bg-green-100 text-green-600',
                        SECRET: 'bg-red-100 text-red-600',
                        TPV: 'bg-blue-100 text-blue-600',
                    };

                    const IconMap: Record<string, React.ReactNode> = {
                        SAST: <EarthIcon className="w-5 h-5" />,
                        SCA: <CodeXml className="w-5 h-5" />,
                        SECRET: <Key className="w-5 h-5" />,
                        TPV: <DoorClosedLocked className="w-5 h-5" />,
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
    },
    {
        title: 'TAGS',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags: string[]) => (
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
        ),
    },
    {
        title: 'ACTION',
        key: 'action',
        render: (_, record) => (
            <Button
                key={record.key}
                icon={<SecurityScanOutlined className="animate-pulse" />}
                // className="bg-blue-500 text-white hover:bg-blue-600"
                type="primary"
                size="small"
            >
                Action
            </Button>
        ),
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
        lastScan: new Date('2023-10-02'),
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
        lastScan: new Date('2023-10-03'),
        scanStatus: 'IN-PROGRESS',
    },
];

const Issues = () => {
    return (
        <div>
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
                }}
                className="w-full"
            />
        </div>
    );
};

export default Issues;
