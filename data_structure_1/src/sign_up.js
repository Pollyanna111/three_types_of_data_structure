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