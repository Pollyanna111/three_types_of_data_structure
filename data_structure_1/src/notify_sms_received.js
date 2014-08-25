var notify_sms_received = function(sms_json){
    if(localStorage.is_signing_up !== 'true') {
        return;
    }
    if(Sign_up.has_signed(sms_json.messages[0].phone)){
        return;
    }
    var signer_name = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var signer = new Sign_up(signer_name,sms_json.messages[0].phone);
    signer.save_signer();
};



