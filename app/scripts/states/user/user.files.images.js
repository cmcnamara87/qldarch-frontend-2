'use strict';

angular.module('qldarchApp').config(function($stateProvider) {
  $stateProvider.state('user.files.images', {
    url : '/images',
    resolve : {
      mediaimages : [ 'mediaowned', '$filter', function(mediaowned, $filter) {
        return $filter('filter')(mediaowned, function(med) {
          return med.type === ('Photograph' || 'Portrait' || 'Image' || 'LineDrawing');
        });
      } ]
    },
    controller : 'UserFilesCtrl',
    templateUrl : 'views/user.files.images.html'
  });
});