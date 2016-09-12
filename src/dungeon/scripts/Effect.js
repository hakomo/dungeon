
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
            ['autoheal', 'autoheal', 15],
        ]) {
            this[char] = game.make.sprite(0, 0, key)
            this[char].anchor.set(0.5, 0.5)
            let a = this[char].animations.add('', null, rate)
            a.onComplete.add(function(s) {
                s.parent.removeChild(s)
            })
        }
    }

    condition(x, y, char) {
        this[char].position.set(x, y)
        game.world.addChild(this[char])
        this[char].animations.play('')
    }
}
