import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  EyeOutlined,
  ContainerOutlined,
  LoginOutlined,
  SignatureOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import './layout.scss';
const { Header, Content, Footer } = Layout;

const leftItems: MenuProps['items'] = [
  {id:1,icon:HomeOutlined,label:'主页',path:'/'},
  {id:2,icon:EyeOutlined,label:'历史科普',path:'/history'},
  {id:4,icon:ContainerOutlined,label:'我要反馈',path:'/feedback'},
].map((item, index) => ({
  key: item.path,
  icon: React.createElement(item.icon),
  label: item.label,
}));

const rightItems: MenuProps['items'] = [
  {id:1,icon:LoginOutlined,label:'登录',path:'/login'},
  {id:2,icon:SignatureOutlined,label:'注册',path:'/register'},
].map((item) => ({
  key: item.path,
  icon: React.createElement(item.icon),
  label: item.label,
}));

const Client: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 实现路由跳转
  const navigate = useNavigate()
  // 获取当前路径
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          backgroundColor:'#fff',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[currentPath]}
          items={leftItems}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(e) => navigate(e.key)}
        />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={[currentPath]}
          items={rightItems}
          style={{ marginLeft:'auto' }}
          onClick={(e) => navigate(e.key)}
        />
      </Header>
      <Content style={{ margin: '16px 0',overflow:'auto' }}>
        <div
          style={{
            padding: 24,
            // minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        广东省文物保护宣传系统 ©{new Date().getFullYear()} Created by 第十组
      </Footer>
    </Layout>
  );
};

export default Client;