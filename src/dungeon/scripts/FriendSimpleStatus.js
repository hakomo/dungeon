
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
            80, null, false, 0, 0, true)
        this.bar = new Bar(game, 3, 20, HPBAR_WIDTH, 4)
        this.cont.addChild(this.bar.cont)
        this.char = this.cont.addChild(game.make.text(0, 0, '', FONT_CYAN))
        this.name = this.cont.addChild(game.make.text(23, 3, '', FONT_VERDANA))

        this.overlay = game.add.text(x + 51, y + 13, '', {
            font: '24px gennokaku',
            stroke: 'black',
            strokeThickness: 4,
        })
        this.overlay.anchor.set(0.5, 0.5)
        this.overlayTween = game.add.tween(this.overlay.scale).from({ x: 1.2, y: 1.2 },
            100)

        this.hide()
    }

    show(friend) {
        this.cont.visible = true
        this.cont.alpha = 1
        this.bar.change(friend.hp)
        this.char.text = friend.char
        this.name.text = 'L' + friend.lv
    }

    hide() {
        this.cont.visible = false
        this.overlay.visible = false
    }

    damage(prop) {
        this.flushTween.start()
        this.bar.animate(prop)
        if (!prop) {
            this.cont.alpha = 0.5
            this.overlay.visible = true
            this.overlay.text = '撃破'
            this.overlay.fill = RGBA_ORANGE
            this.overlayTween.start()
        }
    }
}
