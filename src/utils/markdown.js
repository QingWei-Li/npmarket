import marked from "marked";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-json.js";

const renderer = new marked.Renderer();

const renderLink = renderer.link;

renderer.link = function(href, title, text) {
  if (/jsfiddle\.net\/.*/.test(href)) {
    return `<script src="${href.replace(/\/$/, "")}/embed/"></script>`;
  } else if (/codepen\.io\/.*\/pen\//.test(href)) {
    return `<iframe src="${href.replace(/\/pen\//, "/embed/")}"></iframe>`;
  }

  return renderLink.apply(renderer, arguments);
};

export default function(src = "", options) {
  setTimeout(_ => {
    const scripts = document.querySelectorAll(".markdown-body script");
    for (let i = scripts.length; i--; ) {
      const script = scripts[i];

      if (script && script.src) {
        const newScript = document.createElement("script");

        newScript.async = "async";
        newScript.src = script.src;

        if (script.parentNode) {
          script.parentNode.insertBefore(newScript, script);
          script.parentNode.removeChild(script);
        }
      }
    }
  }, 0);

  return marked(
    src,
    Object.assign(
      {
        renderer,
        highlight(code, lang) {
          lang = lang === "shell" ? "bash" : lang;
          return highlight(code, languages[lang] || languages.markup);
        }
      },
      options
    )
  );
}
