import {useCallback, useMemo, useRef, useState} from 'react'
import {Marker, Popup, useMapEvents} from "react-leaflet";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [21, 31], // size of the icon
    iconAnchor: [10, 31],
    shadowSize: [41, 41], // size of the icon
    shadowAnchor: [10, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -31]
});
function handlePermission() {
    navigator.permissions.query({name:'geolocation'}).then(function(result) {
        if (result.state === 'granted') {
            report(result.state);
            // geoBtn.style.display = 'none';
        } else if (result.state === 'prompt') {
            report(result.state);
            // geoBtn.style.display = 'none';
            navigator.geolocation.getCurrentPosition((loc) => console.log('perm allowed', loc));
        } else if (result.state === 'denied') {
            report(result.state);
            // geoBtn.style.display = 'inline';
        }
        result.onchange = function() {
            report(result.state);
        }
    });
}

function report(state) {
    console.log('Permission ' + state);
}

handlePermission();
L.Marker.prototype.options.icon = DefaultIcon;
export default function LMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    props.handleSetPosition(marker.getLatLng())
                }
            },
        }),
        [props],
    )

    const map = useMapEvents({
        touch() {
            map.locate()
        },
        click() {
            map.locate()
        },
        locationfound(e) {
            props.handleSetPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={props.markerPos}
            ref={markerRef}
        >
            <Popup minWidth={90}>
        <span  onClick={toggleDraggable}>
          {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
        </span>
            </Popup>
        </Marker>
    )
}

