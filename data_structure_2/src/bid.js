var create_new_bid = function (activity_id){
    var current_activity = Activity.get_current_activity_by_id(activity_id);
    var bid_name = '竞价'+(current_activity.bids.length+1);
    current_activity.bids.push(bid_name);
    current_activity.biddings[bid_name] = [];
    Activity.sycn_current_activity_to_activities(current_activity);
};