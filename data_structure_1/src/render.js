var render_sign_ups = function (activity_name) {
    var picked_activity = Activity.find_activity_by_name(activity_name);
    return picked_activity.sign_ups;
};

