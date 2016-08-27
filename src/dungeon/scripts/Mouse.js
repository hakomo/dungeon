
class Mouse {
    constructor() {
        this.state = this.prev = MOUSE_NEUTRAL
    }

    preUpdate() {
        let p = game.input.activePointer
        this.prev = this.state

        if (this.state === MOUSE_NEUTRAL) {
            if (p.leftButton.isDown) {
                this.state = MOUSE_DOWN_LEFT
            } else if (p.rightButton.isDown) {
                this.state = MOUSE_DOWN_RIGHT
            }

        } else if (this.state === MOUSE_DOWN_LEFT) {
            let p1 = p.position
            let p2 = p.positionDown
            if (game.math.distanceSq(p1.x, p1.y, p2.x, p2.y) > 4) {
                this.state = MOUSE_DRAG_LEFT
            } else if (p.rightButton.isDown) {
                this.state = MOUSE_CANCEL
            } else if (p.leftButton.isUp) {
                this.state = MOUSE_NEUTRAL
            }

        } else if (this.state === MOUSE_DOWN_RIGHT) {
            if (p.leftButton.isDown) {
                this.state = MOUSE_CANCEL
            } else if (p.rightButton.isUp) {
                this.state = MOUSE_NEUTRAL
            }

        } else if (this.state === MOUSE_DRAG_LEFT) {
            if (p.rightButton.isDown || !p.withinGame) {
                this.state = MOUSE_CANCEL
            } else if (p.leftButton.isUp) {
                this.state = MOUSE_NEUTRAL
            }

        } else if (this.state === MOUSE_CANCEL) {
            if (p.isUp)
                this.state = MOUSE_NEUTRAL
        }
    }

    is(state) {
        return this.state === state
    }

    justDownLeft() {
        return this.prev === MOUSE_NEUTRAL && this.state === MOUSE_DOWN_LEFT
    }

    justClickLeft() {
        return this.prev === MOUSE_DOWN_LEFT && this.state === MOUSE_NEUTRAL
    }

    justDownRight() {
        return this.prev === MOUSE_NEUTRAL && this.state === MOUSE_DOWN_RIGHT
    }

    justDragLeft() {
        return this.prev === MOUSE_DOWN_LEFT && this.state === MOUSE_DRAG_LEFT
    }

    justDropLeft() {
        return this.prev === MOUSE_DRAG_LEFT && this.state === MOUSE_NEUTRAL
    }

    justCancel(state) {
        return this.prev === state && this.state === MOUSE_CANCEL
    }
}
const
    MOUSE_NEUTRAL       = 0,
    MOUSE_DOWN_LEFT     = 1,
    MOUSE_DOWN_RIGHT    = 2,
    MOUSE_DRAG_LEFT     = 3,
    MOUSE_CANCEL        = 4
