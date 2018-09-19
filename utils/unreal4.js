class Unreal4 {
  constructor () {
    {
      let address = findPattern(SIG.GLOBAL_OBJECTS, SIG.GLOBAL_OBJECTS_MASK);
      if (address <= 0) {
        console.error('can\'t find SIG.GLOBAL_OBJECTS');
        exit();
      }
      let offset = readInt(address + 3);
      Unreal4.pGObjects = address + 7 + offset;
      log('Unreal4.pGObjects'.padEnd(32), hex(Unreal4.pGObjects));
    }

    {
      let address = findPattern(SIG.GLOBAL_NAMES, SIG.GLOBAL_NAMES_MASK);
      if (address <= 0) {
        console.error('can\'t find SIG.GLOBAL_NAMES');
        exit();
      }
      let offset = readInt(address + 3);
      Unreal4.pGNames = address + 7 + offset;
      log('Unreal4.pGNames'.padEnd(32), hex(Unreal4.pGNames));
    }

    {
      let address = findPattern(SIG.UWORLD, SIG.UWORLD_MASK);
      if (address <= 0) {
        console.error('can\'t find SIG.UWORLD');
        exit();
      }
      let offset = readInt(address + 3);
      Unreal4.pUWorld = address + 7 + offset;
      log('Unreal4.pUWorld'.padEnd(32), hex(Unreal4.pUWorld));
    }

    {
      let pGetPlainNameString = findPattern(SIG.GET_PLAIN_NAME_STRING, SIG.GET_PLAIN_NAME_STRING_MASK); // FName::GetPlainNameString
      if (pGetPlainNameString <= 0) {
        console.error('can\'t find SIG.GET_PLAIN_NAME_STRING');
        exit();
      }

      // 0x50 因为上面有个 wchar类型 的, 在 0x27位置, 而 char类型 在0x85位置, 需要跳过去
      let callJumpDeObfuscate = findPattern(pGetPlainNameString + 0x50, 0xFF, SIG.DE_OBFUSCATE, SIG.DE_OBFUSCATE_MASK); // call j_FNameEntry::DeObfuscate
      if (callJumpDeObfuscate <= 0) {
        console.error('can\'t find SIG.DE_OBFUSCATE');
        exit();
      }

      let j_offset = readInt(callJumpDeObfuscate + 1);
      let jumpDeObfuscate = callJumpDeObfuscate + 5 + j_offset; // j_FNameEntry::DeObfuscate


      // jumpDeObfuscate 这个函数， 内部直接调用了 deObfuscate
      // 因此下面是多余的 不要也可以
      let callDeObfuscate = findPattern(jumpDeObfuscate, 0xFF, "\xE8\x00\x00\x00\x00", "x????"); // call FNameEntry::DeObfuscate
      if (callDeObfuscate < 1) {
        console.error('can\'t find callDeObfuscate from jumpDeObfuscate');
        exit();
      }

      let offset = readInt(callDeObfuscate + 1);
      Unreal4.func.DeObfuscateName = callDeObfuscate + 5 + offset;  // FNameEntry::DeObfuscate
      log('Unreal4.func.DeObfuscateName'.padEnd(32), hex(Unreal4.func.DeObfuscateName));
    }

    // Decoy_Size
    {
      let found = false;
      let objects_data = readBytes(Unreal4.pGObjects, 0x1000);
      for (let i = 0; i < objects_data.length; i += 4) {
        let ObjFirstGCIndex = intBinary2Number(objects_data.slice(i, i + 4));
        if (90000 < ObjFirstGCIndex && ObjFirstGCIndex < 100000) {
          let ObjLastNonGCIndex = intBinary2Number(objects_data.slice(i + 4, i + 8));
          if (90000 < ObjLastNonGCIndex && ObjLastNonGCIndex < 100000) {
            OFFSET.FUObjectArray_Decoy_Size = i;
            log('FUObjectArray_Decoy_Size'.padEnd(32), i);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        console.error('can\'t find FUObjectArray_Decoy_Size');
        exit();
      }

      found = false;
      let names_data = readBytes(readPointer(Unreal4.pGNames), 0x1000);
      for (let i = 0; i < names_data.length; i += 4) {
        let Chunk_0 = int64Binary2Number(names_data.slice(i, i + 8));
        if (0xFFFFFF < Chunk_0 && Chunk_0 < 0xFFFFFFFF) {
          OFFSET.FName_Decoy1_Size = i;
          log('FName_Decoy1_Size'.padEnd(32), i);
          found = true;
          break;
        }
      }
      if (!found) {
        console.error('can\'t find FName_Decoy1_Size');
        exit();
      }

      found = false;
      let names_data2 = readBytes(readPointer(Unreal4.pGNames) + OFFSET.FName_Decoy1_Size + sizeof.DWORD_PTR * 128, 0x1000);
      for (let i = 0; i < names_data2.length; i += 4) {
        let NumElements = intBinary2Number(names_data2.slice(i, i + 4));
        if (0 < NumElements) {
          OFFSET.FName_Decoy2_Size = i;
          log('FName_Decoy2_Size'.padEnd(32), i);
          found = true;
          break;
        }
      }
      if (!found) {
        console.error('can\'t find FName_Decoy2_Size');
        exit();
      }
    }
  }

  static getGNames () {
    let TNameEntryArray = readPointer(this.pGNames);

    return {
      getChunk (id) {
        let Chunks = readPointer(TNameEntryArray + parseInt(id / 16384) * 8 + OFFSET.FName_Decoy1_Size);
        return {
          FNameEntry: readPointer(Chunks + parseInt(id % 16384) * 8),
          /**
           * @return { String| null}
           */
          getAnsiName () {
            if (!this.FNameEntry) return null;

            let AnsiName = this.FNameEntry + 0x10; // AnsiName
            let DecryptedBuffer = malloc(1024);

            fastcall(Unreal4.func.DeObfuscateName, AnsiName, DecryptedBuffer);

            let result = readString(DecryptedBuffer);
            free(DecryptedBuffer);

            return result;
          }
        };
      },
      /**
       *
       * @param id
       * @returns {*|String}
       */
      get (id) {
        return this.getChunk(id).getAnsiName()
      },
      NumElements: readInt(TNameEntryArray + OFFSET.FName_Decoy1_Size + sizeof.DWORD_PTR * 128 + OFFSET.FName_Decoy2_Size),
      NumChunks: readInt(TNameEntryArray + OFFSET.FName_Decoy1_Size + sizeof.DWORD_PTR * 128 + OFFSET.FName_Decoy2_Size + sizeof.int)
    };
  }


  static getName (object) {
    return (new UObject(object)).getName()
  }

  static getFullName (object) {
    return (new UObject(object)).getFullName()
  }


  static getGObjects () {

    // struct TUObjectArray
    const ObjObjects = Unreal4.pGObjects + OFFSET.FUObjectArray_Decoy_Size + 0x10;

    return {
      // ObjObjects.Objects ( struct TUObjectArray 的第一个成员);
      Objects: ObjObjects,
      get (id) {
        let ppObjects = readPointer(this.Objects);
        let pObjects = readPointer(ppObjects + parseInt(id / 66560) * 8);
        let Object = readPointer(pObjects + parseInt(id % 66560) * 8);
        return new UObject(Object);
      },
      MaxElements: readInt(ObjObjects + 0x10),
      NumElements: readInt(ObjObjects + 0x14),
      MaxChunks: readInt(ObjObjects + 0x18),
      NumChunks: readInt(ObjObjects + 0x2C),
    }
  }

  static findObject (name) {
    const GObjects = Unreal4.getGObjects();
    for (let i = 0; i < GObjects.NumChunks; i++) {
      let obj = GObjects.get(i);
      if (name === obj.getName()) {
        return obj
      }
    }
    return null;
  }

  static findObjectFull (fullName) {
    const GObjects = Unreal4.getGObjects();
    for (let i = 0; i < GObjects.NumChunks; i++) {
      let obj = GObjects.get(i);
      if (fullName === obj.getFullName()) {
        return obj
      }
    }
    return null;
  }

  /**
   * @return {boolean}
   */
  static IsA (pSelf, pClass) {
    for (let super_ = readPointer(pSelf + OFFSET.UObject_Class); super_ > 0; super_ = readPointer(super_ + OFFSET.UStruct_SuperField)) {
      if (super_ === pClass)
        return true;
    }
    return false;
  }

  /**
   * 动态获取结构体偏移
   * @param {Number} object
   * @returns {{getList: Function, get: Function} | null}
   */
  static getProperties (object) {
    /**
     * @type {UObject}
     */
    const obj = new UObject(object);
    /**
     * @type {UStruct}
     */
    let class_temp = obj.getClass();

    if (Unreal4.IsA(obj, UStruct.StaticClass())) {
      class_temp = new UClass(obj);
    }

    return {
      /**
       * 输出所有
       */
      getList () {
        for (; class_temp !== null; class_temp = class_temp.getSuperField()) {
          for (let it = class_temp.getChildren(); it; it = it.getNext()) {
            console.log(it.getName().padEnd(32), hex(it.Offset_Internal).padStart(0x8), '(' + it.ArrayDim * it.ElementSize + ')');
          }
        }
      },
      /**
       * @param property
       * @returns {{position: Number, size: number} | null}
       */
      get (property) {
        for (; class_temp !== null; class_temp = class_temp.getSuperField()) {
          for (let it = class_temp.getChildren(); it; it = it.getNext()) {
            if (it.getName() === property) {
              it = new UProperty(it._ptr); // 这里其实 it 就是 UProperty  只不过不能强制转换
              return {
                position: it.Offset_Internal,
                size: it.ArrayDim * it.ElementSize
              };
            }
          }
        }
        return null;
      }
    };
  }


  static Invoke (object, name, params) {
    const func = this.findObject(name);
    const lpParams = malloc(params.length * sizeof.DWORD_PTR);
    let p = lpParams;
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        if (key[0] === 'b') {
          writeByte(p, params[key]);
          p += 1;
        } else if (key[0] === 's') {
          writeShort(p, params[key]);
          p += 2;
        } else if (key[0] === 'i') {
          writeInt(p, params[key]);
          p += sizeof.int;
        } else if (key[0] === 'p') {
          writePointer(p, params[key]);
          p += sizeof.DWORD_PTR;
        } else if (key[0] === 'f') {
          writeFloat(p, params[key]);
          p += sizeof.float;
        }
      }
    }
    const ret = invoke(ProcessEvent, object, func._ptr, lpParams);
    free(lpParams);
    return ret;
  }
}

Unreal4.base = GetModuleBase();
Unreal4.pUWorld = 0;
// FUObjectArray
Unreal4.pGObjects = 0;
Unreal4.pGNames = 0;
Unreal4.func = {
  DeObfuscateName: 0
};


class UObject {
  constructor (object) {
    this._ptr = object;
    let offset = 0;

    this.VTableObject = readPointer(object + offset);
    offset += sizeof.DWORD_PTR;

    this.ObjectFlags = readInt(object + offset);
    offset += sizeof.int;

    this.InternalIndex = readInt(object + offset);
    offset += sizeof.int;

    this.Class = readPointer(object + offset);
    offset += sizeof.DWORD_PTR;

    this.Name = {
      ComparisonIndex: readPointer(object + offset),
      Number: readPointer(object + offset + sizeof.int),
    };
    offset += sizeof.DWORD_PTR;

    this.Outer = readPointer(object + offset);
    offset += sizeof.DWORD_PTR;

    this.offset = offset;
  }

  /**
   * @returns {boolean}
   */
  isValid () {
    return !!this._ptr;
  }

  /**
   * @returns {Number}
   */
  getIndex () {
    return this.InternalIndex
  }

  /**
   * @returns {UClass}
   */
  getClass () {
    return new UClass(this.Class);
  }

  /**
   * @returns {UObject}
   */
  getOuter () {
    return new UObject(this.Outer);
  }

  /**
   * @returns {String}
   */
  getName () {
    /**
     * @var {String}
     */
    let name = Unreal4.getGNames().get(this.Name.ComparisonIndex);
    if (this.Name.Number > 0) {
      name += '_' + this.Name.Number;
    }
    const pos = name.indexOf('/');
    if (pos === -1) {
      return name;
    }
    return name.substr(pos + 1);
  }

  getFullName () {
    if (this.getClass().isValid()) {
      let temp = '';
      for (let outer = this.getOuter(); outer.isValid(); outer = outer.getOuter()) {
        temp = outer.getName() + '.' + temp;
      }
      return this.getClass().getName() + ' ' + temp + this.getName();
    }

    return '(null)';
  }

  static StaticClass () {
    if (!this._static_object)
      this._static_object = Unreal4.findObjectFull('Class CoreUObject.Object');
    return this._static_object;
  }
}

class UField extends UObject {
  getNext () {
    let next = readPointer(this._ptr + this.offset);
    this.offset += sizeof.DWORD_PTR;
    return new UField(next)
  }

  static StaticClass () {
    if (!this._static_field)
      this._static_field = Unreal4.findObjectFull('Class CoreUObject.Field');
    return this._static_field;
  }
}

class UStruct extends UField {

  /**
   * @returns {UStruct|null}
   */
  getSuperField () {
    if (!this._SuperField) {
      let p = readPointer(this._ptr + 0x0030);
      p = p ? new UStruct(p) : null;
      this._SuperField = p;
    }
    return this._SuperField;
  }

  /**
   * 由于有很多类型, 这里统一返回指针
   * @returns {UField}
   */
  getChildren () {
    if (!this._Children) {
      let p = readPointer(this._ptr + 0x0038);
      p = p ? new UField(p) : null;
      this._Children = p;
    }
    return this._Children;
  }


  static StaticClass () {
    if (!this._static_struct)
      this._static_struct = Unreal4.findObjectFull('Class CoreUObject.Struct');
    return this._static_struct;
  }
}

class UProperty extends UField {
  constructor (object) {
    super(object);

    this.ArrayDim = readInt(object + 0x0030);
    this.ElementSize = readInt(object + 0x0034);
    this.Offset_Internal = readInt(object + 0x0044);
  }
}

class UClass extends UStruct {
  static StaticClass () {
    if (!this._static_class)
      this._static_class = Unreal4.findObjectFull('Class CoreUObject.Class');
    return this._static_class;
  }
}

class UFunction extends UStruct {
  static StaticClass () {
    if (!this._static_function)
      this._static_function = Unreal4.findObjectFull('Class CoreUObject.Function');
    return this._static_function;
  }
}

// class AActor extends UClass
class AActor {
  constructor (pActor) {
    this.pActor = pActor;
    this.id = readInt(pActor + OFFSET.UObject_Name_ComparisonIndex);
  }


  getLocation () {
    // class USceneComponent *RootComponent;
    let rootcomp = readPointer(this.pActor + OFFSET.AActor_RootComponent);
    if (!rootcomp)
      return null;
    // struct FVector RelativeLocation;
    return {
      x: readFloat(rootcomp + OFFSET.USceneComponent_RelativeLocation),
      y: readFloat(rootcomp + OFFSET.USceneComponent_RelativeLocation + 4),
      z: readFloat(rootcomp + OFFSET.USceneComponent_RelativeLocation + 8),
    }
  }

  getMesh () {
    const mesh = readPointer(this.pActor + OFFSET.ACharacter_Mesh);
    if (!mesh) {
      return null;
    }
    const bone_root = mesh + OFFSET.USkeletalMeshComponent_ComponentToWorld;
    const bone_arr = readPointer(mesh + OFFSET.USkeletalMeshComponent_BoneSpaceTransforms);
    if (!bone_arr) {
      return null;
    }
    return {
      mesh: mesh,
      getBone (boneId) {
        return GetBoneLocation(bone_root, bone_arr, boneId);
      },
      draw () {
        // const neck = GetBoneLocation(bone_root, bone_arr, BONES.BONE_NECK); // 脖子
        // const pelvis = GetBoneLocation(bone_root, bone_arr, BONES.BONE_PELVIS_1); // 骨盆

        let previous, current, previous_pos, current_pos;

        for (let a of BONES_DRAW) {
          previous = { x: 0, y: 0, z: 0 };
          for (let bone of a) {
            current = this.getBone(bone);
            if (previous.x === 0) {
              previous = current;
            }

            previous_pos = WorldToScreen(previous, g_fn.POV, g_target.center);
            current_pos = WorldToScreen(current, g_fn.POV, g_target.center);
            g_d3d9.drawLine(previous_pos.x, previous_pos.y, current_pos.x + 5, current_pos.y + 5, COLOR.LightGreen_a);
            previous = current;
          }

        }

      }
    }
  }

  getTeam () {
    if (this._team)
      return this._team;
    let playerState = readPointer(this.pActor + OFFSET.APawn_PlayerState);
    this._team = readByte(playerState + OFFSET.APlayerState_TeamIndex);
    return this._team;
  }

  isTeammate (team) {
    return this.getTeam() === team
  }

  static isPlayer (id) {
    return g_fn._cachedNames.player.includes(id);
  }

  static isGolfCar (id) {
    return g_fn._cachedNames.golfcar.includes(id);
  }

  static isShoppingCar (id) {
    return g_fn._cachedNames.shoppingcar.includes(id);
  }

  static isPickUp (id) {
    return g_fn._cachedNames.pickup.includes(id);
  }

  static isAirdop (id) {
    return g_fn._cachedNames.airdrop.includes(id);
  }

  static isLlamap (id) {
    return g_fn._cachedNames.llamap.includes(id);
  }

  static isRift (id) {
    return g_fn._cachedNames.rift.includes(id);
  }

  static isPlayerBuild (id) {
    return g_fn._cachedNames.playerbuild.includes(id);
  }
}