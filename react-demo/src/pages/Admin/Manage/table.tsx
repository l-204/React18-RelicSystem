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
      artifact_id?: number;
      artifact_name?: string;
      artifact_description?: string;
      artifact_category?: string;
      artifact_location?: string;
      date_discovered?: string;
      historical_period?: string;
      artifact_status?: string;
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
      const res = await axios.get('http://localhost:4000/artifacts');
      setArtifacts(res.data);
    } catch (error) {
      console.error('Error fetching artifacts:', error);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const addArtifact = async (formData:any) => {
    try {
      const res = await axios.post('http://localhost:4000/artifacts', formData);
      console.log(res.data);
    } catch (error) {
      console.error('Error adding artifact:', error);
    }
  };

  const updateArtifact = async (formData:any) => {
    try {
      const res = await axios.put(`http://localhost:4000/artifacts/${id}`, formData);
      console.log(res.data);
    } catch (error) {
      console.error('Error adding artifact:', error);
    }
  };

  const deleteArtifact = async (artifactId: string) => {
    try {
      const res = await axios.delete(`http://localhost:4000/artifacts/${artifactId}`);
      console.log(res.data);
    } catch (error) {
      console.error('Error deleting artifact:', error);
    }
  };

  const handleAdd = () => {
    setOpen(true);
    setAction('添加');
    form.setFieldsValue({
      artifact_id: '',
      artifact_name: '',
      artifact_description: '',
      artifact_category: '',
      artifact_location: '',
      date_discovered: '',
      historical_period: '',
      artifact_status: '',
    })
  };

  const handleEdit = async (id:number) => {
    setAction('编辑');
    setId(id);
    const res = await axios.get(`http://localhost:4000/artifacts/${id}`);
    res.data[0]['date_discovered'] = moment(res.data[0]['date_discovered'], 'YYYY-MM-DD')
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
          values['date_discovered'] = moment(values['date_discovered']).format('YYYY-MM-DD');
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
          values['date_discovered'] = moment(values['date_discovered']).format('YYYY-MM-DD');
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
  artifact_id: number;
  artifact_name: string;
  artifact_description: string;
  artifact_category: string;
  artifact_location: string;
  date_discovered: string;
  historical_period: string;
  artifact_status: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '文物名称',
    dataIndex: 'artifact_name',
  },
  {
    title: '文物描述',
    dataIndex: 'artifact_description',
  },
  {
    title: '文物类别',
    dataIndex: 'artifact_category',
  },
  {
    title: '文物所在地',
    dataIndex: 'artifact_location',
  },
  {
    title: '发现日期',
    dataIndex: 'date_discovered',
  },
  {
    title: '历史时期',
    dataIndex: 'historical_period',
  },
  {
    title: '文物状态',
    dataIndex: 'artifact_status',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type='link' size='small' icon={<EditOutlined />} onClick={() => handleEdit(record.artifact_id)}>编辑</Button>
        <Button type='link' size='small' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.artifact_id)}>删除</Button>
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
        title={action+'文物'}
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
            label="文物名称"
            name="artifact_name"
            rules={[{ required: true, message: '文物名称不能为空' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="文物描述"
            name="artifact_description"
            rules={[{ required: true, message: '文物描述不能为空' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item<FieldType>
            label="文物类别"
            name="artifact_category"
            rules={[{ required: true, message: '文物类别不能为空' }]}
          >
            <Select>
              <Select.Option value="一级保护文物">一级保护文物</Select.Option>
              <Select.Option value="二级保护文物">二级保护文物</Select.Option>
              <Select.Option value="三级保护文物">三级保护文物</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="文物所在地"
            name="artifact_location"
            rules={[{ required: true, message: '文物所在地不能为空' }]}
          >
            <Select>
              <Select.Option value="珠海">珠海</Select.Option>
              <Select.Option value="广州">广州</Select.Option>
              <Select.Option value="湛江">湛江</Select.Option>
              <Select.Option value="韶关">韶关</Select.Option>
              <Select.Option value="河源">河源</Select.Option>
              <Select.Option value="清远">清远</Select.Option>
              <Select.Option value="中山">中山</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="发现日期"
            name="date_discovered"
            rules={[{ required: true, message: '发现日期不能为空' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item<FieldType>
            label="历史时期"
            name="historical_period"
            rules={[{ required: true, message: '历史时期不能为空' }]}
          >
            <Select>
              <Select.Option value="古代">古代</Select.Option>
              <Select.Option value="近代">近代</Select.Option>
              <Select.Option value="现代">现代</Select.Option>
              <Select.Option value="未知">未知</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="文物状态"
            name="artifact_status"
            rules={[{ required: true, message: '文物状态不能为空' }]}
          >
            <Select>
              <Select.Option value="未申请">未申请</Select.Option>
              <Select.Option value="申请中">申请中</Select.Option>
              <Select.Option value="已申请">已申请</Select.Option>
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