package com.codingame.game.level

import view.modules.Level

fun getLevel1(screenWidth: Int, screenHeight: Int, name: String): Level {
    val scale = 6.0
    return Level(
        level = "1",
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        conversationWildcards = mapOf("name" to name)
    )
}

fun checkLevel1Outputs(output: List<String>) = output.size == 1 && output[0].isNotEmpty()
