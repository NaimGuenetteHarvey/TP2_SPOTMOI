"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Album } from "@/app/_types/album";

 const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
 const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";

export default function Albums() {
 const params = useParams<{ id : string }>();
 const [albumName, setAlbumName] = useState<Album[]>([]);
 const [artisteName, setArtisteName] = useState("");
 const [token, setToken] = useState<string>("");
  
useEffect(() => {
    connect();
}, []);

useEffect(() => {
    if (token && params.id) {
        getAlbums(token);
    }
}, [token, params.id]);
	
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
 async function getAlbums(token : string){

     const response = await axios.get('https://api.spotify.com/v1/artists/' + params.id + '/albums?include_groups=album,single', {
       headers : {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Bearer " + token}});
  console.log(response.data);
  
  let albums : Album[] = [];
  for(let i = 0; i < response.data.items.length; i++){
    albums.push(new Album(response.data.items[i].id, response.data.items[i].name, response.data.items[i].images[0].url));
	 setArtisteName(response.data.items[i].artists[0].name);
  }
 
   setAlbumName(albums);

}
  return (
		<div className="flex">
			<h2 className="text-center text-2xl py-1">Albums de {artisteName}</h2>
		<div className="flex text-center m-3 flex-wrap">
			<div className="basis-1/4">
			{albumName.map((a) => (
				<div key={a.name} className="m-1 text-center p-1 artist">
					<h4>{a.name}</h4>
					<img src={a.image} alt={a.name} />
					<a><button className="lightButton mt-1">Chansons</button></a>
				</div>
				))}
			</div>
		</div>
		</div>
  );
}
