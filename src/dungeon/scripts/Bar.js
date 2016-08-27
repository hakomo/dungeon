
class Bar {
    constructor(x, y, width, height) {
        this.width = width
        this.cont = game.make.graphics(x, y)
            .beginFill(COLOR_GREEN)
            .drawRect(0, 0, width, height)
        this.tween = null
    }

    change(prop) {
        if (this.tween) {
            this.tween.stop()
            this.tween = null
        }
        this.cont.width = Math.ceil(prop * this.width)
    }

    animate(prop) {
        if (this.tween) {
            this.tween.stop()
            this.tween = null
        }
        let width = Math.ceil(prop * this.width)
        if (width === this.cont.width) return
        this.tween = game.add.tween(this.cont).to({ width },
            Math.abs(width - this.cont.width) * 20, null, true)
    }
}
