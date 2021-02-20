import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from '@material-ui/icons/Favorite';

const Planet_list = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    fetch(`https://assignment-machstatz.herokuapp.com/planet`)
      .then((response) => response.json())
      .then((data) => setPlanets(data));
  }, []);

  console.log(planets)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleFavourite = (favourite,index) => {
      const allPlanets = [...planets]
      allPlanets[index].isFavourite = Boolean(!favourite)
      setPlanets(allPlanets)
  }

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="All_Planet" />
          <Tab  icon={<FavoriteIcon />} />
        </Tabs>
      </Paper>
      {value === 0 && (
        <Paper elevation={5} className="list">
          {planets.map((planet,index) => (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin:16, height:24 }} key={planet.id}>
              <span>{planet.name}</span>
              <input
                style={{position:'relative',top:3}}
                type="checkbox"
                checked={planet.isFavourite}
                onChange={() => handleFavourite(planet.isFavourite,index)}
              />
            </div>
          ))}
        </Paper>
      )}
      {value === 1 && (
        <Paper elevation={5}>
          {planets.filter(p => p.isFavourite === true).map((planet,index) => (
            <div key={planet.id} style={{display:"flex", justifyContent:"center", alignItems:"center", margin:16, height:24 }}>
              <p>{planet.name}</p>
              <input
                style={{position:'relative',top:3}}
                type="checkbox"
                checked={planet.isFavourite}
                onChange={() => handleFavourite(planet.isFavourite,index)}
              />
            </div>
          ))}
          {/* <ul>
              {planets.filter(p => p.isFavourite === true).map((planet,index) => (
                <div key={planet.id}>
                    <li>{planet.name}</li>
                    <input type="checkbox" checked={planet.isFavourite} onChange={() => handleFavourite(planet.isFavourite,index)} />
                </div>  
              ))}
          </ul> */}
        </Paper>
      )}
    </div>
  );
};

export default Planet_list;
