
console.log('now minified and template ready')
const languages = [
{{ range $.Site.Home.AllTranslations }}
  '{{ .Language }}',
{{ end }}
] // create an array of all non-selected languages inside main hugo config


function toggleLang() {
  for (l of languages) {
    console.log('l: ', l)
    if (l === document.documentElement.lang) {
      continue
    } else {
      switchLang(l, true)
    }
  }
}
function switchLang(target, save) {
  console.log('switchLang target: ', target, ' save: ', save)
  if (target === document.documentElement.lang) {
    return
  }
  for (l of languages) {
    if (target === l) {
      if (save) {
        window.localStorage.setItem("lang", l)
      }
      // console.log('replace')
      if (l === 'en') {
        window.location.replace("/")
      } else {
        window.location.replace("/" + l) // TODO: find a way to also reliably do this for sub pages, maybe look at how its originally done
      }
    }
  }
}
function manageLang() {
  console.log(languages)
  // console.log('language: ', {{ .Language }})
  const userLang = navigator.language || navigator.userLanguage; 
  // console.log('userLang: ', userLang)
  const lang = userLang.split('-')[0]
  let chosenLang = window.localStorage && window.localStorage.getItem("lang");
  if (lang === document.documentElement.lang) {
    console.log(lang, document.documentElement.lang)
    return
  }
  if (chosenLang == null) {
    switchLang(lang)
  } else {
    switchLang(chosenLang, false)
  }
}
manageLang()




function forceLang(e) {
  console.log('switchLang target: ', target)
  if (target === document.documentElement.lang) {
    return
  }
  for (l of languages) {
    if (target === l) {
    window.location.replace("/" + l) // TODO: find a way to also reliably do this for sub pages
    }
  }
}
