// console.log('ran deobfuscator script')

// "use strict";

function hex2int(str, index) {
    var r = str.substr(index, 2);
    return parseInt(r, 16)
}

function decodeURI(href, offset) {
    for (var output = "", val = hex2int(href, offset), nextVal = offset + 2; nextVal < href.length; nextVal += 2) {
        var l = hex2int(href, nextVal) ^ val; // decode by XORing 2 hex values
        output += String.fromCharCode(l) // construct output string
    }
    try {
        output = decodeURIComponent(escape(output))
    } catch (err) {
        error(err)
    }
    return output
}

let toDecode = document.getElementsByClassName('obf-decode')
// console.log(toDecode)
// debugger
for (let i = 0; i < toDecode.length; i++) {
    let decoded = ''
    // console.log(toDecode[i])
    if (toDecode[i].tagName == 'A') {
        // console.log("parsing a tag")
        href = toDecode[i].href.split(':')
        decoded = decodeURI(href[1], 0)
        let sanitized = decoded
        if (href[0] == "tel") {
            sanitized = decoded.split(' ').join('')
        }
        toDecode[i].href = href[0] + ':' + sanitized
    } else if (toDecode[i].tagName == 'SPAN') {
        // console.log("parsing span tag")
        decoded = decodeURI(toDecode[i].attributes.data.value, 0)
        toDecode[i].data = ""
    }
    if (toDecode[i].attributes.data == null || toDecode[i].attributes.data.value != "noText") {
        toDecode[i].innerHTML = decoded
    }
}
