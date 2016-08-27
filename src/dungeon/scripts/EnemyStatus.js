
class EnemyStatus {
    constructor(game, x, y) {
        this.cont = game.add.graphics(x, y)
            .lineStyle(1, COLOR_WHITE)
            .drawRect(59, 29, HPBAR_WIDTH + 1, 15)
        let flush = game.make.graphics()
            .beginFill(COLOR_WHITE)
            .drawRect(0, 0, ENEMY_WIDTH, ENEMY_HEIGHT)
        flush.alpha = 0
        this.cont.addChild(flush)
        this.flushTween = game.add.tween(flush).to({ alpha: 0.2 },
            100, null, false, 0, 0, true)
        this.bar = game.make.graphics(60, 30)
            .beginFill(COLOR_GREEN)
            .drawRect(0, 0, HPBAR_WIDTH, 14)
        this.cont.addChild(this.bar)
        this.name = this.cont.addChild(game.make.text(7, 0, '', FONT_CYAN))
        this.lv = this.cont.addChild(game.make.text(7, 28, '', FONT_VERDANA))
        this.conds = this.cont.addChild(game.make.text(144, 25, '', FONT_GENNOKAKU))
        this.hide()
    }

    show(name, lv) {
        this.cont.visible = true
        this.name.text = name
        this.lv.text = 'Lv ' + lv
        this.bar.width = HPBAR_WIDTH
        this.conds.text = 'けんこう'
    }

    hide() {
        this.cont.visible = false
    }

    flush() {
        this.flushTween.start()
    }
}
