import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, message, ConfigProvider,
  Form, Input, Select, DatePicker
 } from 'antd';
import type { FormProps, TableColumnsType } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import moment from 'moment'
import axios from 'axios';

dayjs.locale('zh-cn');
const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [action, setAction] = useState('');  // 用于控制当前 Form 的显示类型
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState(0);

  const [form] = Form.useForm();
  
    type FieldType = {
      application_id?: number;
      artifact_name?: string;
      applicant_name?: string;
      applicant_contact?: string;
      application_purpose?: string;
      application_date?: string;
      application_status?: string;
    };
  
  
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    const { TextArea } = Input;

  const [artifacts, setArtifacts] = useState([]);

  const fetchArtifacts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/applications');
      setArtifacts(res.data);
    } catch (error) {
      console.error('请求失败:', error);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const addArtifact = async (formData:any) => {
    try {
      const res = await axios.post('http://localhost:4000/applications', formData);
      console.log(res.data);
    } catch (error) {
      console.error('添加失败:', error);
    }
  };

  const updateArtifact = async (formData:any) => {
    try {
      const res = await axios.put(`http://localhost:4000/applications/${id}`, formData);
      console.log(res.data);
    } catch (error) {
      console.error('编辑失败:', error);
    }
  };

  const deleteArtifact = async (applicationId: string) => {
    try {
      const res = await axios.delete(`http://localhost:4000/applications/${applicationId}`);
      console.log(res.data);
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  const handleAdd = () => {
    setOpen(true);
    setAction('添加');
    form.setFieldsValue({
      application_id: '',
      artifact_name: '',
      applicant_name: '',
      applicant_contact: '',
      application_purpose: '',
      application_date: '',
      application_status: '',
    })
  };

  const handleEdit = async (id:number) => {
    setAction('编辑');
    setId(id);
    const res = await axios.get(`http://localhost:4000/applications/${id}`);
    res.data[0]['application_date'] = moment(res.data[0]['application_date'], 'YYYY-MM-DD')
    form.setFieldsValue(res.data[0])
    setOpen(true);
  };

  const handleDelete = (id:number) => {
    setOpen(true);
    setAction('删除');
    setId(id);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    if (action === '删除') {
      // 直接处理删除逻辑
       deleteArtifact(id.toString())
       .then((res) => {
        setOpen(false);
        setConfirmLoading(false);
        message.success(action+'成功');
        fetchArtifacts()
       })
    } else if(action === '编辑') {
      // 提交表单
      form.validateFields()
        .then((values:any) => {
          // “发现日期”属性日期格式化
          values['application_date'] = moment(values['application_date']).format('YYYY-MM-DD');
          delete values.artifact_id
          // 处理提交后的逻辑，例如发送请求
          console.log(values)
          updateArtifact(values)
          .then((res) => {
            setOpen(false);
            setConfirmLoading(false);
            message.success(action+'成功');
            fetchArtifacts()
          })
        })
        .catch((info:any) => {
          console.log('验证失败',info)
        });
    }else if(action === '添加') {
      // 提交表单
      form.validateFields()
        .then((values:any) => {
          // “发现日期”属性日期格式化
          values['application_date'] = moment(values['application_date']).format('YYYY-MM-DD');
          delete values.artifact_id
          // 处理提交后的逻辑，例如发送请求
          addArtifact(values)
          .then((res) => {
            setOpen(false);
            setConfirmLoading(false);
            message.success(action+'成功');
            fetchArtifacts()
          })
        })
        .catch((info:any) => {
          console.log('验证失败',info)
        });
    }else{
      message.error('操作失败');
    }
  };

  const handleCancel = () => {
    setOpen(false);
    message.info('取消'+action);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  interface DataType {
    application_id: number;
    artifact_name: string;
    applicant_name: string;
    applicant_contact: string;
    application_purpose: string;
    application_date: string;
    application_status: string;
  }

const columns: TableColumnsType<DataType> = [
  {
    title: '申请文物',
    dataIndex: 'artifact_name',
  },
  {
    title: '申请人',
    dataIndex: 'applicant_name',
  },
  {
    title: '联系方式',
    dataIndex: 'applicant_contact',
  },
  {
    title: '申请目的',
    dataIndex: 'application_purpose',
  },
  {
    title: '申请日期',
    dataIndex: 'application_date',
  },
  {
    title: '申请状态',
    dataIndex: 'application_status',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type='link' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record.application_id)}>编辑</Button>
        <Button type='link' size='small' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.application_id)}>删除</Button>
      </Space>
    ),
  },
];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
      <Button type="primary" onClick={handleAdd} icon={<PlusCircleOutlined />}>
        添加
      </Button>
      <ConfigProvider locale={zhCN}>
      <Modal
        title={action+'申请'}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {action === '删除' && <p>确认删除吗？</p>}
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="申请文物"
            name="artifact_name"
            rules={[{ required: true, message: '申请文物不能为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="申请人"
            name="applicant_name"
            rules={[{ required: true, message: '申请人不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="联系方式"
            name="applicant_contact"
            rules={[
              { required: true, message: '联系方式不能为空' },
              { pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式有误'}
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item<FieldType>
            label="申请目的"
            name="application_purpose"
            rules={[{ required: true, message: '申请目的不能为空' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item<FieldType>
            label="申请日期"
            name="application_date"
            rules={[{ required: true, message: '申请日期不能为空' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item<FieldType>
            label="申请状态"
            name="application_status"
            rules={[{ required: true, message: '申请状态不能为空' }]}
          >
            <Select>
              <Select.Option value="未通过">未通过</Select.Option>
              <Select.Option value="审核中">审核中</Select.Option>
              <Select.Option value="已通过">已通过</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={artifacts} rowKey={(record,index)=>index!.toString()} />
    </div>
  );
};

export default App;