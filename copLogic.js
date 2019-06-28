var https = require("https");

function checkLogic(chat_id, message, config){
    
    reply = "";
    console.log("Inside of checkLogic");
    console.log("true/false : "+(message.toLowerCase().indexOf("ocaml") > -1));
    //警察檢查有沒有拼對 程式語言的名稱
    while (message.toLowerCase().indexOf("ocaml") > -1) {
        index = message.toLowerCase().indexOf("ocaml");
        console.log("checkpoint 0");
        console.log(message.substring(index, index+5));
        if (!(message.substring(index, index+5) === "OCaml")) {
            console.log("checkpoint 1");
            reply = encodeURIComponent("是 OCaml 啦！");
            target_url = "https://api.telegram.org/bot" + config.telegramToken +
                         "/sendMessage?chat_id=" + chat_id + "&text=" + reply;
            https.get(target_url);
            break;
        }
        message = message.substring(index+5)
    }


    
    
}

exports.copLogic = checkLogic;