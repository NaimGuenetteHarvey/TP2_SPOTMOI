"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

 const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
 const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";
export default function Chanson() {
const params = useParams<{ id : string }>();
const [token, setToken] = useState<string>("");
 const [chansonName, setChansonName] = useState("");
 useEffect(() => {
    connect();
}, []);

useEffect(() => {
    if (token && params.id) {
        getSongs(token);
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
async function getSongs(albumId : string){

    const response = await axios.get("http://localhost:5143/api/Songs/GetSongs/" + albumId, {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
        }
    });
    console.log(response.data);

    let songs : string[] = [];
    for(let s of response.data) songs.push(s.name);

    return songs;

}
 return (
		<div className="flex">
			<h2 className="text-center text-2xl py-1">Chansons de {chansonName}</h2>
		<div className="flex m-2 flex-wrap">
			<div className="basis-1/5">
				<div className="m-1 text-center p-1 artist">
					<h4>{chansonName}</h4>
					<a><button className="lightButton form-control mt-1">Écouter</button></a>
				</div>
			</div>
		</div>
		<div className="flex justify-center">
			<img src="images/video.png" alt="Vidéo youtube" />
		</div>
        </div>
  );

}