import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <Result
    status="success"
    title="提交成功!"
    subTitle="感谢您的反馈，我们将在7个工作日内给予您答复."
    extra={[

    ]}
  />
);

export default App;