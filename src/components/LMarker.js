import {useCallback, useMemo, useRef, useState} from 'react'
import {Marker, Popup} from "react-leaflet";
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useTranslation } from 'react-i18next';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [21, 31], // size of the icon
    iconAnchor: [10, 31],
    shadowSize: [41, 41], // size of the icon
    shadowAnchor: [10, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -31]
});

L.Marker.prototype.options.icon = DefaultIcon;
export default function LMarker({editable = true, handleSetPosition, markerPos}) {
    const [draggable, setDraggable] = useState(false)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    let markerData = marker.getLatLng()
                    handleSetPosition({lat: markerData.lat, lng: markerData.lng})
                }
            },
        }),
        [handleSetPosition],
    )

    const toggleDraggable = useCallback(() => {
        if(!editable) {
            return
        }
        setDraggable((d) => !d)
    }, [editable])

    const { t } = useTranslation()
    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={markerPos}
            ref={markerRef}
        >
            <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? t('mapMarkerDraggable')
              : t('mapMarkerClickToDrag')}
        </span>
            </Popup>
        </Marker>
    )
}

