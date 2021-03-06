'use strict';

angular.module('qldarchApp').config(function($stateProvider) {
  $stateProvider.state('other.relationships', {
    url : '/relationships',
    templateUrl : 'views/relationships.html',
    resolve : {
      data : [ 'other', function(other) {
        return angular.copy(other);
      } ],
      relationships : [ 'data', function(data) {
        return data.relationships;
      } ],
      subject : [ 'data', '$filter', function(data, $filter) {
        var subj = {
          id : data.id,
          label : data.label,
          practicedinqueensland : data.practicedinqueensland,
          type : data.type,
          architect : data.architect,
          created : data.created
        };
        if (data.media.length > 0) {
          var m = $filter('filter')(data.media, function(media) {
            return media.preferred;
          });
          if (m.length === 0) {
            m = $filter('filter')(data.media, function(media) {
              return (media.type === 'Photograph' || media.type === 'Portrait' || media.type === 'Image');
            });
          }
          if (m.length > 0) {
            subj.media = m[0].id;
            return subj;
          } else {
            return subj;
          }
        } else {
          return subj;
        }
      } ],
      interviews : [ 'Interviews', function(Interviews) {
        return Interviews.getInterviews();
      } ]
    },
    controller : 'RelationshipCtrl'
  });
});