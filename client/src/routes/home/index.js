import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import Leaflet from 'leaflet';
import data_221 from '../../data/farm_221.json';
import data_231 from '../../data/farm_231.json';
import data_271 from '../../data/farm_271.json';
import '../../styles/home.css';

// import { logout } from "../../auth";

const Home = () => {

  // TODO: use logout when user logged in.
  const [farms, setFarms] = useState({});

  const position = [-23.6824124, -46.5952992];

  const changeFarmColor = (event) => {
    event.target.setStyle({
      color: 'green',
      fillOpacity: 0.4,
    });
  };

  const onEachFarm = (farm, layer) => {
    const farmName = farm.properties.g_name;
    const farmId = farm.properties.field_id;
    layer.bindPopup(`<a href="/app/details/${farmId}">${farmName}</div>`);

    layer.on({
      click: changeFarmColor,
    });
  };

  async function getFarm(e) {
    const farms = await fetch(`http://localhost:5000/farms/`);
    console.log('fazenda encontradas: ', farms);
    setFarms(farms);
  }

  useEffect(() => {
    getFarm();
  })

  return (
    <div id='page-map'>
      <header>
        <Link className="button" to="/">LOGIN</Link>
      </header>


      <MapContainer
        center={position}
        zoom={9}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
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


      <div className="infos">
        <h2>Farms</h2>
        <ul>

          {farms.map(f => (
              <li key={f.id} >
                <strong>Name:</strong>
                <p>{f.name}</p>

                <strong>Culture:</strong>
                <p>{f.culture}</p>

                <strong>Variety:</strong>
                <p>{f.variety}</p>

                <strong>Area:</strong>
                <p>{f.total_area}</p>

                <strong>Yield Estimation:</strong>
                <p>{f.yield_estimation}</p>

                <strong>Total:</strong>
                <p>{f.total_area * f.yield_estimation}</p>

                <strong>Price:</strong>
                <p>{f.price}</p>


            <Link to="/app/offer" >Buy Now</Link>
            <Link to="/app/offer" >Bid</Link>
              </li>
            ))}
        </ul>
      </div>


    </div>
  );
};
export default Home;
