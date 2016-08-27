
class Dungeon {
    constructor(game, info) {
        this.game = game
        this.curRoomIndex = -1
        this.rooms = []
        this.enemies = []
        this.cont = game.add.graphics()
        this.info = info
        this.friendStatus = new FriendStatus(game)
        this.battleFriends = []
        this.paths = []
        this.moving = false
        this.cand = false
        this.enemyEntryNotice = null

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
            for (let e of this.enemies)
                e.walk()
            this.advanceRoom()
        } else {

        }
    }

    advanceRoom() {
        ++this.curRoomIndex
        this.moving = true
        this.walkToNextRoom().addOnce(function() {
            this.moving = false
            this.draw(this.cand)
            for (let s of this.simpleStatuses)
                s.hide()
            this.battleFriends.splice(0, this.battleFriends.length)
            let r = this.curRoom().rect
            for (let y = r.y; y < r.bottom; ++y) {
                for (let x = r.x; x < r.right; ++x) {
                    if (this.friends[y][x])
                        this.battleFriends.push(this.friends[y][x])
                }
            }
            while (this.battleFriends.length > 4) {
                let i = this.game.rnd.between(0, this.battleFriends.length - 1)
                this.battleFriends.splice(i, 1)
            }
            for (let i = 0; i < this.battleFriends.length; ++i)
                this.battleFriends[i].setSimpleStatus(this.simpleStatuses[i])
        }, this)
    }

    walkToNextRoom() {
        let r = this.curRoom().rect

        if (!this.curRoomIndex) {
            for (let i = 0; i < this.enemies.length; ++i) {
                let t = this.enemies[i].show(r, i % 2, i / 2 | 0)
                t.delay(i * 100 + 900)
                t.start()
            }
            this.enemyEntryNotice.animate()
            return this.enemyEntryNotice.tween.onComplete
        }

        let p = this.paths[this.curRoomIndex - 1]
        let tweens = []
        let delays = []

        for (let i = 0; i < this.enemies.length; ++i) {
            let c = this.enemies[i].cont
            let x = i % 2
            let y = i / 2 | 0
            x = (r.x + r.right) * CELL_SIZE / 2 + (x - 0.5) * 32
            y = (r.y + r.bottom) * CELL_SIZE / 2 + (y - 0.5) * 32
            let t = this.game.add.tween(c)
            let duration = 0

            if (p.y < 0) {
                if (c.x != p.x) {
                    duration = Math.abs(c.x - p.x) * 8
                    t.to({ x : p.x }, duration)
                }
                delays.push(duration + (c.y < y ? -c.y : c.y) * 8 - i * 256)
                t.to({ y }, Math.abs(c.y - y) * 8)
                if (p.x != x)
                    t.to({ x }, Math.abs(p.x - x) * 8)
            } else {
                if (c.y != p.y) {
                    duration = Math.abs(c.y - p.y) * 8
                    t.to({ y : p.y }, duration)
                }
                delays.push(duration + (c.x < x ? -c.x : c.x) * 8 - i * 256)
                t.to({ x }, Math.abs(c.x - x) * 8)
                if (p.y != y)
                    t.to({ y }, Math.abs(p.y - y) * 8)
            }
            tweens.push(t)
        }

        let n = tweens.length
        let signal = new Phaser.Signal
        function one() {
            if (!--n) {
                signal.dispatch()
                signal.dispose()
            }
        }
        let mx = Math.max(...delays)
        for (let i = 0; i < tweens.length; ++i) {
            tweens[i].onComplete.addOnce(one)
            tweens[i].delay(mx - delays[i])
            tweens[i].start()
        }
        return signal
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
        this.cand = true
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
        this.cand = false
        this.draw(false)
    }

    popRoomPreview() {
        this.cand = false
        this.rooms.pop()
        this.draw(false)
    }

    draw(cand) {
        let all = true
        let rooms = this.rooms
        this.cont.clear()
        this.paths.splice(0, this.paths.length)

        for (let i = 0; i < rooms.length - cand; ++i) {
            this.cont.lineStyle(2, i < this.curRoomIndex - this.moving ? COLOR_GRAY : COLOR_CYAN)
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
                    this.paths.push(new Phaser.Point(-1, (y + 0.5) * CELL_SIZE))
                    return !cand
                }
            }
            for (let x = r; x < l; ++x) {
                if (!this.intersects(x, x + 1, t, b, cand)) {
                    this.cont.moveTo((x + 0.5) * CELL_SIZE + BOARD_X, t * CELL_SIZE + BOARD_Y)
                        .lineTo((x + 0.5) * CELL_SIZE + BOARD_X, b * CELL_SIZE + BOARD_Y)
                    this.paths.push(new Phaser.Point((x + 0.5) * CELL_SIZE, -1))
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
