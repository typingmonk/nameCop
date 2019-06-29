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

        if ("channel_post" in message_info) {
            //(channel) text
            chat_id = message_info.channel_post.chat.id;
            message = message_info.channel_post.text;
            date = message_info.channel_post.date;
        } else if ("edited_channel_post" in message_info) {
            //(channel) edit_text
            //For avoid confusion. The bot don't check edited message.
        } else if ("message" in message_info) {
            //(chat, group) text
            chat_id = message_info.message.chat.id;
            if ("text" in message_info.message) {
                //When invite bot in to group. there are no "text" in json.  
                message = message_info.message.text;
            }
            date = message_info.message.date;
        } else if ("edited_message" in message_info) {
            //(chat, group) edit_text
            //For avoid confusion. The bot don't check edited message.
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