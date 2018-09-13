// noinspection SpellCheckingInspection
/**
 * SIG
 */
const SIG = {
    GLOBAL_NAMES: "\x48\x8B\x05\x00\x00\x00\x00\x48\x85\xC0\x75\x00\xB9\x18\x06",
    GLOBAL_NAMES_MASK: "xxx????xxxx?xxx",
    GLOBAL_OBJECTS: "\x48\x8D\x0D\x00\x00\x00\x00\xC6\x05\x00\x00\x00\x00\x00\xE8\x00\x00\x00\x00\xC6\x05",
    GLOBAL_OBJECTS_MASK: "xxx????xx?????x????xx",
    UWORLD: "\x48\x8B\x1D\x00\x00\x00\x00\x48\x85\xDB\x74\x3B",
    UWORLD_MASK: "xxx????xxxxx",


    GET_PLAIN_NAME_STRING: "\x57\x48\x81\xEC\x40\x08\x00\x00\x48\x8B\x05\x00\x00\x00\x00\x48\x33\xC4\x48\x89\x84\x24\x30\x08\x00\x00\xF6\x01\x01\x48\x8B\xFA",
    GET_PLAIN_NAME_STRING_MASK: "xxxxxxxxxxx????xxxxxxxxxxxxxxxxx",

    DE_OBFUSCATE: "\xE8\x00\x00\x00\x00\x48\x8B\xF0\x33\xC0\x48\x89\x07",
    DE_OBFUSCATE_MASK: "x????xxxxxxxx",

    SET_CONTROL_ROTATION_GUARDED: '\x40\x53\x48\x83\xec\x20\x48\x8b\x01\x48\x8b\xd9\xff\x90\x38\x06\x00\x00\x48\x8B\xCB\x48\x83\xC4\x20\x5B\xE9',
    SET_CONTROL_ROTATION_GUARDED_MASK: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',

    DECODE_VIEW_INFO: '\x40\x55\x53\x57\x41\x56\x48\x8D\xAC\x24\x98\xFB\xFF\xFF',
    DECODE_VIEW_INFO_MASK: 'xxxxxxxxxxxxxx',


    // 这个函数负责设置一些加密后的值，比如人物 ControlRotation
    // VALUE_GUARD_HELPER: '\x41\x56\x48\x83\xEC\x20\x41\x8B\xD8\x48\x8D\x71\x0A\x48\x8B\xEA\x48\x8D\x79\x01\x4C\x8B\xF1',
    // VALUE_GUARD_HELPER_MASK: 'xxxxxxxxxxxxxxxxxxxxxxx',

};


const OFFSET = {

    UObject_Class: 0x0010,
    UObject_Name_ComparisonIndex: 0x0018,
    UStruct_SuperField: 0x0030,

    FText_Buffer: 0x0028,
    FText_Length: 0x0030,


    FUObjectArray_Decoy_Size: 0,
    FName_Decoy1_Size: 0,
    FName_Decoy2_Size: 0,


    UWorld_PersistentLevel: 0x0030,
    UWorld_Levels: 0x0160,
    UWorld_OwningGameInstance: 0x0190,

    /*
    00000000 baseclass_0                                UObject
    00000028 baseclass_28                               IInterface_AssetUserData
    00000030 URL                                        struct FURL
    000000A0 Actors                                     TArray<AActor *,FDefaultAllocator>
    000000B0 ActorsForGC                                TArray<AActor *,FDefaultAllocator>
    000000C0 OwningWorld                                class UWorld*
    000000C8 Model                                      class UModel*
    000000D0 ModelComponents                            TArray<UModelComponent *,FDefaultAllocator>
    000000E0 ActorCluster                               class ULevelActorContainer*
    000000E8 NumTextureStreamingUnbuiltComponents       int
    000000EC NumTextureStreamingDirtyResources          int
    */
    ULevel_AActors: 0x00A0,

    UGameInstance_LocalPlayers: 0x0038,
    ULocalPlayer_PlayerController: 0x0030,
    ULocalPlayer_ViewportClient: 0x0070,
    FViewportClient_World: 0x0078,

    AActor_ProcessEvent_Index: 64,         // LocalPlayerController->Vtable[64]

    /*
    00000000 baseclass_0       class UPlayer
    00000048 CachedUniqueNetId FUniqueNetIdRepl
    00000070 ViewportClient    class UGameViewportClient*
    00000078 Origin            FVector2D
    00000080 Size              FVector2D
    00000088 LastViewLocation  FVector
    00000094 AspectRatioAxisConstraint TEnumAsByte<enum EAspectRatioAxisConstraint>
    */
    ULocalPlayer_LastViewLocation: 0x0088,

    APlayerController_AcknowledgedPawn: 0x03B0,
    APlayerController_PlayerCameraManager: 0x03C8,
    APlayerCameraManager_CameraCache: 0x03A0,

    // class APlayerController : public AController
    AController_ControlRotation: 0x0390,

    AActor_RootComponent: 0x0158,   // class USceneComponent* RootComponent;
    USceneComponent_RelativeLocation: 0x015C,

    ACharacter_CharacterMovement: 0x0390,
    UCharacterMovementComponent_MovementMode: 0x01A8,

    ACharacter_Mesh: 0x0388,

    APawn_PlayerState: 0x0348,
    APlayerState_PlayerName: 0x0330,
    APlayerState_TeamIndex: 0x0B80,  // AFortPlayerStateAthena.TeamIndex
    APlayerState_CurrentHealth: 0x0AEC,  // AFortPlayerStateZone.CurrentHealth
    APlayerState_CurrentShield: 0x0AF4,  // AFortPlayerStateZone.CurrentShield

    USkeletalMeshComponent_BoneSpaceTransforms: 0x0718, // 在 AnimationData 与 RootBoneTranslation 之间的 UnknownData00
    USkeletalMeshComponent_ComponentToWorld: 0x0180, // USceneComponent.RelativeScale3D 的下一个

};


const BONES = {
    BONE_NULL_1: 0,
    BONE_NULL_2: 1,
    BONE_PELVIS_1: 2,
    BONE_PELVIS_2: 3,
    BONE_PELVIS_3: 4,
    BONE_TORSO: 5,

    BONE_CHEST_LOW: 6,
    BONE_CHEST: 7,

    // -------------------------

    BONE_CHEST_LEFT: 8,

    BONE_L_SHOULDER_1: 9,
    BONE_L_ELBOW: 10,

    BONE_L_HAND_ROOT_1: 11,

    BONE_L_FINGER_1_ROOT: 12,
    BONE_L_FINGER_1_LOW: 13,
    BONE_L_FINGER_1: 14,
    BONE_L_FINGER_1_TOP: 15,

    BONE_L_FINGER_2_ROOT: 16,
    BONE_L_FINGER_2_LOW: 17,
    BONE_L_FINGER_2: 18,
    BONE_L_FINGER_2_TOP: 19,

    BONE_L_FINGER_3_ROOT: 20,
    BONE_L_FINGER_3_LOW: 21,
    BONE_L_FINGER_3: 22,
    BONE_L_FINGER_3_TOP: 23,

    BONE_L_FINGER_4_ROOT: 24,
    BONE_L_FINGER_4_LOW: 25,
    BONE_L_FINGER_4_: 26,
    BONE_L_FINGER_4_TOP: 27,

    BONE_L_THUMB_ROOT: 28,
    BONE_L_THUMB_LOW: 29,
    BONE_L_THUMB: 30,

    BONE_L_HAND_ROOT_2: 31,
    BONE_L_WRIST: 32,
    BONE_L_ARM_LOWER: 33,

    BONE_L_SHOULDER_2: 34,

    BONE_L_ARM_TOP: 35,

    // -------------------------

    BONE_CHEST_TOP_1: 36,

    // -------------------------

    BONE_CHEST_RIGHT: 37,

    BONE_R_ELBOW: 38,

    BONE_R_HAND_ROOT_1: 39,

    BONE_R_FINGER_1_ROOT: 40,
    BONE_R_FINGER_1_LOW: 41,
    BONE_R_FINGER_1: 42,
    BONE_R_FINGER_1_TOP: 43,

    BONE_R_FINGER_2_ROOT: 44,
    BONE_R_FINGER_2_LOW: 45,
    BONE_R_FINGER_2: 46,
    BONE_R_FINGER_2_TOP: 47,

    BONE_R_FINGER_3_ROOT: 48,
    BONE_R_FINGER_3_LOW: 49,
    BONE_R_FINGER_3: 50,
    BONE_R_FINGER_3_TOP: 51,

    BONE_R_FINGER_4_ROOT: 52,
    BONE_R_FINGER_4_LOW: 53,
    BONE_R_FINGER_4_: 54,
    BONE_R_FINGER_4_TOP: 55,

    BONE_R_THUMB_ROOT: 56,
    BONE_R_THUMB_LOW: 57,
    BONE_R_THUMB: 58,

    BONE_R_HAND_ROOT: 59,
    BONE_R_WRIST: 60,
    BONE_R_ARM_LOWER: 61,

    BONE_R_SHOULDER: 62,

    BONE_R_ARM_TOP: 63,

    // -------------------------

    BONE_CHEST_TOP_2: 64,

    BONE_NECK: 65,
    BONE_HEAD: 66,

    // -------------------------

    BONE_L_LEG_ROOT: 67,
    BONE_L_KNEE: 68,
    BONE_L_FOOT_ROOT: 69,
    BONE_L_SHIN: 70,
    BONE_L_FOOT_MID: 71,
    BONE_L_FOOT_LOW: 72,
    BONE_L_THIGH: 73,

    // -------------------------

    BONE_R_LEG_ROOT: 74,
    BONE_R_KNEE: 75,
    BONE_R_FOOT_ROOT: 76,
    BONE_R_SHIN: 77,
    BONE_R_FOOT_MID: 78,
    BONE_R_FOOT_LOW: 79,
    BONE_R_THIGH: 80,

    // -------------------------

    BONE_NULL_3: 81,
    BONE_MISC_L_FOOT: 82,
    BONE_MISC_R_FOOT: 83,
    BONE_NULL_4: 84,
    BONE_MISC_R_HAND_1: 85,
    BONE_MISC_L_HAND: 86,
    BONE_MISC_R_HAND_2: 87,
};