function Base64() {
  // private property
  _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  // public method for encoding
  this.encode =
      function(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

      // public method for decoding
      this.decode =
          function(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
    while (i < input.length) {
      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    output = _utf8_decode(output);
    return output;
  }

  // private method for UTF-8 encoding
  _utf8_encode =
      function(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }

  // private method for UTF-8 decoding
  _utf8_decode = function(utftext) {
    var string = '';
    var i = 0;
    var c = c1 = c2 = 0;
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return string;
  }
}
var base = new Base64();



$('pre').find('code').parent().after(
    '<p class="run" style="text-align:right"><a href="javascript:void(0)" class="run" style="display:none">Run</a></p><blockquote class="run" style="display:none"></blockquote>');
var as = $('a.run'), bs = $('blockquote.run'), cs = $('pre code'),
    ds = cs.parent();
var langs4e = [], langs4s = [], editors = [];

// todo: steak, coq, adga, racket
for (i = 0; i < as.length; i++) {
  as [i].setAttribute('onclick', 'sendCode(' + i + ')');
  var ss = cs[i].classList;
  var flag = true;
  for (j = 0; j < ss.length; j++)
    if (flag) {
      var s = ss[j];
      var m = s.match('language-(.+)');
      if (m) {
        flag = false;
        switch (m[1].toLowerCase()) {
          case 'c':
            langs4s[i] = 'c';
            langs4e[i] = 'c_cpp';
          case 'cpp':
          case 'c++':
            langs4s[i] = 'cpp';
            langs4e[i] = 'c_cpp';
            break;
          case 'haskell':
            langs4s[i] = langs4e[i] = 'haskell';
            break;
          case 'javascript':
          case 'js':
            langs4s[i] = langs4e[i] = 'javascript';
            break;
          case 'steak':
            langs4s[i] = 'steak';
            langs4e[i] = 'c_cpp';
            break;
          case 'idris':
            langs4e[i] = langs4s[i] = 'idris';
            break;
          case 'agda':
            langs4e[i] = langs4s[i] = 'agda';
            break;
          case 'coq':
            langs4e[i] = langs4s[i] = 'coq';
            break;
          case 'scala':
            langs4e[i] = langs4s[i] = 'scala';
            break;
          case 'lua':
            langs4e[i] = langs4s[i] = 'lua';
            break;
          case 'racket':
          case 'scheme':
          case 'lisp':
            langs4e[i] = 'scheme';
            langs4s[i] = 'racket';
            break;
          case 'rust':
            langs4e[i] = 'rust' = langs4s[i] = 'rust';
            break;
        }
        if (m[1] != m[1].toLowerCase()) langs4s[i] = '';
      }
    }
  if (langs4e[i]) {
    if (langs4s[i]) as [i].setAttribute('style', '');
    editors[i] = ace.edit(ds[i]);
    ds[i].setAttribute('id', 'code' + i);
    editors[i].setAutoScrollEditorIntoView(true);
    editors[i].setOption('maxLines', 1000);
    editors[i].setValue('\n' + editors[i].getValue());
    editors[i].setTheme('ace/theme/ambiance');
    editors[i].session.setMode('ace/mode/' + langs4e[i]);
    editors[i].renderer.setShowGutter(false);
    editors[i].setFontSize(20);
    editors[i].selection.moveCursorFileStart();
  }
}

function sendCode(i) {
  var code = editors[i].getValue();
  var lang = langs4s[i];

  bs[i].setAttribute('style', 'display:block');
  bs[i].textContent = 'Running...';

  $.ajax({
    url: 'https://zju-lambda.tech/run/',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify({lang: lang, code: base.encode(code)}),
    error: function(xhr) {
      bs[i].textContent = 'Error:\n' + xhr;
    },
    success: function(response) {
      bs[i].textContent = 'Result:\n' + response;
    }
  });
}