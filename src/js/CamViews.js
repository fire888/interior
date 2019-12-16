
const SIZE_SPHERE = 500
const OPACITY = 1

export default function CamViews (data) {
    const items = {}

    const sourcePoints = {}

    data['scene'].traverse((child) => {
        if (
            child.name === "PhysCamera001"
          || child.name === "PhysCamera001Target" 
          || child.name === "PhysCamera002" 
          || child.name === 'PhysCamera002Target'
          || child.name ===  'PhysCamera003'
          || child.name ===  'PhysCamera003Target'
          || child.name ===  'PhysCamera004'
          || child.name ===  'PhysCamera004Target'
          ) {
        sourcePoints[child.name] = child
        }
    })

    for (let key in sourcePoints) {
        if (key === 'PhysCamera001') {
            data['view1'].wrapS = THREE.RepeatWrapping;
            data['view1'].repeat.x = - 1;
            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry(SIZE_SPHERE, 16, 16),
                new THREE.MeshStandardMaterial({
                    map: data['view1'],
                    opacity: OPACITY,
                    side: THREE.BackSide,
                    transparent: true
                })
            )
            mesh.position.copy(sourcePoints[key].position)
            mesh.rotation.y = 0.31
            items[key] = mesh
        }

        if (key === 'PhysCamera002') {
            data['view2'].wrapS = THREE.RepeatWrapping;
            data['view2'].repeat.x = - 1;
            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry(SIZE_SPHERE, 16, 16),
                new THREE.MeshStandardMaterial({
                    map: data['view2'],
                    opacity: OPACITY,
                    side: THREE.BackSide,
                    transparent: true
                })
            )
            mesh.position.copy(sourcePoints[key].position)
            mesh.rotation.y = 0.31
            items[key] = mesh
        }

        if (key === 'PhysCamera003') {
            data['view3'].wrapS = THREE.RepeatWrapping;
            data['view3'].repeat.x = - 1;
            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry(SIZE_SPHERE, 16, 16),
                new THREE.MeshStandardMaterial({
                    map: data['view3'],
                    opacity: OPACITY,
                    side: THREE.BackSide,
                    transparent: true
                })
            )
            mesh.position.copy(sourcePoints[key].position)
            mesh.rotation.y = 0.31
            items[key] = mesh
        }

        if (key === 'PhysCamera004') {
            data['view4'].wrapS = THREE.RepeatWrapping;
            data['view4'].repeat.x = - 1;
            const mesh = new THREE.Mesh(
                new THREE.SphereBufferGeometry(SIZE_SPHERE, 16, 16),
                new THREE.MeshStandardMaterial({
                    map: data['view4'],
                    opacity: OPACITY,
                    side: THREE.BackSide,
                    transparent: true
                })
            )
            mesh.position.copy(sourcePoints[key].position)
            mesh.rotation.y = 0.31
            items[key] = mesh
        }
    }

    return {
        items
    }
}