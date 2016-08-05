
class Dungeon {
    constructor(game, info) {
        this.curRoomIndex = -1
        this.rooms = []
        this.enemies = []
        this.cont = game.add.graphics()
        this.info = info
        this.friendStatus = new FriendStatus(game)

        this.friends = []
        for (let y = 0; y < BOARD_ROWS; ++y) {
            let fs = []
            for (let x = 0; x < BOARD_COLUMNS; ++x)
                fs.push(null)
            this.friends.push(fs)
        }

        this.simpleStatuses = []
        for (let y = 0; y < 2; ++y) {
            for (let x = 0; x < 2; ++x) {
                let s = new FriendSimpleStatus(game, x * 94 + 456, y * 28)
                this.simpleStatuses.push(s)
            }
        }

        this.enemyStatuses = []
        for (let y = 0; y < 2; ++y) {
            for (let x = 0; x < 2; ++x) {
                let s = new EnemyStatus(game, x * ENEMY_WIDTH + ENEMY_X,
                    y * ENEMY_HEIGHT + ENEMY_Y)
                this.enemyStatuses.push(s)
            }
        }
    }

    clear() {
        this.curRoomIndex = -1
        for (let y = 0; y < BOARD_ROWS; ++y) {
            for (let x = 0; x < BOARD_COLUMNS; ++x) {
                if (this.friends[y][x])
                    this.friends[y][x].destroy()
            }
        }
        this.rooms.splice(0, this.rooms.length)
        for (let e of this.enemies)
            e.destroy()
        this.enemies.splice(0, this.enemies.length)
        this.cont.clear()
        this.info.clear()
        for (let s of this.simpleStatuses)
            s.hide()
    }

    tryOpen() {
        if (this.curRoomIndex < 0 && this.rooms.length) {
            this.advanceRoom()
        } else {

        }
    }

    advanceRoom() {
        ++this.curRoomIndex
        for (let i = 0; i < this.enemies.length; ++i)
            this.enemies[i].show(this.curRoom().rect, i % 2, i / 2 | 0)
        this.draw(false)
    }

    tryPopRoom() {
        if (this.curRoomIndex < this.rooms.length - 1) {
            this.rooms.pop()
            this.draw(false)
        } else {

        }
    }

    toggleRoomAggressive(x, y) {
        for (let i = 0; i < this.rooms.length; ++i) {
            let room = this.rooms[i]
            if (room.rect.contains(x, y)) {
                if (i > this.curRoomIndex) {
                    room.aggressive = !room.aggressive
                    this.draw(false)
                } else {

                }
                break
            }
        }
    }

    pushRoomPreview(rect) {
        this.rooms.push({ rect: new Phaser.Rectangle, aggressive: false })
        this.updateRoomPreview(rect)
    }

    updateRoomPreview(rect) {
        let r = this.roomAt(-1).rect
        if (!r.equals(rect)) {
            r.copyFrom(rect)
            this.draw(true)
        }
    }

    tryFinalizeRoom() {
        let r = this.roomAt(-1).rect
        let any = false
        for (let y = r.y; y < r.bottom; ++y) {
            for (let x = r.x; x < r.right; ++x) {
                if (this.friends[y][x]) {
                    any = true
                    break
                }
            }
            if (any) break
        }
        if (any && this.draw(true)) {

        } else {
            this.rooms.pop()
        }
        this.draw(false)
    }

    popRoomPreview() {
        this.rooms.pop()
        this.draw(false)
    }

    draw(cand) {
        let all = true
        let rooms = this.rooms
        this.cont.clear()

        for (let i = 0; i < rooms.length - cand; ++i) {
            this.cont.lineStyle(2, i < this.curRoomIndex ? COLOR_GRAY : COLOR_CYAN)
            this.drawRoom(rooms[i].rect)
            if (i < rooms.length - cand - 1)
                all &= this.drawPath(rooms[i].rect, rooms[i + 1].rect)
        }

        if (cand) {
            let r = this.roomAt(-1).rect
            this.cont.lineStyle(2, COLOR_ORANGE)
            if (all && rooms.length > 1) {
                for (let i = 0; i < rooms.length - 1; ++i) {
                    if (rooms[i].rect.intersects(r)) {
                        all = false
                        break
                    }
                }
                all = all && this.drawPath(this.roomAt(-2).rect, r)
            }
            this.drawRoom(r)
        }

        if (this.curRoomIndex >= 0) {

        } else if (rooms.length < (cand ? 2 : 1)) {
            for (let e of this.enemies)
                e.hide()
        } else {
            for (let i = 0; i < this.enemies.length; ++i)
                this.enemies[i].preview(rooms[0].rect, i % 2, i / 2 | 0)
        }

        this.cont.beginFill(COLOR_ATK).lineStyle(0)
        for (let i = 0; i < rooms.length - cand; ++i) {
            if (rooms[i].aggressive) {
                this.cont.drawRect(rooms[i].rect.x * CELL_SIZE + BOARD_X - 3,
                    rooms[i].rect.y * CELL_SIZE + BOARD_Y - 3, 10, 10)
            }
        }
        return all
    }

    drawRoom(r) {
        this.cont.drawRect(r.x * CELL_SIZE + BOARD_X, r.y * CELL_SIZE + BOARD_Y,
            r.width * CELL_SIZE, r.height * CELL_SIZE)
    }

    drawPath(r1, r2) {
        let l = Math.min(r1.right, r2.right)
        let r = Math.max(r1.x, r2.x)
        let t = Math.min(r1.bottom, r2.bottom)
        let b = Math.max(r1.y, r2.y)
        for (let cand = 0; cand < 2; ++cand) {
            for (let y = b; y < t; ++y) {
                if (!this.intersects(l, r, y, y + 1, cand)) {
                    this.cont.moveTo(l * CELL_SIZE + BOARD_X, (y + 0.5) * CELL_SIZE + BOARD_Y)
                        .lineTo(r * CELL_SIZE + BOARD_X, (y + 0.5) * CELL_SIZE + BOARD_Y)
                    return !cand
                }
            }
            for (let x = r; x < l; ++x) {
                if (!this.intersects(x, x + 1, t, b, cand)) {
                    this.cont.moveTo((x + 0.5) * CELL_SIZE + BOARD_X, t * CELL_SIZE + BOARD_Y)
                        .lineTo((x + 0.5) * CELL_SIZE + BOARD_X, b * CELL_SIZE + BOARD_Y)
                    return !cand
                }
            }
        }
        return false
    }

    intersects(l, r, t, b, cand) {
        for (let i = 0; i < this.rooms.length - cand; ++i) {
            if (this.rooms[i].rect.intersectsRaw(l, r, t, b, -1))
                return true
        }
        return false
    }

    curRoom() {
        return this.rooms[this.curRoomIndex]
    }

    roomAt(index) {
        return this.rooms[(index + this.rooms.length) % this.rooms.length]
    }
}
