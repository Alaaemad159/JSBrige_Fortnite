class D3D9 {

    constructor (hWnd, width, height) {
        this.m_d3d = 0;
        this.m_d3d_dev = 0;
        this.m_d3d_font = 0;
        this.m_d3d_font_big = 0;
        this.m_d3d_line = 0;
        this.m_d3d_functions = {
            /*** IUnknown methods ***/
            QueryInterface: 0,
            AddRef: 0,
            Release: 0,

            /*** IDirect3D9 methods ***/
            RegisterSoftwareDevice: 0,
            GetAdapterCount: 0,
            GetAdapterIdentifier: 0,
            GetAdapterModeCount: 0,
            EnumAdapterModes: 0,
            GetAdapterDisplayMode: 0,
            CheckDeviceType: 0,
            CheckDeviceFormat: 0,
            CheckDeviceMultiSampleType: 0,
            CheckDepthStencilMatch: 0,
            CheckDeviceFormatConversion: 0,
            GetDeviceCaps: 0,
            GetAdapterMonitor: 0,
            CreateDevice: 0,
            GetAdapterModeCountEx: 0,
            EnumAdapterModesEx: 0,
            GetAdapterDisplayModeEx: 0,
            CreateDeviceEx: 0,
            GetAdapterLUID: 0
        };
        this.m_device_functions = {
            /*** IUnknown methods ***/
            QueryInterface: 0,
            AddRef: 0,
            Release: 0,

            /*** IDirect3DDevice9 methods ***/
            TestCooperativeLevel: 0,
            GetAvailableTextureMem: 0,
            EvictManagedResources: 0,
            GetDirect3D: 0,
            GetDeviceCaps: 0,
            GetDisplayMode: 0,
            GetCreationParameters: 0,
            SetCursorProperties: 0,
            SetCursorPosition: 0,
            ShowCursor: 0,
            CreateAdditionalSwapChain: 0,
            GetSwapChain: 0,
            GetNumberOfSwapChains: 0,
            Reset: 0,
            Present: 0,
            GetBackBuffer: 0,
            GetRasterStatus: 0,
            SetDialogBoxMode: 0,
            SetGammaRamp: 0,
            GetGammaRamp: 0,
            CreateTexture: 0,
            CreateVolumeTexture: 0,
            CreateCubeTexture: 0,
            CreateVertexBuffer: 0,
            CreateIndexBuffer: 0,
            CreateRenderTarget: 0,
            CreateDepthStencilSurface: 0,
            UpdateSurface: 0,
            UpdateTexture: 0,
            GetRenderTargetData: 0,
            GetFrontBufferData: 0,
            StretchRect: 0,
            ColorFill: 0,
            CreateOffscreenPlainSurface: 0,
            SetRenderTarget: 0,
            GetRenderTarget: 0,
            SetDepthStencilSurface: 0,
            GetDepthStencilSurface: 0,
            BeginScene: 0,
            EndScene: 0,
            Clear: 0,
            SetTransform: 0,
            GetTransform: 0,
            MultiplyTransform: 0,
            SetViewport: 0,
            GetViewport: 0,
            SetMaterial: 0,
            GetMaterial: 0,
            SetLight: 0,
            GetLight: 0,
            LightEnable: 0,
            GetLightEnable: 0,
            SetClipPlane: 0,
            GetClipPlane: 0,
            SetRenderState: 0,
            GetRenderState: 0,
            CreateStateBlock: 0,
            BeginStateBlock: 0,
            EndStateBlock: 0,
            SetClipStatus: 0,
            GetClipStatus: 0,
            GetTexture: 0,
            SetTexture: 0,
            GetTextureStageState: 0,
            SetTextureStageState: 0,
            GetSamplerState: 0,
            SetSamplerState: 0,
            ValidateDevice: 0,
            SetPaletteEntries: 0,
            GetPaletteEntries: 0,
            SetCurrentTexturePalette: 0,
            GetCurrentTexturePalette: 0,
            SetScissorRect: 0,
            GetScissorRect: 0,
            SetSoftwareVertexProcessing: 0,
            GetSoftwareVertexProcessing: 0,
            SetNPatchMode: 0,
            GetNPatchMode: 0,
            DrawPrimitive: 0,
            DrawIndexedPrimitive: 0,
            DrawPrimitiveUP: 0,
            DrawIndexedPrimitiveUP: 0,
            ProcessVertices: 0,
            CreateVertexDeclaration: 0,
            SetVertexDeclaration: 0,
            GetVertexDeclaration: 0,
            SetFVF: 0,
            GetFVF: 0,
            CreateVertexShader: 0,
            SetVertexShader: 0,
            GetVertexShader: 0,
            SetVertexShaderConstantF: 0,
            GetVertexShaderConstantF: 0,
            SetVertexShaderConstantI: 0,
            GetVertexShaderConstantI: 0,
            SetVertexShaderConstantB: 0,
            GetVertexShaderConstantB: 0,
            SetStreamSource: 0,
            GetStreamSource: 0,
            SetStreamSourceFreq: 0,
            GetStreamSourceFreq: 0,
            SetIndices: 0,
            GetIndices: 0,
            CreatePixelShader: 0,
            SetPixelShader: 0,
            GetPixelShader: 0,
            SetPixelShaderConstantF: 0,
            GetPixelShaderConstantF: 0,
            SetPixelShaderConstantI: 0,
            GetPixelShaderConstantI: 0,
            SetPixelShaderConstantB: 0,
            GetPixelShaderConstantB: 0,
            DrawRectPatch: 0,
            DrawTriPatch: 0,
            DeletePatch: 0,
            CreateQuery: 0,
            SetConvolutionMonoKernel: 0,
            ComposeRects: 0,
            PresentEx: 0,
            GetGPUThreadPriority: 0,
            SetGPUThreadPriority: 0,
            WaitForVBlank: 0,
            CheckResourceResidency: 0,
            SetMaximumFrameLatency: 0,
            GetMaximumFrameLatency: 0,
            CheckDeviceState: 0,
            CreateRenderTargetEx: 0,
            CreateOffscreenPlainSurfaceEx: 0,
            CreateDepthStencilSurfaceEx: 0,
            ResetEx: 0,
            GetDisplayModeEx: 0,
        };
        this.m_font_functions = {
            // IUnknown
            QueryInterface: 0,
            AddRef: 0,
            Release: 0,

            // ID3DXFont
            GetDevice: 0,
            GetDescA: 0,
            GetDescW: 0,
            GetTextMetricsA: 0,
            GetTextMetricsW: 0,

            GetDC: 0,
            GetGlyphData: 0,

            PreloadCharacters: 0,
            PreloadGlyphs: 0,
            PreloadTextA: 0,
            PreloadTextW: 0,

            DrawTextA: 0,
            DrawTextW: 0,

            OnLostDevice: 0,
            OnResetDevice: 0,
        };
        this.m_line_functions = {
            // IUnknown
            QueryInterface: 0,
            AddRef: 0,
            Release: 0,

            // ID3DXLine
            GetDevice: 0,
            Begin: 0,
            Draw: 0,
            DrawTransform: 0,

            SetPattern: 0,
            GetPattern: 0,

            SetPatternScale: 0,
            GetPatternScale: 0,

            SetWidth: 0,
            GetWidth: 0,

            SetAntialias: 0,
            GetAntialias: 0,

            SetGLLines: 0,
            GetGLLines: 0,

            End: 0,

            OnLostDevice: 0,
            OnResetDevice: 0,
        };

        this.__init(hWnd, width, height);
    }

    release () {
        thiscall(this.m_font_functions.Release, this.m_d3d_font);
        thiscall(this.m_font_functions.Release, this.m_d3d_font_big);
        thiscall(this.m_line_functions.Release, this.m_d3d_line);
        thiscall(this.m_device_functions.Release, this.m_d3d_dev);


        free(this.font_parameter);
        free(this.font_big_parameter);
        free(this.line_parameter);
    }

    __init (hWnd, width, height) {
        LoadLibrary('d3d9.dll');
        LoadLibrary('d3dx9_43.dll');

        // Create D3D
        {
            const D3D_SDK_VERSION = 32;
            this.m_d3d = stdcall('d3d9.Direct3DCreate9', D3D_SDK_VERSION);
            if(!this.m_d3d){
                console.error('Direct3DCreate9 failed');
                exit();
            }
            this.__init_functions();
        }
        // console.log('d3d:'.padEnd(32), hex(this.m_d3d));

        // Create D3D Device
        {
            const p_d3dpp = malloc(0x40); //x86 = 0x38
            {
                let p = p_d3dpp;
                writeUInt(p, width); // BackBufferWidth

                p += sizeof.int;
                writeUInt(p, height); // BackBufferHeight

                p += sizeof.int;
                writeInt(p, 0x15); // BackBufferFormat // D3DFMT_A8R8G8B8

                p += sizeof.int + sizeof.int + sizeof.int + sizeof.DWORD;
                writeInt(p, 1); // SwapEffect // D3DSWAPEFFECT_DISCARD

                p += sizeof.int + sizeof.pad_4;
                writePointer(p, hWnd); // hDeviceWindow

                p += sizeof.HWND;
                writeInt(p, 1); // Windowed

                p += sizeof.int;
                writeInt(p, 1); // EnableAutoDepthStencil

                p += sizeof.int;
                writeInt(p, 0x50); // AutoDepthStencilFormat // D3DFMT_D16

            }

            const p_dev = malloc(sizeof.DWORD_PTR);
            // d3d->CreateDevice(D3DADAPTER_DEFAULT, D3DDEVTYPE_HAL, hWnd, D3DCREATE_SOFTWARE_VERTEXPROCESSING, &d3dpp, &d3ddev);
            thiscall(this.m_d3d_functions.CreateDevice, this.m_d3d, 0, 1, hWnd, 0x20, p_d3dpp, p_dev);
            this.m_d3d_dev = readPointer(p_dev);
            if(!this.m_d3d_dev){
                console.error('D3D.CreateDevice failed');
                exit();
            }
            free(p_d3dpp);
            free(p_dev);
            this.__init_device_functions();
        }
        // console.log('d3d device:'.padEnd(32), hex(this.m_d3d_dev));

        {
            const pFont = malloc(sizeof.DWORD_PTR);
            const pFontBig = malloc(sizeof.DWORD_PTR);
            // D3DXCreateFont(dev, 16, 0, FW_HEAVY, 1, 0, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, ANTIALIASED_QUALITY, DEFAULT_PITCH | FF_DONTCARE, _T("Arial"), &pFont);
            stdcall('d3dx9_43.D3DXCreateFontA', this.m_d3d_dev, 16, 0, 900, 1, 0, 1, 0, 4, 0, "Arial", pFont);
            stdcall('d3dx9_43.D3DXCreateFontA', this.m_d3d_dev, 18, 0, 900, 1, 0, 1, 0, 4, 0, "Arial", pFontBig);
            this.m_d3d_font = readPointer(pFont);
            this.m_d3d_font_big = readPointer(pFontBig);
            if(!this.m_d3d_font || !this.m_d3d_font_big){
                console.error('D3DXCreateFontA failed');
                exit();
            }
            free(pFont);
            free(pFontBig);
            this.__init_font_functions();
        }
        // console.log('d3d m_d3d_font:'.padEnd(32), hex(this.m_d3d_font));
        // console.log('d3d m_d3d_font_big:'.padEnd(32), hex(this.m_d3d_font_big));

        {
            const pLine = malloc(sizeof.DWORD_PTR);
            stdcall('d3dx9_43.D3DXCreateLine', this.m_d3d_dev, pLine);
            this.m_d3d_line = readPointer(pLine);
            if(!this.m_d3d_line){
                console.error('D3DXCreateLine failed');
                exit();
            }
            free(pLine);
            this.__init_line_functions();
        }
        // console.log('d3d m_d3d_line:'.padEnd(32), hex(this.m_d3d_line));

        // LPDIRECT3D9接口对象的使命完成, 我们将其释放掉
        thiscall(this.m_d3d_functions.Release, this.m_d3d);


        this.font_parameter = malloc(0x10);
        this.font_big_parameter = malloc(0x10);
        this.line_parameter= malloc(0x8 * 2);

    }

    __init_functions () {
        let i = 0;
        for (let key in this.m_d3d_functions) {
            this.m_d3d_functions[key] = readPointer(readPointer(this.m_d3d) + sizeof.DWORD_PTR * i++);
            if(!this.m_d3d_functions[key])
            {
                logError('d3d init failed');
                exit();
            }
            // console.log(key.padEnd(32), hex(this.m_d3d_functions[key]))
        }
    }

    __init_device_functions () {
        let i = 0;
        for (let key in this.m_device_functions) {
            this.m_device_functions[key] = readPointer(readPointer(this.m_d3d_dev) + sizeof.DWORD_PTR * i++);
            if(!this.m_device_functions[key])
            {
                logError('d3d init failed');
                exit();
            }
            // console.log(key.padEnd(32), hex(this.m_device_functions[key]))
        }
    }

    __init_font_functions () {
        let i = 0;
        for (let key in this.m_font_functions) {
            this.m_font_functions[key] = readPointer(readPointer(this.m_d3d_font) + sizeof.DWORD_PTR * i++);
            if(!this.m_font_functions[key])
            {
                logError('d3d init failed');
                exit();
            }
            // console.log(key.padEnd(32), hex(this.m_font_functions[key]))
        }
    }

    __init_line_functions () {
        let i = 0;
        for (let key in this.m_line_functions) {
            this.m_line_functions[key] = readPointer(readPointer(this.m_d3d_line) + sizeof.DWORD_PTR * i++);
            if(!this.m_line_functions[key])
            {
                logError('d3d init failed');
                exit();
            }
            // console.log(key.padEnd(32), hex(this.m_line_functions[key]))
        }
    }

    static color (a, r, g, b) {
        return ((((a) & 0xff) << 24) | (((r) & 0xff) << 16) | (((g) & 0xff) << 8) | ((b) & 0xff));
    }

    begin () {
        // dev->Clear(0, NULL, D3DCLEAR_TARGET, D3DCOLOR_ARGB(0, 0, 0, 0), 1.0f, 0);
        thiscall(this.m_device_functions.Clear, this.m_d3d_dev, 0, 0, 1, COLOR.ZERO, 1, 0);
        thiscall(this.m_device_functions.BeginScene, this.m_d3d_dev);
    }

    end () {
        thiscall(this.m_device_functions.EndScene, this.m_d3d_dev);
        thiscall(this.m_device_functions.Present, this.m_d3d_dev, 0, 0, 0, 0);
    }

    drawString (x, y, color, str) {
        let pPos = this.font_parameter;
        writeUInt(pPos, x);
        writeUInt(pPos + 0x4, y);
        writeUInt(pPos + 0x8, x + 120);
        writeUInt(pPos + 0xC, y + 16);
        thiscall(this.m_font_functions.DrawTextA, this.m_d3d_font, 0, str, -1, pPos, 0x100, color);
    }

    drawStringBig (x, y, color, str) {
        let pPos = this.font_big_parameter;
        writeUInt(pPos, x);
        writeUInt(pPos + 0x4, y);
        writeUInt(pPos + 0x8, x + 120);
        writeUInt(pPos + 0xC, y + 16);
        thiscall(this.m_font_functions.DrawTextA, this.m_d3d_font_big, 0, str, -1, pPos, 0x100, color);
    }

    drawLine (x, y, x2, y2, color) {
        let dLine = this.line_parameter;
        writeFloat(dLine, x);
        writeFloat(dLine + 0x4, y);
        writeFloat(dLine + 0x8, x2);
        writeFloat(dLine + 0xC, y2);
        thiscall(this.m_line_functions.Draw, this.m_d3d_line, dLine, 2, color);
    }
}

class Menu {
    constructor (d3d) {
        this.m_d3d = d3d;
        this.m_menus = {
            show_player: { name: '人物透视', open: false },
            show_teammate: { name: '显示队友', open: false },
            aimbot: { name: '自动瞄准', open: false },
            aimbot_at: { name: '自瞄位置', open: false },
            show_pickup: { name: '物品透视', open: false },
            show_vehicle: { name: '载具透视', open: false },
            show_pickup_all: { name: '全部物品', open: false },
            magic_bullet: { name: '子弹穿墙', open: false },
        };
        this.AIM_POSITIONS = ["[头部]", "[脖子]", "[胸部]"];
        this.m_aimbot_at = 0;
        this.m_current = '';
        this.show = true;
    }

    menu () {
        return this.m_menus;
    }

    draw () {
        if (!this.show)
            return;
        let x = 50;
        let y = 50;
        this.m_d3d.drawStringBig(x, y, COLOR.White, '[Home] 显示/隐藏');
        y += 18;
        this.m_d3d.drawStringBig(x, y, COLOR.White, '[End] 关闭程序');
        y += 18;
        for (let key in this.m_menus) {
            let color = this.m_current === key ? COLOR.Red : COLOR.White;
            this.m_d3d.drawStringBig(x, y, COLOR.White, this.m_menus[key].name);
            if (key === 'aimbot_at') {
                this.m_d3d.drawStringBig(x + 100, y, color, this.AIM_POSITIONS[this.m_aimbot_at]);
            } else {
                this.m_d3d.drawStringBig(x + 100, y, color, this.m_menus[key].open ? '[开]' : '[-]');
            }
            y += 18;
        }
    }

    toPrev () {
        const keys = Object.keys(this.m_menus);
        let index = keys.indexOf(this.m_current);

        index = (--index) % keys.length;
        if (index < 0)
            index += keys.length;

        this.m_current = keys[index];
    }

    toNext () {
        const keys = Object.keys(this.m_menus);
        let index = keys.indexOf(this.m_current);

        index = (++index) % keys.length;

        this.m_current = keys[index];
    }

    toggle (isAdd) {
        if (!this.m_menus[this.m_current]) return;

        if (this.m_current === 'aimbot_at') {
            this.m_aimbot_at = (this.m_aimbot_at + isAdd) % this.AIM_POSITIONS.length;
            if (this.m_aimbot_at < 0)
                this.m_aimbot_at += this.AIM_POSITIONS.length;
        } else {
            this.m_menus[this.m_current].open = !this.m_menus[this.m_current].open;
        }
    }
}


const COLOR = {
    ZERO: D3D9.color(0, 0, 0, 0),
    MediumSpringGreen_a: D3D9.color(150, 0, 255, 127),
    Red_a: D3D9.color(200, 255, 0, 0),
    Yellow_a: D3D9.color(200, 255, 255, 0),
    Green_a: D3D9.color(200, 0, 255, 0),
    White: D3D9.color(255, 255, 255, 255),
    Red: D3D9.color(255, 255, 0, 0),
    LightGreen_a: D3D9.color(150, 153, 249, 9),
    Fuchsia_a: D3D9.color(150, 255, 39, 242),
    DeepBlue: D3D9.color(255, 105, 180, 240),
    LightSkyBlue_a: D3D9.color(135, 135, 206, 250),
    Turquoise_a: D3D9.color(135, 64, 224, 208),
    LightTurquoise_a: D3D9.color(135, 206, 250, 240),
    Orange_a: D3D9.color(135, 255, 165, 0),
};


function distance2D (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
}

function distance3D (a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
}