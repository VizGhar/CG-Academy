package view.modules

import com.codingame.gameengine.core.AbstractPlayer
import com.codingame.gameengine.core.GameManager
import com.codingame.gameengine.core.Module
import com.google.inject.Inject

data class Level(
    val level: String,
    val mapScale: Double,
    val x: Int,
    val y: Int,
    val conversationWildcards: Map<String, String>
)

class TopDownGameModule @Inject constructor(
    private val gameManager: GameManager<AbstractPlayer>
) : Module {

    private var level: Level? = null
    private var frames: Int = 0

    init { gameManager.registerModule(this) }

    override fun onGameInit() {
    }

    override fun onAfterGameTurn() {
    }

    override fun onAfterOnEnd() {
        gameManager.setViewData("TopDownGameModule", listOf(frames, level))
    }

    fun setFrames(frames: Int) {
        this.frames = frames
    }

    fun setLevel(level: Level) {
        this.level = level
    }

}