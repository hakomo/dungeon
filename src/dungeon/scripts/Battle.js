
class Battle {
    constructor(enemies, friends) {
        this.enemies = enemies
        this.friends = friends
        this.charas = []
        this.index = -1
        this.timer = game.time.create()
        this.timer.loop(1000, this.advance, this)
    }

    start() {
        this.charas.splice(0, this.charas.length, ...this.friends)
        for (let enemy of this.enemies) {
            if (enemy.state === ENEMY_BATTLE)
                this.charas.push(enemy)
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
        this.charas[this.index].act(this.enemies, this.friends)
        for (let i = this.friends.length - 1; i >= 0; --i) {
            if (!this.friends[i].hp)
                this.friends.splice(i, 1)
        }
        for (let i = this.charas.length - 1; i >= 0; --i) {
            if (!this.charas[i].hp && this.charas[i] instanceof Friend) {
                this.charas.splice(i, 1)
                if (i >= this.index)
                    --this.index
            }
        }
    }
}
