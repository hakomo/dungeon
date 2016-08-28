
class Battle {
    constructor(friends) {
        this.enemies = []
        this.friends = friends
        this.charas = []
        this.aggressive
        this.index = -1
        this.timer = game.time.create()
        this.timer.loop(1000, this.advance, this)
    }

    start(enemies, aggressive) {
        this.aggressive = aggressive
        this.charas.splice(0, this.charas.length, ...this.friends)
        this.enemies.splice(0, this.enemies.length)
        for (let enemy of enemies) {
            if (enemy.state === CHARA_BATTLE) {
                this.enemies.push(enemy)
                this.charas.push(enemy)
            }
        }
        this.index = -1
        this.timer.start()
    }

    advance() {
        this.index = (this.index + 1) % this.charas.length
        if (!this.index) {
            for (let i = 1; i < this.charas.length; ++i) {
                let j = game.rnd.between(0, i)
                let chara = this.charas[i]
                this.charas[i] = this.charas[j]
                this.charas[j] = chara
            }
        }
        this.charas[this.index].act(this.enemies, this.friends, this.aggressive)
        for (let i = this.enemies.length - 1; i >= 0; --i) {
            if (this.enemies[i].state !== CHARA_BATTLE)
                this.enemies.splice(i, 1)
        }
        for (let i = this.friends.length - 1; i >= 0; --i) {
            if (this.friends[i].state !== CHARA_BATTLE)
                this.friends.splice(i, 1)
        }
        for (let i = this.charas.length - 1; i >= 0; --i) {
            if (this.charas[i].state !== CHARA_BATTLE) {
                this.charas.splice(i, 1)
                if (i >= this.index)
                    --this.index
            }
        }
    }
}
