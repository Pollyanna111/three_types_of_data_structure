function Activity(name,sign_ups,bids,biddings){
    this.name = name;
    this.sign_ups = sign_ups || [];
    this.bids = bids || [];
    this.biddings = biddings || {};
}

Activity.prototype.create = function(){
    var activity_json = Activity.get_activities();
    var activity_id = _.keys(activity_json).length;
    Activity.update_activity_ids(activity_id);
    Activity.save_current_activity(activity_id);
    activity_json[activity_id] = this;
    Activity.save_activities(activity_json);
};

Activity.update_activity_ids = function (activity_id) {
    var activity_ids = Activity.get_activity_ids();
    activity_ids.push(activity_id);
    Activity.save_activity_ids(activity_ids);
};


Activity.get_activities = function(){
    return JSON.parse(localStorage.activities) || {};
};

Activity.save_activities = function(activity_json){
    localStorage.activities = JSON.stringify(activity_json);
};

Activity.save_activity_ids = function(activity_ids){
    localStorage.activity_ids = JSON.stringify(activity_ids);
};

Activity.get_activity_ids = function(){
    return JSON.parse(localStorage.activity_ids) || [];
};

Activity.save_current_activity = function (activity_id) {
    localStorage.current_activity = activity_id;
};