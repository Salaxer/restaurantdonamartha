import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/menuFood.css';

const MenuFood = () => {
  return (
      <>
        <div className="grid_Menu">
          <h1 className="general_title_little_menu">Lo mas destacado en el restaurante</h1>
          <div className="target_food">
              <h1>Mas pedido</h1>
              <p>Mojarra frita</p>
              <Link to="./hi" className="container_image_little">
                <img src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="mojarra frita" srcset="" />
              </Link>
          </div>
          <div className="target_food">
              <h1>Mejor valorado</h1>
              <p>Mojarra frita</p>
              <Link to="./hi" className="container_image_little">
                <img src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="mojarra frita" srcset="" />
              </Link>
          </div>
          <div className="target_food">
              <h1>Recomendado</h1>
              <p>Mojarra frita</p>
              <Link to="./hi" className="container_image_little">
                <img src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="mojarra frita" srcset="" />
              </Link>
          </div>
          <div className="target_food">
              <h1>Nose</h1>
              <p>Mojarra frita</p>
              <Link to="./hi" className="container_image_little">
                <img src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="mojarra frita" srcset="" />
              </Link>
          </div>
          <div className="link_all_menu target_food">
              <Link to="./hi">
                <h1>View all Menu</h1>
              </Link>
          </div>
        </div>
      </>
  );
};

export default MenuFood;