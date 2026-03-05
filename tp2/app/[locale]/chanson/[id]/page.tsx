"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";
const ApiKey = "AIzaSyC-ICUIKLPmZJHyGmN7whyt5Bs3H7mSBSk";
export default function Chanson() {
    const params = useParams<{ id : string }>();
    const [token, setToken] = useState<string>("");
    const [albumName, setAlbumName] = useState<string>("");
    const [songs, setSongs] = useState<string[]>([]);
    const t = useTranslations('chanson');
    const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
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

    async function getSongs() {

        const response = await axios.get("https://api.spotify.com/v1/albums/" + params.id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token // 🔑 Votre token de connexion
            }
        });
        console.log(response.data);
        let songs: string[] = [];
        for (let i = 0; i < response.data.tracks.items.length; i++) {
            songs.push(response.data.tracks.items[i].name);
            setAlbumName(response.data.name)
            //setSongName()
        }
        setSongs(songs)

    }

    async function searchVideo(song:string) {
        
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${ApiKey}&q=${song}+${albumName}`);
        console.log(response.data);

        setVideoUrl("https://www.youtube.com/embed/" + response.data.items[0].id.videoId);
    }

    return (
        <main className="w-5xl mx-auto my-4">
            <h2 className="text-center text-2xl py-1">{t("title", { album: albumName })}</h2>
            <div className="flex m-2 flex-wrap">
                {songs.map((name, index) => (
                    <div key={index} className="basis-1/5">
                        <div className="m-1 text-center p-1 artist">
                            <h4>{name}</h4>
                            <button onClick={() => searchVideo(name)} className="lightButton form-control mt-1"> {t("listen")}</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                 <iframe width="560" height="315" src={videoUrl} title="YouTube video player" 
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                 referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>

        </main>
    );

}