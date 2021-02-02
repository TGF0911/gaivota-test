import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import '../../styles/details.css'


const Details = () => {
  const { id } = useParams();
  const [farm, setFarm] = useState({});



  async function getFarm() {
    const farm = await fetch(`http://localhost:5000/farms/${id}`); 
    console.log('fazenda encontrada: ', farm);
    setFarm(farm);
  }

  useEffect(() => {
    getFarm();
  }, []);


  return (
    <div id="details-container">
      <header>
        <span>Farm: {farm.name}</span>
        <Link className="button" to="/">LOGIN</Link>
      </header>

      <aside>

        <MapContainer
          center={position}
          zoom={5.2}
          style={{
            width: '30%',
            height: '40%',
          }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker>

          <GeoJSON
            attribution='Fazenda Colombia'
            data={data_221.features}
            onEachFeature={onEachFarm}
          />
          <GeoJSON
            attribution='Fazenda Barretos'
            data={data_231.features}
            onEachFeature={onEachFarm}
          />
          <GeoJSON
            attribution='Fazenda Taubate'
            data={data_271.features}
            onEachFeature={onEachFarm}
          />
        </MapContainer>

      </aside>

      <main>

        <div className="infos">

          <ul>
            <li>
              <strong>Name:</strong>
              <p>{farm.name}</p>

              <strong>Culture:</strong>
              <p>{farm.culture}</p>

              <strong>Variety:</strong>
              <p>{farm.variety}</p>

              <strong>Area:</strong>
              <p>{farm.total_area}</p>

              <strong>Yield Estimation:</strong>
              <p>{farm.yield_estimation}</p>

              <strong>Total:</strong>
              <p>{farm.total_area * farm.yield_estimation}</p>

              <strong>Price:</strong>
              <p>{farm.price}</p>
            </li>
          </ul>
        </div>

        <Link to="/offer" >Buy Now</Link>
        <Link to="/offer" >Bid</Link>
      </main>

    </div>
  );
};

export default Details;