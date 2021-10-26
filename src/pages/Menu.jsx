import React from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import '../assets/styles/MainMenuFood.css';

const Checkout = () => {
  return  (
    <div>
      <Welcome images={images_carousel}/>
      <div className="MenuFoodMain" id="MenuFoodMain">
        <div className="ContainerAllFood">
          <div className="searchFood"> 
            <h1 className="titleFood">Carta</h1>
            <div className="formFood">
              <select className="selectFood" name="" id="">
                <option value="food">Todo</option>
                <option value="food">Comida</option>
                <option value="Drink">bebidas</option>
              </select>
              <input type="search" name="inputfoodSearch" placeholder="Buscar" className="inputfoodSearch" id="" />
              <select className="sortFood" name="" id="">
                <option value="food">Menor precio a mayor</option>
                <option value="Drink">Mayor precio a menor</option>
                <option value="Drink">Mayor pedido</option>
                {/* <option value="Drink">Mejor valorado</option> */}
                <option value="Drink">Recomendados</option>
              </select>
            </div>
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
          <div className="slideFood">
              <div className="FoodDetails">
                <h1 className="titleFood">Mojarra Frita</h1>
                <p className="priceFood">price <span>$90</span></p>
                <div>
                  <div>⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <img className="slideFood__img" src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="Mojarron" srcSet="" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Checkout;
