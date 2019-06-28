var moment = require("moment");

function handler(response, postData, copLogic, config) {
    console.log("Telegram bot was called.");
    console.log("postData : " + postData);
    //var content = {fruit : decodeURIComponent(postData)};
    //content = JSON.stringify(content);
    
    var message_info = {};

    if(IsJsonString(postData)){
        message_info = JSON.parse(postData);
    }
    
    if ("update_id" in message_info) {
        console.log("My bot just get a message!!");
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("OK");
        response.end();

        var chat_id = 0;
        var message = "";
        var date = 0;

        //Message comes from chat (群組)
        if ("channel_post" in message_info) {
            chat_id = message_info.channel_post.chat.id;
            message = message_info.channel_post.text;
            date = message_info.channel_post.date;
        //Message comes from private person (私訊)
        } else if ("message" in message_info) {
            chat_id = message_info.message.chat.id;
            message = message_info.message.text;
            date = message_info.message.date;
        }

        console.log("The chat id is : " + chat_id);
        console.log("The text message is :" + message);

        if (moment().unix() - parseInt(date) < 7) {
            copLogic(chat_id, message, config);
        }
        
    } else {
        console.log("This is not a good POST data.");
    }
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

exports.handler = handler;