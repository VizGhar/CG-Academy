package view.modules

import com.codingame.gameengine.core.AbstractPlayer
import com.codingame.gameengine.core.GameManager
import com.codingame.gameengine.core.Module
import com.google.inject.Inject

data class Area(val type: AreaShape, val ax: Double, val ay: Double, val bx: Double, val by: Double)
enum class AreaShape { RECTANGLE }
data class Character(val sprite: String, val x: Int, val y: Int)
data class ConversationTextPart(val text: String, val highlight: Boolean = false)
data class ConversationItem(val who: String, val text: List<ConversationTextPart>, val copyText: String? = null)
data class Conversation(val content: List<ConversationItem>, val immediate: Boolean)

//
data class Scene(val tilemap: String)

data class Level(
    val noFocusOverlayAsset: String,
    val noFocusOverlayBackgroundColor: Int,
    val noFocusOverlayBackgroundAlpha: Double,
    val tileMapAsset: String,
    val tileMap: List<List<List<Int>>>,
    val tileMapObstacles: List<List<Boolean>>,
    val tileSize: Int,
    val antialias: Boolean,
    val areas: Map<String, Area>,
    val conversations: Map<String, Conversation>,
    val mapScale: Double,
    val x: Int,
    val y: Int,
    val character: Character,
    val npcs: List<Character>
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