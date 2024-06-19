import React, { useState, } from 'react';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    SolutionOutlined,
    AuditOutlined,
    SettingOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Layout, Menu, theme, } from 'antd';
import './layout.scss'
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png'

  const { Header, Sider, Content, Footer } = Layout;

  const topItems: MenuProps['items'] = [
    {id:1,icon:HomeOutlined,label:'首页',path:'/home'},
    {id:2,icon:UserOutlined,label:'个人中心',path:'/user'},
    {id:3,icon:AppstoreOutlined,label:'文物管理',path:'/manage'},
    {id:4,icon:SolutionOutlined,label:'文物申请',path:'/apply'},
    {id:5,icon:AuditOutlined,label:'文物审核',path:'/audit'},
    {id:6,icon:SettingOutlined,label:'系统设置',path:'/setting'},
  ].map((item, index) => ({
    key: item.path,
    icon: React.createElement(item.icon),
    label: item.label,
  }));

  const bottomItems: MenuProps['items'] = [
    {id:1,icon:LogoutOutlined,label:'退出登录',path:'/'},
  ].map((item) => ({
    key: item.path,
    icon: React.createElement(item.icon),
    label: item.label,
  }));

  const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(localStorage.getItem('collapsed') === 'true');

    const toggleCollapsed = () => {
        const newCollapsed = !collapsed;
        localStorage.setItem('collapsed', newCollapsed.toString());
        setCollapsed(newCollapsed);
    };
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <img src={logo} alt="logo" />
          <span style={collapsed?{display:'none'}:{display:'inline'}}>文物保护宣传系统</span>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentPath]} items={topItems} onClick={(e) => navigate(e.key)} />
        <Menu theme="dark" mode="inline" selectedKeys={[currentPath]} items={bottomItems} onClick={(e) => navigate(e.key)} style={{ marginTop: 'auto' }} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content style={{ margin: '0 16px',overflow:'auto' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 12,
              textAlign: 'center',
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* <p>long content</p> */}
            {/* {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? 'more' : '...'}
                  <br />
                </React.Fragment>
              ))
            } */}
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          广东省文物保护宣传系统 ©{new Date().getFullYear()} Created by 第十组
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;