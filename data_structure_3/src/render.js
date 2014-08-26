var render_sign_ups = function (activity_id) {
    return _(Sign_up.get_sign_ups()).where({activity_id:activity_id});
};