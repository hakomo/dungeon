
class Talk {
    constructor() {
        this.cont = game.make.graphics(38, 300)
            .lineStyle(5, COLOR_BLACK)
            .drawRect(-15, -10, 42 * 14 + 5, 42 * 3 + 5)
            .lineStyle(1, Phaser.Color.HSLtoRGB(0.0, 0.0, 0.8).color)
            .drawRect(-15, -10, 42 * 14 + 5, 42 * 3 + 5)
            .lineStyle()
        for (let y = 0; y < 3; ++y) {
            for (let x = 0; x < 14; ++x) {
                this.cont.beginFill(Phaser.Color.HSLtoRGB(y * 0.02 + (x % 2 === y % 2 ? 0.5 : 0.52), 1.0, 0.3 - y / 30).color, 0.9)
                    .drawRect(x * 42 - 12, y * 42 - 7, 42, 42)
            }
        }

        this.text = game.make.text(0, 0, '', {
            fill: RGBA_WHITE,
            font: '22px gennokaku',
        })
        this.text.lineSpacing = -7
        this.text.setShadow(1, 1, 'black')
        this.cont.addChild(this.text)

        let text = game.make.text(271, 100, '▼', {
            fill: RGBA_WHITE,
            font: '22px gennokaku',
        })
        text.setShadow(1, 1, 'black')
        game.add.tween(text).to({ y: text.y + 6 },
            200, null, true, 0, -1, true)
        this.cont.addChild(text)

        text = game.make.text(574, 126, 'Ctrl キーでスキップ', {
            fill: Phaser.Color.HSLtoRGB(0.6, 0.5, 0.8).rgba,
            font: '16px gennokaku',
        })
        text.setShadow(1, 1, 'black')
        text.anchor.set(1, 1)
        this.cont.addChild(text)
    }
}
