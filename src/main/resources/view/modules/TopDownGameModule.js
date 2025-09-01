export class TopDownGameModule {
    static get moduleName() {
        return 'TopDownGameModule';
    }

    constructor() {
        this.mapContainer = null;
        this.characterContainer = null;
        this.conversationHelper = new Conversation(PIXI);
        this.noFocusHelper = new NoFocus(PIXI, true);
        this.activeAreas = new Set();
        this.keys = {};
    }

    // region map
    showMap(tileset, mapData, tileSize, antialias, mapScale, mapX, mapY) {
        // load tileset asset and set/unset antialiasing
        const base = PIXI.BaseTexture.from(tileset);
        base.scaleMode = antialias ? PIXI.SCALE_MODES.LINEAR : PIXI.SCALE_MODES.NEAREST;
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

        for (let layer = 0; layer < mapData.length; layer++) {
            for (let row = 0; row < mapData[0].length; row++) {
                for (let col = 0; col < mapData[0][0].length; col++) {
                    const index = mapData[layer][row][col];
                    let texture = getTileTexture(index);
                    if (!texture) continue;

                    const tile = new PIXI.Sprite(texture);
                    tile.x = col * tileSize * mapScale;
                    tile.y = row * tileSize * mapScale;
                    tile.zIndex = layer * 100;
                    tile.scale.set(mapScale);
                    this.mapContainer.addChild(tile);
                }
            }
        }

        for (let i = 0; i < this.frameData.npcs.length; i++) {
            const character = this.frameData.npcs[i]
            const npc = new PIXI.Sprite.from(character.sprite);
            npc.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            npc.roundPixels = true;
            npc.position.set(character.x * tileSize * mapScale, character.y * tileSize * mapScale);
            npc.scale.set(mapScale);
            npc.zIndex = mapData.length * 100;
            this.mapContainer.addChild(npc);
        }

        this.mapContainer.x = mapX;
        this.mapContainer.y = mapY;
        this.characterContainer.x = mapX;
        this.characterContainer.y = mapY;
    }

    showCharacter(tileSize, mapScale) {
        this.character = new PIXI.Sprite.from(this.frameData.character.sprite);
        this.character.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.character.roundPixels = true;
        this.character.position.set(
            this.frameData.character.x * tileSize * mapScale,
            this.frameData.character.y * tileSize * mapScale
        );
        this.character.scale.set(mapScale);
        this.characterContainer.addChild(this.character);
    }

    showLevel() {
        if (!this.mapContainer || !this.frameData) return;

        // used
        const tileset = this.frameData.tileMapAsset;
        const mapData = this.frameData.tileMap;
        const tileSize = this.frameData.tileSize;
        const antialias = this.frameData.antialias;
        const mapScale = this.frameData.mapScale;
        const mapX = this.frameData.x;
        const mapY = this.frameData.y;

        this.totalTileSize = mapScale * tileSize;

        this.showMap(tileset, mapData, tileSize, antialias, mapScale, mapX, mapY);
        this.showCharacter(tileSize, mapScale);

        this.mapContainer.cacheAsBitmap = true;
    }
    // endregion

    // region collisions
    blocked() {
        const col = this.character.x / this.totalTileSize;
        const row = this.character.y / this.totalTileSize;
        return this.frameData.tileMapObstacles[Math.floor(row)][Math.floor(col)] === true ||
            this.frameData.tileMapObstacles[Math.ceil(row)][Math.floor(col)] === true ||
            this.frameData.tileMapObstacles[Math.floor(row)][Math.ceil(col)] === true ||
            this.frameData.tileMapObstacles[Math.ceil(row)][Math.ceil(col)] === true
    }

    handleMovement() {
        const moveSpeed = 5;

        const originalX = this.character.x;
        const originalY = this.character.y;

        if (this.keys.KeyW) this.character.y -= moveSpeed;
        if (this.keys.KeyS) this.character.y += moveSpeed;
        if (this.blocked()) { this.character.y = originalY; }

        if (this.keys.KeyA) this.character.x -= moveSpeed;
        if (this.keys.KeyD) this.character.x += moveSpeed;
        if (this.blocked()) { this.character.x = originalX; }
    }
    // endregion

    // region areas
    resolveAreaVisited() {
        if (!this.frameData) return;

        const charX = this.character.x;
        const charY = this.character.y;
        const charW = this.character.width;
        const charH = this.character.height;

        const charLeft = charX;
        const charRight = charX + charW;
        const charTop = charY;
        const charBottom = charY + charH;

        for (const [id, area] of Object.entries(this.frameData.areas)) {
            if (area.type !== 'RECTANGLE') continue;

            const areaLeft = area.ax * this.totalTileSize;
            const areaRight = area.bx * this.totalTileSize;
            const areaTop = area.ay * this.totalTileSize;
            const areaBottom = area.by * this.totalTileSize;

            const intersects =
                charRight >= areaLeft &&
                charLeft <= areaRight &&
                charBottom >= areaTop &&
                charTop <= areaBottom;

            if (intersects) {
                if (!this.activeAreas.has(id)) {
                    this.activeAreas.add(id);
                    this.onAreaEntered(id);
                }
            } else {
                if (this.activeAreas.has(id)) {
                    this.activeAreas.delete(id);
                    this.onAreaLeft(id);
                }
            }
        }
    }

    onAreaEntered(id) { this.conversationHelper.initConversation(id); }
    onAreaLeft(id) { this.conversationHelper.leaveConversation(id); }
    // endregion

    /** CG API - handle data for current frame */
    handleFrameData(frameInfo, frameData) {
        if (frameData) { this.frameData = frameData; }
        this.showLevel();
        this.noFocusHelper.init(this.noFocusContainer, this.frameData);
    }

    /** CG API */
    handleGlobalData(players, globalData) { }

    /** CG API */
    updateScene(previousData, currentData, progress, speed) { }

    /** CG API - called when scene needs reinit - including resising. */
    reinitScene(container, canvasData) {
        // TODO: persist character position
        this.mapContainer = new PIXI.Container();
        this.characterContainer = new PIXI.Container();
        this.mapContainer.sortableChildren = true;
        this.noFocusContainer = new PIXI.Container();
        this.conversationContainer = new PIXI.Container();

        container.addChild(this.mapContainer);
        container.addChild(this.characterContainer);
        container.addChild(this.noFocusContainer);
        container.addChild(this.conversationContainer);

        this.showLevel();

        this.conversationHelper.init(this.frameData.conversations, this.conversationContainer, this.frameData.mapScale);
        this.conversationHelper.restartConversation();

        this.resolveAreaVisited();

        this.noFocusHelper.init(this.noFocusContainer, this.frameData);

        window.addEventListener('keydown', (e) => { this.keys[e.code] = true; this.noFocusHelper.forceFocus(true); });
        window.addEventListener('keyup', (e) => { this.keys[e.code] = false; this.noFocusHelper.forceFocus(true); });
    }

    /** CG API - called every few ms - ideal for key press checks for fluent movement */
    animateScene(delta) {
        if (!this.frameData) return;
        if (!this.prevKeys) { this.prevKeys = {}; }

        // key clicked -> try to process conversation
        if (JSON.stringify(this.prevKeys) !== JSON.stringify(this.keys)) {
            this.conversationHelper.processKeys(this.keys);
        }

        // key held -> try to process movement
        if (Object.values(this.keys).some(v => v === true)) {
            this.handleMovement();
            this.resolveAreaVisited();
        }

        this.prevKeys = { ...this.keys };
    }

}

/**
 * This class is meant as overlay over the game while game is not in focus. Currently, it requires these
 * attributed from FrameData (all shown while game is not in focus - hidden otherwise)
 *
 * - noFocusOverlayAsset - relative path of asset displayed in center of the screen
 * - noFocusOverlayBackgroundColor - int color shown as background
 * - noFocusOverlayBackgroundAlpha - transparency of background color
 *
 * Initialize this overlay using initNoFocusWindow() when you have PIXI container and FrameData available
 *
 * This overlay is triggered using these triggers
 * - window.onfocus
 * - window.onblur
 *
 * Or you can show it manually using
 * - forceFocus(true/false)
 */
class NoFocus {

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

    init(container, frameData) {
        if (!container || !frameData) return;

        container.removeChildren().forEach(c => c.destroy({ children: true }));

        this.noFocusBackground = new this.PIXI.Graphics();
        this.noFocusBackground.beginFill(frameData.noFocusOverlayBackgroundColor, frameData.noFocusOverlayBackgroundAlpha);
        this.noFocusBackground.drawRect(0, 0, 1920, 1080);
        this.noFocusBackground.endFill();
        container.addChild(this.noFocusBackground);

        this.noFocusImage = this.PIXI.Sprite.from(frameData.noFocusOverlayAsset);
        this.noFocusImage.anchor.set(0.5); // stred obrázka
        this.noFocusImage.x = 1920 / 2;
        this.noFocusImage.y = 1080 / 2;
        container.addChild(this.noFocusImage);

        this.invalidateFocus();

        window.onfocus = () => { this.hasFocus = true; this.invalidateFocus(); }
        if (!this.once) window.onblur = () => { this.hasFocus = false; this.invalidateFocus(); }
        window.addEventListener('mousedown', (e) => { this.hasFocus = true; this.invalidateFocus(); });
    }

    invalidateFocus() {
        this.noFocusBackground.visible = !this.hasFocus;
        this.noFocusImage.visible = !this.hasFocus;
    }
}

/**
 * This class is meant as overlay over the game to show conversations.
 *
 * - init() - to initialize conversations with PIXI container
 * - initConversation(id) - to initialize conversation (either immediately or showing "press T to talk")
 * - leaveConversation(id) - to leave conversation with given ID - should be paired with initConversation
 * - processKeys(keys) - to process keys related to conversation
 */
class Conversation {

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

    init(conversations, pixiContainer, scale) {
        if (!conversations || !pixiContainer) return;
        this.conversations = conversations;
        this.talkTextContainer = pixiContainer;
        this.scale = scale;
    }

    initConversation(id) {
        if (this.conversationId === id) return;

        if (this.conversations[id].immediate) {
            this.startConversation(id);
        } else {
            this.showPressToTalk(id);
        }
    }

    showPressToTalk(id) {
        if (this.isPressToTalkVisible) return;  // already visible
        if (this.conversationId === id) return; // conversation already running
        this.conversationId = id;
        this.conversationStarted = false;

        this.talkTextContainer.removeChildren();
        const container = new this.PIXI.Container();

        const t1 = new this.PIXI.Text("Press [T] to talk.", this.baseTextStyle);
        container.addChild(t1);

        this.decorate(container);
    }

    restartConversation() {
        this.startConversation(this.conversationId, true);
    }

    startConversation(id, force = false) {
        if (!force && this.conversationId === id && this.conversationStarted) return;

        this.conversationId = id;
        this.conversationStarted = true;
        this.currentConversation = this.conversations[this.conversationId];
        this.currentLineIndex = 0;
        this.isPressToTalkVisible = false;
        this.renderConversationLine();
    }

    leaveConversation(id) {
        if (id !== this.conversationId) { return; }

        this.talkTextContainer.removeChildren().forEach(c => c.destroy({children: true}));
        this.conversationId = null;
        this.conversationStarted = false;
        this.currentConversation = null;
        this.currentLineIndex = null;
        this.isPressToTalkVisible = false;
    }

    renderConversationLine() {
        if (!this.currentConversation) return;
        const item = this.currentConversation.content[this.currentLineIndex];
        if (!item) return;

        this.talkTextContainer.removeChildren();

        const container = new this.PIXI.Container();

        let offsetX = 0;

        // Render Name:
        const nameText = new this.PIXI.Text(item.who + ": ", this.boldTextStyle);
        nameText.x = offsetX;
        container.addChild(nameText);
        offsetX += nameText.width;

        // Render text parts
        item.text.forEach(part => {
            const style = part.highlight ? this.boldTextStyle : this.baseTextStyle;
            const piece = new this.PIXI.Text(part.text, style);
            piece.x = offsetX;
            container.addChild(piece);
            offsetX += piece.width;
            piece.y += (nameText.height - piece.height) / 2;
        });
        this.decorate(container);
    }

    nextConversationLine() {
        if (!this.currentConversation) return;
        this.currentLineIndex++;
        if (this.currentLineIndex >= this.currentConversation.content.length) {
            this.leaveConversation(this.conversationId);
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
        if (this.conversationId && keys.KeyT) {
            if (this.currentConversation) {
                this.nextConversationLine();
            } else {
                this.startConversation(this.conversationId);
            }
        }
    }
}
