var notify_sms_received = function(sms_json){
    var sign_or_bid = {
        sign : Sign_up.want_to_sign,
//        bid : Bid.want_to_bid,
        error : null
    };
    sign_or_bid[want_to_sign_or_bid(sms_json.messages[0].message.substring(0,2))](sms_json);
};

var want_to_sign_or_bid = function(message){
    return message === 'bm' ?
        'sign' : message === 'BM' ?
        'sign' : message === 'jj' ?
        'bid' : message === 'JJ' ?
        'bid' : 'error';
};

