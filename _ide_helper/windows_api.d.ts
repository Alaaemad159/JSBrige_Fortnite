/**
 * stdcall
 * 最多支持16个参数
 * @param {String} address API Name or Function Address
 * @param param
 * @returns {Number}
 */
import ResolvedNumberFormatOptions = Intl.ResolvedNumberFormatOptions;

declare function stdcall(address: String | Number, ...param: any[]): Number;

/**
 * Alias stdcall
 * 调用 Windows API
 * 最多支持16个参数
 * @param {String} address API Name or Function Address
 * @param param
 * @returns {Number}
 */
declare function invoke(address: String | Number, ...param: any[]): Number;

/**
 * fastcall
 * 最多支持16个参数
 * @param {String} address API Name or Function Address
 * @param param
 * @returns {Number}
 */
declare function fastcall(address: String | Number, ...param: any[]): Number;

/**
 * thiscall
 * 最多支持16个参数
 * @param {String} address API Name or Function Address
 * @param param
 * @returns {Number}
 */
declare function thiscall(address: String | Number, ...param: any[]): Number;


/**
 * VirtualAllocEx
 * @param {Number} hProcess HANDLE 申请内存所在的进程句柄 当前进程=-1
 * @param {String | Number} lpAddress LPVOID 保留页面的内存地址；一般用NULL自动分配
 * @param {Number} dwSize SIZE_T 欲分配的内存大小，字节单位；注意实际分 配的内存大小是页内存大小的整数倍
 * @param {Number} flAllocationType DWORD 内存分配的类型<br/>
 * MEM_COMMIT              0x1000 (通常)<br/>
 * MEM_RESERVE             0x2000 <br/>
 * @param {Number} flProtect 要分配的页面区域的内存保护<br/>
 * PAGE_NOACCESS           0x01 <br/>
 * PAGE_READONLY           0x02 <br/>
 * PAGE_READWRITE          0x04 <br/>
 * PAGE_WRITECOPY          0x08 <br/>
 * PAGE_EXECUTE            0x10 <br/>
 * PAGE_EXECUTE_READ       0x20 <br/>
 * PAGE_EXECUTE_READWRITE  0x40 (通常)<br/>
 * PAGE_EXECUTE_WRITECOPY  0x80 <br/>
 * @returns {Number} 执行成功返回分配内存的首地址，否则为NULL。
 * @constructor
 */
declare function VirtualAllocEx(hProcess: Number, lpAddress: String | Number, dwSize: Number, flAllocationType: Number, flProtect: Number): Number;


/**
 * VirtualFreeEx
 * @param {Number} hProcess HANDLE 内存所在的进程句柄 当前进程=-1
 * @param {String | Number} lpAddress LPVOID 要释放的内存地址
 * @param {Number} dwSize SIZE_T 要释放页的大小,如果dwFreeType类型中包含了MEM_RELEASE,则dwSize必须为0
 * @param {Number} dwFreeType DWORD 释放操作的类型 <br/>
 * MEM_DECOMMIT            0x00004000 (通常)<br/>
 * MEM_RELEASE             0x00008000 <br/>
 * MEM_FREE                0x00010000 <br/>
 * @returns {Boolean}
 * @constructor
 */
declare function VirtualFreeEx(hProcess: Number, lpAddress: String | Number, dwSize: Number, dwFreeType: Number): Boolean;

/**
 * VirtualProtectEx
 * 修改内存保护方式
 * @param {Number} hProcess HANDLE 内存所在的进程句柄 当前进程=-1
 * @param {String | Number} lpAddress LPVOID 要修改内存的起始地址
 * @param {Number} dwSize SIZE_T 页区域大小
 * @param {Number} flNewProtect DWORD 新访问方式
 * PAGE_NOACCESS           0x01 <br/>
 * PAGE_READONLY           0x02 <br/>
 * PAGE_READWRITE          0x04 <br/>
 * PAGE_WRITECOPY          0x08 <br/>
 * PAGE_EXECUTE            0x10 <br/>
 * PAGE_EXECUTE_READ       0x20 <br/>
 * PAGE_EXECUTE_READWRITE  0x40 (通常修改)<br/>
 * PAGE_EXECUTE_WRITECOPY  0x80 <br/>
 * @param {Number} lpflOldProtect LPDWORD 原访问方式 用于保存改变前的保护属性
 * @returns {Boolean}
 * @constructor
 */
declare function VirtualProtectEx(hProcess: Number, lpAddress: String | Number, dwSize: Number, flNewProtect: Number, lpflOldProtect: Number): Boolean;

/**
 * RtlCopyMemory
 * @param {String | Number} destination
 * @param {String | Number} source
 * @param {Number} length
 * @constructor
 */
declare function RtlCopyMemory(destination: String | Number, source: String | Number, length: Number): void;

/**
 * ChangeCurrentThreadId
 * @param {Number} Id
 * @constructor
 */
declare function ChangeCurrentThreadId(Id: Number): void;

/**
 * @param {String} module
 * @returns {Number}
 */
declare function GetModuleBase(module: String = null): Number;

/**
 * LoadLibrary
 * @param {String} lpLibFileName
 */
declare function LoadLibrary(lpLibFileName: String): Number;

/**
 * Sleep
 * @param {Number | String} ms
 */
declare function Sleep(ms: Number | String): void;


/**
 * MessageBoxA
 * msgbox('msg')
 * msgbox('msg', 'title')
 * msgbox('msg', 'title', uType)
 * msgbox(hWnd, 'msg', 'title', uType)
 * @param param
 */
declare function MessageBox(...param: any[]): void;

/**
 * GetLastError
 * @returns {Number}
 * @constructor
 */
declare function GetLastError(): Number;


/**
 * 创建透明窗口
 * @param {Boolean} isTopMost
 * @param {String} lpClassName
 * @param {String} lpWindowName
 * @param {Number} X
 * @param {Number} Y
 * @param {Number} nWidth
 * @param {Number} nHeight
 * @returns {Number}
 */
declare function CreateAlphaWindow(isTopMost: Boolean,
                                   lpClassName: String, lpWindowName: String,
                                   X: Number,
                                   Y: Number,
                                   nWidth: Number,
                                   nHeight: Number): Number;

/**
 * 销毁窗口
 * @param {Number} hWnd
 */
declare function DestroyWindow(hWnd: Number): void;

/**
 * FindWindow
 * @param {String | null} lpClassName
 * @param {String | null} lpWindowName
 * @returns {Number}
 * @constructor
 */
declare function FindWindow(lpClassName: String | null, lpWindowName: String | null): Number;

/**
 * GetWindowRect
 * @param {Number} hWnd
 * @param {Object} lpRect
 * @returns {Boolean}
 * @constructor
 */
declare function GetWindowRect(hWnd: Number, lpRect: Object): Boolean;

/**
 * SetWindowLong
 * @param {Number} hWnd
 * @param {Number} nIndex int
 * @param {Number} dwNewLong long
 * @returns {Boolean}
 * @constructor
 */
declare function SetWindowLong(hWnd: Number, nIndex: Number, dwNewLong: Number): Boolean;

/**
 * SetWindowDisplayAffinity
 * @param {Number} hWnd
 * @param {Number} dwAffinity DWORD
 * @returns {Boolean}
 * @constructor
 */
declare function SetWindowDisplayAffinity(hWnd: Number, dwAffinity: Number): Boolean;

/**
 * ShowWindow
 * @param {Number} hWnd
 * @param {Number} nCmdShow int
 * @returns {Boolean}
 * @constructor
 */
declare function ShowWindow(hWnd: Number, nCmdShow: Number): Boolean;

/**
 * MoveWindow
 * @param {Number} hWnd
 * @param {Number} X
 * @param {Number} Y
 * @param {Number} nWidth
 * @param {Number} nHeight
 * @param {Boolean} bRepaint
 * @returns {Boolean}
 * @constructor
 */
declare function MoveWindow(hWnd: Number, X: Number, Y: Number, nWidth: Number, nHeight: Number, bRepaint: Boolean): Boolean;


/**
 * 处理事件
 * 暂时转让控制权，以便让 Windows 操作系统有机会处理其它的如用户键盘或鼠标输入等事件。直到操作系统处理并发送完程序队列中的所有事件后，命令才会返回。
 * 返回假 没有消息要处理
 * @returns {boolean}
 * @constructor
 */
declare function ProcessMessage(): boolean;

/**
 * GetForegroundWindow
 * @returns {Number}
 * @constructor
 */
declare function GetForegroundWindow(): Number;

/**
 * SetWindowPos
 * @param {Number} hWnd
 * @param {Number} hWndInsertAfter
 * @param {Number} X
 * @param {Number} Y
 * @param {Number} cx
 * @param {Number} cy
 * @param {Number} uFlags
 * @returns {Boolean}
 * @constructor
 */
declare function SetWindowPos(hWnd: Number, hWndInsertAfter: Number, X: Number, Y: Number, cx: Number, cy: Number, uFlags: Number): Boolean;

/**
 * GetAsyncKeyState
 * @param {Number} vKey
 * @constructor
 */
declare function GetAsyncKeyState(vKey: Number): Number;

