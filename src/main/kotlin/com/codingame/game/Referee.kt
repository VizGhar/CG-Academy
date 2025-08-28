package com.codingame.game

import com.codingame.game.level.checkLevel2Output
import com.codingame.game.level.getLevel1
import com.codingame.game.level.getLevel2
import com.codingame.gameengine.core.AbstractPlayer
import com.codingame.gameengine.core.AbstractReferee
import com.codingame.gameengine.core.SoloGameManager
import com.codingame.gameengine.module.entities.GraphicEntityModule
import com.google.inject.Inject
import view.modules.TopDownGameModule

class Referee : AbstractReferee() {

    @Inject private lateinit var gameManager: SoloGameManager<Player>
    @Inject private lateinit var graphicEntityModule: GraphicEntityModule

    @Inject private lateinit var gameModule: TopDownGameModule

    override fun init() {
        gameManager.firstTurnMaxTime = 5000
        gameManager.frameDuration = 500
    }

    fun sendInput() {
        when(gameManager.testCaseInput[0]?.toInt()) {
            null -> throw IllegalStateException("Imposibru")
            1 -> { gameManager.player.sendInputLine("Text") }
        }
    }

    fun validateOutput(): Boolean {
        return when(gameManager.testCaseInput[0]?.toInt()) {
            1 -> checkLevel2Output(gameManager.player.outputs)
            else -> throw IllegalStateException("Imposibru")
        }
    }

    override fun gameTurn(turn: Int) {
        sendInput()
        try {
            gameManager.player.execute()
            initVisual(gameManager.testCaseInput[0]?.toInt()!!)
            gameManager.winGame()
            return
            if (validateOutput()) {
                initVisual(gameManager.testCaseInput[0]?.toInt()!!)
                gameManager.winGame()
                return
            } else {
                initVisual(gameManager.testCaseInput[0]?.toInt()!! - 1)
                gameManager.loseGame("Invalid output")
                return
            }
        } catch (_: AbstractPlayer.TimeoutException) {
            gameManager.loseGame("Timeout!")
            return
        }
    }

    private fun initVisual(level: Int) {
        val w = graphicEntityModule.world.width
        val h = graphicEntityModule.world.height

        gameModule.setLevel(
            when (level) {
                0 -> getLevel1(w, h)
                1 -> getLevel2(w, h, gameManager.player.outputs[0])
                else -> throw IllegalStateException()
            }
        )
    }
}
