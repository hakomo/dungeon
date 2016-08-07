
class FriendSimpleStatus {
    constructor(game, x, y) {
        this.cont = game.add.graphics(x, y)
            .lineStyle(1, COLOR_WHITE)
            .drawRect(2, 19, 81, 5)
        this.bar = game.make.graphics(3, 20)
            .beginFill(COLOR_GREEN)
            .drawRect(0, 0, 80, 4)
        this.cont.addChild(this.bar)
        this.char = this.cont.addChild(game.make.text(0, 0, '', FONT_CYAN))
        this.name = this.cont.addChild(game.make.text(23, 3, '', FONT_VERDANA))
        this.hide()
    }

    show(friend) {
        this.cont.visible = true
        this.bar.width = Math.ceil(friend.hp * HPBAR_WIDTH)
        this.char.text = friend.char
        this.name.text = 'L' + friend.lv
    }

    hide() {
        this.cont.visible = false
    }
}
