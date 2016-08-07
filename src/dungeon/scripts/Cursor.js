
class Cursor {
    constructor(game, dungeon) {
        this.game = game
        this.dungeon = dungeon

        this.downLeftInBoard = false
        this.rect = new Phaser.Rectangle
        this.cont1 = game.add.graphics()
            .lineStyle(2, COLOR_ORANGE)
            .drawRect(BOARD_X, BOARD_Y, CELL_SIZE, CELL_SIZE)
        this.cont1.visible = false
        this.cont2 = game.add.graphics()
            .lineStyle(4, COLOR_ORANGE)
            .drawRect(MENU_X, MENU_Y, MENU_SIZE, MENU_SIZE)
        this.cont2.visible = false
    }

    update(mouse) {
        let { game, dungeon } = this

        let p = game.input.activePointer
        let x = p.x - BOARD_X
        let y = p.y - BOARD_Y
        let inBoard = 0 <= x && x < BOARD_WIDTH && 0 <= y && y < BOARD_HEIGHT
        let inMenu = MENU_X <= p.x && p.x < MENU_X + MENU_SIZE * 3 &&
            MENU_Y <= p.y && p.y < MENU_Y + MENU_SIZE
        x = Math.min(Math.max(0, x), BOARD_WIDTH - 1) / CELL_SIZE | 0
        y = Math.min(Math.max(0, y), BOARD_HEIGHT - 1) / CELL_SIZE | 0

        if (mouse.justDownLeft() && inBoard)
            this.downLeftInBoard = true

        this.cont1.visible = false
        this.cont2.visible = false

        if (inMenu && !this.downLeftInBoard) {
            this.cont2.visible = true
            this.cont2.x = p.x - MENU_X - (p.x - MENU_X) % MENU_SIZE
            this.cont2.y = this.cont2.y && p.leftButton.justPressed() ? 2 : 0

        } else if (inBoard && !(this.downLeftInBoard && mouse.is(MOUSE_DRAG_LEFT))) {
            this.cont1.visible = true
            this.cont1.x = x * CELL_SIZE
            this.cont1.y = y * CELL_SIZE + (this.downLeftInBoard ? 2 : 0)
        }

        if (inBoard && dungeon.friends[y][x])
            dungeon.friendStatus.show(dungeon.friends[y][x])
        else
            dungeon.friendStatus.hide()

        if (mouse.justDownLeft() && inMenu) {
            this.cont2.y = 2
            if (p.x < MENU_X + MENU_SIZE) {
                dungeon.tryOpen()
            } else if (p.x < MENU_X + MENU_SIZE * 2) {
                dungeon.info.toggleSpeed()
            } else {

            }

        } else if (mouse.justDownRight()) {
            dungeon.tryPopRoom()

        } else if (!this.downLeftInBoard) {

        } else if (mouse.justClickLeft()) {
            dungeon.toggleRoomAggressive(x, y)

        } else if (mouse.is(MOUSE_DRAG_LEFT)) {
            let x2 = (p.positionDown.x - BOARD_X) / CELL_SIZE | 0
            let y2 = (p.positionDown.y - BOARD_Y) / CELL_SIZE | 0
            this.rect.x = Math.min(x, x2)
            this.rect.y = Math.min(y, y2)
            this.rect.right = Math.max(x, x2) + 1
            this.rect.bottom = Math.max(y, y2) + 1
            if (mouse.justDragLeft())
                dungeon.pushRoomPreview(this.rect)
            else
                dungeon.updateRoomPreview(this.rect)

        } else if (mouse.justDropLeft()) {
            dungeon.tryFinalizeRoom()

        } else if (mouse.justCancel(MOUSE_DRAG_LEFT)) {
            dungeon.popRoomPreview()
        }

        if (mouse.is(MOUSE_NEUTRAL) || mouse.is(MOUSE_CANCEL))
            this.downLeftInBoard = false
    }
}
