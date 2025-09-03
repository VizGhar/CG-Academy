package com.codingame.game.level

import view.modules.Area
import view.modules.AreaShape
import view.modules.Character
import view.modules.Conversation
import view.modules.ConversationItem
import view.modules.ConversationTextPart
import view.modules.Level

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
        level = "intro",
        areas = level0Areas,
        conversations = level0Conversations,
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt()
    )
}
