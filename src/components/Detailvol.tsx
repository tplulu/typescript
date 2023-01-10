import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { vol } from "../types/types";
import axios from "axios";

const Detailvol = () => {
    const userJson = localStorage.getItem("vol_info");
    var defaut_vol : vol = {
        id: 0,
        price: {
            amount: 0
        },
        legs: {
            0: {
                departure: "",
                arrival: "",
                destination: {
                    name: '',
                    display_code: ''
                },
                origin: {
                    name: '',
                    display_code: ''
                }
            },
            1: {
                departure: "",
                arrival: "",
                destination: {
                    name: '',
                    display_code: ''
                },
                origin: {
                    name: '',
                    display_code: ''
                }
            }
        }
    }
    //var defaut_vol : vol = {id: 0,price: { amount: 0 }, legs: {0: {departure: '',arrival: '',destination: {name: '',display_code: '',},origin: {name: '',display_code: '',},}, 1: {departure: '',arrival: '',destination: {name: '',display_code: '',},origin: {name: '',display_code: '',}, }   
    var vol_info = userJson !== null ? JSON.parse(userJson) : defaut_vol;
    //var vol_info: vol = JSON.parse(localStorage.getItem("vol_info") || '{}');
    const [details, setdetails] = useState<vol>()
    
    var date_allez: string=  vol_info.legs[0].departure.substring(0,10)
    var date_retour: string=  vol_info.legs[1].departure.substring(0,10)
    var legs : string = JSON.stringify([{'origin': vol_info.legs[0].origin.display_code, 'destination': vol_info.legs[0].destination.display_code, 'date':date_allez}, {'origin': vol_info.legs[1].origin.display_code, 'destination': vol_info.legs[1].destination.display_code, 'date':date_retour} ])
    console.log(legs)
    const options = {
        method: 'GET',
        url: 'https://skyscanner50.p.rapidapi.com/api/v1/getFlightDetails',
        params: {
            itineraryId: vol_info.id,
            legs: legs,
        },
        headers: {
            'Access-Control-Allow-Origin': "*",
            'X-RapidAPI-Key': 'c2a4b54320msh39c2bd408379f9bp100c21jsnd83fb8c8efcf',
            'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
        
        }
    };
    console.log(options)
    axios.request(options).then(function (response) {
        setdetails(response.data.data)
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    return (
        <>
        {details !== undefined && 
            <div className="row col-sm-11 d-flex justify-content-center " style={{marginTop: 15, border: 'solid', marginLeft: 'auto', marginRight: 'auto', borderColor: 'black', cursor:'pointer'}} key={details.id}>
                <div className="card-title "  >{details.legs[0].destination.name} - {details.legs[0].origin.name} {details.price.amount} €</div>
                <div className="col-sm-5 " > 
                    <div className="card row card-dark-clear" >
                        <div className="card-body card-dark-clear"> 
                            <div className="card-text"> Aller </div>
                            <div className="card-text"> Départ : {details.legs[0].departure.substring(0,10) } {details.legs[0].departure.substring(11) } </div>
                            <div className="card-text"> Arrivé : {details.legs[0].arrival.substring(0,10)} {details.legs[0].arrival.substring(11) }</div>
                        </div>
                    </div>
                </div>
            </div>
        }
        {details === undefined && 
        <div></div>
        }
        </>
    )
}

export default Detailvol