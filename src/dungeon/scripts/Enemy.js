
class Enemy {
    constructor(game, name, lv, status) {
        status.show(name, lv)
        this.game = game
        this.status = status
        this.cont = game.make.sprite(0, 0, 'swordsman')
        this.cont.visible = false
        this.cont.anchor.set(0.5, 0.5)
        this.cont.animations.add('walk', [0, 1, 2, 1], 6, true)
        Enemy.container.addChild(this.cont)
    }

    show(rect, x, y) {
        this.cont.visible = true
        this.cont.alpha = 0
        this.cont.x = (rect.x + rect.right) * CELL_SIZE / 2 + (x - 0.5) * 32
        this.cont.y = (rect.y + rect.bottom) * CELL_SIZE / 2 + (y - 0.5) * 32 - 8
        return this.game.add.tween(this.cont).to({ alpha: 1, y: this.cont.y + 8 }, 200)
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

    walk() {
        this.cont.animations.play('walk')
    }

    destroy() {
        this.status.hide()
        this.cont.destroy()
    }
}
Enemy.container = null
