$(function() {
    
    var names = [],
        users = {}
    
    var getFirstUrl = function() {
        return "http://api.thisismyjam.com/1/pabloldias/following.json?order=affinity&page=1"
    }
    
    var ajax = function(url, callback) {    
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                callback(data);
                if (data.list.hasMore) {
                    ajax(data.list.next, callback);
                }
                else {
                    showList();
                }
            }
        });    
    }
    
    var addUser = function(user) {
        if (!users[user.name] && !user.hasCurrentJam) {
            console.info(user);
            users[user.name] = user;
            names.push(user.name);
        }
    }
    
    var showList = function() {
        $("#loading").text("Loading completed");
        
        var output = []
        $.each(names, function (i, name) {
            output.push('<a href="' + users[name].url + '">' + name + '</a>');
        })
        $("#users_list").append('<ol><li>' + output.join('</li><li>') + '</li></ol>');
    }
    
    var showLoadingMessage = function(total) {
        $("#loading").text("Loading " + total + " users");
    }
    
    var getContents = function() {
        ajax(
            getFirstUrl(),
            function(data) {
                $.each(data.people, function(index, user) {
                    addUser(user);
                });
                showLoadingMessage(names.length);
            });
    }
    
    if ($("#users_list").length > 0) {
        getContents();
    }

})