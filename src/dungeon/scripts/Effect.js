
class Effect {
    constructor() {
        for (let [char, key, rate] of [
            [COND_POISON, 'poison', 15],
            [COND_LOSTCHILD, 'lostchild', 20],
            [COND_BURN, 'burn', 15],
            [COND_MELTING, 'melting', 20],
            [COND_SILENCE, 'silence', 20],
            [COND_DAZZLE, 'dazzle', 15],
            [COND_SLOTH, 'sloth', 15],
        ]) {
            this[char] = this.sprite(0, 0, key, rate)
        }
        this.autoheals = []
        for (let y = 0; y < 2; ++y) {
            for (let x = 0; x < 2; ++x) {
                let s = this.sprite(ENEMY_X + ENEMY_WIDTH * (x + 0.5),
                    ENEMY_Y + ENEMY_HEIGHT * (y + 0.5), 'autoheal', 15)
                this.autoheals.push(s)
            }
        }
    }

    condition(x, y, char) {
        if (char === 'autoheal') {
            for (let s of this.autoheals) {
                if (s.x === x && s.y === y) {
                    game.world.addChild(s)
                    s.animations.play('')
                }
            }
            return
        }
        this[char].position.set(x, y)
        game.world.addChild(this[char])
        this[char].animations.play('')
    }

    sprite(x, y, key, rate) {
        let s = game.make.sprite(x, y, key)
        s.anchor.set(0.5, 0.5)
        let a = s.animations.add('', null, rate)
        a.onComplete.add(function(s) {
            s.parent.removeChild(s)
        })
        return s
    }
}
