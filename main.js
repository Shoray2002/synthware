var ww = window.innerWidth;
var wh = window.innerHeight;
class Tunnel {
  constructor(texture) {
    this.init();
    this.createMesh(texture);
    this.handleEvents();
    this.initAnimation();
    window.requestAnimationFrame(this.render.bind(this));
  }
  init() {
    this.mouse = {
      position: new THREE.Vector2(ww * 0.5, wh * 0.5),
      ratio: new THREE.Vector2(0, 0),
      target: new THREE.Vector2(ww * 0.5, wh * 0.5),
    };

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector("#scene"),
    });
    this.renderer.setSize(ww, wh);

    this.camera = new THREE.PerspectiveCamera(15, ww / wh, 0.01, 1000);
    this.camera.rotation.y = Math.PI;
    this.camera.position.z = 0.35;

    this.scene = new THREE.Scene();
  }
  createMesh(texture) {
    var points = [];
    var i = 0;
    var geometry = new THREE.Geometry();
    this.scene.remove(this.tubeMesh);
    for (i = 0; i < 5; i += 1) {
      points.push(new THREE.Vector3(0, 0, 3 * (i / 4)));
    }
    points[4].y = -0.06;

    this.curve = new THREE.CatmullRomCurve3(points);
    this.curve.type = "catmullrom";

    geometry = new THREE.Geometry();
    geometry.vertices = this.curve.getPoints(70);
    this.splineMesh = new THREE.Line(geometry, new THREE.LineBasicMaterial());
    // texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    this.tubeMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: 0xfb20ff,
      map: texture,
      transparent: true
    });

    this.tubeMaterial.map.wrapS = THREE.MirroredRepeatWrapping;
    this.tubeMaterial.map.wrapT = THREE.MirroredRepeatWrapping;
    this.tubeMaterial.map.repeat.set(
      this.tubeMaterial.repx,
      this.tubeMaterial.repy
    );

    this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
    this.tubeGeometry_o = this.tubeGeometry.clone();
    this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
    this.scene.add(this.tubeMesh);
  }
  handleEvents() {
    window.addEventListener("resize", this.onResize.bind(this), false);
    document.body.addEventListener(
      "mousemove",
      this.onMouseMove.bind(this),
      false
    );
  }
  onResize() {
    ww = window.innerWidth;
    wh = window.innerHeight;
    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
  }
  onMouseMove(e) {
    this.mouse.target.x = e.clientX;
    this.mouse.target.y = e.clientY;
  }
  update() {
    this.createMesh();
  }
  initAnimation() {
    // Timeline animation
    this.textureParams = {
      offsetX: 0,
      offsetY: 0,
      repeatX: 10,
      repeatY: 4,
    };
    this.cameraShake = {
      x: 0,
      y: 0,
    };
    var self = this;
    var hyperSpace = new TimelineMax({ repeat: -1 });
    hyperSpace.to(this.textureParams, 4, {
      repeatX: 0.3,
      ease: Power1.easeInOut,
    });
    hyperSpace.to(
      this.textureParams,
      15,
      {
        offsetX: 8,
        ease: Power2.easeInOut,
      },
      0
    );
    hyperSpace.to(
      this.textureParams,
      8,
      {
        repeatX: 10,
        ease: Power2.easeInOut,
      },
      "-=7"
    );
    // var shake = new TimelineMax({ repeat: -1, repeatDelay: 5 });
    // shake.to(
    //   this.cameraShake,
    //   2,
    //   {
    //     x: -0.01,
    //     ease: RoughEase.ease.config({
    //       template: Power0.easeNone,
    //       strength: 0.5,
    //       points: 100,
    //       taper: "none",
    //       randomize: true,
    //       clamp: false,
    //     }),
    //   },
    //   4
    // );
    // shake.to(this.cameraShake, 2, {
    //   x: 0,
    //   ease: RoughEase.ease.config({
    //     template: Power0.easeNone,
    //     strength: 0.5,
    //     points: 100,
    //     taper: "none",
    //     randomize: true,
    //     clamp: false,
    //   }),
    // });
  }
  updateMaterialOffset() {
    this.tubeMaterial.map.offset.x = this.textureParams.offsetX;
    this.tubeMaterial.map.offset.y += 0.001;
    this.tubeMaterial.map.repeat.set(
      this.textureParams.repeatX,
      this.textureParams.repeatY
    );
  }
  updateCameraPosition() {
    this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 50;
    this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 50;

    this.mouse.ratio.x = this.mouse.position.x / ww;
    this.mouse.ratio.y = this.mouse.position.y / wh;

    this.camera.position.x =
      this.mouse.ratio.x * 0.044 - 0.025 + this.cameraShake.x;
    this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
  }
  updateCurve() {
    var i = 0;
    var index = 0;
    var vertice_o = null;
    var vertice = null;
    for (i = 0; i < this.tubeGeometry.vertices.length; i += 1) {
      vertice_o = this.tubeGeometry_o.vertices[i];
      vertice = this.tubeGeometry.vertices[i];
      index = Math.floor(i / 30);
      vertice.x +=
        (vertice_o.x + this.splineMesh.geometry.vertices[index].x - vertice.x) /
        15;
      vertice.y +=
        (vertice_o.y + this.splineMesh.geometry.vertices[index].y - vertice.y) /
        15;
    }
    this.tubeGeometry.verticesNeedUpdate = true;

    this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
    this.curve.points[3].x = 0;
    this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

    this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
    this.curve.points[3].y = 0;
    this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

    this.splineMesh.geometry.verticesNeedUpdate = true;
    this.splineMesh.geometry.vertices = this.curve.getPoints(70);
  }
  render() {
    this.updateMaterialOffset();
    this.updateCameraPosition();
    this.updateCurve();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

window.onload = function () {
  var loader = new THREE.TextureLoader();
  loader.crossOrigin = "Anonymous";
  loader.load("purple-grid.jpg", function (texture) {
    document.body.classList.remove("loading");
    window.tunnel = new Tunnel(texture);
  });
};
