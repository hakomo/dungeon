
class FriendPool {
    constructor(cont) {
        this.cont = cont
        this.unused = []
        for (let i = 0; i < BOARD_ROWS * BOARD_COLUMNS; ++i)
            this.unused.push(cont.game.make.text(0, 0, '', FONT_GENNOKAKU))
    }

    create() {
        return this.cont.addChild(this.unused.pop())
    }

    destroy(text) {
        this.unused.push(this.cont.removeChild(text))
    }
}
