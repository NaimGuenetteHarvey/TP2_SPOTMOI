"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { show } from "@/app/_types/show";
const api ="2b32475766802ac01eefda45e9e42ea0"

export default function Concerts() {
const params = useParams<{name: string }>();
const [event, setEvent] = useState<show[]>([]);
const center = { lat: -4, lng: -40 };
const zoom = 4;
 useEffect(() => {
    map()
},[]);

const { isLoaded } = useJsApiLoader({
    id : "google-map-script",
    googleMapsApiKey : "AIzaSyC-ICUIKLPmZJHyGmN7whyt5Bs3H7mSBSk"
});

 async function map() {
        
        const response = await axios.get("https://rest.bandsintown.com/artists/"+params.name+"/events?app_id="+api)
         console.log(response.data);
         let shows : show[]=[];
         for (let i =0 ; i< response.data.length;i++)
         {
            shows.push(new show(response.data[i].venue.latitude, response.data[i].venue.longitude, response.data[i].datetime, response.data[i].venue.country, response.data[i].venue.city))
         }
         setEvent(shows);       
       }
return(
    <main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Concerts de {params.name}</h2>

		<div className="mx-auto w-2xl artist">
			{ isLoaded && 
            <GoogleMap center={center} zoom={zoom} mapContainerStyle={{ width: "700px", height : "400px" }}>{event.map((m, index) => <Marker key={index} position={{lat:parseFloat(m.latitude),lng: parseFloat(m.longitude)}}></Marker>)}</GoogleMap>}
		</div>
       
        <div  className="flex m-3 flex-wrap">
            {event.map((m,index) => 
			<div key={index} className="basis-1/4">
				<div className="m-1 p-1 artist">
					<h4>{m.Date}</h4>
					<div>{m.pays}</div>
					<div>{m.ville}</div>
				</div>
			</div>)}
		</div>
    </main>
    )
}