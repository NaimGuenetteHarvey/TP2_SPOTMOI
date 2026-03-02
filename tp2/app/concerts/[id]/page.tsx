"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const api ="AIzaSyALSxbDQjdlATjxRakGYouNr76tZeagIYo"
export default function Concerts() {
const params = useParams<{ id: string }>();
const [artistName, setArtistName] = useState<string>("");
const [event, setEvent] = useState([]);
const center = { lat: -4, lng: -40 };
const zoom = 4;
 useEffect(() => {
        if (  params.id) {
            map();
        }
    }, [params.id]);


const { isLoaded } = useJsApiLoader({
    id : "google-map-script",
    googleMapsApiKey : "AIzaSyALSxbDQjdlATjxRakGYouNr76tZeagIYo"
});



 async function map() {
        
        const response = await axios.get(`https://rest.bandsintown.com/artists/${params.id}/events?app_id=${api}`);
        console.log(response.data);   
        setEvent(response.data);
    }

<main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Concerts de {artistName}</h2>

		<div className="mx-auto w-2xl artist">
			{ isLoaded && 
            <GoogleMap center={center} zoom={zoom} mapContainerStyle={{ width: "700px", height : "400px" }}>{event.map((m, index) => <Marker key={index} position={{lat:parseFloat(m.lat),lng: parseFloat(m.lng)}}></Marker>)}</GoogleMap>}
		</div>
       {event.map((event,index) => (
        <div key={index} className="flex m-3 flex-wrap">
			<div className="basis-1/4">
				<div className="m-1 p-1 artist">
					<h4>{}</h4>
					<div>PAYS</div>
					<div>VILLE</div>
				</div>
			</div>
		</div>))}
		
</main>



}