function Sign_up (name,phone) {
    this.name = name;
    this.phone = phone;
}

Sign_up.prototype.save_signer = function(){
    var current_activity = Activity.get_detail_of_current_activity();
    current_activity.sign_ups.push(this);
    Activity.sycn_current_activity_to_activities(current_activity);
};

Sign_up.has_signed = function(phone){
    var current_activity = Activity.get_detail_of_current_activity();
    return _(current_activity.sign_ups).findWhere({phone:phone});
};

Sign_up.want_to_sign = function(sms_json){
    if(localStorage.is_signing_up !== 'true' || Sign_up.has_signed(sms_json.messages[0].phone)) {
        return;
    }
    var signer_name = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var signer = new Sign_up(signer_name,sms_json.messages[0].phone);
    signer.save_signer();
};