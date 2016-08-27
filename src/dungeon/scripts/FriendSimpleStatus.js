
class FriendSimpleStatus {
    constructor(game, x, y) {
        this.cont = game.add.graphics(x, y)
            .lineStyle(1, COLOR_WHITE)
            .drawRect(2, 19, 81, 5)
        let flush = game.make.graphics()
            .beginFill(COLOR_WHITE)
            .drawRect(-4, 0, 94, 28)
        flush.alpha = 0
        this.cont.addChild(flush)
        this.flushTween = game.add.tween(flush).to({ alpha: 0.3 },
            100, null, false, 0, 0, true)
        this.bar = new Bar(game, 3, 20, HPBAR_WIDTH, 4)
        this.cont.addChild(this.bar.cont)
        this.char = this.cont.addChild(game.make.text(0, 0, '', FONT_CYAN))
        this.name = this.cont.addChild(game.make.text(23, 3, '', FONT_VERDANA))
        this.hide()
    }

    show(friend) {
        this.cont.visible = true
        this.bar.change(friend.hp)
        this.char.text = friend.char
        this.name.text = 'L' + friend.lv
    }

    hide() {
        this.cont.visible = false
    }

    flush() {
        this.flushTween.start()
    }
}
