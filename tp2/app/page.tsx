"use client";
import Image from "next/image";
import axios from "axios";
import {useState } from "react";
import {Artist} from "./_types/artiste"



export default function Home() {
  const [spotifyToken, setSpotifyToken] = useState(""); // Utilisé pour stocker le token
  const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
  const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";
  const [artistName, setArtistName] = useState<string>("")
  const [artistInput, setArtistInput] = useState("");



  async function connect(){

  // Attention ! Pour une fois, on utilise une requête POST
  const response = await axios.post("https://accounts.spotify.com/api/token", 
    // On joint un contenu (body) à la requête
    new URLSearchParams({ grant_type : "client_credentials" }), {
    // On joint des en-têtes (headers) à la requête
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded",
      "Authorization" : "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
    }});
  console.log(response.data);

  // response.data.access_token contient le token qu'on voulait obtenir !
  setSpotifyToken(response.data.access_token);

}
async function getArtist(artistName : string){

  const response = await axios.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, {
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded",
      "Authorization" : "Bearer " + spotifyToken
    }
  });
  console.log(response.data);

  return new Artist(response.data.artists.items[0].id, response.data.artists.items[0].name, response.data.artists.items[0].images[0].url);

}
  
  return (

   
		<div className="flex">
			<div className="flex-1 p-3">
				<h3 className="text-xl font-bold">Ajouter un artiste</h3>
				<input value={artistInput} onChange={(e) => setArtistInput(e.target.value)} type="text"placeholder="Nana Mouskouri" className="lightInput my-2"/>
				<button type="button" className="lightButton" onClick={() => getArtist(artistName)}>Rechercher</button>
			</div>
			<div className="flex-3 p-3 text-center">
				<h2 className="text-2xl font-bold">Vos artistes</h2>
				<div className="flex flex-wrap mt-2">
					<div className="basis-1/3">
						<div className="m-1 p-1 artist">
              
							<h4>{artistName}</h4>
            
							<img src="/images/bust.png" alt={artistName} />
							<a><button className="lightButton mt-1 mr-1">Concerts</button></a>
							<a><button className="lightButton mt-1">Albums</button></a>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-2">
					<button className="lightButton">Vider les favoris</button>
				</div>
			</div>
		</div>
  );
}
