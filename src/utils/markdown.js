import marked from 'marked3'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-json.js'

const renderer = new marked.Renderer()

renderer.link = function (href, title, text) {
  let html = `<a href="${href}" target="_blank"${title ? ` title=${title}` : ''}>${text}</a>`

  href = href.replace(/\/$/, '')

  if (/jsfiddle\.net\/.*/.test(href)) {
    html += `<script src="${href.replace(/\/$/, '')}/embed/"></script>`
  } else if (/codepen\.io\/.*\/pen\//.test(href)) {
    html += `<iframe src="${href.replace(/\/pen\//, '/embed/')}"></iframe>`
  }

  return html
}

export default function (src = '', options) {
  setTimeout(_ => {
    const scripts = document.querySelectorAll('.markdown-body script')
    for (let i = scripts.length; i--;) {
      const script = scripts[i]

      if (script && script.src) {
        const newScript = document.createElement('script')

        newScript.async = 'async'
        newScript.src = script.src

        script.parentNode.insertBefore(newScript, script)
        script.parentNode.removeChild(script)
      }
    }
  }, 0)

  return marked(src, Object.assign({
    renderer,
    highlight(code, lang) {
      lang = lang === 'shell' ? 'bash' : lang
      return highlight(code, languages[lang] || languages.markup)
    }
  }, options))
}
