import * as THREE from 'three'
// import 'three/examples/js/loaders/OBJLoader'
// import 'three/examples/js/loaders/GLTFLoader'
import 'three/examples/js/loaders/FBXLoader'

const Zlib = require("three/examples/js/libs/inflate.min"); // util for FBX loader
window.Zlib = Zlib.Zlib;

import '../assets/progress-img.png'
import '../assets/icon-map.png'

import sceneSrc from '../assets/interier/scene.FBX'
import view1Src from '../assets/interier/001.jpg'
import view2Src from '../assets/interier/002.jpg'
import view3Src from '../assets/interier/003.jpg'
import view4Src from '../assets/interier/004.jpg'

const assetsToLoad = [
    {
        type: 'fbx',
        filename: sceneSrc,
        key: 'scene'
    },
    {
        type: 'img',
        filename: view1Src,
        key: 'view1'
    },
    {
        type: 'img',
        filename: view2Src,
        key: 'view2'
    },
    {
        type: 'img',
        filename: view3Src,
        key: 'view3'
    },
    {
        type: 'img',
        filename: view4Src,
        key: 'view4'
    },
]


export default function LoadManager (eventEmitter) {

    const assets = {}

    const emitter = eventEmitter
    let objLoader, textureLoader, gltfLoader, fbxLoader

    let index = 0;


    const loadAsset = function (data) {
        if (data.type === 'obj') {
            objLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }
        if (data.type === 'glb' || data.type === 'gltf') {
            gltfLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }   
        if (data.type === 'fbx') {
            fbxLoader.load(data.filename, model => {
                assets[data.key] = model 
                checkComplete()      
            })
        }        
        if (data.type === 'img') {
            textureLoader.load(data.filename, model => {
                assets[data.key] = model
                checkComplete()        
            })
        }
    }


    const checkComplete = () => {
        index ++;
        if ( index < assetsToLoad.length ) {
            loadAsset(assetsToLoad[index])
        } else {
            console.log(assets)
            emitter.emit('loadingComplete')(assets);
        }
    }


    this.startLoad = function () {
        //objLoader = new THREE.OBJLoader();
        //gltfLoader = new THREE.GLTFLoader();
        textureLoader = new THREE.TextureLoader();
        fbxLoader = new THREE.FBXLoader();
        loadAsset(assetsToLoad[index]);
    } 
}