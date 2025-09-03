package com.codingame.game.level

import view.modules.Conversation
import view.modules.ConversationItem
import view.modules.ConversationTextPart
import view.modules.Level

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
        level = "1",
        conversations = level1Conversations(name),
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt()
    )
}

fun checkLevel1Outputs(output: List<String>) = output.size == 1 && output[0].isNotEmpty()
