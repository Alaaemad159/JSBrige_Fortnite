/**
 * Fortnite Hack
 * @author Windy
 */

load('utils/helper.js');
load('utils/convert_number.js');
load('utils/d3d9.js');
load('utils/options.js');

const USE_TOPMOST = true;

let g_hWnd = 0;

let g_target = {
  hWnd: 0,
  rect: {
    left: 0, top: 0, right: 0, bottom: 0
  },
  width: 0, height: 0,
  center: {
    x: 0, y: 0
  }
};

/**
 * 核心 Direct3D
 * @type {D3D9}
 */
let g_d3d9;
/**
 * 菜单
 * @type {Menu}
 */
let g_menu;
let g_exit = false;
/**
 * @type {Number}
 */
let g_aimkey_state = 0;
/**
 * @type {AActor}
 */
let g_best_to_aim_actor = null;
/**
 * @type {AActor}
 */
let g_aim_player = null;

function setupWindow () {
  console.log('waiting for game...');

  while (!g_target.hWnd) {
    g_target.hWnd = FindWindow('UnrealWindow', null);
    Sleep(100);
  }
  if (g_exit) return;

  const rc = g_target.rect;
  GetWindowRect(g_target.hWnd, rc);
  g_target.width = rc.right - rc.left;
  g_target.height = rc.bottom - rc.top;
  g_target.center.x = (rc.right - rc.left) / 2;
  g_target.center.y = (rc.bottom - rc.top) / 2;

  g_hWnd = CreateAlphaWindow(USE_TOPMOST, '#32770 (对话框)', '分析工具', 0, 0, 800, 600);

  // SetWindowDisplayAffinity(g_hWnd, 1);
  ShowWindow(g_hWnd, 1);
  g_d3d9 = new D3D9(g_hWnd, g_target.width, g_target.height);
  g_menu = new Menu(g_d3d9);

  console.log('hWnd:'.padEnd(32), hex(g_hWnd));
  return g_hWnd;
}

function mainLoop () {
  while (1) {
    if (!ProcessMessage()) {
      break;
    }
    if (g_exit) {
      console.log('exit...');
      break;
    }

    const rc = { left: 0, top: 0, right: 0, bottom: 0 };
    if (!GetWindowRect(g_target.hWnd, rc)) {
      console.log('closing...');
      break;
    }
    g_target.width = rc.right - rc.left;
    g_target.height = rc.bottom - rc.top;
    g_target.center.x = (rc.right - rc.left) / 2;
    g_target.center.y = (rc.bottom - rc.top) / 2;

    MoveWindow(g_hWnd, rc.left, rc.top, g_target.width, g_target.height, true);
    if (!USE_TOPMOST) {
      if (GetForegroundWindow() === g_target.hWnd) {
        SetWindowPos(g_target.hWnd, g_hWnd, 0, 0, 0, 0, 3); // SWP_NOMOVE | SWP_NOSIZE
      }
    }
    render();
    Sleep(5);
  }
  g_d3d9.release();
  DestroyWindow(g_hWnd);
}

function exitHack () {
  g_exit = true;
}

let FPS = {
  time: []
};

function render () {
  g_d3d9.begin();
  g_menu.draw();

  {
    const now = invoke('Kernel32.GetTickCount');
    FPS.time.push(now);
    FPS.time = FPS.time.filter(e => now - e < 1000);
    g_d3d9.drawString(50, 30, COLOR.Green_a, "FPS: " + FPS.time.length);
  }


  // HotKeys
  {
    if (GetAsyncKeyState(VK.END) & 1) {
      exitHack();
      return;
    }
    if (GetAsyncKeyState(VK.HOME) & 1) {
      g_menu.show = !g_menu.show;
    }
    if (GetAsyncKeyState(VK.UP) & 1) {
      g_menu.toPrev();
    }
    if (GetAsyncKeyState(VK.DOWN) & 1) {
      g_menu.toNext();
    }
    if (GetAsyncKeyState(VK.LEFT) & 1) {
      g_menu.toggle(-1);
    }
    if (GetAsyncKeyState(VK.RIGHT) & 1) {
      g_menu.toggle(1);
    }

    g_aimkey_state = GetAsyncKeyState(AIM_KEY);
  }

  coreHack();

  g_d3d9.end();
}

load('fortnite_utils.js');
let g_fn;

function doAimBot () {
  if (g_aimkey_state & 1) { // 按下
    if (g_aim_player === null) {
      g_aim_player = g_best_to_aim_actor;
    }
  }

  if (GetAsyncKeyState(AIM_KEY_CHANGE)) { // 按了 // aim_change_key_state & 1 || aim_change_key_state & 0x8000
    g_aim_player = g_best_to_aim_actor;
  }

  if (g_aim_player !== null && g_aimkey_state) { // 按了


    const aim_mesh = g_aim_player.getMesh();
    if (!aim_mesh) {
      g_aim_player = null; // death, to next
      return;
    }


    const aim_location = aim_mesh.getBone(BONES.BONE_PELVIS_1);

    switch (g_menu.m_aimbot_at) {
      case 0: // 头部
        aim_location.z += 50;
        break;
      case 1: // 脖子
        aim_location.z += 40;
        break;
      case 2: // 胸部
        aim_location.z += 20;
        break;
      default:
        aim_location.z += 40;
        break;
    }

    const nowRotation = g_fn.pLocalPlayerController + OFFSET.AController_ControlRotation;
    writeFloat(nowRotation + 8, 0);

    CalcControlRotation(aim_location, g_fn.POV, nowRotation, g_fn._aim_rotation);


    // log('aim:', readFloat(g_fn._aim_rotation), readFloat(g_fn._aim_rotation + 4), readFloat(g_fn._aim_rotation + 8));

    g_fn.hijackThreadTls();
    fastcall(g_fn.func.SetControlRotationGuarded, g_fn.pLocalPlayerController, g_fn._aim_rotation);
    g_fn.restoreThreadTls();
  }

}

function coreHack () {
  g_d3d9.drawString(g_target.center.x - 4, g_target.center.y - 5, COLOR.Green_a, '+');

  if (!g_fn.updateAddress())
    return;

  /*
  {
    const POV = g_fn.getCameraCacheObject();

    g_d3d9.drawString(220, 50, COLOR.Green_a, 'POV.Location.X: ' + POV.Location.X);
    g_d3d9.drawString(220, 65, COLOR.Green_a, 'POV.Location.Y: ' + POV.Location.Y);
    g_d3d9.drawString(220, 80, COLOR.Green_a, 'POV.Location.Z: ' + POV.Location.Z);

    g_d3d9.drawString(220, 100, COLOR.Green_a, 'POV.Rotation.Pitch: ' + POV.Rotation.Pitch);
    g_d3d9.drawString(220, 115, COLOR.Green_a, 'POV.Rotation.Yaw: ' + POV.Rotation.Yaw);
    g_d3d9.drawString(220, 130, COLOR.Green_a, 'POV.Rotation.Roll: ' + POV.Rotation.Roll);

    g_d3d9.drawString(220, 150, COLOR.Green_a, 'POV.FOV: ' + POV.FOV);

    g_d3d9.drawString(220, 170, COLOR.Green_a, 'GGameThreadId: ' + readDWord(g_fn.pGGameThreadId));

  }
  */

  const self = new AActor(g_fn.pLocalPlayerAPawn);
  const self_location = g_fn.getLocalPlayerLocation();
  const actors = g_fn.getActors(g_fn.pPersistentLevel);

  let cnt_close_enemy = {
    400: 0,
    100: 0
  };
  let best_to_aim_distance = Number.MAX_VALUE;

  if (!actors.list || actors.count < 1 || actors.count > 10000) {
    return;
  }

  for (let i = 0; i < actors.count; i++) {
    const actor = actors.get(i);
    if (!actor || actor.pActor === g_fn.pLocalPlayerAPawn)
      continue;

    const pos = actor.getLocation();
    if (!pos)
      continue;

    const pos_screen = WorldToScreen(pos, g_fn.POV, g_target.center);

    const distance = (distance3D(self_location, pos) / 100).toFixed(1);

    if (AActor.isPlayer(actor.id)) {
      let is_teammate = actor.isTeammate(self.getTeam());
      if (g_menu.m_menus.show_player.open) {

        if (!g_menu.m_menus.show_teammate.open && is_teammate)
          continue;


        if (distance > 400)
          continue;

        if (!is_teammate) {
          cnt_close_enemy["400"]++;
          if (distance < 100) {
            cnt_close_enemy["100"]++;
          }
        }

        let color = 0;
        if (is_teammate) {
          color = COLOR.MediumSpringGreen_a;
        } else if (distance < 150) {
          color = COLOR.Red_a;
        } else if (distance < 300) {
          color = COLOR.Yellow_a;
        } else {
          color = COLOR.Green_a;
        }

        g_d3d9.drawString(pos_screen.x, pos_screen.y, color, distance + 'm');

        if (distance < 120) {
          const mesh = actor.getMesh();
          if (mesh) mesh.draw();
        }

      }

      {
        const screen_distance = distance2D(g_target.center, pos_screen) / 100;
        if (screen_distance < best_to_aim_distance
          && screen_distance < g_target.height // maybe in screen
          && !is_teammate // not my team
        ) {
          g_best_to_aim_actor = actor;
          best_to_aim_distance = screen_distance;
        }
      }
    }

    if (g_menu.m_menus.show_vehicle.open) {
      if (AActor.isGolfCar(actor.id)) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.Fuchsia_a, 'GCar\n' + distance + 'm')
      }
      if (AActor.isShoppingCar(actor.id)) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.Fuchsia_a, 'SCar\n' + distance + 'm')
      }
    }

    if (g_menu.m_menus.show_pickup.open || g_menu.m_menus.show_pickup_all.open) {
      if (distance > 400)
        continue;
      if (AActor.isAirdop(actor.id)) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.Turquoise_a, 'Airdop\n' + distance + 'm')
      }
      if (AActor.isLlamap(actor.id)) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.DeepBlue, 'Llama\n' + distance + 'm')


      }
      if (AActor.isRift(actor.id)) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.LightTurquoise_a, 'Rift\n' + distance + 'm')
      }

      if (g_menu.m_menus.show_pickup_all.open) {
        g_d3d9.drawString(pos_screen.x, pos_screen.y, COLOR.LightTurquoise_a, hex(actor.pActor) + ':' + actor.id + '[' + distance + 'm]')
      }
    }
  }

  if (cnt_close_enemy["400"]) {
    g_d3d9.drawStringBig(g_target.center.x - 100, 75, COLOR.Orange_a, "400米内敌人数: " + cnt_close_enemy["400"]);
    if (cnt_close_enemy["100"])
      g_d3d9.drawStringBig(g_target.center.x - 100, 90, COLOR.Red_a, "100米内敌人数: " + cnt_close_enemy["100"]);
  }

  // AimBot
  if (g_menu.m_menus.aimbot.open) {
    if (best_to_aim_distance !== Number.MAX_VALUE) {
      doAimBot();
    }
    else {
      g_best_to_aim_actor = null;
    }
  }

}

function main () {
  let buffer = malloc(260);
  invoke('kernel32.GetModuleFileNameA', null, buffer, 260);
  log('current:', readString(buffer));
  free(buffer);

  setupWindow();

  g_fn = new Fortnite();
  if (!g_fn.cacheNames()) {
    exitHack();
    console.error('CacheNames failed!');
    g_fn.free();
    return;
  }

  mainLoop();
  g_fn.free();
}

main();