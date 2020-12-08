import LMarker from './LMarker.js'
import SetMarkerOnClick from './SetMarkerOnClick.js'
import {TileLayer, MapContainer} from "react-leaflet";
import {Container} from "@material-ui/core";
import LocateMyPosition from "./LocateMyPosition.js";

export const LMap = (props) => {
    return (
        <Container>
            {props.position ? (
                    <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}
                                  style={{height: '180px', width: '100%'}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            [props.position].map(
                                (marker) =>
                                    <LMarker
                                        key={`${marker.lat}-${marker.lng}`}
                                        markerPos={marker}
                                        handleSetPosition={props.handleChangeMarkerPos}
                                    />)
                        }
                        <SetMarkerOnClick handleChangeMarkerPos={props.handleChangeMarkerPos}/>
                        <LocateMyPosition handleChangeMarkerPos={props.handleChangeMarkerPos}/>
                    </MapContainer>)
                : <div>No data</div>
            }
        </Container>

    )
}
