function Activity(name, sign_ups, bids) {
    this.name = name;
    this.sign_ups = sign_ups || [];
    this.bids = bids || [];
}


Activity.prototype.create = function(){
    var activity_json = Activity.get_activities();
    activity_json.push(this);
    Activity.save_activities(activity_json);
};

Activity.prototype.active = function(){
    Activity.save_current_activity(this.name);
};

Activity.get_activities = function(){
    return JSON.parse(localStorage.activities);
};

Activity.save_activities = function(activity_json){
    localStorage.setItem('activities', JSON.stringify(activity_json));
};

Activity.get_current_activity = function(){
    return localStorage.current_activity;
};

Activity.save_current_activity = function(activity_name){
    localStorage.current_activity = activity_name;
};

Activity.sycn_current_activity_to_activities = function (current_activity) {
    var activity_json = Activity.get_activities();
    activity_json = _(activity_json).map(function (i) {
        return i.name === current_activity.name ?
            current_activity : i;
    });
    Activity.save_activities(activity_json);
};


Activity.get_detail_of_current_activity = function(){
    var current_activity_name = Activity.get_current_activity();
    return Activity.find_activity_by_name(current_activity_name);
};


Activity.find_activity_by_name = function(activity_name){
    var activities = Activity.get_activities();
    return _(activities).findWhere({name:activity_name}) || {};
};