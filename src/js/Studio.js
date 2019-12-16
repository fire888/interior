

import * as THREE from 'three'

export default function Studio (emitterLink) {
  const emitter = emitterLink

  let camera, scene, renderer,
  assets = null


  emitter.subscribe('frameUpdate')(function () {
    if (!camera ) {
      return
    }
    renderer.render( scene, camera )
  })


  const init = () => {
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById( 'webgl-canvas' ),
      antialias: true
    })
    renderer.setClearColor( 0x8fcfec )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    scene = new THREE.Scene()
    scene.background = 0x8fcfec
    let lightA = new THREE.AmbientLight( 0xffffff, 0.5 )
    lightA.position.set( 5, 5, 5 )
    scene.add( lightA )
    window.addEventListener('resize', resize)
  }


  const resize = () => {
    const size = renderer.domElement.parentNode.getBoundingClientRect();
    renderer.setSize( size.width, size.height )
    if (camera) {
      camera.aspect = size.width/size.height
      camera.updateProjectionMatrix()
    }
  }


  const createLevel = data => {
    assets = data
    const mat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      wireframe: true,
    })
    assets['scene'].traverse(child => {
      if (child instanceof THREE.Mesh === true) {
          child.material = mat;
      }
    })
    scene.add(assets['scene'])
  }


  return {
    initScene: function () {
      init()
      resize()
    },

    setCamera: function (cam) {
      camera = cam
    },

    getRenderer() {
      return renderer
    },

    createLevelFromAssets: function (data) {
      createLevel(data)
    },

    addToScene: function (mesh) {
      scene.add(mesh)
    }
  }
}






