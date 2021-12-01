import React from 'react';
import '../assets/styles/footer.css';
import FindUs from '../components/Find_us';

const Footer = () => {
  return (
    <div className="Footer" id="Footer">
      <div className="contact_us">
        <div className="tel">Contactanos al <a aria-label="Numero de celular para contactarnos" href="tel:+52777g5073272"> 7775073272</a></div>
        <div>
          O bien envianos un mensaje por whatsapp:
        </div>
        <div className="social">
          Siguenos en nuestras redes sociales:
          <br />
          <a aria-label="Facebook del restaurante" href="https://www.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a aria-label="Twiter del restaurante" href="http://" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          <a aria-label="Instagram del restaurante" href="http://" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
      <div className="hours">
        <div className="directions">
          <h3>dirección</h3>
          <p>
          Carretera zapata-zacatepec
          Zapata - Zacatepec 17
          San Pedro de los Pinos
          62790 Atlacholoaya, Mor.
          Mexico
          </p>
        </div>
        <table>
          <caption><h3>Horarios de apertura</h3></caption>
          <tbody>
            <tr>
              <td>Mon:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Tue:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Wed:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Thu:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Fri:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Sat:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
            <tr>
              <td>Sun:</td>
              <th>10:05 AM</th>
              <th>–</th>
              <th>8:00 PM</th>
            </tr>
          </tbody>
        </table>
      </div>
      <FindUs></FindUs>
    </div>
  );
};

export default Footer;
