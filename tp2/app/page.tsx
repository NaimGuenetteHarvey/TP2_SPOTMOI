"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {Artist} from "./_types/artiste"
import{Album} from "./_types/album"
import Link from "next/link";

 const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
 const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";

export default function Home() {
  const [token, setToken] = useState(""); 
  const [artistName, setArtistName] = useState<string>("");
  const [artist, setArtist] = useState<Artist[]>([]);
   useEffect(() => {

        connect();
        const JSONArtiste : string | null = sessionStorage.getItem("artiste");
        if (JSONArtiste) setArtist(JSON.parse(JSONArtiste));


    }, []);
    async function connect() {
        const response = await axios.post("https://accounts.spotify.com/api/token",
            new URLSearchParams({ grant_type: "client_credentials" }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
            }
        });
        console.log(response.data);
        setToken(response.data.access_token);

    }
 async function getArtist() {

        const response = await axios.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + token
            }
        });
        console.log(response.data);
        const newArtist = new Artist(response.data.artists.items[0].id,response.data.artists.items[0].name,response.data.artists.items[0].images[0].url);
        setArtist((artiste) => [...artiste, newArtist]);
        sessionStorage.setItem("artiste",JSON.stringify([...artist,newArtist]))

    }
    async function getAlbums(artistId : string){
    
         const response = await axios.get("https://api.spotify.com/v1/artists/" + artistId + "/albums?include_groups=album,single", {
           headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            "Authorization" : "Bearer " + token}});
      console.log(response.data);
      
      let albums : Album[] = [];
      for(let i = 0; i < response.data.items.length; i++){
        albums.push(new Album(response.data.items[i].id, response.data.items[i].name, response.data.items[i].images[0].url));
      }
       return albums;
    
    }
    function clearArtists() {
      setArtist([]);
    sessionStorage.removeItem("artiste");
  }
      
  
  return (
		<div className="flex">
			<div className="flex-1 p-3">
				<h3 className="text-xl font-bold">Ajouter un artiste</h3>
				<input value={artistName} onChange={(e) => setArtistName(e.target.value)} type="text"placeholder="Nana Mouskouri" className="lightInput my-2"/>
				<button type="button" className="lightButton" onClick={ getArtist}>Rechercher</button>
			</div>
			<div className="flex-3 p-3 text-center">
				<h2 className="text-2xl font-bold">Vos artistes</h2>
				<div className="flex flex-wrap mt-2">
          	{artist.map((a,index) => (
					<div key={index} className="basis-1/3">
						  
                <div  className="m-1 p-1 artist">
                   <h4>{a.name}</h4>
                   <img src={a.imageUrl} alt={a.name} />
                    <a href={`/concert/${a.id}`}><button className="lightButton mt-1 mr-1">Concerts</button></a>
                    <a href={`/album/${a.id}`}> <button onClick={() => getAlbums(a.id)}  className="lightButton mt-1">Albums</button></a></div>
						</div>
				
           ))}
				</div>
        
				<div className="flex justify-center mt-2">
					<button onClick={clearArtists} className="lightButton">Vider les favoris</button>
				</div>
			</div>
		</div>
  );
}
