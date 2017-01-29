var temp = {
    "username":"Nanda",
    "password":"123",
    "firstname":"nanda",
    "lastname":"kumer",
    "email":"nanda@marlabs.com",
    "phone":123456677,
    "location":"New York"
}
var sample = [];
sample.push(temp);

var tempMessages = [
        {
            "recipient":"Arun",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"Nanda",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 09:45:00",
            "important":"0"
        },
        {	
            "recipient":"Nanda",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"Arun",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Nanda.",
            "description":"This is a sample description to the message which has the above title",
            "created_at":"2017-01-19 10:45:00",
            "important":"1"
        },
        {	
            "recipient":"Jett",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"Arun",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Arun.",
            "description":"Hi Arun",
            "created_at":"2017-01-19 11:45:00",
            "important":"0"
        },
        {	
            "recipient":"Jett",
            "recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":"Nanda",
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":"This is a sample message to Jett.",
            "description":"Testing",
            "created_at":"2017-01-19 12:45:00",
            "important":"1"
        }


];

window.onload = function(){
	if(!localStorage.getItem('userlist')){
		console.log('load userlist sample');
		localStorage.setItem("userlist",JSON.stringify(sample));
	}
	if(!localStorage.getItem('messages')){
		console.log('load messages sample');
		localStorage.setItem('messages',JSON.stringify(tempMessages));
	}
}

var app = angular.module('myapp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/login', {
    	templateUrl:'template/login.html',
    	controller:'loginCtrl'
    })
    .when('/register', {
        templateUrl:'template/register.html',
        controller:'registerCtrl'
    })
    .when('/message', {
    	templateUrl:'template/message.html',
    	controller:'messageCtrl'
    })
    .when('/profile', {
        templateUrl:'template/profile.html',
        controller:'profileCtrl'
    })
    .when('/logout', {
    	templateUrl:'template/login.html',
    	controller:'logoutCtrl'
    })
    .when('/error', {
        template:'Invalid URL, Please try again...'
    })
    .when('/', {
    	redirectTo:'/login'
    })
    .when('/messagedetail',{
    	templateUrl:'template/messagedetail.html',
    	controller:'messagedetailCtrl'
    })
    .when('/newmessage',{
    	templateUrl:'template/newmessage.html',
    	controller:'newmessageCtrl'
    })
    .when('/replymessage',{
    	templateUrl:'template/replymessage.html',
    	controller:'replymessageCtrl'
    })
    .otherwise({
        redirectTo:'/error'
    });
    
});

app.service('validate',function(){
    this.is_user_exist = function(username){
        var currentlist = JSON.parse(localStorage.getItem('userlist'));
        if(currentlist == null){
            return true;
        }else{
            for(var i =0;i<currentlist.length;i++){
                if(currentlist[i].username==username){
                    return true;
                }
            }
        }
        return false;
    }
    this.is_user_match_pwd = function(username, pwd){
        if(this.is_user_exist(username)){
        	var currentlist = JSON.parse(localStorage.getItem('userlist'));
        	for(var i = 0 ;i<currentlist.length;i++){
        		if(currentlist[i].password == pwd){
        			return true;
        		}
        	}
        }
        return false;
    }
});

// app.service('user',function() {
// 	this.newuser = function(username,password,firstname,lastname,email,phone,location) {
// 		var u = {};
// 		u.username = username;
// 		u.password = password;
// 		u.firstname = firstname;
// 		u.lastname = lastname;
// 		u.email = email;
// 		u.phone = phone;
// 		u.location = location;
// 		return u;
// 	}
// });

app.controller('loginCtrl',loginCtrl);
loginCtrl.$inject = ['$scope','$rootScope','validate','$location'];
function loginCtrl($scope,$rootScope,validate,$location){
	$rootScope.islogin = false;
	$rootScope.isRegister = false;
	$rootScope.isProfile = false;
	$rootScope.isMessage = false;

	if(localStorage.getItem('currentUser')){
		var username = JSON.parse(localStorage.getItem('currentUser')).username;
		var pwd = JSON.parse(localStorage.getItem('currentUser')).password;
		if(validate.is_user_match_pwd(username,pwd)){
			$rootScope.islogin = true;
			$location.path('/profile');
		}
	}else{
		console.log("no current user or wrong pwd");
	}
    
    $scope.login = function(){
    	if(validate.is_user_match_pwd($scope.loginname,$scope.loginpwd)){
    		$rootScope.islogin = true;
    		var currentUser = {
    			"username":$scope.loginname,
    			"password":$scope.loginpwd
    		}
    		localStorage.setItem('currentUser',JSON.stringify(currentUser));
    		$location.path('/profile');
    	}else{
    		$scope.loginname = "";
    		$scope.loginpwd = "";
    		alert("wrong user name or password, please try again");
    	}
    }
}

app.controller('logoutCtrl',logoutCtrl);
logoutCtrl.$inject = ['$location','$rootScope'];
function logoutCtrl($location,$rootScope){
    localStorage.removeItem("currentUser");
    $location.path('/login');
}

app.controller('registerCtrl',registerCtrl);
registerCtrl.$inject = ['$scope','$rootScope','$location'];
function registerCtrl($scope,$rootScope,$location){
	$rootScope.isRegister = true;
	$rootScope.isProfile = false;
	$rootScope.isMessage = false;
    var user = {
        "username":"",
        "password":"",
        "firstname":"",
        "lastname":"",
        "email":"",
        "phone":"",
        "location":""
    }
    $scope.register = function(){
	    user.username = $scope.p_username,
	    user.password = $scope.p_pwd,
	    user.firstname = $scope.p_firstname,
	    user.lastname = $scope.p_lastname,
	    user.email = $scope.p_email,
	    user.phone = $scope.p_phone,
	    user.location = $scope.p_location

	    if(localStorage.getItem("userlist")){
	    	var userlist = JSON.parse(localStorage.getItem("userlist"));
	    }else{
	    	var userlist = [];
	    }
	    userlist.push(user);
	    localStorage.setItem('userlist',JSON.stringify(userlist));
	    localStorage.removeItem("currentUser");
	    alert("New user created");
	    $rootScope.isRegister = false;
	    $location.path('/login');
    }
}

app.controller('profileCtrl',profileCtrl);
profileCtrl.$inject = ['$scope','$rootScope','$location','validate'];
function profileCtrl($scope,$rootScope,$location,validate){
	$rootScope.isProfile = true;
	$rootScope.isRegister = false;
	$rootScope.isMessage = false;
	$rootScope.islogin = true;
	$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;

	var targetuser;
	var currentusername;
	var index;
	var list = [];
	if(validate.is_user_exist(JSON.parse(localStorage.getItem('currentUser')).username)){
		currentusername = JSON.parse(localStorage.getItem('currentUser')).username;
		list = JSON.parse(localStorage.getItem('userlist'));
		for(var i=0;i<list.length;i++){
			if(list[i].username == currentusername){
				targetuser = list[i];
				index = i;
				$scope.p_username = targetuser.username;
				$scope.p_pwd = targetuser.password;
				$scope.p_firstname = targetuser.firstname;
				$scope.p_lastname = targetuser.lastname;
				$scope.p_email = targetuser.email;
				$scope.p_phone = targetuser.phone;
				$scope.p_location = targetuser.location;
			}
		}
	}else{
		console.log('no match user!');
		$location.path('/error');
	}

	$scope.update = function(){
		targetuser.username = $scope.p_username;
		targetuser.password = $scope.p_pwd;
		targetuser.firstname  = $scope.p_firstname;
		targetuser.lastname = $scope.p_lastname;
		targetuser.email = $scope.p_email;
		targetuser.phone = $scope.p_phone;
		targetuser.location = $scope.p_location;
		list[index] = targetuser;
		var currentUser = {
			"username":$scope.p_username,
			"password":$scope.p_pwd,
		}
		list[index] = targetuser;
		localStorage.setItem('currentUser',JSON.stringify(currentUser));
		localStorage.setItem('userlist',JSON.stringify(list));
	}
}

app.service('messageservice',function(){
	this.getmessagepool = function(){
		var list = JSON.parse(localStorage.getItem('messages'));
		return list;
	}
	this.getallrecipients = function(){
		var list = JSON.parse(localStorage.getItem('userlist'));
		var allrecipients = [];
		for(var i =0;i<list.length;i++){
			allrecipients.push(list[i].username);
		}
		return allrecipients;
	}


});

app.controller('messageCtrl',messageCtrl);
messageCtrl.$inject = ['$scope','$rootScope','messageservice','$location'];
function messageCtrl($scope,$rootScope,messageservice,$location){
	$rootScope.isMessage = true;
	$rootScope.isProfile = false;
	$rootScope.isRegister = false;
	$rootScope.islogin = true;
	$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;

	$rootScope.messagepool = [];
	$rootScope.messagepool = messageservice.getmessagepool();
	$rootScope.currentMessage = {};

	$scope.myfilter = $rootScope.currentUser;

	$scope.showmessagedetail = function(message){
		$rootScope.currentMessage = message;
		$location.path('/messagedetail');

	}

	$scope.newmessage = function(){
		$location.path('/newmessage');
	}


}

app.controller('messagedetailCtrl',messagedetailCtrl);
messagedetailCtrl.$inject = ['$scope','$rootScope','$location','messageservice'];
function messagedetailCtrl($scope,$rootScope,$location,messageservice){
	$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
	$scope.sender = $rootScope.currentMessage.sender;
	$scope.recipient = $rootScope.currentMessage.recipient;
	$scope.title = $rootScope.currentMessage.title;
	$scope.description = $rootScope.currentMessage.description;
	$scope.created_at = $rootScope.currentMessage.created_at;
	
	$scope.isimportant = function(){
		if($rootScope.currentMessage.important ==1){
			return true;
		}else{
			return false;
		}
	}

	$scope.return = function(){
		$rootScope.currentMessage = {};
		$location.path('/message');
	}

	$scope.delete = function(){
		for(var i = 0;i<$rootScope.messagepool.length;i++){
			if($rootScope.messagepool[i] == $rootScope.currentMessage){
				$rootScope.messagepool.splice(i,1);
				localStorage.setItem('messages',JSON.stringify($rootScope.messagepool));
				console.log("Message deleted!");
				$location.path('/message');
			}
		}
	}

	$scope.mark = function(){
		for(var i =0;i<$rootScope.messagepool.length;i++){
			if($rootScope.messagepool[i] == $rootScope.currentMessage){
				if($rootScope.currentMessage.important ==0 ){
					$rootScope.currentMessage.important = '1';
					$rootScope.messagepool[i].important = '1';
				}else{
					$rootScope.currentMessage.important = '0';
					$rootScope.messagepool[i].important = '0';
				}
				localStorage.setItem('messages',JSON.stringify($rootScope.messagepool));
			}
		}
	}

	$scope.reply = function(sender){
		$rootScope.replyrecipient = sender;
		$location.path('/replymessage');
	}
}

app.controller('newmessageCtrl', newmessageCtrl);
newmessageCtrl.$inject = ['$scope','$rootScope','$location','messageservice','$filter'];
function newmessageCtrl($scope,$rootScope,$location,messageservice,$filter){
	$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
	$scope.sender = $rootScope.currentUser;
	$scope.allrecipients = messageservice.getallrecipients();

	$scope.return = function(){
		$rootScope.currentMessage = {};
		$location.path('/message');
	}

	$scope.send = function(){
		var amessage = {
			'recipient':$scope.recipientselected,
			"recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":$scope.sender,
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":$scope.title,
            "description":$scope.description,
            "created_at":$filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            "important":"0"
		}
		$rootScope.messagepool.push(amessage);
		localStorage.setItem('messages',JSON.stringify($rootScope.messagepool));
		$location.path('/message');
	}
}

app.controller('replymessageCtrl',replymessageCtrl);
replymessageCtrl.$inject = ['$scope','$rootScope','$filter','$location'];
function replymessageCtrl($scope,$rootScope,$filter,$location){
	$rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
	$scope.sender = $rootScope.currentUser;
	$scope.recipient = $rootScope.replyrecipient;

	$scope.return = function(){
		$rootScope.currentMessage = {};
		$location.path('/message');
	}

	$scope.send = function(){
		var amessage = {
			'recipient':$scope.recipient,
			"recipient_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "sender":$scope.sender,
            "sender_img":"http://simpleicon.com/wp-content/uploads/user1.png",
            "title":$scope.title,
            "description":$scope.description,
            "created_at":$filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            "important":"0"
		}
		$rootScope.messagepool.push(amessage);
		localStorage.setItem('messages',JSON.stringify($rootScope.messagepool));
		$location.path('/message');
	}
}

