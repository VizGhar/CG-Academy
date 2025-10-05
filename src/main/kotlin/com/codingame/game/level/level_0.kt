package com.codingame.game.level

import com.codingame.game.Player
import com.codingame.gameengine.core.SoloGameManager
import com.codingame.gameengine.module.entities.GraphicEntityModule
import view.modules.Level
import view.modules.TopDownGameModule

class Level0(
    val gameManager: SoloGameManager<Player>,
    val graphics: GraphicEntityModule,
    val gameModule: TopDownGameModule
    ): BaseLevel() {

    override fun gameTurn(turn: Int) {
        gameManager.winGame()
        showGame()
    }

    private fun showGame() {
        val w = graphics.world.width
        val h = graphics.world.height
        val scale = 6.0
        gameModule.setLevel(Level(
            level = "intro",
            mapScale = scale,
            x = ((w - scale * 16 * 10) / 2).toInt(),
            y = ((h - scale * 16 * 10) / 2).toInt(),
            conversationWildcards = emptyMap()
        ))
    }
}
