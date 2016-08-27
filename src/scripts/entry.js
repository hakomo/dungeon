
(function() {
    var md = new MobileDetect(navigator.userAgent)
    if (md.mobile() || md.versionStr('IE')) {
        document.getElementById('game').innerHTML =
            'このゲームは Internet Explorer 以外の PC ブラウザで遊べます。'
        return
    }
    var n = 2
    Entry.one = function() {
        if (!--n) {
            Entry.all()
            var e = document.getElementById('game')
            e.removeChild(e.firstElementChild)
            e.classList.remove('loading')
        }
    }
    window.WebFontConfig = {
        timeout: 9000,
        custom: {
            families: ['Gennokaku'],
            urls: ['../styles/gennokaku.css'],
        },
        active: Entry.one,
        inactive: Entry.one,
    }
    fallback.load({
        WebFont: [
            'https://cdnjs.cloudflare.com/ajax/libs/webfont/' + Entry.webfontloader + '/webfontloader.js',
            '../scripts/vender/webfontloader.' + Entry.webfontloader + '.min.js',
        ],
        Phaser: [
            'https://cdnjs.cloudflare.com/ajax/libs/phaser/' + Entry.phaser + '/phaser.min.js',
            '../scripts/vender/phaser.' + Entry.phaser + '.min.js',
        ],
        entry: Entry.entry,
    }, {
        shim: {
            entry: 'Phaser',
        },
    })
}())
