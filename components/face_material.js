const createScene = () => {
    const scene = new BABYLON.Scene(engine);

    /**** Set camera and light *****/
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 4,
        Math.PI / 3,
        20,
        new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(1, 1, 0)
    );

    const ground = buildGround(scene);
    const box = buildBox(scene);
    const roof = buildRoof(scene);

    return scene;
}

/******Build Functions***********/
const buildGround = (scene) => {
    //color
    const groundMat = new BABYLON.StandardMaterial("groundMat");
    groundMat.diffuseColor = new BABYLON.Color3(0, 1, 1);

    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
            width: 10,
            height: 10
        },
        scene
    );
    ground.material = groundMat;
}

const buildBox = (scene) => {
    //texture
    const boxMat = new BABYLON.StandardMaterial("boxMat");
    boxMat.diffuseTexture = new BABYLON.Texture(
        "https://assets.babylonjs.com/environments/cubehouse.png"
    );

    // Babylon.js의 MeshBuilder.CreateBox에서 faceUV 배열의 인덱스는 다음과 같이 약속되어 있습니다:
    // 0: 뒤 (Back)
    // 1: 앞 (Front)
    // 2: 우 (Right)
    // 3: 좌 (Left)
    // 4: 상 (Top)
    // 5: 하 (Bottom)
    //options parameter to set different images on each side
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0.5, 0.0, 0.75, 1.0); //rear face
    faceUV[1] = new BABYLON.Vector4(
        0.0, // x축시작 (0~1)
        0.0, // y축 시작 (0~1)
        0.25, // x축 끝 (0~1)
        1.0 // y축 끝 (0~1)
    ); //front face
    faceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    faceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
    // top 4 and bottom 5 not seen so not set

    /**** World Objects *****/
    const box = BABYLON.MeshBuilder.CreateBox(
        "box",
        {
            faceUV: faceUV,
            wrap: true
        },
        scene
    );
    box.material = boxMat;
    box.position.y = 0.5;

    return box;
}

const buildRoof = (scene) => {
    //texture
    const roofMat = new BABYLON.StandardMaterial("roofMat");
    roofMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/roof.jpg");

    const roof = BABYLON.MeshBuilder.CreateCylinder(
        "roof",
        {
            diameter: 1.3,
            height: 1.2,
            tessellation: 3
        },
        scene
    );
    roof.material = roofMat;
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;

    return roof;
}
export default createScene
