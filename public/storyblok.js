if (window.location.search.indexOf('_storyblok') > -1) {
  ;(function (d, t) {
    var g = d.createElement(t),
      s = d.getElementsByTagName(t)[0]
    g.src = '//app.storyblok.com/f/storyblok-latest.js?t=TtKqco22Hsj6mv1Tz5ShGgtt'
    s.parentNode.insertBefore(g, s)

    setTimeout(function () {
      storyblok.on('change', function () {
        location.reload(true)
      })

      storyblok.on('published', function () {
        // trigger deploy on publish
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'https://api.netlify.com/build_hooks/5a7378adefbe5d0a70628bfd')

        xhr.send('')

        // reload
        setTimeout(function () {
          location.reload(true)
        }, 500)
      })

      storyblok.pingEditor(function () {
        if (storyblok.inEditor) {
          storyblok.enterEditmode()
        }
      })
    }, 500)
  })(document, 'script')
}
