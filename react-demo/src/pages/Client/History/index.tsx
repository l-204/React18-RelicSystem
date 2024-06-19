import Layout from '../../../layout/Client/layout'
import imageData from '../../../assets/relics'

const History = () => {
  const Container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    width:'50%',
    margin:'auto',
    padding:'0 10px',
    fontSize:'1.5em',
    textIndent:'2em',
    fontFamily:'KaiTi',
  }
  return (
    <Layout>
      <div>
      {imageData.map((item, index) => (
          <div key={index} style={{display:'flex'}}>
            {item.id % 2 === 1 ? (
              <>
                <div style={Container}>
                  <p>{item.brief}</p>
                </div>
                <div style={Container}>
                  <img src={require(`@/assets/relics/${item.name}.png`)} alt={item.name} />
                </div>
              </>
            ) : (
              <>
                <div style={Container}>
                  <img src={require(`@/assets/relics/${item.name}.png`)} alt={item.name} />
                </div>
                <div style={Container}>
                  <p>{item.brief}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Layout>
  )
};

export default History;
