import React, { useEffect, useState } from 'react';
import { Table, Select, Tag, Button, Form, Input, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Card from 'components/card';
import TableComponents from 'components/ant/TableComponents';
import AntModalComponents from 'components/ant/AntModalComponents'; // Import your modal
import { useDispatch, useSelector } from 'react-redux';
import { HelpdeskTicketList, TBSelector, updateState } from 'Store/Reducers/TBSlice';
import axios from 'axios';
import { HelpdeskTicketCreate } from 'Store/Reducers/TBSlice';

const { Option } = Select;

export default function Helpdesk() {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [stages, setStages] = useState([]);
    const [selectedStage, setSelectedStage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { isHelpdeskTicketList, HelpdeskTicketListData, isMe, isHelpdeskTicketCreateFetching, isHelpdeskTicketCreate } = useSelector(TBSelector);

    useEffect(() => {
        if (isHelpdeskTicketList) {
            setTickets(HelpdeskTicketListData?.tickets || []);
            setFilteredTickets(HelpdeskTicketListData?.tickets || []);
            setStages(HelpdeskTicketListData?.stages || []);
            dispatch(updateState({ isHelpdeskTicketList: false }));
        }
    }, [isHelpdeskTicketList]);

    useEffect(() => {
        if (isMe?.email) {
            dispatch(HelpdeskTicketList({ email: isMe?.email }));
        }
    }, [isMe]);

    const handleStageFilter = (value) => {
        setSelectedStage(value);
        if (value) {
            const filtered = tickets.filter(ticket => ticket.status === value);
            setFilteredTickets(filtered);
        } else {
            setFilteredTickets(tickets);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setModalOpen(false);
    };

    const handleCreateTicket = async () => {
        const values = await form.validateFields();
        const formData = new FormData();
        formData.append('email', isMe?.email);
        formData.append('subject', values.subject);
        formData.append('description', values.description);
        formData.append('team_id', values.team_id);
        formData.append('priority', values.priority);
        if (fileList.length > 0) {
            formData.append('attachment', fileList[0].originFileObj);
        }
        dispatch(HelpdeskTicketCreate(formData));
    };

    useEffect(() => {
        if (isHelpdeskTicketCreate) {
            dispatch(updateState({ isHelpdeskTicketCreate: false }));
            setModalOpen(false);
            form.resetFields();
            setFileList([]);
            dispatch(HelpdeskTicketList({ email: isMe?.email }));
        }
    }, [isHelpdeskTicketCreate])

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => (
                <Tag color={
                    status === 'New' ? 'blue' :
                        status === 'Solved' ? 'green' :
                            status === 'Cancelled' ? 'red' :
                                status === 'In Progress' ? 'orange' :
                                    'gray'
                }>
                    {status || 'Empty'}
                </Tag>
            ),
        },
        {
            title: 'Priority',
            dataIndex: 'priority',
            key: 'priority',
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
        },
        {
            title: 'Date',
            dataIndex: 'create_date',
            key: 'create_date',
        },
        {
            title: 'Attachments',
            dataIndex: 'attachments',
            key: 'attachments',
            render: attachments =>
                attachments?.length ? (
                    attachments.map(att => (
                        <span
                            key={att.id}
                            // href={att.url}
                            // download
                            // target="_blank"
                            // rel="noopener noreferrer"
                            className="text-navy-700 block"
                        >
                            {att.name}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 italic">None</span>
                ),
        },
    ];

    return (
        <div className="mt-3 grid grid-cols-1 gap-5">
            <Card extra="w-full h-full p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-2xl font-bold text-navy-700 dark:text-white">Create Helpdesk Ticket</h4>
                    <Button type="primary" onClick={() => setModalOpen(true)}>Create Ticket</Button>
                </div>

                <div className="mb-4 flex items-center flex-wrap mt-2 justify-between">
                    <span className="text-xl font-black text-navy-700 dark:text-white mr-2">All Ticket List</span>
                    <div>
                        <span className="text-md font-medium text-navy-700 dark:text-white mr-2">Filter by Stage:</span>
                        <Select
                            allowClear
                            placeholder="Select Stage"
                            style={{ width: 180 }}
                            value={selectedStage || undefined}
                            onChange={handleStageFilter}
                        >
                            {stages?.map(stage => (
                                <Option key={stage} value={stage}>
                                    {stage}
                                </Option>
                            ))}
                        </Select>
                    </div>

                </div>

                <TableComponents
                    rowKey={(record, idx) => `${record.subject}-${idx}`}
                    columns={columns}
                    dataSource={filteredTickets}
                    pagination={{ pageSize: 5 }}
                    bordered
                />
            </Card>

            <AntModalComponents
                ModalOpen={modalOpen}
                setOpen={setModalOpen}
                handleCancel={handleCancel}
                title="Create Helpdesk Ticket"
                loading={isHelpdeskTicketCreateFetching}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleCreateTicket} // form submit handler
                >
                    <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[{ required: true, message: 'Please enter the subject' }]}
                    >
                        <Input placeholder="Enter subject" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter the description' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the issue..." />
                    </Form.Item>

                    <Form.Item
                        name="team_id"
                        label="Team"
                        rules={[{ required: true, message: 'Please select a team' }]}
                    >
                        <Select placeholder="Select Team">
                            <Option value="2">FactByte</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="priority"
                        label="Priority"
                        rules={[{ required: true, message: 'Please select a priority' }]}
                    >
                        <Select placeholder="Select Priority">
                            <Option value="0">Low</Option>
                            <Option value="1">Medium</Option>
                            <Option value="2">High</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Attachment (Optional)">
                        <Upload.Dragger
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
                            multiple={false}
                            maxCount={1}
                            showUploadList={{ showRemoveIcon: true }}
                            style={{ padding: '10px 0' }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className="ant-upload-hint">Only one file allowed. Max size: 5MB.</p>
                        </Upload.Dragger>
                    </Form.Item>s

                    <Form.Item>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isHelpdeskTicketCreateFetching}
                            >
                                Create Ticket
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </AntModalComponents>

        </div>
    );
}
