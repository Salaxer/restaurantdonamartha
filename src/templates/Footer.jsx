import React from 'react';
import Find_us from '../components/Find_us';
import '../assets/styles/footer.css';

const Footer = () => {
  return (
    <div className="Footer">
      <div className="contact_us">
        <div className="tel">Contactanos al <a href="tel:+52777g5073272"> 7775073272</a></div>
        <div>
          O bien envianos un mensaje por whatsapp:
        </div>
        <div className="social">
          Siguenos en nuestras redes sociales:
          <br />
          <a href="https://www.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
          <a href="http://" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
          <a href="http://" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="hours">
        Business Hours
        Mon:	10:05 AM – 8:00 PM
        Tue:	10:05 AM – 8:10 PM
        Wed:	10:05 AM – 8:10 PM
        Thu:	10:05 AM – 8:10 PM
        Fri:	10:05 AM – 8:10 PM
        Sat:	10:05 AM – 8:10 PM
        Sun:	10:05 AM – 8:10 PM
      </div>
      <Find_us></Find_us>
    </div>
  );
};

export default Footer;
