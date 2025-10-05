package com.codingame.game.level

import com.codingame.game.Player
import com.codingame.gameengine.core.SoloGameManager
import com.codingame.gameengine.module.entities.GraphicEntityModule
import view.modules.Level
import view.modules.TopDownGameModule

class Level1(
    val gameManager: SoloGameManager<Player>,
    val graphics: GraphicEntityModule,
    val gameModule: TopDownGameModule
) : BaseLevel() {

    override fun gameTurn(turn: Int) {
        gameManager.player.execute()
        if (check(gameManager.player.outputs)) {
            gameManager.winGame("Your name is ${gameManager.player.outputs[0]}!")
            showGame()
        } else {
            gameManager.loseGame("Name not set :(")
        }
    }

    private fun check(output: List<String>) =
        output.size == 1 && output[0].isNotEmpty()

    private fun showGame() {
        val w = graphics.world.width
        val h = graphics.world.height
        gameModule.setFrames(0)
        gameModule.setLevel(getLevel1(w, h, gameManager.player.outputs[0]))
    }
}

private fun getLevel1(screenWidth: Int, screenHeight: Int, name: String): Level {
    val scale = 6.0
    return Level(
        level = "1",
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        conversationWildcards = mapOf("name" to name)
    )
}
