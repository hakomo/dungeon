
class Enemy {
    constructor(game, name, lv, status) {
        status.show(name, lv)
        this.status = status
        this.cont = game.make.sprite(0, 0, 'swordsman')
        this.cont.visible = false
        this.cont.anchor.set(0.5, 0.5)
        Enemy.container.addChild(this.cont)
    }

    hide() {
        this.cont.visible = false
    }

    preview(rect, x, y) {
        this.cont.visible = true
        this.cont.alpha = 0.4
        this.cont.x = (rect.x + rect.right) * CELL_SIZE / 2 + (x - 0.5) * 32
        this.cont.y = (rect.y + rect.bottom) * CELL_SIZE / 2 + (y - 0.5) * 32
    }

    destroy() {
        this.status.hide()
        this.cont.destroy()
    }
}
Enemy.container = null
