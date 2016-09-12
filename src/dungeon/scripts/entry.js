
const
    CELL_SIZE       = 20,
    BOARD_COLUMNS   = 22,
    BOARD_ROWS      = 18,
    BOARD_X         = 12,
    BOARD_Y         = 114,
    BOARD_WIDTH     = CELL_SIZE * BOARD_COLUMNS,
    BOARD_HEIGHT    = CELL_SIZE * BOARD_ROWS,

    ENEMY_WIDTH     = 220,
    ENEMY_HEIGHT    = 50,
    ENEMY_X         = BOARD_X + BOARD_WIDTH / 2 - ENEMY_WIDTH,
    ENEMY_Y         = 7,
    HPBAR_WIDTH     = 80,

    FRIEND_X        = 464,
    FRIEND_Y        = BOARD_Y + 38,
    FRIEND_WIDTH    = 74,

    INFO_X1         = 470,
    INFO_X2         = 597,
    INFO_Y1         = 399,
    INFO_Y2         = 371,
    MENU_SIZE       = 56,
    MENU_X          = 640 - MENU_SIZE * 3 - 1,
    MENU_Y          = 480 - MENU_SIZE - 1,

    COLOR_ATK       = Phaser.Color.HSLtoRGB(0.0, 0.8, 0.5).color,
    COLOR_BLACK     = Phaser.Color.HSLtoRGB(0.0, 0.0, 0.1).color,
    COLOR_CYAN      = Phaser.Color.HSLtoRGB(0.4, 0.5, 0.5).color,
    COLOR_GRAY      = Phaser.Color.HSLtoRGB(0.0, 0.0, 0.5).color,
    COLOR_GREEN     = Phaser.Color.HSLtoRGB(0.3, 0.5, 0.5).color,
    COLOR_ORANGE    = Phaser.Color.HSLtoRGB(0.1, 1.0, 0.5).color,
    COLOR_WHITE     = Phaser.Color.HSLtoRGB(0.0, 0.0, 0.9).color,

    RGBA_ORANGE     = Phaser.Color.HSLtoRGB(0.1, 1.0, 0.5).rgba,
    RGBA_BLUE       = Phaser.Color.HSLtoRGB(0.6, 1.0, 0.8).rgba,
    RGBA_WHITE      = Phaser.Color.HSLtoRGB(0.0, 0.0, 0.9).rgba,
    RGBA_PURPLE     = Phaser.Color.HSLtoRGB(0.9, 1.0, 0.6).rgba,

    FONT_GENNOKAKU      = { fill: RGBA_WHITE, font: '18px gennokaku' },
    FONT_VERDANA        = { fill: RGBA_WHITE, font: '16px verdana' },
    FONT_CYAN           = { fill: Phaser.Color.HSLtoRGB(0.6, 0.5, 0.8).rgba, font: '18px gennokaku' },
    FONT_INFO_WHITE     = { fill: RGBA_WHITE, font: '28px verdana' },
    FONT_INFO_PURPLE    = { fill: RGBA_PURPLE, font: '14px verdana' },
    FONT_INFO_CYAN      = { fill: Phaser.Color.HSLtoRGB(0.6, 0.5, 0.8).rgba, font: '16px verdana', align: 'center' }

let game
let root = {}
{
    Entry.all = function() {
        game.canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault()
        })

        mouse = game.plugins.add(Mouse)

        let g = game.add.graphics()
            .beginFill(COLOR_BLACK)
            .drawRect(-7, -7, 654, 494)
            .endFill().lineStyle(1, COLOR_GRAY)
            .drawRect(BOARD_X, BOARD_Y, BOARD_WIDTH, BOARD_HEIGHT)
            .moveTo(ENEMY_X, ENEMY_Y + ENEMY_HEIGHT)
            .lineTo(ENEMY_X + ENEMY_WIDTH * 2, ENEMY_Y + ENEMY_HEIGHT)
            .moveTo(ENEMY_X + ENEMY_WIDTH, ENEMY_Y)
            .lineTo(ENEMY_X + ENEMY_WIDTH, ENEMY_Y + ENEMY_HEIGHT * 2)
        for (let y = 1; y < BOARD_ROWS; ++y) {
            g.moveTo(BOARD_X + BOARD_WIDTH, y * CELL_SIZE + BOARD_Y)
                .lineTo(BOARD_X + BOARD_WIDTH + 4, y * CELL_SIZE + BOARD_Y)
        }
        for (let x = 1; x < BOARD_COLUMNS; ++x) {
            g.moveTo(x * CELL_SIZE + BOARD_X, BOARD_Y - 4)
                .lineTo(x * CELL_SIZE + BOARD_X, BOARD_Y)
        }

        game.add.image(460, 66, 'girl')

        Friend.pool = new FriendPool(game.add.graphics(BOARD_X, BOARD_Y))
        let dungeon = new Dungeon(new DungeonInfo(g))
        Friend.status = dungeon.friendStatus
        Enemy.container = game.add.graphics(BOARD_X, BOARD_Y)
        dungeon.enemyEntryNotice = new EnemyEntryNotice
        root.cursor = new Cursor(dungeon)

        for (let y = 0; y < BOARD_ROWS; ++y) {
            for (let x = 0; x < BOARD_COLUMNS; ++x) {
                if (game.rnd.frac() < 0.08) {
                    let FriendClass = game.rnd.pick([
                        ZombieFriend,
                        DevilFriend,
                        DragonFriend,
                        SlimeFriend,
                        RobotFriend,
                        EyesFriend,
                        MaskFriend,
                        GoblinFriend,
                        ForestFriend
                    ])
                    new FriendClass(x, y, game.rnd.between(1, 99), dungeon.friends)
                }
            }
        }

        for (let s of dungeon.enemyStatuses) {
            let e = new Enemy('剣士', game.rnd.between(1, 99), s)
            dungeon.enemies.push(e)
        }

        root.effect = new Effect
        root.menu = new Menu
        root.talk = new Talk

        root.state = root.cursor
    }

    let mouse
    game = new Phaser.Game(640, 480, Phaser.AUTO, 'game', {
        preload() {
            game.load
                .image('girl', 'images/girl.png')
                .spritesheet('swordsman', 'images/swordsman.png', 32, 32)
                .spritesheet('giveup', 'images/giveup.png', 126, 33)
                .spritesheet('nextday', 'images/nextday.png', 151, 33)
                .spritesheet('option', 'images/option.png', 119, 33)
                .spritesheet('retry', 'images/retry.png', 100, 33)
                .spritesheet('burn', 'images/burn.png', 240, 240)
                .spritesheet('dazzle', 'images/dazzle.png', 240, 240)
                .spritesheet('lostchild', 'images/lostchild.png', 240, 240)
                .spritesheet('melting', 'images/melting.png', 240, 240)
                .spritesheet('poison', 'images/poison.png', 240, 240)
                .spritesheet('silence', 'images/silence.png', 240, 240)
                .spritesheet('sloth', 'images/sloth.png', 240, 240)
                .spritesheet('autoheal', 'images/autoheal.png', 240, 240)
        },

        create: Entry.one,

        update() {
            if (root.state)
                root.state.update(mouse)
        },
    })
}
