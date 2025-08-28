package com.codingame.game.level

fun stringToTileMap(map: String, width: Int, offset: Int = -1) = map.split(", ").map { it.toInt() + offset }.chunked(width)
fun stringToTileMapObstacles(map: String, width: Int, offset: Int = -1) = map.split(", ").map { it.toInt() + offset == 1 }.chunked(width)
