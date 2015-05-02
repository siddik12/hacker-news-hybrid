angular.module('starter.services', []) 
/**
 * A simple example service that returns some data.
 */
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || null;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('hackerNewsApi', function($http) {
    var ref = "https://hacker-news.firebaseio.com/v0/"
    var itemPath = 'item/';
    var userPath = 'users/';
    var jsonEnd = '.json';
    var topStoriesPath = 'topstories';
    var newStoriesPath = 'newstories';
    var askStoriesPath = 'askstories';
    var showStoriesPath = 'showstories';
    var jobStoriesPath = 'jobstories';


  return {
    getTopStories: function () {
      return $http.get(ref + topStoriesPath + jsonEnd);
    },
    getNewStories: function () {
      return $http.get(ref + newStoriesPath + jsonEnd);
    },
    getAskStories: function () {
      return $http.get(ref + askStoriesPath + jsonEnd);
    },
    getShowStories: function () {
      return $http.get(ref + showStoriesPath + jsonEnd);
    },
    getJobStories: function () {
      return $http.get(ref + jobStoriesPath + jsonEnd);
    },
    getItem: function(itemID){
      return $http.get(ref + itemPath + itemID + jsonEnd);
    }
  };

})

 .factory('pagination', function($http) {
    var pageSize = 20; // Default value, plan to add to settings for user to modify
    var currentPage = 0;
    var pagePath = "page=";
    var hitsPerPagePath = "hitsPerPage=";
    var concatenate = "&";

    function resetPagination(pageSize){
      pageSize = pageSize;
      currentPage = 0;
    };

    function getPageSize(){
      return currentPage;
    };

    function getCurrentPage(){
      return currentPage;
    };

    function getPageUrl(url, page){
      var finalUrl = url + concatenate + pagePath + page + concatenate + hitsPerPagePath + pageSize;
      currentPage++;
      return finalUrl;
    };

    function getNextPageUrl(url){
      var finalUrl = url + concatenate + pagePath + currentPage + concatenate + hitsPerPagePath + pageSize;
      currentPage++;
      return finalUrl;
    };

    function getPagination(){
      return {
        resetPagination : resetPagination,
        getPageSize : getPageSize,
        getCurrentPage : getCurrentPage,
        getPageUrl : getPageUrl,
        getNextPageUrl : getNextPageUrl
      };
    };

    return {
      getPagination : getPagination
    };


 })


 .factory('searchApi', function($http) {
    var searchRef = "http://hn.algolia.com/api/v1/"
    var itemPath = 'items/';
    var userPath = 'users/';
    var searchPath = 'search?';
    var searchByDatePath = 'search_by_date?';
    var queryPath = 'query=';
    var tagsPath = 'tags=';
    var and = "&";

      function getUrl(path) {
        return searchRef + path;
      };

      function getUrlForId(path, id) {
        return getUrl(path) + id;
      };

      function getUrlForSearch(type, text) {
        return getUrl(searchPath) + type + text;
      };

      function getUrlForSearchByTextAndTag(text, tags) {
        var httpLink = getUrl(searchPath) + queryPath + text + and + tagsPath + tags;
        console.log(httpLink);
        return httpLink;
      };

      function getUrlForSearchByTag(tags) {
        var httpLink =getUrl(searchPath) + tagsPath + tags;
        console.log(httpLink);
        return httpLink;
      };

      function fetchItem(itemId) {
        console.log("Fetch Item");
        var httpLink =  $http.get(getUrlForId(itemPath, itemId));
        console.log(httpLink);
        return httpLink;
      };

      function fetchUser(userId) {
        console.log("Fetch User");
        return $http.get(getUrlForId(userPath, userId));
      };

      function fetchStory(text) {
        console.log("Fetch Story");
        return $http.get(getUrlForSearchByTextAndTag(text, "story"));
      };

      function fetchStoryComments(storyId) {
        console.log("Fetch Story");
        return $http.get(getUrlForSearchByTags("comment,story_"+storyId));
      };

      function fetchFrontPageUrl() {
        console.log("Fetch Front Page");
        return getUrlForSearchByTag("front_page");
      };

      function fetchFrontPage() {
        console.log("Fetch Front Page");
        return $http.get(getUrlForSearchByTag("front_page"));
      };

      function fetchInformation(url) {
        console.log("Fetch Info");
        return $http.get(url);
      };

      return{
            getItem: function(){
              return fetchItem();
            }, 
            getUser:  function(){
              return fetchUser();
            }, 
            getStory: function(){
              return  fetchStory();
            }, 
            getStoryComments:  function(storyId){
              return fetchStoryComments(storyId);
            }, 
            getFrontPage:  function(){
              return fetchFrontPageUrl();
            }, 
            getFrontPageUrl:  function(){
              return fetchFrontPageUrl();
            }, 
            retrieveInfo:  function(url){
              return fetchInformation(url);
            }, 
          };
  });