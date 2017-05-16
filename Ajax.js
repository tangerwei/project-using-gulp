(function (w) {
    var ajax={};
    var noconflict = function () {
        if (w.Ajax) {
            ajax._$ = w.Ajax
            w.Ajax = ajax;
        }
    }
})(window);