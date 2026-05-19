/* ============================================================
   LEAVE — Three.js first-person horror game (Level 1)
   Duck's house. Dad arrives.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- constants ---------- */
  const PLAYER_H  = 1.7;
  const SPEED     = 3.5;
  const RADIUS    = 0.3;
  const ROOM_H    = 2.8;
  const WALL_T    = 0.12;
  const DOOR_W    = 0.9;
  const DOOR_H    = 2.1;
  const LOOK_SENS = 0.0022;
  const TB_CPS    = 30;

  /* ---------- state ---------- */
  var scene, camera, renderer, clock, flashlight;
  var running = false, rafId = null;
  var yaw = Math.PI, pitch = 0;
  var keys = {};
  var locked = false;
  var walkable = [];
  var doors = [];
  var doorMeshes = [];
  var triggers = [];

  /* textbox */
  var tbActive = false;
  var tbQueue  = [];
  var tbCurrent = '';
  var tbShown  = '';
  var tbTimer  = 0;
  var tbDone   = false;

  /* door interaction */
  var nearDoor = null;
  var raycaster;

  /* ---------- materials ---------- */
  var M = {};

  /* ---------- geometry helpers ---------- */
  function bx(w, h, d, mat, x, y, z) {
    var mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }

  /* horizontal wall (runs along X) at given Z, from x0 to x1
     optional door centred at doorX */
  function wH(z, x0, x1, doorX) {
    var len = x1 - x0;
    if (doorX === undefined) {
      bx(len, ROOM_H, WALL_T, M.wall, (x0 + x1) / 2, ROOM_H / 2, z);
    } else {
      var leftEnd  = doorX - DOOR_W / 2;
      var rightStart = doorX + DOOR_W / 2;
      // left segment
      if (leftEnd > x0)
        bx(leftEnd - x0, ROOM_H, WALL_T, M.wall, (x0 + leftEnd) / 2, ROOM_H / 2, z);
      // right segment
      if (rightStart < x1)
        bx(x1 - rightStart, ROOM_H, WALL_T, M.wall, (rightStart + x1) / 2, ROOM_H / 2, z);
      // lintel above door
      bx(DOOR_W, ROOM_H - DOOR_H, WALL_T, M.wall, doorX, DOOR_H + (ROOM_H - DOOR_H) / 2, z);
    }
  }

  /* vertical wall (runs along Z) at given X, from z0 to z1
     optional door centred at doorZ */
  function wV(x, z0, z1, doorZ) {
    var len = z1 - z0;
    if (doorZ === undefined) {
      bx(WALL_T, ROOM_H, len, M.wall, x, ROOM_H / 2, (z0 + z1) / 2);
    } else {
      var frontEnd   = doorZ - DOOR_W / 2;
      var backStart  = doorZ + DOOR_W / 2;
      if (frontEnd > z0)
        bx(WALL_T, ROOM_H, frontEnd - z0, M.wall, x, ROOM_H / 2, (z0 + frontEnd) / 2);
      if (backStart < z1)
        bx(WALL_T, ROOM_H, z1 - backStart, M.wall, x, ROOM_H / 2, (backStart + z1) / 2);
      // lintel
      bx(WALL_T, ROOM_H - DOOR_H, DOOR_W, M.wall, x, DOOR_H + (ROOM_H - DOOR_H) / 2, doorZ);
    }
  }

  /* floor + ceiling for a rectangular area; push to walkable[] */
  function fc(x0, x1, z0, z1) {
    var cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    var w  = x1 - x0, d  = z1 - z0;
    // floor
    bx(w, 0.01, d, M.floor, cx, 0, cz);
    // ceiling
    bx(w, 0.01, d, M.ceiling, cx, ROOM_H, cz);
    walkable.push({ minX: x0, maxX: x1, minZ: z0, maxZ: z1 });
  }

  /* ---------- collision ---------- */
  function canMoveTo(x, z) {
    var r = RADIUS;
    return walkable.some(function (w) {
      return x - r > w.minX && x + r < w.maxX && z - r > w.minZ && z + r < w.maxZ;
    });
  }

  /* ---------- door helpers ---------- */
  function makeDoor(pivotX, pivotZ, panelOffX, panelOffZ, openAngle, comments) {
    var pivot = new THREE.Group();
    pivot.position.set(pivotX, 0, pivotZ);
    scene.add(pivot);

    var panelMesh = new THREE.Mesh(
      new THREE.BoxGeometry(WALL_T * 1.5, DOOR_H, DOOR_W),
      M.door
    );
    panelMesh.position.set(panelOffX, DOOR_H / 2, panelOffZ);
    pivot.add(panelMesh);

    var door = {
      pivot:       pivot,
      mesh:        panelMesh,
      open:        false,
      curAngle:    0,
      targetAngle: 0,
      openAngle:   openAngle,
      comments:    comments,
      commentIdx:  0
    };
    doors.push(door);
    doorMeshes.push(panelMesh);
    return door;
  }

  /* ---------- textbox ---------- */
  function showText(lines) {
    tbQueue   = lines.slice();
    tbActive  = true;
    document.getElementById('g3d-textbox').style.display = 'block';
    document.getElementById('g3d-tb-arrow').style.display = 'none';
    startNextLine();
  }

  function startNextLine() {
    tbCurrent = tbQueue.shift();
    tbShown   = '';
    tbTimer   = 0;
    tbDone    = false;
    document.getElementById('g3d-tb-text').textContent = '';
    document.getElementById('g3d-tb-arrow').style.display = 'none';
  }

  function closeTextbox() {
    document.getElementById('g3d-textbox').style.display = 'none';
    tbActive = false;
    tbDone   = false;
    tbQueue  = [];
  }

  /* ---------- triggers ---------- */
  function buildTriggers() {
    triggers = [
      {
        minX: -9.5, maxX: -1.5, minZ: -8, maxZ: -1, fired: false,
        fn: function () { showText(['"...Duck?"', '"He never cleaned this place up."']); }
      },
      {
        minX: 1.5, maxX: 7.5, minZ: -8, maxZ: -1, fired: false,
        fn: function () { showText(['"...The kitchen."', '"There\'s still food out."']); }
      },
      {
        minX: -9.5, maxX: -1.5, minZ: -14, maxZ: -8, fired: false,
        fn: function () { showText(['"...His room."', '"His computer is still on."', '"Duck..."']); }
      },
      {
        minX: -1.2, maxX: 1.2, minZ: -12, maxZ: -10, fired: false, repeatable: true,
        fn: function () { showText(['...', '"Not yet."']); }
      }
    ];
  }

  function checkTriggers(x, z) {
    for (var i = 0; i < triggers.length; i++) {
      var t = triggers[i];
      if (t.fired && !t.repeatable) continue;
      if (x > t.minX && x < t.maxX && z > t.minZ && z < t.maxZ) {
        t.fired = true;
        t.fn();
        break; // one trigger at a time
      }
    }
  }

  /* ---------- init ---------- */
  function init() {
    /* scene */
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0x000000, 8, 20);

    /* camera */
    camera = new THREE.PerspectiveCamera(72, innerWidth / innerHeight, 0.1, 50);
    camera.position.set(0, PLAYER_H, 0);
    camera.rotation.order = 'YXZ';
    scene.add(camera);

    /* renderer — target the existing div, we'll append the canvas to it */
    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    renderer.shadowMap.enabled = false;
    var wrap = document.getElementById('g3d-wrap');
    /* remove placeholder div, insert canvas */
    var placeholder = document.getElementById('g3d-canvas');
    if (placeholder) placeholder.remove();
    renderer.domElement.id = 'g3d-canvas';
    wrap.insertBefore(renderer.domElement, wrap.firstChild);

    /* clock */
    clock = new THREE.Clock();

    /* lighting */
    var ambient = new THREE.AmbientLight(0x111008, 0.5);
    scene.add(ambient);

    flashlight = new THREE.SpotLight(0xffe8b0, 2.2);
    flashlight.distance  = 14;
    flashlight.angle     = Math.PI / 8;
    flashlight.penumbra  = 0.4;
    flashlight.decay     = 1.8;
    camera.add(flashlight);
    flashlight.position.set(0, 0, 0);

    var flTarget = new THREE.Object3D();
    flTarget.position.set(0, 0, -1);
    camera.add(flTarget);
    flashlight.target = flTarget;

    /* raycaster for door detection */
    raycaster = new THREE.Raycaster();

    /* materials */
    M.floor   = new THREE.MeshLambertMaterial({ color: 0x2a1a0a });
    M.ceiling  = new THREE.MeshLambertMaterial({ color: 0xccc4b4 });
    M.wall    = new THREE.MeshLambertMaterial({ color: 0xb0a090 });
    M.door    = new THREE.MeshLambertMaterial({ color: 0x6b4226 });
    M.couch   = new THREE.MeshLambertMaterial({ color: 0x4a3020 });
    M.table   = new THREE.MeshLambertMaterial({ color: 0x3a2010 });
    M.dark    = new THREE.MeshLambertMaterial({ color: 0x0a0808 });
    M.screen  = new THREE.MeshLambertMaterial({ color: 0x080a0f });

    buildLevel();
    buildTriggers();
    bindInput();
  }

  /* ---------- level ---------- */
  function buildLevel() {
    /* ---- floors & ceilings ---- */
    fc(-1.5,  1.5, -11,   0.5);  // hallway
    fc(-9.5, -1.5,  -8,  -1  );  // living room
    fc( 1.5,  7.5,  -8,  -1  );  // kitchen
    fc(-9.5, -1.5, -14,  -8  );  // bedroom

    /* doorway floors/ceilings (narrow) */
    fc(-1.5 - DOOR_W, -1.5, -4.5 - DOOR_W / 2, -4.5 + DOOR_W / 2); // LR doorway
    fc( 1.5,  1.5 + DOOR_W, -4.5 - DOOR_W / 2, -4.5 + DOOR_W / 2); // Kitchen doorway
    fc(-1.5 - DOOR_W, -1.5, -8.5 - DOOR_W / 2, -8.5 + DOOR_W / 2); // Bedroom doorway

    /* update walkable list for doorways */
    walkable.push({ minX: -1.5 - DOOR_W, maxX: -1.5, minZ: -4.5 - DOOR_W / 2, maxZ: -4.5 + DOOR_W / 2 });
    walkable.push({ minX:  1.5,           maxX:  1.5 + DOOR_W, minZ: -4.5 - DOOR_W / 2, maxZ: -4.5 + DOOR_W / 2 });
    walkable.push({ minX: -1.5 - DOOR_W, maxX: -1.5, minZ: -8.5 - DOOR_W / 2, maxZ: -8.5 + DOOR_W / 2 });

    /* ---- HALLWAY walls ---- */
    wH(  0.5, -1.5,  1.5);       // south
    wH(-11,   -1.5,  1.5);       // north
    wV(  1.5, -11,   0.5, -4.5); // east (kitchen door at z=-4.5)

    /* west wall — two doors, built manually (z runs from 0.5 to -11) */
    // solid segment: z 0.5 → -4.05  (length = 4.55, centre = (0.5-4.05)/2 = -1.775)
    bx(WALL_T, ROOM_H, 4.55, M.wall, -1.5, ROOM_H / 2, (0.5 + (-4.05)) / 2);
    // lintel for LR door at z=-4.5
    bx(WALL_T, ROOM_H - DOOR_H, DOOR_W, M.wall, -1.5, DOOR_H + (ROOM_H - DOOR_H) / 2, -4.5);
    // solid segment: z -4.95 → -8.05  (length = 3.1, centre = -(4.95+8.05)/2 = -6.5)
    bx(WALL_T, ROOM_H, 3.1,  M.wall, -1.5, ROOM_H / 2, -(4.95 + 8.05) / 2);
    // lintel for bedroom door at z=-8.5
    bx(WALL_T, ROOM_H - DOOR_H, DOOR_W, M.wall, -1.5, DOOR_H + (ROOM_H - DOOR_H) / 2, -8.5);
    // solid segment: z -8.95 → -11  (length = 2.05, centre = -(8.95+11)/2 = -9.975)
    bx(WALL_T, ROOM_H, 2.05, M.wall, -1.5, ROOM_H / 2, -(8.95 + 11) / 2);

    /* ---- LIVING ROOM walls ---- */
    wH(-1,   -9.5, -1.5);   // south
    wH(-8,   -9.5, -1.5);   // north (also bedroom south)
    wV(-9.5,  -8,  -1);     // west

    /* ---- KITCHEN walls ---- */
    wH(-1,  1.5, 7.5);      // south
    wH(-8,  1.5, 7.5);      // north
    wV( 7.5, -8, -1);       // east

    /* ---- BEDROOM walls ---- */
    wH(-14, -9.5, -1.5);    // north
    wV(-9.5, -14,  -8);     // west

    /* ---- DOORS ---- */
    // LR door: pivot at (-1.5, 0, -4.05), panel faces -Z door, offset +Z
    makeDoor(-1.5, -4.05, 0, DOOR_W / 2, -Math.PI / 2,
      ['"...Duck?"']);

    // Kitchen door: pivot at (1.5, 0, -4.05), panel faces +Z door, offset -Z
    makeDoor(1.5, -4.05, 0, -DOOR_W / 2, Math.PI / 2,
      ['"...There\'s food on the counter."', '"He didn\'t eat."']);

    // Bedroom door: pivot at (-1.5, 0, -8.05), panel offset +Z
    makeDoor(-1.5, -8.05, 0, DOOR_W / 2, -Math.PI / 2,
      ['"...This is his room."']);

    /* ---- PROPS ---- */
    buildProps();
  }

  function buildProps() {
    /* -- Living room -- */
    // couch seat
    bx(2.4, 0.45, 0.9,  M.couch, -5.5, 0.225, -2.8);
    // couch backrest
    bx(2.4, 0.6,  0.15, M.couch, -5.5, 0.525, -3.2);
    // TV body
    bx(1.8, 1.0,  0.08, M.dark,  -5.5, 1.5,   -7.9);
    // TV screen
    bx(1.6, 0.85, 0.06, M.screen,-5.5, 1.52,  -7.85);

    /* -- Kitchen -- */
    // counter
    bx(4.5, 0.9,  0.6,  M.table, 5.25, 0.45, -7.7);
    // plate
    bx(0.28, 0.025, 0.28, new THREE.MeshLambertMaterial({ color: 0xddddcc }),
       5.0, 0.915, -7.4);

    /* -- Bedroom -- */
    // bed frame
    bx(1.4, 0.4,  2.0,  M.couch, -7, 0.2,   -11.5);
    // headboard
    bx(1.4, 0.55, 0.1,  M.couch, -7, 0.475, -10.55);
    // desk surface
    bx(1.6, 0.05, 0.7,  M.table, -4, 0.75,  -13.7);
    // monitor body
    bx(0.5, 0.38, 0.06, M.dark,  -4, 0.94,  -13.38);
    // monitor screen glow
    bx(0.44, 0.32, 0.01, new THREE.MeshBasicMaterial({ color: 0x0a1018 }),
       -4, 0.94, -13.34);
    // PC tower
    bx(0.2, 0.42, 0.38, M.dark, -4.7, 0.21, -13.65);
  }

  /* ---------- input ---------- */
  function bindInput() {
    var canvas = renderer.domElement;

    canvas.addEventListener('click', function () {
      canvas.requestPointerLock();
    });

    document.addEventListener('pointerlockchange', function () {
      locked = document.pointerLockElement === canvas;
    });

    document.addEventListener('mousemove', function (e) {
      if (!locked) return;
      yaw   -= e.movementX * LOOK_SENS;
      pitch -= e.movementY * LOOK_SENS;
      pitch  = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
    });

    document.addEventListener('keydown', function (e) {
      keys[e.code] = true;

      /* textbox advance */
      if (tbActive) {
        if (e.code === 'KeyZ' || e.code === 'Enter' || e.code === 'Space') {
          if (tbDone) {
            if (tbQueue.length > 0) {
              startNextLine();
            } else {
              closeTextbox();
            }
          } else {
            /* skip typewriter */
            tbShown = tbCurrent;
            tbDone  = true;
            document.getElementById('g3d-tb-text').textContent = tbShown;
            document.getElementById('g3d-tb-arrow').style.display = 'block';
          }
        }
      }

      /* door interaction */
      if (e.code === 'KeyE' && !tbActive && nearDoor !== null) {
        toggleDoor(nearDoor);
      }

      /* flashlight */
      if (e.code === 'KeyF') {
        flashlight.visible = !flashlight.visible;
        var el = document.getElementById('g3d-flashlight-off');
        el.style.display = flashlight.visible ? 'none' : 'block';
      }
    });

    document.addEventListener('keyup', function (e) {
      keys[e.code] = false;
    });

    window.addEventListener('resize', function () {
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });
  }

  /* ---------- door logic ---------- */
  function toggleDoor(door) {
    door.open = !door.open;
    door.targetAngle = door.open ? door.openAngle : 0;

    if (door.comments && door.open) {
      var idx = door.commentIdx % door.comments.length;
      door.commentIdx++;
      showText([door.comments[idx]]);
    }
  }

  function updateDoors(dt) {
    for (var i = 0; i < doors.length; i++) {
      var door = doors[i];
      door.curAngle += (door.targetAngle - door.curAngle) * Math.min(1, dt * 8);
      door.pivot.rotation.y = door.curAngle;
    }
  }

  /* ---------- door proximity detection ---------- */
  function checkDoorProximity() {
    raycaster.setFromCamera({ x: 0, y: 0 }, camera);
    var hits = raycaster.intersectObjects(doorMeshes, false);
    var prompt = document.getElementById('g3d-prompt');
    if (hits.length > 0 && hits[0].distance < 2.5) {
      /* find door object that owns this mesh */
      nearDoor = null;
      for (var i = 0; i < doors.length; i++) {
        if (doors[i].mesh === hits[0].object) { nearDoor = doors[i]; break; }
      }
      prompt.style.display = 'block';
    } else {
      nearDoor = null;
      prompt.style.display = 'none';
    }
  }

  /* ---------- update ---------- */
  function update(dt) {
    /* movement */
    var sinY = Math.sin(yaw);
    var cosY = Math.cos(yaw);
    var dx = 0, dz = 0;
    if (keys['KeyW'] || keys['ArrowUp'])    { dx -= sinY; dz -= cosY; }
    if (keys['KeyS'] || keys['ArrowDown'])  { dx += sinY; dz += cosY; }
    if (keys['KeyA'] || keys['ArrowLeft'])  { dx -= cosY; dz += sinY; }
    if (keys['KeyD'] || keys['ArrowRight']) { dx += cosY; dz -= sinY; }
    var len = Math.sqrt(dx * dx + dz * dz);
    if (len > 0.001) { dx /= len; dz /= len; }
    var nx = camera.position.x + dx * SPEED * dt;
    var nz = camera.position.z + dz * SPEED * dt;
    if (canMoveTo(nx, camera.position.z)) camera.position.x = nx;
    if (canMoveTo(camera.position.x, nz)) camera.position.z = nz;
    camera.position.y = PLAYER_H;

    /* look */
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    /* textbox typewriter */
    if (tbActive && !tbDone) {
      tbTimer += dt;
      var charsToShow = Math.floor(tbTimer * TB_CPS);
      if (charsToShow >= tbCurrent.length) {
        tbShown = tbCurrent;
        tbDone  = true;
        document.getElementById('g3d-tb-arrow').style.display = 'block';
      } else {
        tbShown = tbCurrent.substring(0, charsToShow);
      }
      document.getElementById('g3d-tb-text').textContent = tbShown;
    }

    /* door proximity */
    checkDoorProximity();

    /* door animation */
    updateDoors(dt);

    /* triggers */
    if (!tbActive) {
      checkTriggers(camera.position.x, camera.position.z);
    }
  }

  /* ---------- loop ---------- */
  function loop() {
    if (!running) return;
    rafId = requestAnimationFrame(loop);
    var dt = Math.min(clock.getDelta(), 0.05);
    update(dt);
    renderer.render(scene, camera);
  }

  /* ---------- public API ---------- */
  window.startGame3D = function () {
    var wrap = document.getElementById('g3d-wrap');
    wrap.style.display = 'block';
    if (!scene) init();
    running = true;
    clock.start();
    loop();
    setTimeout(function () {
      var canvas = wrap.querySelector('canvas');
      if (canvas && canvas.requestPointerLock) canvas.requestPointerLock();
    }, 500);
  };

  window.stopGame3D = function () {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    var wrap = document.getElementById('g3d-wrap');
    if (wrap) wrap.style.display = 'none';
    if (document.exitPointerLock) document.exitPointerLock();
  };

}());
