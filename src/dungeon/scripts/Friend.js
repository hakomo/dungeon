
class Friend {
    constructor(x, y, lv, friends, char, name, atk, def, mag, mnd, com, rms) {
        if (friends[y][x])
            friends[y][x].destroy()

        this.simpleStatus = null
        this.position = new Phaser.Point(x, y)
        this.lv = lv
        this.hp = 1
        this.friends = friends
        this.char = char
        this.name = char + ' ' + name
        this.atk = atk
        this.def = def
        this.mag = mag
        this.mnd = mnd
        this.com = com
        this.rms = rms
        this.cont = Friend.pool.create()
        this.cont.text = char
        this.cont.position.set(x * CELL_SIZE + 1, y * CELL_SIZE - 2)

        friends[y][x] = this
    }

    setSimpleStatus(status) {
        this.simpleStatus = status
        status.show(this)
    }

    alpha(alpha) {
        this.cont.alpha = alpha
    }

    damage(damage) {
        this.hp = Math.max(0, this.hp - damage)
        this.simpleStatus.damage(this.hp)
        Friend.status.updateHp(this)
        if (!this.hp)
            this.destroy()
    }

    destroy() {
        Friend.pool.destroy(this.cont)
        this.friends[this.position.y][this.position.x] = null
    }
}
Friend.pool = null
Friend.status = null
