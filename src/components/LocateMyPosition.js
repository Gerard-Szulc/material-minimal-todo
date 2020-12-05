import {useMapEvent} from "react-leaflet";
import {Container, IconButton} from "@material-ui/core";
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import {styles} from "../theme/customStyles/styles.js";

const useStyles = styles
export default function LocateMyPosition({handleChangeMarkerPos}) {
    const classes = useStyles();

    const map = useMapEvent('click', (e) => {
    })

    let handleAnimatedZoom = (latlng) => {
        map.setView(latlng, map.getZoom(), {
            animate: true
        })
    }
    const handleLocateMe = (e) => {
        e.preventDefault()
        navigator.geolocation.getCurrentPosition((location) => {
            handleChangeMarkerPos({lat: location.coords.latitude, lng: location.coords.longitude})
            handleAnimatedZoom({lat: location.coords.latitude, lng: location.coords.longitude})
        })
    }

    return (
        <Container>
            <IconButton onClick={handleLocateMe} className={classes.locateButton} id={"locate-icon-button"}>
                <LocationSearchingIcon id={"locate-icon"} />
            </IconButton>
        </Container>
    )
}
