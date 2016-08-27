
class Enemy {
    constructor(name, lv, status) {
        status.show(name, lv)
        this.status = status

        this.hp = 200
        this.maxHp = 200
        this.state = ENEMY_BATTLE

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
        return game.add.tween(this.cont).to({ alpha: 1, y: this.cont.y + 8 }, 200)
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

    damage(damage) {
        this.hp = Math.max(0, this.hp - damage)
        this.status.damage(this.hp / this.maxHp)
        if (!this.hp) {
            this.state = ENEMY_DEAD
            this.cont.angle = -90
            this.cont.y += 8
            this.cont.animations.stop('walk')
        }
    }

    act(enemies, friends) {
    }

    destroy() {
        this.status.hide()
        this.cont.destroy()
    }
}
Enemy.container = null
const
    ENEMY_BATTLE    = 0,
    ENEMY_DEAD      = 1,
    ENEMY_LATE      = 2
