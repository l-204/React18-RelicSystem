import React from 'react';
import { Descriptions, Button } from 'antd';
import type { DescriptionsProps } from 'antd';
import Layout from '../../../layout/Admin/layout'

const items: DescriptionsProps['items'] = [
  {
    label: '姓名',
    children: '张三',
  },
  {
    label: '性别',
    children: '男',
  },
  {
    label: '出生年月',
    children: '2000-01-01',
  },
  {
    label: '身份',
    children: '普通用户',
  },
  {
    label: '联系方式',
    span: { xl: 2, xxl: 2 },
    children: '14714601389',
  },
  {
    label: '家庭住址',
    span: { xl: 2, xxl: 2 },
    children: '广东省湛江市麻章区湖光镇广东海洋大学',
  },
  {
    label: '个性签名',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        你好呀
        <br />
        我是张三
        <br />
        交个朋友吧
      </>
    ),
  },
  {
    label: '所在部门',
    span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
    children: (
      <>
        文物部
        <br />
        考古研究部
        <br />
        近代历史组
      </>
    ),
  },
];

const App: React.FC = () => (
  <Layout>
    <Descriptions
      title="个人信息"
      bordered
      column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
      extra={<Button type="primary">修改</Button>}
      items={items}
    />
  </Layout>
);

export default App;