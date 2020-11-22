import {useMapEvent} from "react-leaflet";


export default function SetMarkerOnClick({ handleChangeMarkerPos }) {
    const map = useMapEvent('click', (e) => {

        let itemId = e.originalEvent.target.id

        if (itemId === 'locate-icon' || itemId ==='locate-icon-button' || e.originalEvent.target.nodeName === 'path')
        {
            return
        }

        handleChangeMarkerPos({lat: e.latlng.lat, lng: e.latlng.lng})
        map.setView(e.latlng, map.getZoom(), {
            animate: true
        })
    })

    return null
}
