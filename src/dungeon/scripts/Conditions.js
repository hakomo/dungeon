
class Conditions {
    constructor() {
        this.a = []
    }

    contains(char) {
        for (let c of this.a) {
            if (c.is(char))
                return true
        }
        return false
    }

    push(char) {
        for (let c of this.a) {
            if (c.is(char)) {
                c.reset()
                return null
            }
        }
        if (this.a.length === 4)
            this.a.splice(0, 1)
        this.a.push(new Condition(char))
        return this.text()
    }

    advanceRoom() {
        let any = false
        for (let i = this.a.length - 1; i >= 0; --i) {
            if (this.a[i].decrement()) {
                this.a.splice(i, 1)
                any = true
            }
        }
        return any ? this.text() : null
    }

    text() {
        if (!this.a.length)
            return 'けんこう'
        let text = ''
        for (let c of this.a)
            text += c.char
        return text
    }
}
