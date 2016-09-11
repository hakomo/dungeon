
class Condition {
    constructor(char) {
        this.char = char
        this.turn = 2
    }

    is(char) {
        return this.char === char
    }

    reset() {
        this.turn = 2
    }

    decrement() {
        --this.turn
        return !this.turn
    }
}
const
    COND_POISON     = '毒',
    COND_LOSTCHILD  = '迷',
    COND_BURN       = '火',
    COND_MELTING    = '溶',
    COND_SILENCE    = '黙',
    COND_DAZZLE     = '幻',
    COND_SLOTH      = '怠'
