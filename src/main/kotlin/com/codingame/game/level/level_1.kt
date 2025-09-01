package com.codingame.game.level

import view.modules.Area
import view.modules.AreaShape
import view.modules.Character
import view.modules.Conversation
import view.modules.ConversationItem
import view.modules.ConversationTextPart
import view.modules.Level


private const val level1TileMap = "79, 79, 79, 79, 79, 79, 79, 79, 79, 79, 1, 2, 3, 3, 4, 3, 4, 3, 5, 6, 1, 7, 8, 9, 10, 7, 8, 9, 10, 16, 11, 17, 18, 19, 20, 17, 18, 19, 20, 26, 21, 27, 28, 29, 30, 27, 28, 29, 30, 36, 11, 7, 8, 51, 24, 24, 54, 9, 10, 16, 21, 17, 18, 26, 18, 19, 31, 19, 20, 26, 31, 27, 28, 36, 8, 9, 31, 29, 30, 36, 41, 44, 45, 46, 18, 19, 41, 44, 45, 46, 79, 79, 79, 79, 28, 29, 79, 79, 79, 79"
private const val level1TileMapLayer2 = "0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0"
private const val level1Obstacles = "2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2"
private val level1Areas = mapOf("c1" to Area(AreaShape.RECTANGLE, 7.0, 7.0, 9.0, 9.0), "c2" to Area(AreaShape.RECTANGLE, 4.0, 7.0, 6.0, 9.0))
private fun level1Conversations(name: String) = mapOf(
    "c1" to Conversation(
        content = listOf(
            ConversationItem(name, listOf(ConversationTextPart("Ah yes. $name... They call me $name"))),
            ConversationItem(name, listOf(ConversationTextPart("Where am I?"))),
            ConversationItem("Vampire", listOf(ConversationTextPart("Glad you still remember something."))),
            ConversationItem("Vampire", listOf(ConversationTextPart("You have to leave now... There are much stranger mysteries to be solved"))),
            ConversationItem("Vampire", listOf(ConversationTextPart("I mean. Beside your name of course"))),
        ),
        immediate = true
    ),
    "c2" to Conversation(
        listOf(
            ConversationItem(name, listOf(ConversationTextPart("I wonder what will come next..."))),
            ConversationItem("Narator", listOf(ConversationTextPart("Key for second part is: 01234567890123456789012345678901")))
        ),
        immediate = false
    )
)

fun getLevel1(screenWidth: Int, screenHeight: Int, name: String): Level {
    val scale = 6.0
    return Level(
        noFocusOverlayAsset = "no_focus.png",
        noFocusOverlayBackgroundColor = 0x000000,
        noFocusOverlayBackgroundAlpha = 0.7,
        tileMapAsset = "tileset.png",
        tileMap = listOf(stringToTileMap(level1TileMap, 10), stringToTileMap(level1TileMapLayer2, 10)),
        tileMapObstacles = stringToTileMapObstacles(level1Obstacles, 10),
        tileSize = 16,
        antialias = false,
        areas = level1Areas,
        conversations = level1Conversations(name),
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        character = Character("character.png", 7, 7),
        npcs = listOf(Character("vampire.png", 8, 7))
    )
}

fun checkLevel1Outputs(output: List<String>) = output.size == 1 && output[0].isNotEmpty()
