var render_sign_ups = function (activity_name) {
    var picked_activity = Activity.find_activity_by_name(activity_name);
    return picked_activity.sign_ups;
};

var transform_bids_to_view_model = function (activity_name) {
    var picked_activity = Activity.find_activity_by_name(activity_name);
    return picked_activity.bids;
};

var transform_biddings_to_view_model = function(activity_name,bidding_name){
    var picked_activity = Activity.find_activity_by_name(activity_name);
    var picked_bidders = _(picked_activity.bids).findWhere({name:bidding_name}).biddings;
    return compute_the_winner(picked_bidders);
};

var compute_the_winner = function(picked_bidders) {
    var ordered_price = _(picked_bidders).groupBy(function (each_bidder) {
        return each_bidder.price;
    });
    var uniq = [] , values = _(ordered_price).values();
    _(values).each(function (price) {
        if(price.length === 1){
            uniq.push(price);
        }
    });
    return uniq.shift();
};
