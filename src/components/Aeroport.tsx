import React, { useState} from "react";
import axios from "axios";
import {aeroport} from "../types/types";
const Aeroport = () => {
const [search, setSearch] = useState<string>("")
const [aeroports, setAeroports] = useState<aeroport[]>([])
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
}

const getAero = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const options = {
        method: 'GET',
        url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchAirport',
        params: {query: search},
        headers: {
          'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
          'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
            console.log(response.data);
            setAeroports(response.data.data)
      }).catch(function (error) {
          console.error(error);
      });
    console.log(aeroports)
    
    setSearch("")
  }

  
    return ( 
       <div>
            <h1>Recherche des Aéroports</h1>
            <form onSubmit={ getAero  }>
                <input type="text" onChange={handleChange} value={search} />
                <input type="submit" value='envoyer' className="btn btn-primary" />
                
            </form>
            
            <div>
            {   aeroports.length > 0 &&
                aeroports.map(aeroport => {
                    return (
                        <div key={aeroport.PlaceId}>
                        <h2>{aeroport.PlaceId} - {aeroport.PlaceName}</h2>
                        </div>
                     )
                })
            }
            </div>
       </div>
    )
}
 
export default Aeroport;