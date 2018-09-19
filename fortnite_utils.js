/**
 * Fortnite Hack
 * @author Windy
 *
 */

load('fortnite_addr.js');


const BONES_DRAW = [
  [BONES.BONE_PELVIS_1, BONES.BONE_MISC_L_FOOT],
  [BONES.BONE_PELVIS_1, BONES.BONE_MISC_R_FOOT],
  [BONES.BONE_PELVIS_1, BONES.BONE_MISC_R_HAND_1]
];

load('utils/unreal4.js');

class Fortnite extends Unreal4 {

  constructor () {
    super();

    this.func = {
      DeObfuscateName: 0,
      SetControlRotationGuarded: 0,
      GetCameraCachePOV: 0,
      ProcessEvent: 0,
      // UACGuardValueHelperSet:0
    };


    this.UWorld = 0;
    this.pPersistentLevel = 0;
    this.pGameInstance = 0;
    this.pLocalPlayerArray = 0;
    this.pLocalPlayer = 0;
    this.pLocalPlayerController = 0;
    this.pLocalPlayerAPawn = 0;
    this.pViewportClient = 0;
    this.pFortPlayerCameraBase = 0;
    this.POV = 0;
    this.pGGameThreadId = 0;

    this._cachedNames = {
      player: [],
      golfcar: [],
      shoppingcar: [],
      pickup: [],
      airdrop: [],
      llamap: [],
      rift: [],
      playerbuild: [],
    };


    {

      //  FF 15 90 29 ED 01     call  cs:qword_1436093D8 ; GetCurrentThreadId
      //  3B 05 FA 29 C4 03     cmp   eax, cs:?GGameThreadId@@3IA ; uint GGameThreadId
      //  0F 94 C1              setz  cl
      //  84 C9                 test  cl, cl
      let address = findPattern(SIG.GAME_THREAD_ID, SIG.GAME_THREAD_ID_MASK);
      if (address <= 0) {
        console.error('can\'t find SIG.GGameThreadId');
        exit();
      }
      address += 6; // cmp xxx
      let offset = readInt(address + 2);
      this.pGGameThreadId = address + 6 + offset;
      log('Fortnite.pGGameThreadId'.padEnd(32), hex(this.pGGameThreadId));
    }


    {
      this.func.SetControlRotationGuarded = findPattern(SIG.SET_CONTROL_ROTATION_GUARDED, SIG.SET_CONTROL_ROTATION_GUARDED_MASK); // AFortPlayerController::SetControlRotationGuarded
      log('func.SetControlRotationGuarded'.padEnd(32), hex(this.func.SetControlRotationGuarded));
      if (!this.func.SetControlRotationGuarded) {
        console.error('can\'t find SIG.SetControlRotationGuarded');
        exit();
      }

      // FMinimalViewInfo *__fastcall AFortPlayerCameraBase::GetCameraCachePOV(AFortPlayerCameraBase *this, FMinimalViewInfo *result)
      this.func.GetCameraCachePOV = findPattern(SIG.GET_CAMERA_CACHE_CACHE_POV, SIG.GET_CAMERA_CACHE_CACHE_POV_MASK);
      log('func.GetCameraCachePOV'.padEnd(32), hex(this.func.GetCameraCachePOV));
      if (!this.func.GetCameraCachePOV) {
        console.error('can\'t find SIG.GetCameraCachePOV');
        exit();
      }

      /*
      this.func.UACGuardValueHelperSet = findPattern(SIG.VALUE_GUARD_HELPER, SIG.VALUE_GUARD_HELPER_MASK); // UACGuardValueHelper::Set
      log('func.UACGuardValueHelperSet'.padEnd(32), hex(this.func.UACGuardValueHelperSet));
      if (!this.func.UACGuardValueHelperSet) {
          log('get UACGuardValueHelperSet failed');
          exit();
      }
      */

    }
  }


  hijackThreadId () {
    if (!this._origin_threadId) {
      this._origin_threadId = invoke('GetCurrentThreadId');
      this.GGameThreadId = readDWord(this.pGGameThreadId);
      log('GGameThreadId'.padEnd(32), this.GGameThreadId);
    }
    ChangeCurrentThreadId(this.GGameThreadId);
  }

  restoreThreadId () {
    if (this._origin_threadId)
      ChangeCurrentThreadId(this._origin_threadId);
  }

  /**
   * 更新相关地址(对局等)
   * @constructor
   */
  updateAddress () {
    this.UWorld = readPointer(Unreal4.pUWorld);
    if (!this.UWorld) {
      return false;
    }

    this.pPersistentLevel = readPointer(this.UWorld + OFFSET.UWorld_PersistentLevel);
    this.pGameInstance = readPointer(this.UWorld + OFFSET.UWorld_OwningGameInstance);		                            // pUWorld->OwningGameInstance
    this.pLocalPlayerArray = readPointer(this.pGameInstance + OFFSET.UGameInstance_LocalPlayers);			              // pGameInstance->LocalPlayers
    this.pLocalPlayer = readPointer(this.pLocalPlayerArray);			                                                  // pGameInstance->LocalPlayers
    this.pLocalPlayerController = readPointer(this.pLocalPlayer + OFFSET.ULocalPlayer_PlayerController);		        // pLocalPlayer->PlayerController
    this.pViewportClient = readPointer(this.pLocalPlayer + OFFSET.ULocalPlayer_ViewportClient);				              // pLocalPlayer->ViewportClient
    this.pFortPlayerCameraBase = readPointer(this.pLocalPlayerController + OFFSET.APlayerController_PlayerCameraManager);
    this.pLocalPlayerAPawn = readPointer(this.pLocalPlayerController + OFFSET.APlayerController_AcknowledgedPawn);	// pAPlayerController->Pawn;

    let Vtables = readPointer(this.pLocalPlayerController);
    this.func.ProcessEvent = readPointer(Vtables + sizeof.DWORD_PTR * OFFSET.AActor_ProcessEvent_Index);            // AActor->Vtables[64];

    this.POV = this.getCameraCache();
    return true;
  }

  /**
   * 缓存我们需要的 GNames
   * @constructor
   */
  cacheNames () {
    console.log('cacheNames...');
    const TNameEntryArray = Unreal4.getGNames();
    for (let i = 0,
           cnt_player = 0, cnt_golfcar = 0, cnt_shoppingcar = 0,
           cnt_pickup = 0, cnt_airdop = 0, cnt_llama = 0, cnt_rift = 0,
           cnt_playerbuild = 0
      ; i < TNameEntryArray.NumElements; i++) {

      if (cnt_player === 1 &&
        cnt_pickup === 3 && cnt_airdop === 2 && cnt_llama === 1 &&
        cnt_rift === 1 &&
        cnt_golfcar === 1 && cnt_shoppingcar === 1 &&
        cnt_playerbuild === 12
      ) {
        console.log('IDs retrieved');
        return true;
      }

      let name = TNameEntryArray.getChunk(i).getAnsiName();
      if (!name) continue;

      if (name === ("PlayerPawn_Athena_C")) {
        console.log(name, i);
        this._cachedNames.player[cnt_player++] = i;
      }
      else if (name === "GolfCartVehicleSK_C") {
        console.log(name, i);
        this._cachedNames.golfcar[cnt_golfcar++] = i;
      }
      else if (name === "ShoppingCartVehicleSK_C") {
        console.log(name, i);
        this._cachedNames.shoppingcar[cnt_shoppingcar++] = i;
      }
      else if (name === "FortPickupAthena" || name === "CBGA_HealthShieldRegen_C" /*小盾*/ || name === "CBGA_ShieldsSmall_C" /*小盾*/) {
        console.log(name, i);
        this._cachedNames.pickup[cnt_pickup++] = i;
      }
      else if (name === "AthenaSupplyDrop_BDay_C" || name === "AthenaSupplyDrop_C") {
        console.log(name, i);
        this._cachedNames.airdrop[cnt_airdop++] = i;
      }
      else if (name === "AthenaSupplyDrop_Llama_C"/*小马箱子*/) {
        console.log(name, i);
        this._cachedNames.llamap[cnt_llama++] = i;
      }
      else if (name === "BGA_RiftPortal_Athena_C") {
        console.log(name, i);
        this._cachedNames.rift[cnt_rift++] = i;
      }
      else if (0
        || name === "PBWA_W1_Solid_C" || name === "PBWA_W1_Floor_C" || name === "PBWA_W1_StairW_C" || name === "PBWA_W1_RoofC_C" // 木头
        || name === "PBWA_S1_Solid_C" || name === "PBWA_S1_Floor_C" || name === "PBWA_S1_StairW_C" || name === "PBWA_S1_RoofC_C" // 石头
        || name === "PBWA_M1_Solid_C" || name === "PBWA_M1_Floor_C" || name === "PBWA_M1_StairW_C" || name === "PBWA_M1_RoofC_C"// 钢铁
      ) {
        console.log(name, i);
        this._cachedNames.playerbuild[cnt_playerbuild++] = i;
      }
    }

    return false;
  }

  getCameraCache () {
    if (!this._cameracache_pov) {
      // 当前摄像机信息 FMinimalViewInfo
      this._cameracache_pov = malloc(0x1000);
      // 自瞄时候的 ControlRotation
      this._aim_rotation = malloc(0xC);
    }


    this.hijackThreadId();
    fastcall(this.func.GetCameraCachePOV, this.pFortPlayerCameraBase, this._cameracache_pov);
    this.restoreThreadId();

    return this._cameracache_pov;

  }

  getCameraCacheObject () {
    return {
      Location: {
        X: readFloat(this._cameracache_pov),
        Y: readFloat(this._cameracache_pov + 4),
        Z: readFloat(this._cameracache_pov + 8),
      },
      Rotation: {
        Pitch: readFloat(this._cameracache_pov + 0xC),
        Yaw: readFloat(this._cameracache_pov + 0x10),
        Roll: readFloat(this._cameracache_pov + 0x14),
      },
      FOV: readFloat(this._cameracache_pov + 0x18),
    }
  }

  /**
   * 获取自身坐标
   */
  getLocalPlayerLocation () {
    return {
      x: readFloat(this.pLocalPlayer + OFFSET.ULocalPlayer_LastViewLocation),
      y: readFloat(this.pLocalPlayer + OFFSET.ULocalPlayer_LastViewLocation + 4),
      z: readFloat(this.pLocalPlayer + OFFSET.ULocalPlayer_LastViewLocation + 8)
    }
  }

  static getLevels () {
    return {
      list: readPointer(Unreal4.pUWorld + OFFSET.UWorld_Levels),
      count: readPointer(Unreal4.pUWorld + OFFSET.UWorld_Levels + sizeof.DWORD_PTR),
    }
  }

  getActors (pLevel) {
    return {
      list: readPointer(pLevel + OFFSET.ULevel_AActors),
      count: readInt(pLevel + OFFSET.ULevel_AActors + sizeof.DWORD_PTR),
      get (i) {
        let addr = readPointer(this.list + i * sizeof.DWORD_PTR);
        if (!addr) {
          return null;
        }
        return new AActor(addr)
      }
    }
  }

  free () {
    g_fn.restoreThreadId();
    if (this._cameracache_pov) {
      free(this._cameracache_pov);
      free(this._aim_rotation);
    }
  }
}

