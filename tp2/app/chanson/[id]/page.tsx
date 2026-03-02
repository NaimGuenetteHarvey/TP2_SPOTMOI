"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";
export default function Chanson() {
const params = useParams<{ id : string }>();
const [token, setToken] = useState<string>("");
const [albumName, setAlbumName] = useState<string>("");
const [songs, setSongs] = useState<string[]>([]);
 useEffect(() => {
    connect();
}, []);

useEffect(() => {
    if (token && params.id) {
        getSongs();
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

async function getSongs(){

    const response = await axios.get("https://api.spotify.com/v1/albums/" + params.id, {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
        }
    });
    console.log(response.data);
  let songs : string[] = [];
  for(let i = 0; i < response.data.tracks.items.length; i++){
    songs.push(response.data.tracks.items[i].name);
    setAlbumName(response.data.name)
  }
  setSongs(songs)

}

 return (
		<main className="w-5xl mx-auto my-4">
			<h2 className="text-center text-2xl py-1">Chansons de {albumName}</h2>
		<div className="flex m-2 flex-wrap">
            {songs.map((name,index) => (
			<div key={index} className="basis-1/5">
				<div className="m-1 text-center p-1 artist">
					<h4>{name}</h4>
					<a><button className="lightButton form-control mt-1">Écouter</button></a>
				</div>
			</div>
            ))}
		</div>
		<div className="flex justify-center">
			<img src="images/video.png" alt="Vidéo youtube" />
		</div>
       </main>
  );

}