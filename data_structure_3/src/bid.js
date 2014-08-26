function Bid(activity_id){
    this.activity_id = activity_id;
    this.biddings = [];
    this.bid_id = null;
}

function Bidder(name,phone,price){
    this.name = name;
    this.phone = phone;
    this.price = price;
}

var create_new_bid = function(activity_id){
    var bids = Bid.get_bids(), bid = new Bid(activity_id);
    bid.bid_id = '竞价'+(bids.length+1);
    bids.push(bid);
    Bid.save_bids(bids);
};

Bid.get_bids = function () {
    return JSON.parse(localStorage.bids) || [];
};

Bid.save_bids = function(bids){
    localStorage.bids = JSON.stringify(bids);
};

Bidder.want_to_bid = function(sms_json){
    if(localStorage.is_bidding !== 'true' || Bidder.bidder_not_sign(sms_json.messages[0].phone) || Bidder.has_bade(sms_json.messages[0].phone)){
        return;
    }
    var bidder_name = Bidder.get_name_of_bidder(sms_json.messages[0].phone);
    var bidder_price = sms_json.messages[0].message.slice(2,sms_json.messages[0].message.length);
    var bidder = new Bidder(bidder_name,sms_json.messages[0].phone,bidder_price);
    bidder.save_bidder();
};

Bidder.bidder_not_sign = function (phone) {
    var signers = render_sign_ups(Activity.get_current_activity());
    return !(_(signers).findWhere({phone:phone}));
};

Bidder.has_bade = function(phone){
    var bid = _(Bid.get_bids()).findWhere({activity_id:(Activity.get_current_activity()),bid_id:(Bid.get_current_bid())});
    return _(bid.biddings).findWhere({phone:phone});
};

Bid.get_current_bid = function () {
    return localStorage.current_bid;
};

Bidder.prototype.save_bidder = function(){
    var bids = Bid.get_bids(), activity_id = Activity.get_current_activity();
    var new_bids = _(bids).map(function (each_bid) {
        if(each_bid.activity_id == activity_id && each_bid.bid_id === (Bid.get_current_bid())){
            each_bid.biddings.push(this);
        }
        return each_bid;
    },this);
    Bid.save_bids(new_bids);
};

Bidder.get_name_of_bidder = function (phone) {
    var signers = _(Sign_up.get_sign_ups()).where({activity_id:(Activity.get_current_activity())});
    return _(signers).findWhere({phone:phone}).name;
};