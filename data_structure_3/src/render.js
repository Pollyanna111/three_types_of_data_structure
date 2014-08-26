var render_sign_ups = function (activity_id) {
    return _(Sign_up.get_sign_ups()).where({activity_id:activity_id});
};

var render_bids = function (activity_id) {
    return _(Bid.get_bids()).where({activity_id:activity_id});
};

var render_biddings = function (activity_id,bid_name) {
    var bidders = _(Bid.get_bids()).findWhere({activity_id:activity_id,name:bid_name}).biddings;
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
    uniq[0][0].name = Bidder.get_name_of_bidder(activity_id,uniq[0][0].phone);
    return uniq[0];
};