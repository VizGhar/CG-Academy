package view.modules

import com.codingame.gameengine.core.AbstractPlayer
import com.codingame.gameengine.core.GameManager
import com.codingame.gameengine.core.Module
import com.google.inject.Inject

data class ConversationTextPart(val text: String, val highlight: Boolean = false)
data class ConversationItem(val who: String, val text: List<ConversationTextPart>, val copyText: String? = null)
data class Conversation(val content: List<ConversationItem>, val immediate: Boolean)

data class Level(
    val level: String,
    val conversations: Map<String, Conversation>,
    val mapScale: Double,
    val x: Int,
    val y: Int
)

class TopDownGameModule @Inject constructor(
    private val gameManager: GameManager<AbstractPlayer>
) : Module {

    init { gameManager.registerModule(this) }


    override fun onGameInit() {
    }

    override fun onAfterGameTurn() {
    }

    override fun onAfterOnEnd() {
    }

    fun setLevel(level: Level) {
        gameManager.setViewData("TopDownGameModule", level)
    }

}