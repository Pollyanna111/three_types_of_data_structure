var render_sign_ups = function (activity_name) {
    var activity = Activity.find_activity_by_name(activity_name);
    return activity.sign_ups;
};

var transform_bids_to_view_model = function (activity_id) {
    var activity = Activity.get_activity_by_id(activity_id);
    return activity.bids;
};

var transform_biddings_to_view_model = function(activity_id,bid_name){
    var bidders = Bidder.get_all_bidders(activity_id,bid_name);
    return compute_the_winner(activity_id,bidders);
};

var compute_the_winner = function(activity_id,bidders) {
    var ordered_price = _(bidders).groupBy(function (each_bidder) {
        return each_bidder.price;
    });
    var uniq = [] , values = _(ordered_price).values();
    _(values).each(function (each_value) {
        if(each_value.length === 1){
            uniq.push(each_value);
        }
    });
    uniq[0][0].name = Bidder.find_name_by_phone(activity_id,uniq[0][0].phone);
    return uniq[0];
};