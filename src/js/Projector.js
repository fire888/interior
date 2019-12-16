import * as THREE from 'three'


export default function Projector(cam, model) {

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    const camera = cam 

    const targetList = [model]

    const cone = new THREE.Group()
    const coneMesh = new THREE.Mesh(
        new THREE.ConeBufferGeometry(10, 30, 16, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    coneMesh.rotation.x = Math.PI / 2
    cone.add(coneMesh)

    const onMouseMove = ( event ) => {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1

        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(targetList, true)

        if (!intersects[0]) {
            return
        }

        cone.position.copy(intersects[0].point)

        const n = intersects[ 0 ].face.normal.clone();
        n.transformDirection(intersects[0].object.matrixWorld);
        n.multiplyScalar( 10 );
        n.add( intersects[ 0 ].point );
        cone.lookAt( n );
    }

    window.addEventListener( 'mousemove', onMouseMove, false )

    return cone
}