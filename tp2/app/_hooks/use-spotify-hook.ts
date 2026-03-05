import { useEffect } from "react";
import axios from "axios";

const CLIENT_ID = "b58e6ec47b794973ac4757d581963dd7";
const CLIENT_SECRET = "bd1e99b84cce48de86d6a4e921cda2ad";

export function useSpotifyConnect(){

    useEffect(() => {
        connect();
    }, []);

    async function connect(){

        const response = await axios.post("https://accounts.spotify.com/api/token",
            new URLSearchParams({ grant_type: "client_credentials" }),
            {headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
                }
            }
        );

        console.log(response.data);
        localStorage.setItem("token", response.data.access_token);
    }
}