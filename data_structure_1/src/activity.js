function Activity(name, sign_ups, bids) {
    this.name = name;
    this.sign_ups = sign_ups || [];
    this.bids = bids || [];
}


Activity.prototype.create = function(){
    var activity_json = JSON.parse(localStorage.activities);
    activity_json.push(this);
    localStorage.setItem('activities',JSON.stringify(activity_json));
};

Activity.prototype.active = function(){
    localStorage.setItem('current_activity', this.name);
};