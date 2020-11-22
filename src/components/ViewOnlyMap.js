import LMarker from './LMarker.js'
import {TileLayer, MapContainer} from "react-leaflet";
import {Container} from "@material-ui/core";
// import leaflet from 'leaflet'
export const ViewOnlyMap = (props) => {
    return (
        <Container>
            {props.position ? (
                    <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}
                                  style={{height: '180px', width: '100%'}} zoomControl={false} doubleClickZoom={false} dragging={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            [props.position].map(
                                (marker, index) =>
                                    <LMarker
                                        editable={false}
                                        key={`${index}-${marker.lat}-${marker.lng}`}
                                        markerPos={marker}
                                    />)
                        }
                    </MapContainer>)
                : <div>No position set</div>
            }
        </Container>

    )
}
