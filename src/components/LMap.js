import LMarker from './LMarker.js'
import {TileLayer, MapContainer} from "react-leaflet";
import {Container} from "@material-ui/core";
// import leaflet from 'leaflet'
export const LMap = (props) => {
    return (
        <Container>
            <MapContainer center={props.position} zoom={13} scrollWheelZoom={false} style={{height: '180px', width: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    props.position.hasOwnProperty('lat') ?
                    [props.position].map(
                    (marker, index) =>
                    <LMarker
                    key={`${index}-${marker.lat}-${marker.lng}`}
                    markerPos={marker}
                    handleSetPosition={props.handleChageMarkerPos}
                    />
                    ) : <div>No data</div>

                }
            </MapContainer>
        </Container>

    )
}
