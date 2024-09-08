'use client';

import { ApplicationComponent } from "@/components/ApplicationComponent";
import { Flex, Layout, Menu, Tabs } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle = {
  textAlign: 'center',
  lineHeight: '40px',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const layoutStyle = {
  height: '100dvh',
  overflow: 'hidden',
  width: '100%',
  maxWidth: '100%',
};

const tabItems = [
  {
    key: '1',
    label: 'In progress',
    children: <ApplicationComponent state="inProgress" />,
  },
  {
    key: '2',
    label: 'Approved',
    children: <ApplicationComponent state="approved" />,
  },
  {
    key: '3',
    label: 'Accepted',
    children: <ApplicationComponent state="accepted" />,
  },
  {
    key: '4',
    label: 'Ready to verify',
    children: <ApplicationComponent state="readyToVerify" />,
  },
  {
    key: '5',
    label: 'All applications',
    children: <ApplicationComponent state="allApplications" />,
  },
];

const items = [
  {
    key: 'applications',
    label: 'Applications',
  },
  {
    key: 'enrolled',
    label: 'Enrolled',
  },
  {
    key: 'archived',
    label: 'Archived',
  },
  {
    key: 'allStudents',
    label: 'All students',
  },
];


export default function Home() {
  const [activeKey, setActiveKey] = useState('sub1');
  const [tabActiveKey, setTabActiveKey] = useState('1');

  const onClick = (e) => {
    setActiveKey(e.key);
  };

  const onChange = (key) => {
    setTabActiveKey(key);
  }
  return (
    <Flex>
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle}>
          <Menu onClick={onClick} style={{ width: '100%' }} mode="vertical" items={items} />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            {
              items.find((item) => item.key === activeKey)?.label
            }
          </Header>
          <Content style={{"padding": 10, ...contentStyle}}>
            {
              activeKey === 'applications' ? (
                <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
              ) : (
                <div className="flex h-52">
                  <ApplicationComponent state={activeKey} />
                </div>
              )
            }
            
          </Content>
        </Layout>
      </Layout>
    </Flex>
  );
}
