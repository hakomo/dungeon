
class Enemy {
    constructor(game, name, lv, status) {
        status.show(name, lv)
        this.status = status
        this.cont = game.make.sprite(0, 0, 'swordsman')
        this.cont.visible = false
        this.cont.anchor.set(0.5, 0.5)
        this.cont.animations.add('walk', [0, 1, 2, 1], 6, true)
        Enemy.container.addChild(this.cont)
    }

    show(rect, x, y, alpha = 1) {
        this.cont.visible = true
        this.cont.alpha = alpha
        this.cont.x = (rect.x + rect.right) * CELL_SIZE / 2 + (x - 0.5) * 32
        this.cont.y = (rect.y + rect.bottom) * CELL_SIZE / 2 + (y - 0.5) * 32
    }

    hide() {
        this.cont.visible = false
    }

    preview(rect, x, y) {
        this.show(rect, x, y, 0.4)
    }

    walk() {
        this.cont.animations.play('walk')
    }

    destroy() {
        this.status.hide()
        this.cont.destroy()
    }
}
Enemy.container = null
