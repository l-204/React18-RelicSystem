import React from 'react';
import { Carousel } from 'antd';
import imageData from '../../../assets/relics'
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '100vh',
  // color: '#fff',
  lineHeight: '400px',
  textAlign: 'center',
  // background: '#364d79',
  background: `no-repeat center center fixed`,
  backgroundSize: 'cover',
};
const App: React.FC = () => (
  <>
    <Carousel arrows infinite autoplay dots={false}>
    {imageData.map((item, index) => (
      <div key={item.id}>
        <h3 style={{...contentStyle,backgroundImage: `url(${require(`@/assets/relics/${item.name}.png`)})`}}></h3>
        <p style={{textAlign:'center',marginTop:'24px',fontSize:'24px'}}>{item.name}</p>
      </div>
    ))}
    </Carousel>
  </>
);

export default App;