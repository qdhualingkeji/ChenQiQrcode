seajs.config({
    alias: {
        'jquery': 'lib/jquery'
    },
    /*
     preload: [
     Function.prototype.bind ? '' : 'es5-safe',
     this.JSON ? '' : 'json'
     ],
     map: [
     ['http://example.com/js/app/', 'http://localhost/js/app/']
     ],
     */
    debug: true,
    base: '//static.clewm.net/cli/js/',
    charset: 'utf-8',
    timeout: 20000
});