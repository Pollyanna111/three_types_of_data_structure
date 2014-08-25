function Bid(name,biddings){
    this.name = name;
    this.biddings = biddings || [];
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
};


