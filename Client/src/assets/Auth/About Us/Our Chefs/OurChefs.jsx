import React, { useState } from "react";
import "./OurChefs.css";

function OurChefs() {
  const [ChefsData, SetChefsData] = useState([
    {
      name: "Walter White",
      about:
        "Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut. Ipsum exercitationem iure minima enim corporis et voluptate.",
      degree: "Master Chef",
      img: require("../../../imgs/chefs/chefs-1.jpg"),
    },
    {
      name: "Sarah Jhonson",
      about:
        "Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis. Voluptate sed quas reiciendis animi neque sapiente.",
      degree: "Patissier",
      img: require("../../../imgs/chefs/chefs-2.jpg"),
    },
    {
      name: "William Anderson",
      about:
        "Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt. Voluptates enim aut architecto porro aspernatur molestiae modi.",
      degree: "Cook",
      img: require("../../../imgs/chefs/chefs-3.jpg"),
    },
  ]);
  return (
    <React.Fragment>
      <div className="OurChefs">
        <div className="container" data-aos="fade-up">
          <div className="head">
            <p>Chefs</p>
            <h1>Our Proffesional Chefs</h1>
          </div>
          <div className="content">
            {ChefsData.map((Chef) => (
              <div className="card">
                <div className="Chef-img">
                  <img src={Chef.img} alt={Chef.name} />
                </div>
                <div className="info">
                  <h3>{Chef.name}</h3>
                  <p>{Chef.degree}</p>
                  <span>{Chef.about}</span>
                </div>
                <div className="social">
                  <a href="">
                    <i className="fa-brands fa-twitter" />
                  </a>
                  <a href="">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OurChefs;
