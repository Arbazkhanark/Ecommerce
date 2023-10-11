import Deal from "./Deals/Deal";
import Accessories from "./home Accessories/Accessories";
import "./home.css";
const Home = () => {
  return (
<div className="home-container">
  <div className="hero-section" style={{position: 'relative'}}>
    <video src="/DBZ.mp4" autoPlay loop muted playsInline width={"100%"} style={{objectFit: 'cover', zIndex: '-4'}} />

    <div style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.7)'}}></div>
    <h1 className=" font-mono absolute left-20 top-20 text-4xl font-bold text-gray-50 text-center" style={{fontFamily:"Cormorant"}}>Unleash Your Fashion Vibes <br/> With <br/> Otaku<span className="text-red-600">Arc</span></h1>

  </div>
    <button className="explorebtn absolute right-40 bottom-60"><span className=" text-red-600">Explore</span> Now</button>
    <Accessories />  
    <Deal />
</div>

  )
}

export default Home