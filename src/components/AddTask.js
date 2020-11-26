import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {addTodo, saveTodos} from '../store/actions/actions.js'
import {connect, useDispatch} from "react-redux";
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    FormControlLabel,
    ButtonGroup,
    Container
} from "@material-ui/core";
import {LMap} from "./LMap.js";
import Checkbox from '@material-ui/core/Checkbox';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const useStyles = makeStyles((theme) => ({
    root: {},
    addTaskForm: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    addButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    addButton: {
      width:'100%'
    },
    textValidationError: {
        color: "red",
    },
}))
const getLocation = (setPosition) => {
    console.log('test')
    navigator.geolocation.getCurrentPosition((location) => {
        setPosition({lat: location.coords.latitude, lng: location.coords.longitude})
    })
}
let timeoutId
const AddTask = (props) => {
    const [text, setText] = useState('')
    const [loadedFile, setLoadedFile] = useState(null)
    const [textValidationVisible, setTextValidationVisible] = useState(false)
    const [color, setColor] = useState('#ffffff')
    const [includePosition, setIncludePosition] = useState(false)
    const [position, setPosition] = useState(null)
    const dispatch = useDispatch()
    const classes = useStyles();
    const mountthree = useRef(null)
    const fileInput = useRef(null)
    //
    // useEffect(() => {
    //     getLocation(setPosition)
    // }, [])


    const handleColorChange = (changedColor) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            setColor(changedColor)
        }, 100)
    }
    const handleTextChange = (text) => {
        if (text.length > 0) {
            setTextValidationVisible(false)
        }
        setText(text)
    }
    const handleAddTask = (closeBottom) => {
        if (text.length === 0) {
            setTextValidationVisible(true)
            return
        }
        dispatch(addTodo({text, color, position}))
        dispatch(saveTodos())
        setText('')
        setColor('#ffffff')
        closeBottom()
    }

    const handleSetIncludePositon = () => {
        if (includePosition) {
            setPosition(null)
        } else {
            getLocation(setPosition)
        }
        setIncludePosition(!includePosition)

    }

    const handleLoadGltf = (e) => {
        // fileInput.current.value = null
        let file = e.target.files[ 0 ];
        let reader = new FileReader();

        // This is code that runs after reader.readAsText() finishes
        reader.onload = function ( gltfText ) {

            var loader = new GLTFLoader();
            var renderer = new THREE.WebGLRenderer();

            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 2000 );
            const light = new THREE.Light( 0xf4f5dc ); // soft white light
            light.castShadow = true
            const amblight = new THREE.AmbientLight( 0xf4f5dc ); // soft white light
            amblight.castShadow = true
            // const geometry = new THREE.BoxGeometry();
            // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            // const cube = new THREE.Mesh( geometry, material );
            const color = new THREE.Color( 0xfff000 );
            // const controls = new DragControls( objects, camera, renderer.domElement );

            loader.parse( gltfText.target.result, '', function( gltf ) {
                console.log(gltf)
                scene.castShadow = true
                scene.background = color
                scene.add( light );
                scene.add( amblight );
                scene.add( gltf.scene );
                // scene.add( cube );
                // const geometry = new THREE.BoxGeometry();
                // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                // const cube = new THREE.Mesh( geometry, material );
                // scene.add( cube );
                // camera.position.z = 5;
                const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
                camera.position.set( 0, 20, 50 );
                controls.update();

                const animate = function () {
                    requestAnimationFrame( animate );

                    // cube.rotation.x += 0.01;
                    // cube.rotation.y += 0.01;
                    controls.update();

                    renderer.render( scene, camera );
                };
                // renderer.render( scene, camera );

                mountthree.current.appendChild( renderer.domElement );
                animate();


            }, function( errormsg ){
                console.error( errormsg );
            });

        }
        reader.readAsText( file );

    }
    return (
        <form
            className={classes.addTaskForm}
            onSubmit={(e) => {
                e.preventDefault()
                handleAddTask(props.closeFooter)
            }}>
            <FormControl error={textValidationVisible} style={{width: "90%"}}>
                <InputLabel htmlFor="add-task-text">Text</InputLabel>
                <Input
                    id="add-task-text"
                    variant="outlined"
                    multiline
                    value={text}
                    onChange={(event) => handleTextChange(event.target.value)}
                    aria-describedby="add-task-error-text"
                />
                {textValidationVisible ?
                    <FormHelperText id="add-task-error-text">Some text is required</FormHelperText> : ''}

            </FormControl>
            <InputLabel htmlFor={"add-task-color"}>Color</InputLabel>
            <input
                style={{width: "90%"}}
                id={"add-task-color"}
                type={"color"}
                value={color}
                onChange={(event) => handleColorChange(event.target.value)}/>
            <FormControl
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={includePosition}
                            onChange={handleSetIncludePositon}
                            name="includePosition"
                            color="primary"
                        />
                    }
                    label="Include location"
                />
            </FormControl>

            {includePosition ? <LMap position={position} handleChangeMarkerPos={(pos) => setPosition(pos)}/> : ''}
            Load gltf file
            <input ref={fileInput} type={'file'} onChange={handleLoadGltf}/>
            <div ref={mountthree}>test</div>

            <Container className={classes.addButtonContainer}>
                <ButtonGroup fullWidth>
                    <Button
                        className={classes.addButton}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={() => handleAddTask(props.closeFooter)}

                    >
                        Add
                    </Button>
                </ButtonGroup>
            </Container>

        </form>
    );
}
export default connect(null, {addTodo})(AddTask)
