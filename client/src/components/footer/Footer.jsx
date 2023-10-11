import { useEffect,useState } from "react"
import "./footer.css"
const Footer = () => {

  const [year,setYear]=useState(0);


  useEffect(()=>{
    const date=new Date().getFullYear();
    setYear(date);
  },[])

  return (
    <div className="footer-container bg-gray-100">
      <div className="footer-content">
        <div className="left">
          <div className="company">
            <img src="/Mainlogo.png" alt="logo" />
          </div>
        </div>

        <div className="right">
          <div>
            <p className="footer-head">About</p>
            <div>
              <a href="/">Blog</a>
            </div>
            <div>
              <a href="/">All Details</a>
            </div>
          </div>
          <div>
            <p className="footer-head">Follow Us</p>
            <div>
              <a href="/">Facebook</a>
            </div>
            <div>
              <a href="/">Twitter</a>
            </div>
            <div>
              <a href="/">Instagram</a>
            </div>
            <div>
              <a href="/">YouTube</a>
            </div>
          </div>
          <div>
            <p className="footer-head">Legal</p>
            <div>
              <a href="/">Privacy Policy</a>
            </div>
            <div>
              <a href="/">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="footer-bottom">

        <div className="copyright">
          <p>© {year} <span style={{fontSize:"large",fontWeight:"500"}}>OtakuArc</span></p>
        </div>

          <div className="social-icons">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-discord"></i>
        </div>
      </div>
    </div>
  )
}

export default Footer
