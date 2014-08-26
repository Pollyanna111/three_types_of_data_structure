function Bidder(phone,price) {
    this.phone = phone;
    this.price = price;
}

var create_new_bid = function (activity_id){
    var current_activity = Activity.get_activity_by_id(activity_id);
    var bid_name = '竞价'+(current_activity.bids.length+1);
    current_activity.bids.push(bid_name);
    current_activity.biddings[bid_name] = [];
    Activity.sycn_current_activity_to_activities(current_activity);
};

Bidder.want_to_bid = function(sms_json){
    if(localStorage.is_bidding !== 'true' || Bidder.bidder_not_sign(sms_json.messages[0].phone) || Bidder.has_bade(sms_json.messages[0].phone)){
        return;
    }
    var bid_price = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var bidder = new Bidder(sms_json.messages[0].phone,bid_price);
    bidder.save_bidder();
};

Bidder.prototype.save_bidder = function(){
    var current_activity = Activity.get_detail_of_current_activity();
    current_activity.biddings[Bidder.get_current_bid()].push(this);
    Activity.sycn_current_activity_to_activities(current_activity);
};

Bidder.get_current_bid = function(){
    return localStorage.current_bid;
};

Bidder.bidder_not_sign = function(phone){
    var current_activity = Activity.get_detail_of_current_activity();
    return !(_(current_activity.sign_ups).findWhere({phone:phone}));
};

Bidder.has_bade = function(phone){
    var current_activity = Activity.get_detail_of_current_activity();
    return _(current_activity.biddings[Bidder.get_current_bid()]).findWhere({phone:phone});
};

Bidder.get_all_bidders = function(activity_id,bid_name){
    var activity = Activity.get_activity_by_id(activity_id);
    return activity.biddings[bid_name];
};

Bidder.find_name_by_phone = function (activity_id,phone) {
    var activity = Activity.get_activity_by_id(activity_id);
    return _(activity.sign_ups).findWhere({phone:phone}).name;
};