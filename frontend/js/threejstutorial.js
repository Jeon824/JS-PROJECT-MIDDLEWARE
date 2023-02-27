import * as THREE from '';

function main(){
        const canvas = document.getElementById('c');
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth,window.innerHeight);
        // camera
        const fov = 75;
        const aspect = 2;  // the canvas default
        const near = 0.1;
        const far = 5;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;

        const scene = new THREE.Scene();

        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

        const cube = new THREE.Mesh(geometry,material);

        scene.add(cube);

        renderer.render(scene, camera);
        // function render(time){
        //     time *=0.001; //convert time to second;

        //     cube.rotation.x = time;
        //     cube.ratation.y = time;

        //     renderer.render(scene, camera);
        // }
        // requestAnimationFrame(render);
}