import * as THREE from 'three';


function render_on_canvas(product, box_color, x, canvas_id/*, gltf_model*/){
    console.log('function called');
    const canvas = canvas_id;
    const renderer = new THREE.WebGLRenderer({canvas});
    // renderer.setSize(window.innerWidth,window.innerHeight);
    // camera
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const scene_color = new THREE.Color( 0xffffff );
    const scene = new THREE.Scene();
    scene.background = scene_color;

    
    const color = 0xFFFFFF;
    const intensity = 0.76;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        cube.position.x = x;
        
        return cube;
        }
    
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const cube = makeInstance(product, box_color, x);
    
    // const cubes = [
    //         makeInstance(geometry, 0x44aa88,  0),
    //         makeInstance(geometry, 0x8844aa, -2),
    //         makeInstance(geometry, 0xaa8844,  2),];

    function resizeRendererToDisplaySize(renderer) {//set canvas width and height
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        
        if (needResize) {

            renderer.setSize(width, height, false);
        
        }

        return needResize;
    
        }

    function render(time){
        time *=0.001; //convert time to second;
        if(resizeRendererToDisplaySize(renderer)){//set camera aspect
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        // cubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * .1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot; 
        // });
    //     cube.rotation.x = time;
    //     cube.rotation.y = time;
    //     cube.rotation.z = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
}
window.render_on_canvas = render_on_canvas;
// module.exports = {main}