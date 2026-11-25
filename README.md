# Earthquake Watch

A web app that shows live earthquakes from the last 24 hours on a world map and in a list. You can search by place and filter by magnitude. It helps people quickly see where strong earthquakes are happening.

## Features
- Live data from the USGS Earthquake API
- Map with circles (bigger circle = stronger earthquake)
- Search by place name
- Filter by minimum magnitude
- Error message if the API is down or fails

## APIs and credits
- [USGS Earthquake Hazards Program API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) for earthquake data (no API key needed)
- [Leaflet](https://leafletjs.com/) for the map
- [OpenStreetMap](https://www.openstreetmap.org/copyright) for the map tiles

## Run locally
1. Clone the repo: `git clone https://github.com/aakeen-sudo/earthquake-watch.git`
2. Open the folder in VS Code
3. Open `index.html` with Live Server (or double-click it)

No API key is needed, so there are no secrets in this repo.

## Deployment (Web01, Web02 and Lb01)
**Status:** Deployment could not be completed. The servers rejected my SSH key (Permission denied (publickey)) after I registered it on my intranet profile.

Planned steps:
1. On Web01 and Web02, install nginx: `sudo apt-get update && sudo apt-get install -y nginx`
2. Copy `index.html`, `style.css` and `script.js` to `/var/www/html/` on both servers
3. On Lb01, install nginx and add this to the nginx config, then reload nginx:

```nginx
upstream app_servers {
    server 35.179.134.203;
    server 52.56.195.36;
}
server {
    listen 80;
    location / {
        proxy_pass http://app_servers;
    }
}
```

## Challenges
- The first map tile provider needed an API key, so I switched to OpenStreetMap tiles.
- A typo in a web address left the map empty, which I found using the browser console.
- The servers refused my SSH key, so I could not deploy.

## Links
- Demo video: https://youtu.be/OkVa8PC0FO8