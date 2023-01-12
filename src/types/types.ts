export interface aeroport {
    PlaceId : string;
    PlaceName : string;
    CityName : string;
    CountryName : string;
}

export interface vol {
    id : number;
    price : {
        amount : number;
    };
    legs : {
        0: {
            departure: string;
            arrival: string;
            destination : {
                name : String
                display_code : String
            }
            origin : {
                name : String
                display_code : String
            }
        };
        1: {
            departure: string;
            arrival: string;
            destination : {
                name : String
                display_code : String
            }
            origin : {
                name : String
                display_code : String
            }
        }
    }
}

export interface vol_detail {
    id : number;
    price : {
        amount : number;
    };
    legs : {
        0: {
            departure: string;
            arrival: string;
            destination : {
                name : String
                display_code : String
            }
            origin : {
                name : String
                display_code : String
            }
        };
        1: {
            departure: string;
            arrival: string;
            destination : {
                name : String
                display_code : String
            }
            origin : {
                name : String
                display_code : String
            }
        }
    }
    pricingOptions : {
        0: {
            totalPrice: number;
        }
        1: {
            totalPrice: number;
        }
    }
}