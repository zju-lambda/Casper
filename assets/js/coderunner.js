$("pre").find("code").parent().after('<p class="run" style="text-align:right"><a href="#" class="run">Run</a></p><blockquote class="run" style="display:none"></blockquote>');
var as=$("a.run"),bs=$("blockquote.run"),cs=$("pre code"),ds=cs.parent();
var langs4e = [],langs4s = [],editors = [];
ds.addClass("editor");  
for(i=0;i<as.length;i++){
    as[i].setAttribute("onclick","sendCode("+i+")");
    as[i].setAttribute("href","#code"+i+"");
    var ss = cs[i].classList;
    var flag = true;
    for(j=0;j<ss.length;j++) if(flag){
        var s = ss[j];
        var m = s.match("language-(.+)");
        if(m){
            flag = false;
            switch(m[1]){
            case "c":
                langs4s[i] = "c";
                langs4e[i] = "c_cpp";
            case "cpp":case "c++":
                langs4s[i] = "cpp";
                langs4e[i] = "c_cpp";
                break;
            case "haskell":
                langs4s[i] = "hs";
                langs4e[i] = "haskell";
                break;
            case "javascript":
                langs4s[i] = "js";
                langs4e[i] = "javascript";
                break;
            case "steak":
                langs4s[i] = "steak";
                langs4e[i] = "c_cpp";
                break;
            case "idris":
                langs4e[i]=langs4s[i]="idris";
                break;
            case "agda":
                langs4e[i]=langs4s[i]="agda";
                break;
            case "coq":
                langs4e[i]=langs4s[i]="coq";
                break;
            case "scala":
                langs4e[i]=langs4s[i]="scala";
                break;
            case "lua":
                langs4e[i]=langs4s[i]="lua";
                break;
            default:
                as[i].setAttribute("style","display:none");
                break;
            }
        }
    }
    editors[i] = ace.edit(ds[i]);
    ds[i].setAttribute("id","code"+i);
    editors[i].setAutoScrollEditorIntoView(true);
    editors[i].setOption("maxLines", 30);   
    editors[i].setValue("\n"+editors[i].getValue());
    editors[i].setTheme("ace/theme/ambiance");
    editors[i].session.setMode("ace/mode/"+langs4e[i]);
    editors[i].renderer.setShowGutter(false);
    editors[i].selection.moveCursorFileStart();
}

function sendCode(i){
    var code = editors[i].getValue();
    var lang = langs4s[i];

    bs[i].setAttribute("style","display:block");
    bs[i].textContent = "running...";

    $.ajax({
        'url':"http://123.206.103.187:2468/",
        'type':'post',
        'contentType':'application/json',
        'data':JSON.stringify({"lang":lang,"code":code}),
        'error':function(xhr){
            bs[i].textContent = "error";
        },
        'success':function(response){
            bs[i].textContent = "result:\n" + response;
        }
    });
}