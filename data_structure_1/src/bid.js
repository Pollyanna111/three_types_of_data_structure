function Bid(name,biddings){
    this.name = name;
    this.biddings = biddings || [];
}

function Bidder(name,phone,price){
    this.name = name;
    this.phone = phone;
    this.price = price;
}

Bid.prototype.save_bid = function(){
    var current_activity = Activity.get_detail_of_current_activity();
    current_activity.bids.push(this);
    Activity.sycn_current_activity_to_activities(current_activity);
};

var create_new_bid = function(){
    var current_activity = Activity.get_detail_of_current_activity();
    var bid = new Bid('竞价'+(current_activity.bids.length+1));
    bid.save_bid();
    Bid.save_current_bid('竞价'+(current_activity.bids.length+1));
};

Bid.save_current_bid = function(bid_name){
    localStorage.current_bid = bid_name;
};

Bid.get_current_bid = function(){
    return localStorage.current_bid;
};

Bid.want_to_bid = function(sms_json){
    if(localStorage.is_bidding !== "true" || Bidder.bidder_not_sign(sms_json.messages[0].phone) || Bidder.bidder_bade(sms_json.messages[0].phone)){
        return;
    }
    var bidder_name = Bidder.get_name_of_bidder(sms_json.messages[0].phone);
    var bidder_price = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var bidder = new Bidder(bidder_name,sms_json.messages[0].phone,bidder_price);
    bidder.save_bidder();
};

Bidder.prototype.save_bidder = function(){
    var current_activity = Activity.get_detail_of_current_activity();
    current_activity.bids = _(current_activity.bids).map(function(each_bid){
        if(each_bid.name === Bid.get_current_bid()){
            each_bid.biddings.push(this);
        }
        return each_bid;
    },this);
    Activity.sycn_current_activity_to_activities(current_activity);
};

Bidder.get_name_of_bidder = function (phone) {
    var current_activity = Activity.get_detail_of_current_activity();
    return _(current_activity.sign_ups).findWhere({phone:phone}).name;
};

Bidder.bidder_not_sign = function(phone){
    var current_activity = Activity.get_detail_of_current_activity();
    return !(_(current_activity.sign_ups).findWhere({phone:phone}));
};

Bidder.bidder_bade = function (phone) {
    var current_activity = Activity.get_detail_of_current_activity();
    var biddings = _(current_activity.bids).findWhere({name:Bid.get_current_bid()}).biddings;
    return _(biddings).findWhere({phone:phone});
};