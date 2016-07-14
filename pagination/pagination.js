;(function($, window, document, undefined){
    /**
     * 显示 BootStrap 分页
     * @param  string url 链接
     * @param  string pageName  分页参数名
     * @param  int pageCounts 可显示的页码个数
     * @param  int total 总页数
     * @param  int current 当前第几页
     */
    var Pager = function(ele, opt){
        this.$element = ele;
        this.defaults = {
            url: '',
            pageName: 'p',
            pageCounts: 10,
            total: 1,
            current: 1
        };
        this.options = $.extend({}, this.defaults, opt);
    }
    Pager.prototype.draw = function(){
        var opt = this.options;
        if(opt.total <= 0){
            this.$element.html('');
            return '';
        }
        var url = opt.url,
            current = parseInt(opt.current),
            total = parseInt(opt.total),
            pageCounts = parseInt(opt.pageCounts),
            pageName = opt.pageName,
            connector = '';

        current = current < 1 ? 1 : current;
        current = current > total ? total : current;

        var startPage = current - current % pageCounts;
        var endPage = startPage + pageCounts;

        startPage = Math.max(1, startPage);
        endPage = Math.min(endPage, total);

        if(url.indexOf('?')>-1){
            connector = '&';
        }else {
            connector = '?';
        }
        var pageDOM = '';
        for(var i = startPage;i<=endPage;i++){
            var pageUrl = url,
                active = '';
            if(i == current){
                active = ' class="active" ';
            }
            if(i>1){
                pageUrl += connector + pageName + '=' + i;
            }
            pageDOM += '<li' + active + '><a href="' + pageUrl + '">' + i + '</a></li>'
        }

        if(endPage != total){
            var next = endPage + 1;
            var nextUrl = url + connector + pageName + '=' + next;
            pageDOM += '<li><a href="'+nextUrl+'" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
        }

        // 不在分页的第一组内
        if(current > (pageCounts-1)){
            var prev = startPage - 1;
            var prevUrl = url + connector + pageName + '=' + prev;
            pageDOM = '<li><a href="'+prevUrl+'" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>' + pageDOM;
        }
        pageDOM = '<ul class="pagination">' + pageDOM + '</ul>';
        this.$element.html(pageDOM);

        return this.$element;
    }

    $.fn.Pagination = function(options){
        var p = new Pager(this, options);
        p.draw();
    }
})(jQuery, window, document)