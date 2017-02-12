app_module.controller('AppController', ['$rootScope', '$scope', '$state', 'States', 'UserDetailsService', '$window', '$sce', '$http',
    function($rootScope, $scope, $state, States, UserDetailsService, $window, $sce, $http) {
        console.log("app controller");
        var self = this;
        console.log("$state.current.name : " + $state.current.name);
        console.log("States.SLASH.ROOT : " + States.SLASH.ROOT);
        self.isRoot = false;

        self.isLoggedIn = UserDetailsService.isUserLoggedIn();
        console.log($state.current.name);

        self.topTalents = [
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Prakash Vadrevu"
            },
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Kanaiah Kothalikar"
            },
            {
                photoUrl: "resources/dummy/images/puppy.jpg",
                name: "Nagendra Varma"
            }
        ];

        self.posts = [
            {
                "user" : {
                    photoUrl: "resources/dummy/images/puppy.jpg",
                    name: "Prakash Vadrevu"
                },
                uid: "123456",
                type: "IMAGE",
                title: "My puppy",
                desc: "Very nice puppy",
                url : "resources/dummy/images/puppy.jpg",
                tags : ["PUPPY", "PHOTOGRAPHY", "DOG"]
            },
            {
                "user" : {
                    photoUrl: "resources/dummy/images/puppy.jpg",
                    name: "Prakash Vadrevu"
                },
                uid: "123456",
                type: "VIDEO",
                title: "300+",
                desc: "Fantastic batting",
                url : "https://www.youtube.com/embed/5qgcxWLeu_8",
                tags : ["CRICKET"]
            },
            {
                "user" : {
                    photoUrl: "resources/dummy/images/puppy.jpg",
                    name: "Prakash Vadrevu"
                },
                uid: "123456",
                type: "IMAGE",
                title: "My puppy 2",
                desc: "Very nice puppy 2",
                url : "resources/dummy/images/puppy.jpg",
                tags : ["PUPPY", "PHOTOGRAPHY", "DOG"]
            }
        ];

        self.getTrendingPosts = function(){
            self.posts = [];
            $http.get({
                method:'GET',
                url:''
            }, function(response){
                self.posts = response.data;
            }, function(error){
            });
        };

        self.embeddedUrl = function(url) {
            return $sce.trustAsResourceUrl(url);
        };

        // if (UserDetailsService.isUserLoggedIn()) {
        // 	if (UserDetailsService.isRootSuperAdmin())
        // $state.go(States.CLIENT.ROOT);
        // 	else
        // 			$state.go(States.CLIENT.ROOT);
        // 	} else {
        //		$state.go(States.LOGIN);
        // }

        $scope.$on('onUserAuthChanged', function (event, isLoggedIn) {
            console.log("onUserAuthChanged");
            self.isLoggedIn = isLoggedIn;
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            self.updateStatus(toState);

        });

        self.updateStatus = function(state) {
            if ( state.name === States.SLASH.ONBOARDING) {
                self.isRoot = true;
            } else {
                self.isRoot = false;
            }
        };

        self.updateStatus($state.current);
    }
]);
