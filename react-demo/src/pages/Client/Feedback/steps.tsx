import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import Result from './result'
import FeedbackForm from './feedback';
const steps = [
  {
    title: '填写反馈',
    content: 'First-content',
  },
  {
    title: '提交反馈',
    content: 'Second-content',
  },
];

const App: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const handleSubmit = () => {
    message.success('提交成功');
    setCurrent(current + 2);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={items} />
      { current === 0 
      ? (<div style={contentStyle}>
            <div style={{ marginTop: 24}}>
                <FeedbackForm onSubmit={handleSubmit}></FeedbackForm>
            </div>
        </div>)
      :(<div style={contentStyle}>
            <Result></Result>
        </div>)
      }
    </>
  );
};

export default App;
