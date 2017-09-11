_frame.app_main.page['about'] = {}

_frame.app_main.page['about'].journal_parse = function (raw) {
    var searchRes
        , scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\]\]/gi
        , resultHTML = markdown.toHTML(raw)

    while ((searchRes = scrapePtrn.exec(raw)) !== null) {
        try {
            resultHTML = resultHTML.replace(searchRes[0], _tmpl['link_' + searchRes[1].toLowerCase()](searchRes[2], null, true))
        } catch (e) { }
    }

    searchRes = null
    scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\:TEXT\]\]/gi
    while ((searchRes = scrapePtrn.exec(raw)) !== null) {
        try {
            resultHTML = resultHTML.replace(searchRes[0], _tmpl['textlink_' + searchRes[1].toLowerCase()](searchRes[2], null, true))
        } catch (e) { }
    }

    return resultHTML
}

_frame.app_main.page['about'].journaltitle = function (d, tagName) {
    d = d || {}
    tagName = tagName || 'h3'

    return '<h3>'
        + (d['hotfix']
            ? 'HOTFIX - '
            : '')
        + (d['type'] == 'app'
            ? ''
            : (d['type'] == 'app-db' ? 'DB' : d['type']).toUpperCase() + ' / ')
        + d['version']
        + '<small>' + (d['date'] ? d['date'] : 'WIP') + '</small>'
        + '</h3>'
}

_frame.app_main.page['about'].init = function (page) {
    /*
    var latestVersionSection = $('[data-version-app]:first-of-type')
        ,latestVersion = latestVersionSection.attr('data-version-app').split('.')
        ,latestVersionSub = latestVersion[0] + '.' + latestVersion[1]
    */
    //$('[data-version-app^="'+latestVersionSub+'"]')

    let i = 0;

    function addUpdateJournal(updateData) {
        // let id = 'update_journal_' + (i++)
        //     , checkbox = $('<input type="checkbox" id="' + (id) + '"/>')
        //         .prop('checked', (i < 3 ? true : false))
        //         .appendTo(page)
        //     , section = $('<section class="update_journal" data-version-' + updateData['type'] + '="' + updateData['version'] + '"/>')
        //         .append(
        //         $('<label for="' + id + '"/>')
        //             .html(_frame.app_main.page['about'].journaltitle(updateData))
        //         )
        //         .appendTo(page)
        // try {
        //     $(_frame.app_main.page['about'].journal_parse(updateData['journal'])).appendTo(section)
        // } catch (e) {
        //     _g.error(e)
        //     checkbox.remove()
        //     section.remove()
        // }
        let journal = new Journal(updateData)
        journal.genSection((i < 3)).appendTo(page)
        i++;
    }

    var promise_chain = Q.fcall(function () { })

    // 开始异步函数链
    promise_chain

        // 获取全部开发中的更新日志
        .then(function () {
            var deferred = Q.defer()
            _db.updates.find({ 'date': "" }).sort({ 'date': -1, 'version': -1 }).exec(function (err, docs) {
                docs.forEach(function (doc) {
                    addUpdateJournal(doc)
                })
                deferred.resolve(err)
            })
            return deferred.promise
        })

        // 获取全部已更新的更新日志
        .then(function () {
            var deferred = Q.defer()
            _db.updates.find({ $not: { 'date': "" } }).sort({ 'date': -1, 'version': -1 }).exec(function (err, docs) {
                docs.forEach(function (doc) {
                    addUpdateJournal(doc)
                })
                deferred.resolve(err)
            })
            return deferred.promise
        })

}






class Journal {
    constructor(data) {
        this.data = data;
        // this.content
    }

    genTitle(tagName = 'h3') {
        return $(
            `<${tagName}>`
            + (this.data.hotfix
                ? '[hotfix] '
                : ''
            )
            + (this.data.type == 'app'
                ? ''
                : (this.data.type == 'app-db' ? 'DB' : this.data.type).toUpperCase()
            )
            // + (this.data.version.replace(/\./g, '-') == this.data.date
            //     ? ''
            //     : this.data.version
            // )
            + (this.data.type == 'app'
                ? this.data.version
                : ''
            )
            + '<small>' + (this.data.date ? this.data.date : 'WIP') + '</small>'
            + `</${tagName}>`
        )
    }

    genContent() {
        let raw = this.data.journal
            , searchRes
            , scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\]\]/gi
            , resultHTML = markdown.toHTML(raw)

        while ((searchRes = scrapePtrn.exec(raw)) !== null) {
            try {
                resultHTML = resultHTML.replace(
                    searchRes[0],
                    _tmpl['link_' + searchRes[1].toLowerCase()](searchRes[2], null, true)
                )
            } catch (e) { }
        }

        searchRes = null
        scrapePtrn = /\[\[([^\:]+)\:([0-9]+)\:TEXT\]\]/gi
        while ((searchRes = scrapePtrn.exec(raw)) !== null) {
            try {
                resultHTML = resultHTML.replace(
                    searchRes[0],
                    _tmpl['textlink_' + searchRes[1].toLowerCase()](searchRes[2], null, true)
                )
            } catch (e) { }
        }

        this.content = $(resultHTML)

        return this.content
    }

    genSection(defaultShow) {
        let id = 'update_journal_' + this.data._id
            , checkbox = $('<input type="checkbox" id="' + (id) + '"/>')
                .prop('checked', (defaultShow ? true : false))
                .on('change', e => {
                    if (e.target.checked)
                        this.show()
                })
        this.section = $('<section class="update_journal" data-version-' + this.data.type + '="' + this.data.version + '"/>')
            .append($(`<label for="${id}"/>`).append(this.genTitle()))

        if (defaultShow)
            this.show()

        return this.section.add(
            checkbox.insertBefore(this.section)
        )

        // try {
        //     let content = this.genContent()
        // } catch (e) {
        //     _g.error(e)
        //     checkbox.remove()
        //     section.remove()
        //     return $()
        // }
    }

    show() {
        if (!this.content)
            this.genContent().appendTo(this.section)
    }
}