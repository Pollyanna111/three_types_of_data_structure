function Activity(name) {
    this.name = name;
    this.id = null;
}

Activity.prototype.create = function () {
    Activity.save_current_activity(Activity.get_activity_id_generator());
    Activity.update_activities(this);
    Activity.save_activity_id_generator();
};

Activity.update_activities = function(activity){
    var activities = Activity.get_activities();
    activity.id = Activity.get_activity_id_generator();
    activities.push(activity);
    Activity.save_activities(activities);
};

Activity.get_activities = function(){
    return JSON.parse(localStorage.activities) || [];
};

Activity.save_activities = function(activities){
    localStorage.activities = JSON.stringify(activities);
};

Activity.get_current_activity = function(){
    return localStorage.current_activity;
};

Activity.save_current_activity = function(activity_id){
    localStorage.current_activity = activity_id;
};

Activity.get_activity_id_generator = function () {
    return localStorage.activity_id_generator || 0;
};

Activity.save_activity_id_generator = function(){
    var activities = Activity.get_activities();
    localStorage.activity_id_generator = activities.length.toString();
};


Activity.get_detail_of_current_activity = function(){
    var current_activity_id = Activity.get_current_activity();
    return Activity.find_activity_by_id(current_activity_id);
};

Activity.find_activity_by_id = function(activity_id){
    return _(Activity.get_activities()).findWhere({id:activity_id});
};