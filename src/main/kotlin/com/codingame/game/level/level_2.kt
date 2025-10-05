package com.codingame.game.level

import com.codingame.game.Player
import com.codingame.gameengine.core.SoloGameManager
import com.codingame.gameengine.module.entities.GraphicEntityModule
import view.modules.Level
import view.modules.TopDownGameModule

class Level2(
    val gameManager: SoloGameManager<Player>,
    val graphics: GraphicEntityModule,
    val gameModule: TopDownGameModule
) : BaseLevel() {

    data class TurnInput(val w: Int, val h: Int, val map: List<String>, val expectedOutput: String)

    val inputs = mutableListOf<TurnInput>()

    override fun init() {
        val cases = gameManager.testCaseInput[1].toInt()
        gameManager.maxTurns = cases

        gameManager.player.sendInputLine(cases.toString())
        var remainingInputs = gameManager.testCaseInput.drop(2)
        repeat(cases) {
            val (w, h) = remainingInputs[0].split(" ").map { it.toInt() }
            val map = remainingInputs.drop(1).take(h)
            val expectedOutput = remainingInputs.drop(1 + h)[0]
            remainingInputs = remainingInputs.drop(2 + h)
            inputs += TurnInput(w, h, map, expectedOutput)
        }

        graphics.createRectangle().setWidth(100).setHeight(100).setFillColor(0xffffff)
    }

    override fun gameTurn(turn: Int) {
        if (turn == 1) { gameManager.player.sendInputLine(inputs.size.toString()) }
        val l = inputs[turn - 1]
        gameManager.player.sendInputLine("${l.w} ${l.h}")
        l.map.forEach { gameManager.player.sendInputLine(it) }
        gameManager.player.execute()
        animate()
        if (gameManager.player.outputs[0] != l.expectedOutput) {
            gameManager.loseGame("Expected ${l.expectedOutput}")
        } else if (turn == inputs.size) {
            gameManager.winGame("Yahooo")
            val w = graphics.world.width
            val h = graphics.world.height
            gameModule.setLevel(getLevel2(w, h, gameManager.player.outputs[0]))
            gameModule.setFrames(inputs.size)
        }
    }

    fun animate() {
        graphics.createRectangle()
    }
}

fun getLevel2(screenWidth: Int, screenHeight: Int, name: String): Level {
    val scale = 6.0
    return Level(
        level = "1",
        mapScale = scale,
        x = ((screenWidth - scale * 16 * 10) / 2).toInt(),
        y = ((screenHeight - scale * 16 * 10) / 2).toInt(),
        conversationWildcards = mapOf("name" to name)
    )
}
