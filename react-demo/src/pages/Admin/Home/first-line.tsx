import React from 'react';
import { Card, Col, Row } from 'antd';

const FirstLine: React.FC = () => (
  <Row gutter={16} style={{marginBottom:'20px'}}>
    <Col span={6}>
      <Card title="今日访问量" bordered={false}>
        12
      </Card>
    </Col>
    <Col span={6}>
      <Card title="本周访问量" bordered={false}>
        68
      </Card>
    </Col>
    <Col span={6}>
      <Card title="本月访问量" bordered={false}>
        325
      </Card>
    </Col>
    <Col span={6}>
      <Card title="本年访问量" bordered={false}>
        4783
      </Card>
    </Col>
  </Row>
);

export default FirstLine;