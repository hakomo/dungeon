
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
            80, null, false, 0, 0, true)
        this.bar = new Bar(game, 60, 30, HPBAR_WIDTH, 14)
        this.cont.addChild(this.bar.cont)
        this.name = this.cont.addChild(game.make.text(7, 0, '', FONT_CYAN))
        this.lv = this.cont.addChild(game.make.text(7, 28, '', FONT_VERDANA))
        this.conds = this.cont.addChild(game.make.text(144, 25, '', FONT_GENNOKAKU))

        this.overlay = game.add.text(x + 100, y + 41, '撃破', {
            fill: RGBA_ORANGE,
            font: '36px gennokaku',
            stroke: 'black',
            strokeThickness: 4,
        })
        this.overlay.angle = -12
        this.overlay.anchor.set(0.5, 0.5)
        this.overlayTween = game.add.tween(this.overlay.scale).from({ x: 1.2, y: 1.2 },
            100)

        this.hide()
    }

    show(name, lv) {
        this.cont.visible = true
        this.cont.alpha = 1
        this.name.text = name
        this.lv.text = 'Lv ' + lv
        this.bar.change(1)
        this.conds.text = 'けんこう'
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
            this.overlayTween.start()
        }
    }
}
