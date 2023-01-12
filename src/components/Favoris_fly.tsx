import { useState } from "react";
import { vol } from "../types/types";
import { useNavigate } from "react-router-dom";
const Favoris = () => {
    const [vols, setvols] = useState<vol[]>([])
    const favoris:vol[] = JSON.parse(localStorage.getItem("favoris") || "[]");
    //setvols(favoris)
    const navigate = useNavigate();

    const handleChange3 = (vols:vol) =>{
        localStorage.setItem("vol_info", JSON.stringify(vols))
        console.log(vols)
        navigate('detail');
    }
    return (
        <>
            <div className="col-sm-12"> 
            {   vols!==undefined &&
                vols.map(vols => {
                    return (
                        <div onClick={() => handleChange3(vols)} className="row col-sm-11 d-flex justify-content-center " style={{marginTop: 15, border: 'solid', marginLeft: 'auto', marginRight: 'auto', borderColor: 'black', cursor:'pointer'}} key={vols.id}>
                            <div className="card-title "  >{vols.legs[0].destination.name} - {vols.legs[0].origin.name} {vols.price.amount} €</div>
                            <div className="col-sm-5 row" > 
                                <div className="card row card-dark-clear" >
                                    <div className="col-sm card-dark-clear"> 
                                        <div className="card-text"> Aller </div>
                                        <div className="card-text"> Départ : {vols.legs[0].departure.substring(0,10) } {vols.legs[0].departure.substring(11) } </div>
                                        <div className="card-text"> Arrivé : {vols.legs[0].arrival.substring(0,10)} {vols.legs[0].arrival.substring(11) }</div>
                                    </div>
                                </div>
                                <div className="card row card-dark-clear" >
                                    <div className="col-sm card-dark-clear"> 
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
            {vols === undefined && 
                <div> aucun vol n'a été ajouté dans les favoris </div>
            }
            </div>
        </>
      );
}

export default Favoris;