package com.codingame.game.level

import view.modules.Area
import view.modules.AreaShape
import view.modules.Character
import view.modules.Conversation
import view.modules.ConversationItem
import view.modules.ConversationTextPart
import view.modules.Level

private const val level0TileMap = "79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 1, 2, 3, 3, 4, 3, 4, 3, 5, 6, 1, 7, 8, 9, 10, 7, 8, 9, 10, 16, 11, 17, 18, 19, 20, 17, 18, 19, 20, 26, 21, 27, 28, 29, 30, 27, 28, 29, 30, 36, 11, 7, 8, 51, 24, 24, 54, 9, 10, 16, 21, 17, 18, 26, 18, 19, 31, 19, 20, 26, 31, 27, 28, 36, 8, 9, 31, 29, 30, 36, 41, 44, 45, 46, 18, 19, 41, 44, 45, 46, 79, 79, 79, 79, 28, 29, 79, 79, 79, 79"
private const val level0TileMapLayer2 = "0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0"
private const val level0Obstacles = "2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2"
private val level0Areas = mapOf("c1" to Area(AreaShape.RECTANGLE, 7.0, 7.0, 9.0, 9.0))
private val level0Conversations = mapOf(
    "c1" to Conversation(
        content = listOf(
            ConversationItem("???", listOf(ConversationTextPart("What... What happened?"))),
            ConversationItem("Vampire", listOf(ConversationTextPart("Don't worry about it. Can you tell me what is "), ConversationTextPart("your name", true), ConversationTextPart("?"))),
            ConversationItem("???", listOf(ConversationTextPart("Sure. It's... something like..."))),
            ConversationItem("???", listOf(ConversationTextPart("hmmm"))),
            ConversationItem("Narator", listOf(ConversationTextPart("Use this key:"), ConversationTextPart("\"AABBCCDDEEFFAABBCCDDEEFFAABBCCDD\"", true), ConversationTextPart("to decypher first task.")), "AABBCCDDEEFFAABBCCDDEEFFAABBCCDD"),
        ),
        immediate = false
    )
)

fun getLevel0(screenWidth: Int, screenHeight: Int): Level {
    val scale = 6.0
    return Level(
        noFocusOverlayAsset = "no_focus.png",
        noFocusOverlayBackgroundColor = 0x000000,
        noFocusOverlayBackgroundAlpha = 0.7,
        tileMapAsset = "tileset.png",
        tileMap = listOf(stringToTileMap(level0TileMap, 10), stringToTileMap(level0TileMapLayer2, 10)),
        tileMapObstacles = stringToTileMapObstacles(level0Obstacles, 10),
        tileSize = 16,
        antialias = false,
        areas = level0Areas,
        conversations = level0Conversations,
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        character = Character("character.png", 2, 6),
        npcs = listOf(Character("vampire.png", 8, 7))
    )
}
