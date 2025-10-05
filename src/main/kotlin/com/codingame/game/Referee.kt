package com.codingame.game

import com.codingame.game.level.Level0
import com.codingame.game.level.Level1
import com.codingame.game.level.Level2
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

    private val level by lazy {
        when(gameManager.testCaseInput[0]?.toInt()) {
            0 -> Level0(gameManager, graphicEntityModule, gameModule)
            1 -> Level1(gameManager, graphicEntityModule, gameModule)
            2 -> Level2(gameManager, graphicEntityModule, gameModule)
            else -> throw IllegalArgumentException()
        }
    }

    override fun init() {
        gameManager.firstTurnMaxTime = 5000
        gameManager.frameDuration = 500
        level.init()
    }

    override fun gameTurn(turn: Int) {
        try {
            level.gameTurn(turn)
        } catch (_: AbstractPlayer.TimeoutException) {
//            initVisual(gameManager.testCaseInput[0]?.toInt()!! - 1)
            gameManager.loseGame("Timeout!")
            return
        }
    }
}
