import Constants from "../Constants"
import { randomPositions } from "../utility/utilities"

const outOfBounds = (head, tail, dispatch) => {
    if (
        head.position[0] + head.xspeed < 0 ||
        head.position[1] + head.yspeed < 0 ||
        head.position[0] + head.xspeed >= Constants.GRID_SIZE ||
        head.position[1] + head.yspeed >= Constants.GRID_SIZE
    ) {
        dispatch("game-over")
        head.xspeed = 0
        head.yspeed = 0
        tail.elements = []
    }
}

const eatItself = (head, tail, dispatch) => {
    tail.elements.forEach((e, i) => {
        if (
            head.position[0] == e[0] &&
            head.position[1] == e[1]
        ) {
            dispatch("game-over")
        }
    })
}

const eatFood = (head, tail, food, dispatch) => {
    if (head.position[0] == food.position[0] &&
        head.position[1] == food.position[1]) {
        food.position = [
            randomPositions(0, Constants.GRID_SIZE - 1),
            randomPositions(0, Constants.GRID_SIZE - 1)
        ]

        tail.elements = [
            [head.position[0], head.position[1]], ...tail.elements
        ]

        dispatch("eat")
    }
}

const move = (events, head) => {
    if (events.length) {
        events.forEach(e => {
            switch (e) {
                case "move-left":
                    if (head.xspeed === 1) return
                    head.xspeed = -1
                    head.yspeed = 0
                    return;
                case "move-right":
                    if (head.xspeed === -1) return
                    head.xspeed = 1
                    head.yspeed = 0
                    return;
                case "move-up":
                    if (head.yspeed === 1) return
                    head.yspeed = -1
                    head.xspeed = 0
                    return;
                case "move-down":
                    if (head.yspeed === -1) return
                    head.yspeed = 1
                    head.xspeed = 0
                    return;
            }
        });
    }
}

export default (entities, { events, dispatch }) => {
    const head = entities.head
    const food = entities.food
    const tail = entities.tail

    move(events, head)

    head.nextMove -= 1

    if (head.nextMove === 0) {
        head.nextMove = head.updateFrequency

        outOfBounds(head, tail, dispatch)

        tail.elements = [[head.position[0], head.position[1]], ...tail.elements]
        tail.elements.pop()

        head.position[0] += head.xspeed
        head.position[1] += head.yspeed

        eatItself(head, tail, dispatch)

        eatFood(head, tail, food, dispatch)
    }

    return entities
}