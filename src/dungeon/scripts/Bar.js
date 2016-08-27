
class Bar {
    constructor(game, x, y, width, height) {
        this.width = width
        this.cont = game.make.graphics(x, y)
            .beginFill(COLOR_GREEN)
            .drawRect(0, 0, width, height)
    }

    change(prop) {
        this.cont.width = Math.ceil(prop * this.width)
    }
}
