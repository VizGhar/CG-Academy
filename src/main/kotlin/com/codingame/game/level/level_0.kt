package com.codingame.game.level

import view.modules.Level

fun getLevel0(screenWidth: Int, screenHeight: Int): Level {
    val scale = 6.0
    return Level(
        level = "intro",
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        conversationWildcards = emptyMap()
    )
}
