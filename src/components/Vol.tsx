import React, { useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vol} from "../types/types";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Vol = () => {
    const [origin, setorigin] = useState<string>("")
    const [destination, setdestination] = useState<string>("")
    const [startDate, setStartDate] = useState(new Date());
    const [backDate, setbackDate] = useState(new Date());
    const [vols, setvols] = useState<vol[]>([])
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setorigin(e.target.value)
    }

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setdestination(e.target.value)
    }

    const handleChange3 = (vols:vol) =>{
        localStorage.setItem("vol_info", JSON.stringify(vols))
        console.log(vols)
        navigate('detail');
    }
    
    const getfly = async (e: React.FormEvent<HTMLFormElement>) => {
        var depard_month = startDate.getUTCMonth() + 1; //months from 1-12
        var depard_day = startDate.getUTCDate();
        var depard_year = startDate.getUTCFullYear();

        var retour_month = backDate.getUTCMonth() + 1; //months from 1-12
        var retour_day = backDate.getUTCDate();
        var retour_year = backDate.getUTCFullYear();
        if (depard_month<10) {
            var depard_month_val = "0"+depard_month
        }
        else {
            var depard_month_val = depard_month.toString()
        }
        if (retour_month<10) {
            var retour_month_val = "0"+retour_month
        }
        else {
            var retour_month_val = retour_month.toString()
        }

        if (depard_day<10) {
            var depard_day_val = "0"+depard_day
        }
        else {
            var depard_day_val = depard_day.toString()
        }
        if (retour_day<10) {
            var retour_day_val = "0"+retour_day
        }
        else {
            var retour_day_val = retour_month.toString()
        }


        var depard_date = depard_year + "-" + depard_month_val + "-" + depard_day_val;
        var retour_date = retour_year + "-" + retour_month_val + "-" + retour_day_val;
        e.preventDefault();
        console.log(depard_date)
        console.log(retour_date)
        const options = {
            method: 'GET',
            url: 'https://skyscanner50.p.rapidapi.com/api/v1/searchFlights',
            params: {
                origin: origin,
                destination: destination,
                date: 'depard_date',
                returnDate: retour_date,
            },
            headers: {
              'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
              'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com',
              'Access-Control-Allow-Origin': "*",
              'Access-Control-Allow-Credentials': "*",
              'Access-Control-Allow-Methods': "*",
            }
          };
          
          axios.request(options).then(function (response) {
                console.log(response.data);
                setvols(response.data.data)
          }).catch(function (error) {
              console.error(error);
          });
        
      }
    return (
        <>
        <form onSubmit={ getfly  }>
                <div className="col-12">
                <div className="row">
                    <div className="col-sm-6">
                        Départ
                    </div>
                    <div className="col-sm-6">
                        Arriver
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <input type="text" onChange={handleChange} value={origin} />
                    </div>
                    <div className="col-sm-6">
                        <input type="text" onChange={handleChange2} value={destination} />
                    </div>
                </div>


                <div className="row">
                    <div className="col-sm-6">
                        date aller  
                    </div>
                    <div className="col-sm-6">
                        date retour
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
                    </div>
                    <div className="col-sm-6">
                        <DatePicker selected={backDate} onChange={(date:Date) => setbackDate(date)} />
                    </div>
                </div>
                <input type="submit" value='envoyer' className="btn btn-primary" />
                </div>
            </form>
            <div className="col-sm-12"> 
            {   vols!==undefined &&
                vols.map(vols => {
                    return ( //<Link to="/detail" className= "nav-link" key={vols.id}>
                        <div onClick={() => handleChange3(vols)} className="row col-sm-11 d-flex justify-content-center " style={{marginTop: 15, border: 'solid', marginLeft: 'auto', marginRight: 'auto', borderColor: 'black', cursor:'pointer'}} key={vols.id}>
                            <div className="card-title "  >{vols.legs[0].destination.name} - {vols.legs[0].origin.name} {vols.price.amount} €</div>
                            <div className="col-sm-5 " > 
                                <div className="card row card-dark-clear" >
                                    <div className="card-body card-dark-clear"> 
                                        <div className="card-text"> Aller </div>
                                        <div className="card-text"> Départ : {vols.legs[0].departure.substring(0,10) } {vols.legs[0].departure.substring(11) } </div>
                                        <div className="card-text"> Arrivé : {vols.legs[0].arrival.substring(0,10)} {vols.legs[0].arrival.substring(11) }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5 " > 
                                <div className="card row card-dark-clear" >
                                    <div className="card-body card-dark-clear"> 
                                    <div className="card-text"> Retour </div>
                                        <div className="card-text"> Départ : {vols.legs[0].departure.substring(0,10)} {vols.legs[0].departure.substring(11)}</div>
                                        <div className="card-text"> Arrivé : {vols.legs[0].arrival.substring(0,10)}  {vols.legs[0].arrival.substring(11)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        //</Link>
                     )
                })
            }
            </div>
        </>
      );
}
export default Vol;


