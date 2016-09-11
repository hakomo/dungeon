
class Friend {
    constructor(x, y, lv, friends, char, name, caption, atk, def, mag, mnd, com, rms) {
        if (friends[y][x])
            friends[y][x].destroy()

        this.simpleStatus = null
        this.state = CHARA_BATTLE
        this.position = new Phaser.Point(x, y)
        this.lv = lv
        this.hp = 1
        this.startHp
        this.friends = friends
        this.char = char
        this.name = name
        this.caption = caption
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

    start(status) {
        this.state = CHARA_BATTLE
        this.startHp = this.hp
        this.simpleStatus = status
        return status.show(this)
    }

    alpha(alpha) {
        this.cont.alpha = alpha
    }

    damage(damage) {
        this.hp = Math.max(0, this.hp - damage)
        this.simpleStatus.damage(this.hp)
        Friend.status.updateHp(this)
        if (!this.hp) {
            this.state = CHARA_DEAD
            this.destroy()
        }
    }

    act(enemies, friends, aggressive) {
        if (this.startHp - this.hp < (aggressive ? 0.4 : 0.2)) {
            game.rnd.pick(enemies).damage(game.rnd.between(2, 10))

        } else {
            this.state = CHARA_ESCAPE
            this.simpleStatus.escape()
        }
    }

    destroy() {
        Friend.pool.destroy(this.cont)
        this.friends[this.position.y][this.position.x] = null
    }
}
Friend.pool = null
Friend.status = null

class ZombieFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '屍', 'ゾンビー', '猛毒 付与', 4, 1, 0, 1, 0, 0)
    }
}

class DevilFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '悪', '悪魔ベルフェゴル', '怠惰 付与', 0, 2, 5, 4, 0, 1)
    }
}

class DragonFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '竜', 'ドラゴン', '火傷 付与', 5, 4, 0, 3, 0, 2)
    }
}

class SlimeFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '粘', 'スライム', '溶解 付与', 1, 3, 0, 2, 1, 0)
    }
}

class RobotFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '機', '魔導人形', '', 0, 5, 4, 1, 1, 1)
    }
}

class EyesFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '眼', 'ヒャクメ', '幻惑 付与', 3, 2, 0, 3, 1, 2)
    }
}

class MaskFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '面', 'クチナシの仮面', '沈黙 付与', 0, 4, 3, 2, 2, 0)
    }
}

class GoblinFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '亜', 'ゴブリン', '', 2, 2, 0, 1, 2, 1)
    }
}

class ForestFriend extends Friend {
    constructor(x, y, lv, friends) {
        super(x, y, lv, friends, '森', '森林地帯', '迷子 付与', 1, 3, 0, 1, 2, 2)
    }
}
