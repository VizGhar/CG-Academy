export class TopDownGameModule {
    static get moduleName() {
        return 'TopDownGameModule';
    }

    constructor() {
        this.mapContainer = null;
        this.conversationHelper = new Conversation(PIXI);
        this.noFocusHelper = new NoFocus(PIXI);
    }

    keys = {};

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

        this.mapContainer.sortableChildren = true;
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
    }

    showCharacter(character, tileSize, mapScale) {
        const sprite = character.sprite; // assets/$sprite is relative path to PNG sprite
        const charX = character.x;
        const charY = character.y;

        this.character = new PIXI.Sprite.from(sprite);
        this.character.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        this.character.roundPixels = true;
        this.character.position.set(charX * tileSize * mapScale, charY * tileSize * mapScale);
        this.character.scale.set(mapScale);

        this.mapContainer.addChild(this.character);
    }

    setupGameZones(obstacles, areas, conversations) {
        this.obstacles = obstacles;
        this.areas = areas;
        this.conversations = conversations;
        this.textContainer = new PIXI.Container();
        this.container.addChild(this.textContainer);

        this.conversationHelper.setUp(conversations, this.textContainer);
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

        console.log(this.frameData);

        this.totalTileSize = mapScale * tileSize;

        // unused yet
        const obstacles = this.frameData.tileMapObstacles;
        const areas = this.frameData.areas;
        const conversations = this.frameData.conversations;
        const character = this.frameData.character;

        this.showMap(tileset, mapData, tileSize, antialias, mapScale, mapX, mapY);
        this.showCharacter(character, tileSize, mapScale);
        this.setupGameZones(obstacles, areas, conversations);
    }

    handleFrameData(frameInfo, frameData) {
        if (frameData) { this.frameData = frameData; }
        this.showLevel();
        this.noFocusHelper.initNoFocusWindow(this.noFocusContainer, this.frameData);
    }

    handleGlobalData(players, globalData) { }

    updateScene(previousData, currentData, progress, speed) { }

    reinitScene(container, canvasData) {
        this.mapContainer = new PIXI.Container();
        this.mapContainer.sortableChildren = true;
        this.noFocusContainer = new PIXI.Container();
        this.container = container;
        container.addChild(this.mapContainer);
        container.addChild(this.noFocusContainer);

        this.showLevel();
        this.noFocusHelper.initNoFocusWindow(this.noFocusContainer, this.frameData);

        window.addEventListener('keydown', (e) => { this.keys[e.code] = true; this.noFocusHelper.forceFocus(true); });
        window.addEventListener('keyup', (e) => { this.keys[e.code] = false; this.noFocusHelper.forceFocus(true); });
    }

    handleMovement(delta) {
        const moveSpeed = 5;

        const originalX = this.character.x;
        const originalY = this.character.y;

        if (this.keys.KeyW) this.character.y -= moveSpeed;
        if (this.keys.KeyS) this.character.y += moveSpeed;

        const col1 = this.character.x / this.totalTileSize;
        const row1 = this.character.y / this.totalTileSize;

        if (
            this.obstacles[Math.floor(row1)][Math.floor(col1)] === true ||
            this.obstacles[Math.ceil(row1)][Math.floor(col1)] === true ||
            this.obstacles[Math.floor(row1)][Math.ceil(col1)] === true ||
            this.obstacles[Math.ceil(row1)][Math.ceil(col1)] === true
        ) {
            this.character.y = originalY;
        }

        if (this.keys.KeyA) this.character.x -= moveSpeed;
        if (this.keys.KeyD) this.character.x += moveSpeed;

        const col2 = this.character.x / this.totalTileSize;
        const row2 = this.character.y / this.totalTileSize;

        if (
            this.obstacles[Math.floor(row2)][Math.floor(col2)] === true ||
            this.obstacles[Math.ceil(row2)][Math.floor(col2)] === true ||
            this.obstacles[Math.floor(row2)][Math.ceil(col2)] === true ||
            this.obstacles[Math.ceil(row2)][Math.ceil(col2)] === true
        ){
            this.character.x = originalX;
        }

        if (this.character.x !== originalX || this.character.y !== originalY) {
            this.handleConversationZones();
        }
    }

    handleConversationZones() {
        if (!this.character || !this.areas) return;

        const charX = this.character.x;
        const charY = this.character.y;
        const charW = this.character.width;
        const charH = this.character.height;

        const charLeft = charX;
        const charRight = charX + charW;
        const charTop = charY;
        const charBottom = charY + charH;

        for (const [id, area] of Object.entries(this.areas)) {
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
                this.onAreaEntered(id);
            } else {
                this.onAreaLeft(id);
            }
        }
    }

    onAreaEntered(id) {
        this.conversationHelper.enableConversation(id);
    }

    onAreaLeft(id) { this.conversationHelper.leaveConversation(); }

    animateScene(delta) {
        if (!this.character) return;
        if (!this.prevKeys) { this.prevKeys = {}; }

        if (JSON.stringify(this.prevKeys) !== JSON.stringify(this.keys)) {
            this.conversationHelper.processKeys(this.keys);
        }

        if (Object.values(this.keys).some(v => v === true)) {
            this.handleMovement(delta);
        }

        this.prevKeys = { ...this.keys };
    }

}

class NoFocus {

    constructor(PIXI) {
        this.PIXI = PIXI;
        this.hasFocus = false;
    }

    forceFocus(on) {
        this.hasFocus = on;
        this.invalidateFocus();
    }

    initNoFocusWindow(container, frameData) {
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
        window.onblur = () => { this.hasFocus = false; this.invalidateFocus(); }
        window.addEventListener('mousedown', (e) => { this.hasFocus = true; this.invalidateFocus(); });
    }

    invalidateFocus() {
        this.noFocusBackground.visible = !this.hasFocus;
        this.noFocusImage.visible = !this.hasFocus;
    }
}

class Conversation {

    constructor(PIXI) {
        this.PIXI = PIXI;

        this.baseTextStyle = new this.PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 32,
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowDistance: 2,
            align: "center",
        });

        this.boldTextStyle = new this.PIXI.TextStyle({
            ...this.baseTextStyle,
            fontWeight: "bold",
        });
    }

    setUp(conversations, pixiContainer) {
        this.conversations = conversations;
        this.talkTextContainer = pixiContainer;
    }

    enableConversation(id) {
        this.conversationId = id;
        this.talkTextContainer.removeChildren();
        const container = new this.PIXI.Container();

        let offsetX = 0;

        const t1 = new this.PIXI.Text("Press ", this.baseTextStyle);
        t1.x = offsetX;
        container.addChild(t1);
        offsetX += t1.width;

        const t2 = new this.PIXI.Text("[T]", this.boldTextStyle);
        t2.x = offsetX;
        container.addChild(t2);
        offsetX += t2.width;

        const t3 = new this.PIXI.Text(" to talk.", this.baseTextStyle);
        t3.x = offsetX;
        container.addChild(t3);

        this.talkTextContainer.addChild(container);
        container.x = 50;
        container.y = 100;
    }

    startConversation() {
        if (!this.currentConversation) {
            this.currentConversation = this.conversations[this.conversationId];
            this.currentLineIndex = 0;
            this.renderConversationLine();
        }
    }

    leaveConversation() {
        this.talkTextContainer.removeChildren().forEach(c => c.destroy({children: true}));
        this.conversationId = null;
        this.currentConversation = null;
        this.currentLineIndex = -1;
    }

    renderConversationLine() {
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
        });

        this.talkTextContainer.addChild(container);
        container.x = 50;
        container.y = 50;
    }

    nextConversationLine() {
        if (!this.currentConversation) return;
        this.currentLineIndex++;
        if (this.currentLineIndex === -1 || this.currentLineIndex >= this.currentConversation.content.length) {
            this.leaveConversation()
        } else {
            this.renderConversationLine();
        }
    }

    processKeys(keys) {
        if (this.conversationId && keys.KeyT) {
            if (this.currentConversation) {
                this.nextConversationLine();
            } else {
                this.startConversation();
            }
        }
    }
}
