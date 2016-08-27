
class EnemyEntryNotice {
    constructor() {
        this.cont = game.add.graphics(320, 241)
            .beginFill(COLOR_BLACK)
            .drawRect(-400, -20, 800, 40)
        this.cont.angle = -6
        this.cont.alpha = 0
        this.cont.height = 30
        let t = game.make.text(0, 3, '勇者のパーティーが侵入します', {
            fill: RGBA_ORANGE,
            font: '32px gennokaku',
        })
        t.setShadow(0, 0, 'red', 4)
        t.anchor.set(0.5, 0.5)
        this.cont.addChild(t)

        this.tween = game.add.tween(this.cont).to({ alpha: 1, height: 40 }, 300, null, false, 300)
        this.tween.to({ y: 239 }, 1100)
        this.tween.to({ alpha: 0, height: 30 }, 200)
    }

    animate() {
        this.tween.y = 241
        this.tween.start()
    }
}
