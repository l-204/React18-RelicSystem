import React from 'react';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;

const App: React.FC = () => (
    <div style={{margin:'40px auto',padding:'40px',backgroundColor:'#F5F5F5'}}>
        <h2 style={{fontSize:'2em',}}>文物展览</h2>
        <Row gutter={16} style={{padding:'40px 0'}}>
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://www.gdmuseum.com/upload/cn/image/2024-01/1705455655002.jpg" />}
                >
                    <Meta title="元钧窑三足炉" description="" />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://www.gdmuseum.com/upload/cn/image/2024-01/1705455431527.jpg" />}
                >
                    <Meta title="元龙泉葵瓣口碗" description="" />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="	https://www.gdmuseum.com/upload/cn/image/2023-12/1703123445756.jpg" />}
                >
                    <Meta title="明宜兴仿宋钧鼓钉三足洗" description="" />
                </Card>
            </Col>
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://www.gdmuseum.com/upload/cn/image/2024-01/1705455939682.jpg" />}
                >
                    <Meta title="元孔雀绿釉里彩双耳三足炉" description="" />
                </Card>
            </Col>
        </Row>
    </div>
);

export default App;