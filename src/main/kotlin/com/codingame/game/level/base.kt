package com.codingame.game.level

abstract class BaseLevel {

    open fun init() { }
    abstract fun gameTurn(turn: Int)
}