function Activity(name,sign_ups,bids,biddings){
    this.name = name;
    this.sign_ups = sign_ups || [];
    this.bids = bids || [];
    this.biddings = biddings || {};
}

Activity.prototype.create = function(){
    Activity.update_activity_ids();
    Activity.save_current_activity();
    Activity.update_activities(this);
    Activity.save_activity_id_generator();
};

Activity.update_activities = function(activity){
    var activity_json = Activity.get_activities();
    activity_json[Activity.get_activity_id_generator()] = activity;
    Activity.save_activities(activity_json);
};


Activity.update_activity_ids = function () {
    var activity_ids = Activity.get_activity_ids();
    activity_ids.push(Activity.get_activity_id_generator());
    Activity.save_activity_ids(activity_ids);
};

Activity.get_activity_id_generator = function(){
    return localStorage.activity_id_generator || 0;
};

Activity.save_activity_id_generator = function () {
    localStorage.activity_id_generator = Activity.get_activity_ids().length;
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

Activity.save_current_activity = function () {
    localStorage.current_activity = Activity.get_activity_id_generator();
};

Activity.sycn_current_activity_to_activities = function (current_activity) {
    var activity_json = Activity.get_activities();
    activity_json[localStorage.current_activity] = current_activity;
    Activity.save_activities(activity_json);
};

Activity.get_detail_of_current_activity = function(){
    var activity_json = Activity.get_activities();
    return activity_json[localStorage.current_activity];
};

Activity.find_activity_by_name = function(activity_name){
    var activity_json = Activity.get_activities();
    return _(_(activity_json).values()).findWhere({name:activity_name});
};

Activity.get_current_activity_by_id = function(activity_id){
    var activity_json = Activity.get_activities();
    return activity_json[activity_id];
};