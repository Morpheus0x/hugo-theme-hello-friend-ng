const languages = [
{{ range $.Site.Home.AllTranslations }}
  '{{ .Language }}',
{{ end }}
] // create an array of all languages inside main hugo config

function toggleLang() {
  for (l of languages) {
    if (l === document.documentElement.lang) {
      continue
    } else {
      switchLang(l, true)
    }
  }
}
function switchLang(target, save) {
  if (target === document.documentElement.lang) {
    return
  }
  for (l of languages) {
    if (target === l) {
      if (save) {
        window.localStorage.setItem("lang", l)
      }
      let paths = document.location.pathname.split('/')
      let offset = 0
      if (languages.includes(paths[1])) {
        offset = 2
      } else {
        offset = 1
      }
      let newPath = ''
      if (l !== 'en') {
        newPath = "/" + l
      }
      for (p of paths.slice(offset)) {
        newPath += '/' + p
      }
      window.location.replace(newPath)
    }
  }
}
function manageLang() {
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.split('-')[0]
  let chosenLang = window.localStorage && window.localStorage.getItem("lang");
  if (lang === document.documentElement.lang) {
    return
  }
  if (chosenLang == null) {
    switchLang(lang)
  } else {
    switchLang(chosenLang, false)
  }
}
manageLang()
