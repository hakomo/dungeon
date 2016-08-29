
class Menu {
    constructor() {
        this.cont = game.make.graphics(0, 240)
            .beginFill(COLOR_BLACK)
            .lineStyle(2, COLOR_ORANGE)
            .drawRect(-10, -80, 660, 160)
        this.cont.height = 158

        this.menu = game.make.text(4, 91, 'Menu', {
            fill: RGBA_ORANGE,
            font: '28px verdana',
        })
        this.menu.anchor.y = 1
        this.cont.addChild(this.menu)

        this.message = game.make.text(319.5, -72, '勇者のパーティーを倒した！', FONT_GENNOKAKU)
        this.message.anchor.x = 0.5
        this.cont.addChild(this.message)

        for (let [name, desc] of [
            ['option', '設定を変えます'],
            ['nextday', '次の日の勇者と戦います'],
            ['retry', '時間を戻して同じ勇者と戦います\nリトライしてクリアすると、リトライ済みクリアになります'],
            ['giveup', '諦めてタイトルに戻ります']
        ]) {
            this[name] = this.cont.addChild(game.make.button(-900, -22, name, null, null, 1, 0, 2))
            this[name].onInputOver.add(this.describe, this, 0, desc)
            this[name].onInputOut.add(this.describe, this)
        }

        this.description = game.make.text(104, 80, '', {
            fill: Phaser.Color.HSLtoRGB(0.6, 0.5, 0.8).rgba,
            font: '16px gennokaku',
        })
        this.description.lineSpacing = -10
        this.description.anchor.y = 1
        this.cont.addChild(this.description)

        this.back = game.make.text(508, 81, '右クリックで戻る', {
            backgroundColor: Phaser.Color.HSLtoRGB(0.0, 0.0, 0.1).rgba,
            fill: Phaser.Color.HSLtoRGB(0.6, 0.5, 0.8).rgba,
            font: '16px gennokaku',
        })
        this.back.padding.y = -3
        this.cont.addChild(this.back)

        this.showTween = game.add.tween(this.cont).to({ alpha: 1, height: 162 },
            200)
        this.showTween.onComplete.add(function() {
            root.state = this
        }, this)

        this.hideTween = game.add.tween(this.cont).to({ alpha: 0, height: 154 },
            200)
        this.hideTween.onComplete.add(function() {
            this.option.x = -900
            this.nextday.x = -900
            this.retry.x = -900
            this.giveup.x = -900
            game.time.events.add(0, function() {
                game.world.removeChild(this.cont)
                root.state = root.cursor
            }, this)
        }, this)
    }

    win() {
        this.menu.visible = false
        this.message.text = '勇者のパーティーを倒した！'
        this.nextday.x = 186
        this.retry.x = 353
        this.describe()
        this.back.visible = false
        root.state = null
        this.cont.alpha = 0.5
        game.world.addChild(this.cont)
        this.showTween.start()
    }

    lose() {
        this.menu.visible = false
        this.message.text = '勇者のパーティーにダンジョンを攻略された．．．'
        this.retry.x = 199
        this.giveup.x = 315
        this.describe()
        this.back.visible = false
        root.state = null
        this.cont.alpha = 0.5
        game.world.addChild(this.cont)
        this.showTween.start()
    }

    show() {
        this.menu.visible = true
        this.message.text = ''
        this.option.x = 131
        this.retry.x = 266
        this.giveup.x = 382
        this.describe()
        this.back.visible = true
        root.state = null
        this.cont.alpha = 0.5
        game.world.addChild(this.cont)
        this.showTween.start()
    }

    describe(a, b, text = '') {
        this.description.text = text
    }

    update(mouse) {
        if (this.back.visible && mouse.justDownRight()) {
            root.state = null
            this.hideTween.start()
        }
    }
}
