package com.codingame.game

import com.codingame.game.level.checkLevel1Outputs
import com.codingame.game.level.getLevel0
import com.codingame.game.level.getLevel1
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
            1 -> { }
            else -> { }
        }
    }

    fun validateOutput(): Boolean {
        return when(gameManager.testCaseInput[0]?.toInt()) {
            1 -> checkLevel1Outputs(gameManager.player.outputs)
            else -> true
        }
    }

    override fun gameTurn(turn: Int) {
        sendInput()
        try {
            gameManager.player.execute()
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
            initVisual(gameManager.testCaseInput[0]?.toInt()!! - 1)
            gameManager.loseGame("Timeout!")
            return
        }
    }

    private fun initVisual(level: Int) {
        val w = graphicEntityModule.world.width
        val h = graphicEntityModule.world.height

        gameModule.setLevel(
            when (level) {
                0 -> getLevel0(w, h)
                1 -> getLevel1(w, h, gameManager.player.outputs[0])
                else -> throw IllegalStateException()
            }
        )
    }
}
