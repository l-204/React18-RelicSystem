import React from 'react';
import { Row, Col, Flex, Progress, Timeline } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

const SecondLine: React.FC = () => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  return (
    <Row gutter={16} style={{marginTop:'20px'}}>
      <Col span={12}>
        <Row>
          <Col span={24}>
            <Flex wrap style={{background:'#fff',padding:'20px'}}>
              <Progress type="circle" percent={75} style={{margin:'auto'}} />
              <Progress type="circle" percent={70} status="exception" style={{margin:'auto'}} />
              <Progress type="circle" percent={100} style={{margin:'auto'}} />
            </Flex>
          </Col>
        </Row>
        <Row style={{marginTop:'20px'}}>
          <Col span={24}>
            <Flex vertical style={{background:'#fff',padding:'20px'}}>
              <Progress percent={30} style={{marginTop:'10px'}} />
              <Progress percent={50} status="active" style={{marginTop:'10px'}} />
              <Progress percent={70} status="exception" style={{marginTop:'10px'}} />
              <Progress percent={100} style={{marginTop:'10px'}} />
              <Progress percent={50} showInfo={false} style={{marginTop:'10px'}} />
              <Progress percent={20} showInfo={false} style={{marginTop:'10px'}} />
              <Progress percent={50} showInfo={false} style={{marginTop:'10px'}} />
            </Flex>
          </Col>
        </Row>
      </Col>
      <Col span={12}>
      <Timeline style={{background:'#fff',padding:'20px'}}
        items={[
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            children: 'Technical testing 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Network problems being solved 2015-09-01',
          },
          
        ]}
      />
      </Col>
  </Row>
  );
};

export default SecondLine;