
class FriendStatus {
    constructor(game) {
        this.friend = null
        this.lvs = []
        this.numbers = []
        for (let i = 0; i < 100; ++i)
            this.lvs.push('Lv ' + i)
        for (let i = 0; i <= 5; ++i)
            this.numbers.push('+' + i)

        this.cont = game.add.graphics(FRIEND_X, FRIEND_Y)
            .beginFill(COLOR_BLACK, 1)
            .drawRect(-4, 0, 644 - FRIEND_X, 144)
            .lineStyle(1, COLOR_WHITE)
            .drawRect(52, 28, HPBAR_WIDTH + 1, 15)
        this.name = this.cont.addChild(game.make.text(0, 0, '', FONT_CYAN))
        this.lv = this.cont.addChild(game.make.text(0, 27, '', FONT_VERDANA))
        this.bar = new Bar(game, 53, 29, HPBAR_WIDTH, 14)
        this.cont.addChild(this.bar.cont)
        this.cont.addChild(game.make.text(0, 48, '攻撃', FONT_CYAN))
        this.atk = this.cont.addChild(game.make.text(38, 51, '', FONT_VERDANA))
        this.cont.addChild(game.make.text(0, 72, '魔攻', FONT_CYAN))
        this.mag = this.cont.addChild(game.make.text(38, 75, '', FONT_VERDANA))
        this.cont.addChild(game.make.text(FRIEND_WIDTH, 48, '防御', FONT_CYAN))
        this.def = this.cont.addChild(game.make.text(FRIEND_WIDTH + 38, 51, '', FONT_VERDANA))
        this.cont.addChild(game.make.text(FRIEND_WIDTH, 72, '魔防', FONT_CYAN))
        this.mnd = this.cont.addChild(game.make.text(FRIEND_WIDTH + 38, 75, '', FONT_VERDANA))
        this.cont.addChild(game.make.text(0, 96, '連携', FONT_CYAN))
        this.com = this.cont.addChild(game.make.text(38, 99, '', FONT_VERDANA))
        this.rms = this.cont.addChild(game.make.text(FRIEND_WIDTH, 96, '', FONT_GENNOKAKU))

        this.hide()
    }

    show(friend) {
        if (this.friend === friend) return
        this.friend = friend
        this.cont.visible = true
        this.name.text = friend.name
        this.lv.text = this.lvs[friend.lv]
        this.bar.change(friend.hp)
        this.bar.width = Math.ceil(friend.hp * HPBAR_WIDTH)
        this.atk.text = friend.atk ? this.numbers[friend.atk] : ''
        this.mag.text = friend.atk ? '' : this.numbers[friend.mag]
        this.def.text = this.numbers[friend.def]
        this.mnd.text = this.numbers[friend.mnd]
        this.com.text = this.numbers[friend.com]
        this.rms.text = ['狭いと強い', '', '広いと強い'][friend.rms]
    }

    hide() {
        this.friend = null
        this.cont.visible = false
    }
}
