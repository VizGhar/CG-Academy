// noinspection JSPotentiallyInvalidConstructorUsage,JSUnresolvedReference,JSUnusedGlobalSymbols

// region tilemaps
// tilemaps and tiletests are meant to be stored as files - currently simply hardcoded here:
const files = new Map(Object.entries({
    "Dungeon_Tileset.json": `{"columns":10,"image":"tileset.png","imageheight":160,"imagewidth":160,"margin":0,"name":"Dungeon_Tileset","spacing":0,"tilecount":100,"tiledversion":"1.11.2","tileheight":16,"tilewidth":16,"type":"tileset","version":"1.10"}`,
    "lvl0-s1": `{"compressionlevel":-1,"height":10,"infinite":false,"layers":[{"data":[79,79,79,79,79,79,79,79,79,79,1,2,3,2,3,2,3,4,5,6,11,8,9,8,9,8,9,8,9,16,21,18,28,29,28,29,28,29,19,26,31,8,9,18,19,18,19,18,19,36,11,18,19,51,18,19,56,7,8,6,21,17,18,26,28,29,21,17,18,16,31,27,28,36,8,9,31,27,28,26,41,42,45,46,18,19,41,42,45,46,79,79,79,79,28,29,79,79,79,79],"height":10,"id":1,"name":"back","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,67,68,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":10,"id":2,"name":"front","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"draworder":"topdown","id":3,"name":"obstacles","objects":[{"height":160,"id":1,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":0,"y":0},{"height":160,"id":2,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":144,"y":0},{"height":80,"id":3,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":48,"y":80},{"height":32,"id":5,"name":"","rotation":0,"type":"","visible":true,"width":128,"x":16,"y":0},{"height":32,"id":6,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":16,"y":128},{"height":32,"id":7,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":112,"y":128}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":4,"name":"conversations","objects":[{"height":16,"id":9,"name":"","properties":[{"name":"text","type":"string","value":"{\\"immediate\\":false,\\"content\\":[{\\"who\\":\\"???\\",\\"text\\":[{\\"text\\":\\"What... What happened?\\"}]},{\\"who\\":\\"Vampire\\",\\"text\\":[{\\"text\\":\\"Don't worry about it. Can you tell me what is \\"},{\\"text\\":\\"your name\\",\\"highlight\\":true},{\\"text\\":\\"?\\"}]},{\\"who\\":\\"???\\",\\"text\\":[{\\"text\\":\\"Sure. It's... something like...\\"}]},{\\"who\\":\\"???\\",\\"text\\":[{\\"text\\":\\"hmmm\\"}]},{\\"who\\":\\"Narator\\",\\"text\\":[{\\"text\\":\\"Use this key: \\"},{\\"text\\":\\"AABBCCDDEEFFAABBCCDDEEFFAABBCCDD\\",\\"highlight\\":true},{\\"text\\":\\"to decypher first task.\\"}]}]}"}],"rotation":0,"type":"","visible":true,"width":16,"x":120,"y":104}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextlayerid":5,"nextobjectid":10,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.11.2","tileheight":16,"tilesets":[{"firstgid":1,"source":"Dungeon_Tileset.json"}],"tilewidth":16,"type":"map","version":"1.10","width":10}`,
    "lvl1-s1": `{"compressionlevel":-1,"height":10,"infinite":false,"layers":[{"data":[79,79,79,79,79,79,79,79,79,79,1,2,3,2,3,2,3,4,5,6,11,8,9,8,9,8,9,8,9,16,21,18,28,29,28,29,28,29,19,26,31,8,9,18,19,18,19,18,19,36,11,18,19,51,18,19,56,7,8,6,21,17,18,26,28,29,21,17,18,16,31,27,28,36,8,9,31,27,28,26,41,42,45,46,18,19,41,42,45,46,79,79,79,79,28,29,79,79,79,79],"height":10,"id":1,"name":"back","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":10,"id":2,"name":"front","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"draworder":"topdown","id":3,"name":"obstacles","objects":[{"height":160,"id":1,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":0,"y":0},{"height":160,"id":2,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":144,"y":0},{"height":80,"id":3,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":48,"y":80},{"height":80,"id":4,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":96,"y":80},{"height":32,"id":5,"name":"","rotation":0,"type":"","visible":true,"width":128,"x":16,"y":0},{"height":32,"id":6,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":16,"y":128},{"height":32,"id":7,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":112,"y":128}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":4,"name":"conversations","objects":[{"height":16,"id":12,"name":"","properties":[{"name":"text","type":"string","value":"{\\"immediate\\":false,\\"content\\":[{\\"who\\":\\"$name\\",\\"text\\":[{\\"text\\":\\"Ah yes. $name... They call me $name\\"}]},{\\"who\\":\\"$name\\",\\"text\\":[{\\"text\\":\\"Where am I?\\"}]},{\\"who\\":\\"Vampire\\",\\"text\\":[{\\"text\\":\\"Glad you still remember something.\\"}]},{\\"who\\":\\"Vampire\\",\\"text\\":[{\\"text\\":\\"You have to leave now... There are much stranger mysteries to be solved\\"}]},{\\"who\\":\\"Vampire\\",\\"text\\":[{\\"text\\":\\"I mean. Beside your name of course\\"}]}]}"}],"rotation":0,"type":"","visible":true,"width":16,"x":120,"y":104}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":5,"name":"teleports","objects":[{"height":16,"id":13,"name":"","properties":[{"name":"target","type":"string","value":"lvl1-s2"}],"rotation":0,"type":"","visible":true,"width":32,"x":64,"y":144}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextlayerid":6,"nextobjectid":15,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.11.2","tileheight":16,"tilesets":[{"firstgid":1,"source":"Dungeon_Tileset.json"}],"tilewidth":16,"type":"map","version":"1.10","width":10}`,
    "lvl1-s2": `{"compressionlevel":-1,"height":10,"infinite":false,"layers":[{"data":[79,79,79,31,22,25,26,79,79,79,1,2,3,2,22,25,3,4,5,6,11,12,13,14,9,8,13,14,15,16,21,22,28,51,56,2,28,3,3,26,31,22,9,26,11,12,19,18,25,36,11,22,19,36,31,32,33,7,25,6,21,22,18,36,41,42,56,22,25,16,31,32,33,36,79,79,31,32,35,26,41,42,45,43,79,79,42,42,45,46,79,79,79,79,79,79,79,79,79,79],"height":10,"id":1,"name":"back","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,65,0,91,0,0,0,76,0,0,0,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,81,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":10,"id":3,"name":"front","opacity":1,"type":"tilelayer","visible":true,"width":10,"x":0,"y":0},{"draworder":"topdown","id":4,"name":"obstacles","objects":[{"height":32,"id":1,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":0,"y":0},{"height":128,"id":2,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":0,"y":32},{"height":32,"id":3,"name":"","rotation":0,"type":"","visible":true,"width":144,"x":16,"y":128},{"height":128,"id":4,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":144,"y":0},{"height":32,"id":5,"name":"","rotation":0,"type":"","visible":true,"width":48,"x":96,"y":0},{"height":80,"id":6,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":48,"y":48},{"height":16,"id":7,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":80,"y":48},{"height":32,"id":8,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":80,"y":96},{"height":16,"id":9,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":112,"y":48},{"height":12,"id":10,"name":"","rotation":0,"type":"","visible":true,"width":12,"x":98,"y":66}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":6,"name":"teleports","objects":[{"height":8,"id":13,"name":"","properties":[{"name":"target","type":"string","value":"lvl1-s1"}],"rotation":0,"type":"","visible":true,"width":32,"x":64,"y":0}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":5,"name":"conversations","objects":[{"height":8,"id":11,"name":"","properties":[{"name":"text","type":"string","value":"{\\"immediate\\":false,\\"content\\":[{\\"who\\":\\"$name\\",\\"text\\":[{\\"text\\":\\"I wonder if I'm strong enough to push this box\\"}]},{\\"who\\":\\"Narator\\",\\"text\\":[{\\"text\\":\\"Key for second part is: 01234567890123456789012345678901\\"}]}]}"}],"rotation":0,"type":"","visible":true,"width":16,"x":96,"y":56}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextlayerid":7,"nextobjectid":14,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.11.2","tileheight":16,"tilesets":[{"firstgid":1,"source":"Dungeon_Tileset.json"}],"tilewidth":16,"type":"map","version":"1.10","width":10}`
}));
// endregion

// region sprites
// animated sprites, "hero" is required to have movement names stand<LURD> and walk<LURD>
const sprites = new Map(Object.entries({
    hero: {"sheet": "blonde_man_shadow.png", "size": 32, "movements": [{ "name" : "standD", "values": [[0, 0], [1, 0], [2, 0], [3, 0]] }, { "name" : "standL", "values" : [[0, 1], [1, 1], [2, 1], [3, 1]] }, { "name" : "standR", "values" : [[0, 2], [1, 2], [2, 2], [3, 2]] }, { "name" : "standU", "values" : [[0, 3], [1, 3], [2, 3], [3, 3]] }, { "name" : "walkD", "values" : [[0, 4], [1, 4], [2, 4], [3, 4]] }, { "name" : "walkL", "values" : [[0, 5], [1, 5], [2, 5], [3, 5]] }, { "name" : "walkR", "values" : [[0, 6], [1, 6], [2, 6], [3, 6]] }, { "name" : "walkU", "values" : [[0, 7], [1, 7], [2, 7], [3, 7]] }] },
    vampire: {"sheet": "vampire.png", "size": 16, "movements": [{ "name" : "standD", "values": [[0, 0]] }, { "name" : "standL", "values" : [[0, 0]] }, { "name" : "standR", "values" : [[0, 0]] }, { "name" : "standU", "values" : [[0, 0]] }]}
}));
// endregion

// region levels
const levels = new Map(Object.entries({
    "intro": { scenes: [ { file: "lvl0-s1", entrances: { default: { x: 2, y: 6 } }, "npcs": [{"sprite": "vampire", "x": 8, "y": 7}] } ]},
    "1": { scenes: [ { file: "lvl1-s1", entrances: { default: { x: 7, y: 7 }, "lvl1-s2": { x: null, y: 7 } }, npcs: [{ sprite: "vampire", x: 8, y: 7 }] }, { "file": "lvl1-s2", entrances: { "lvl1-s1": { x: null, y: 1 } } } ] }}));
// endregion

// region global functions
function doRectanglesOverlap(rect1, rect2) {
    let [left1, top1, right1, bottom1] = [...rect1], [left2, top2, right2, bottom2] = [...rect2];
    return !(top1 >= bottom2 || top2 >= bottom1 || right1 <= left2 || right2 <= left1);
}

function replaceWildcards(template, replacements) {
    return template.replace(/\$(\w+)/g, (_, key) => replacements[key] ?? `$${key}`);
}
// endregion

export class TopDownGameModule {
    static get moduleName() { return 'TopDownGameModule'; }

    constructor() {
        this.mapContainer = null;
        this.characterContainer = null;
        this.conversationHelper = new ConversationOverlay(PIXI);
        this.noFocusHelper = new NoFocusOverlay(PIXI, true);
        this.activeAreas = new Set();
        this.keys = {};
        this.playerSheet = {};
    }

    // region map
    showScene(scene, mapScale, mapX, mapY) {
        this.mapContainer.removeChildren();
        this.mapContainer.cacheAsBitmap = false;
        const currentScreen = JSON.parse(files.get(scene.file));
        const currentScreenTileset = JSON.parse(files.get(currentScreen.tilesets[0].source));

        this.sceneName = scene.file;
        this.scene = currentScreen;

        const tileSize = currentScreenTileset.tilewidth; // NOTE: tileheight expected to be equal to tilewidth
        const layers = currentScreen.layers;

        // load texture
        const base = PIXI.BaseTexture.from(currentScreenTileset.image);
        base.scaleMode = PIXI.SCALE_MODES.NEAREST;
        const tileTexture = new PIXI.Texture(base);

        const TILES_PER_ROW = Math.floor(base.width / tileSize);
        const getTileTexture = (index) => {
            if (index < 0) return null;
            const col = index % TILES_PER_ROW;
            const row = Math.floor(index / TILES_PER_ROW);
            const x = col * tileSize;
            const y = row * tileSize;
            const frame = new PIXI.Rectangle(x, y, tileSize, tileSize);
            return new PIXI.Texture(tileTexture.baseTexture, frame);
        };

        for (let layerId = 0; layerId < layers.length; layerId++) {
            const layer = layers[layerId];

            for (let row = 0; row < layer.height; row++) {
                for (let col = 0; col < layer.width; col++) {
                    const index = layer.data[row * layer.width + col];
                    let texture = getTileTexture(index - 1);
                    if (!texture) continue;

                    const tile = new PIXI.Sprite(texture);
                    tile.x = col * tileSize * mapScale;
                    tile.y = row * tileSize * mapScale;
                    tile.scale.set(mapScale);
                    this.mapContainer.addChild(tile);
                }
            }
        }

        if (scene.npcs) {
            for (let i = 0; i < scene.npcs.length; i++) {
                const character = scene.npcs[i]
                const npc = new PIXI.Sprite.from(sprites.get(character.sprite).sheet);
                npc.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                npc.roundPixels = true;
                npc.position.set(character.x * tileSize * mapScale, character.y * tileSize * mapScale);
                npc.scale.set(mapScale);
                npc.zIndex = 1;
                this.mapContainer.addChild(npc);
            }
        }

        this.mapContainer.x = mapX;
        this.mapContainer.y = mapY;
        this.characterContainer.x = mapX;
        this.characterContainer.y = mapY;
        this.mapContainer.cacheAsBitmap = true;
    }

    showCharacter(scene, tileSize, mapScale, entranceName = "default", oldX = 0, oldY = 0) {
        this.characterContainer.removeChildren();
        const sprite = sprites.get("hero");

        let ssheet = new PIXI.BaseTexture.from(sprite.sheet);
        ssheet.scaleMode = PIXI.SCALE_MODES.NEAREST;

        let w = sprite.size;
        let h = sprite.size;

        for (let i = 0; i < sprite.movements.length; i++) {
            const movement = sprite.movements[i];
            this.playerSheet[movement.name] = movement.values.map(([x, y]) => { return new PIXI.Texture(ssheet, new PIXI.Rectangle(x * w, y * h, w, h)); });
        }

        this.character = new PIXI.AnimatedSprite(this.playerSheet.standD);
        this.character.anchor.set(0.25, 0.5);
        this.character.animationSpeed = .1;
        this.character.loop = true;

        let entrance = scene.entrances[entranceName] ?? scene.entrances["default"]
        if (entrance.x) { this.character.position.x = entrance.x * tileSize * mapScale; } else { this.character.position.x = oldX; }
        if (entrance.y != null) { this.character.position.y = entrance.y * tileSize * mapScale; } else { this.character.position.y = oldY; }

        this.character.scale.set(mapScale);
        this.characterContainer.addChild(this.character);

        this.character.play();
    }

    showLevel() {
        if (!this.mapContainer || !this.frameData) return;

        // used
        const mapScale = this.frameData.mapScale;
        const mapX = this.frameData.x;
        const mapY = this.frameData.y;

        this.level = levels.get(this.frameData.level);

        this.showScene(this.level.scenes[0], mapScale, mapX, mapY);
        this.showCharacter(this.level.scenes[0], 16, mapScale);

    }
    // endregion

    // region collisions
    blocked() {
        if (!this.scene) return true;
        const currentScreen = this.scene;
        const obstacles = currentScreen.layers.find(layer => layer.name === 'obstacles');

        const characterRect = [this.character.x / 6 + 4, this.character.y / 6 + 4, this.character.x/ 6 + 12, this.character.y/ 6 + 12];
        return (obstacles.objects.some(obj => doRectanglesOverlap(characterRect, [obj.x, obj.y, obj.x + obj.width, obj.y + obj.height])));
    }

    stopMovement() {
        if (this.character.textures === this.playerSheet.walkU) { this.character.textures = this.playerSheet.standU; this.character.play(); }
        if (this.character.textures === this.playerSheet.walkD) { this.character.textures = this.playerSheet.standD; this.character.play(); }
        if (this.character.textures === this.playerSheet.walkL) { this.character.textures = this.playerSheet.standL; this.character.play(); }
        if (this.character.textures === this.playerSheet.walkR) { this.character.textures = this.playerSheet.standR; this.character.play(); }
    }

    handleMovement() {
        const moveSpeed = 5;

        const originalX = this.character.x;
        const originalY = this.character.y;

        if (this.keys.KeyW) { this.character.y -= moveSpeed; if (this.character.textures !== this.playerSheet.walkU) { this.character.textures = this.playerSheet.walkU; this.character.play() } }
        if (this.keys.KeyS) { this.character.y += moveSpeed; if (this.character.textures !== this.playerSheet.walkD) { this.character.textures = this.playerSheet.walkD; this.character.play() } }
        if (this.blocked()) { this.character.y = originalY; }

        if (this.keys.KeyA) { this.character.x -= moveSpeed; if (this.character.textures !== this.playerSheet.walkL) { this.character.textures = this.playerSheet.walkL; this.character.play() } }
        if (this.keys.KeyD) { this.character.x += moveSpeed; if (this.character.textures !== this.playerSheet.walkR) { this.character.textures = this.playerSheet.walkR; this.character.play() } }

        if (this.blocked()) { this.character.x = originalX; }
    }
    // endregion

    // region areas
    resolveAreaVisited() {
        if (!this.frameData) return;

        const teleports = this.scene.layers.find(layer => layer.name === 'teleports');
        const conversations = this.scene.layers.find(layer => layer.name === 'conversations');

        const characterRect = [this.character.x / 6, this.character.y / 6, this.character.x/ 6 + 16, this.character.y/ 6 + 16];

        if (teleports) {
            for (const a of teleports.objects) {
                if (doRectanglesOverlap(characterRect, [a.x, a.y, a.x + a.width, a.y + a.height])) {
                    this.teleport(a.properties[0].value);
                    return;
                }
            }
        }

        if (conversations) {
            for (const a of conversations.objects) {
                if (doRectanglesOverlap(characterRect, [a.x, a.y, a.x + a.width, a.y + a.height])) {
                    if (!this.activeAreas.has(a)) { this.activeAreas.add(a); this.onConversationEntered(a.properties[0].value); }
                } else {
                    if (this.activeAreas.has(a)) { this.activeAreas.delete(a); this.onConversationLeft(a.properties[0].value); }
                }
            }
        }
    }

    teleport(sceneId) {
        const oldScene = this.sceneName;
        const scene = this.level.scenes.find(scene => scene.file === sceneId);
        const oldX = this.character.x;
        const oldY = this.character.y;
        this.showScene(scene, this.frameData.mapScale, this.frameData.x, this.frameData.y);
        this.showCharacter(scene, 16, this.frameData.mapScale, oldScene, oldX, oldY);
    }

    onConversationEntered(id) { this.conversationHelper.initConversation(id); }
    onConversationLeft(id) { this.conversationHelper.leaveConversation(id); }
    // endregion

    /** CG API - handle data for current frame */
    handleFrameData(frameInfo, frameData) {
        if (frameData) { this.frameData = frameData[1]; this.showAfter = frameData[0]; }
        this.showLevel();
        this.noFocusHelper.init(this.noFocusContainer);
        return { frameInfo, frameData }
    }

    /** CG API */
    handleGlobalData(players, globalData) { }

    /** CG API */
    updateScene (previousData, currentData, progress) {
        if (currentData.frameInfo.number > this.showAfter || (currentData.frameInfo.number === this.showAfter && progress === 1)) {
            this.container.alpha = 1.0;
        } else {
            this.container.alpha = 0.0;
        }
    }

    /** CG API - called when scene needs reinit - including resizing. */
    reinitScene(container, canvasData) {
        this.mapContainer = new PIXI.Container();
        this.characterContainer = new PIXI.Container();
        this.mapContainer.sortableChildren = true;
        this.noFocusContainer = new PIXI.Container();
        this.conversationContainer = new PIXI.Container();
        this.container = container;

        container.addChild(this.mapContainer);
        container.addChild(this.characterContainer);
        container.addChild(this.noFocusContainer);
        container.addChild(this.conversationContainer);

        this.showLevel();

        this.conversationHelper.init(this.conversationContainer, this.frameData.mapScale, this.frameData.conversationWildcards);
        this.conversationHelper.restartConversation();

        this.resolveAreaVisited();

        this.noFocusHelper.init(this.noFocusContainer);

        window.addEventListener('keydown', (e) => { this.keys[e.code] = true; this.noFocusHelper.forceFocus(true); });
        window.addEventListener('keyup', (e) => { this.keys[e.code] = false; this.noFocusHelper.forceFocus(true); });
    }

    /** CG API - called every few ms - ideal for key press checks for fluent movement */
    animateScene(delta) {
        if (!this.frameData) return;
        if (!this.prevKeys) { this.prevKeys = {}; }
        if (this.container.alpha === 0.0) return;

        // key clicked -> try to process conversation
        if (JSON.stringify(this.prevKeys) !== JSON.stringify(this.keys)) {
            this.conversationHelper.processKeys(this.keys);
        }

        // key held -> try to process movement
        if (Object.values(this.keys).some(v => v === true)) {
            this.handleMovement();
            this.resolveAreaVisited();
        } else {
            this.stopMovement();
        }

        this.prevKeys = { ...this.keys };
    }

}

class NoFocusOverlay {

    constructor(PIXI, once) {
        this.PIXI = PIXI;
        this.hasFocus = false;
        this.once = once;
    }

    forceFocus(on) {
        if (this.hasFocus && this.once) return;
        this.hasFocus = on;
        this.invalidateFocus();
    }

    init(container) {
        if (!container) return;

        container.removeChildren().forEach(c => c.destroy({ children: true }));

        this.noFocusBackground = new this.PIXI.Graphics();
        this.noFocusBackground.beginFill(0x000000, 0.7);
        this.noFocusBackground.drawRect(0, 0, 1920, 1080);
        this.noFocusBackground.endFill();
        container.addChild(this.noFocusBackground);

        this.noFocusImage = this.PIXI.Sprite.from("no_focus.png");
        this.noFocusImage.anchor.set(0.5); // stred obrázka
        this.noFocusImage.x = 1920 / 2;
        this.noFocusImage.y = 1080 / 2;
        container.addChild(this.noFocusImage);

        this.invalidateFocus();

        window.onfocus = () => { this.hasFocus = true; this.invalidateFocus(); }
        if (!this.once) window.onblur = () => { this.hasFocus = false; this.invalidateFocus(); }
        window.addEventListener('mousedown', (_) => { this.hasFocus = true; this.invalidateFocus(); });
    }

    invalidateFocus() {
        this.noFocusBackground.visible = !this.hasFocus;
        this.noFocusImage.visible = !this.hasFocus;
    }
}

class ConversationOverlay {

    constructor(PIXI) {
        this.PIXI = PIXI;

        this.baseTextStyle = new this.PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 40,
            fill: "#000000",
            stroke: "#eeeeee",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#ffffff",
            dropShadowDistance: 2,
            align: "center",
        });

        this.boldTextStyle = new this.PIXI.TextStyle({
            ...this.baseTextStyle,
            fontWeight: "bold",
        });
    }

    init(pixiContainer, scale, wildcards) {
        if (!pixiContainer) return;
        this.talkTextContainer = pixiContainer;
        this.scale = scale;
        this.wildcards = wildcards;
    }

    initConversation(conversation) {
        if (this.conversation === conversation) return;
        this.conversation = conversation;

        if (this.conversation.immediate) {
            this.startConversation();
        } else {
            this.showPressToTalk();
        }
    }

    showPressToTalk() {
        if (this.isPressToTalkVisible) return;  // already visible
        this.conversationStarted = false;

        this.talkTextContainer.removeChildren();
        const container = new this.PIXI.Container();

        const t1 = new this.PIXI.Text("Press [T] to talk.", this.baseTextStyle);
        container.addChild(t1);

        this.decorate(container);
    }

    restartConversation() {
        this.startConversation(this.conversation, true);
    }

    startConversation(conversation, force = false) {
        if (!force && this.conversation === conversation && this.conversationStarted) return;
        this.conversation = conversation;
        this.conversationStarted = true;
        this.currentLineIndex = 0;
        this.isPressToTalkVisible = false;
        this.renderConversationLine();
    }

    leaveConversation(conversation = this.conversation) {
        if (conversation !== this.conversation) { return; }

        this.talkTextContainer.removeChildren().forEach(c => c.destroy({children: true}));
        this.conversation = null;
        this.conversationStarted = false;
        this.currentLineIndex = null;
        this.isPressToTalkVisible = false;
    }

    renderConversationLine() {
        if (!this.conversation) return;
        const json = JSON.parse(this.conversation);
        const item = json.content[this.currentLineIndex];
        if (!item) return;

        this.talkTextContainer.removeChildren();

        const container = new this.PIXI.Container();

        let offsetX = 0;

        // Render Name:
        const nameText = new this.PIXI.Text(replaceWildcards(item.who + ": ", this.wildcards), this.boldTextStyle);
        nameText.x = offsetX;
        container.addChild(nameText);
        offsetX += nameText.width;

        // Render text parts
        item.text.forEach(part => {
            const style = part.highlight ? this.boldTextStyle : this.baseTextStyle;
            const piece = new this.PIXI.Text(replaceWildcards(part.text, this.wildcards), style);
            piece.x = offsetX;
            container.addChild(piece);
            offsetX += piece.width;
            piece.y += (nameText.height - piece.height) / 2;
        });
        this.decorate(container);
    }

    nextConversationLine() {
        if (!this.conversation) return;
        this.currentLineIndex++;
        const json = JSON.parse(this.conversation);
        if (this.currentLineIndex >= json.content.length) {
            this.leaveConversation();
        } else {
            this.renderConversationLine();
        }
    }

    decorate(container) {
        const decorationContainer = new this.PIXI.Container();
        const width = container.width;
        const height = container.height;
        const tileSize = 16;

        const wTiles = Math.ceil(1.0 * width / tileSize / this.scale) + 2;
        const hTiles = Math.ceil(1.0 * height / tileSize / this.scale) + 2;

        // load tileset asset and set/unset antialiasing
        const base = PIXI.BaseTexture.from("dialog.png");
        base.scaleMode = PIXI.SCALE_MODES.NEAREST;
        const tileTexture = new PIXI.Texture(base);

        const TILES_PER_ROW = Math.floor(base.width / tileSize);

        const getTileTexture = (index) => {
            if (index < 0) return null;
            const col = index % TILES_PER_ROW;
            const row = Math.floor(index / TILES_PER_ROW);
            const x = col * tileSize;
            const y = row * tileSize;
            const frame = new PIXI.Rectangle(x, y, tileSize, tileSize);
            return new PIXI.Texture(tileTexture.baseTexture, frame);
        };

        const place = (index, col, row) => {
            let texture = getTileTexture(index);
            const tile = new PIXI.Sprite(texture);
            tile.x = col * tileSize * this.scale;
            tile.y = row * tileSize * this.scale;
            tile.scale.set(this.scale);
            decorationContainer.addChild(tile);
        };

        // corners
        place(0, 0, 0);
        place(5, wTiles - 1, 0);
        place(30, 0, hTiles - 1);
        place(35, wTiles - 1, hTiles - 1);

        // sides
        for (let col = 1; col < wTiles - 1; col++) { place(1, col, 0); place(31, col, hTiles - 1); }
        for (let row = 1; row < hTiles - 1; row++) { place(6, 0, row); place(11, wTiles - 1, row); }

        for (let row = 1; row < hTiles - 1; row++) {
            for (let col = 1; col < wTiles - 1; col++) {
                place(7, col, row);
            }
        }
        this.talkTextContainer.addChild(decorationContainer);
        decorationContainer.addChild(container);
        decorationContainer.x = (1920 - decorationContainer.width) / 2;
        decorationContainer.y = 1080 - decorationContainer.height;
        container.x = (decorationContainer.width - container.width) / 2;
        container.y = (decorationContainer.height - container.height) / 2;
    }

    processKeys(keys) {
        if (this.conversation && keys.KeyT) {
            if (this.conversation && this.conversationStarted) {
                this.nextConversationLine();
            } else {
                this.startConversation(this.conversation);
            }
        }
    }
}
