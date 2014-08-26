function Sign_up(name,phone,activity_id) {
    this.name = name;
    this.phone = phone;
    this.activity_id = activity_id;
}

Sign_up.want_to_sign = function(sms_json){
    if(localStorage.is_signing_up !== 'true' || Sign_up.has_signed(sms_json.messages[0].phone)){
        return;
    }
    var signer_name = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var signer = new Sign_up(signer_name,sms_json.messages[0].phone,Activity.get_current_activity());
    signer.save_signer();
};

Sign_up.prototype.save_signer = function () {
    var signers = Sign_up.get_sign_ups();
    signers.push(this);
    Sign_up.save_sign_ups(signers);
};

Sign_up.get_sign_ups = function(){
    return JSON.parse(localStorage.sign_ups) || [];
};

Sign_up.save_sign_ups = function(signers){
    localStorage.sign_ups = JSON.stringify(signers);
};

Sign_up.has_signed = function (phone) {
    var activity_id = Activity.get_current_activity(),signers = Sign_up.get_sign_ups();
    return _(signers).findWhere({activity_id:activity_id,phone:phone});
};