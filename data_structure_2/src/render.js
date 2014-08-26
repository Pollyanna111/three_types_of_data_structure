var render_sign_ups = function (activity_name) {
    var activity = Activity.find_activity_by_name(activity_name);
    return activity.sign_ups;
};