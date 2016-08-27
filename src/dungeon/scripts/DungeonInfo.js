
class DungeonInfo {
    constructor(g) {
        this.powerText = game.add.text(INFO_X1 + 105, INFO_Y1, '', FONT_INFO_WHITE)
        this.powerText.anchor.set(1, 0.7)
        game.add.text(INFO_X1, INFO_Y1, 'dungeon power', FONT_INFO_PURPLE)
        this.dayText = game.add.text(INFO_X2 + 31, INFO_Y1, '', FONT_INFO_WHITE)
        this.dayText.anchor.set(1, 0.7)
        game.add.text(INFO_X2, INFO_Y1, 'day', FONT_INFO_PURPLE)
        // this.minutesText = game.add.text(INFO_X1 + 41, INFO_Y2, '', FONT_INFO_WHITE)
        // this.minutesText.anchor.set(1, 1)
        // game.add.text(INFO_X1 + 42, INFO_Y2, 'm', FONT_INFO_PURPLE).anchor.y = 1
        // this.secondsText = game.add.text(INFO_X1 + 105, INFO_Y2, '', FONT_INFO_WHITE)
        // this.secondsText.anchor.set(1, 1)
        // game.add.text(INFO_X1 + 106, INFO_Y2, 's', FONT_INFO_PURPLE).anchor.y = 1

        for (let x = 0; x < 3; ++x) {
            g.drawRect(x * MENU_SIZE + MENU_X, MENU_Y, MENU_SIZE, MENU_SIZE)
            let text = game.add.text((x + 0.5) * MENU_SIZE + MENU_X + 1, MENU_Y + 8,
                ['open', '', 'menu'][x], FONT_INFO_CYAN)
            text.anchor.x = 0.5
            if (x === 1)
                this.speedText = text
        }

        this.clear()
    }

    clear() {
        this.power = 0
        this.day = 1
        this.minutes = 0
        this.seconds = 0
        this.speed = 1

        this.powerText.text = this.power
        this.dayText.text = this.day
        this.speedText.text = 'speed\nX' + this.speed
    }

    toggleSpeed() {
        this.speed = 3 - this.speed
        this.speedText.text = 'speed\nX' + this.speed
    }
}
