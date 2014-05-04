'use strict';

angular.module('angularApp')
    .service('Timeline', function Timeline(Uris) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        this.relationshipsToEvents = function (relationships, entity) {
            var dates = [];
            angular.forEach(relationships, function (relationship) {

                var timelineDate = {};
                timelineDate.startDate = relationship[Uris.QA_START_DATE].substring(0, 4);
                if (angular.isDefined(relationship[Uris.QA_END_DATE])) {
                    timelineDate.endDate = relationship[Uris.QA_END_DATE].substring(0, 4);
                }

                // timelineDate.headline = '<a href="#/' + relationship.subject.type + '/' + relationship.subject.encodedUri + '">' + relationship.subject.name + '</a> ' + relationship.predicate[Uris.QA_LABEL].toLowerCase() + ' <a href="#/' + relationship.object.type + '/' + relationship.object.encodedUri + '">' + relationship.object.name + '</a>';
                timelineDate.headline = relationship.subject.name + ' ' + relationship.predicate[Uris.QA_LABEL].toLowerCase() + ' ' + relationship.object.name;
                if (angular.isDefined(relationship[Uris.QA_TEXTUAL_NOTE])) {
                    timelineDate.text = '<p>' + relationship[Uris.QA_TEXTUAL_NOTE] + '</p>';
                } else {
                    timelineDate.text = '<p></p>';
                }
                // Get an image
                var url = '';
                if (entity && relationship.subject.uri === entity.uri) {
                    // Use the object
                    var tempType = relationship.object.type === 'structure' ? 'project' : relationship.object.type;
                    timelineDate.asset = {
                        media: 'images/icon.png',
                        thumbnail: 'images/icon.png',
                        'caption': '<h4 style="text-transform: capitalize"><a href="#/' +
                            tempType + '/summary?' + relationship.object.type + 'Id=' + relationship.object.encodedUri + '">' + relationship.object.name + '</a></h4>'
                    };
                    if (angular.isDefined(relationship.object.picture)) {
                        url = relationship.object.picture.thumb;
                        timelineDate.asset.thumbnail = url;
                        timelineDate.asset.media = url;
                    }
                } else {
                    // Use the subject
                    var tempType = relationship.subject.type === 'structure' ? 'project' : relationship.subject.type;
                    timelineDate.asset = {
                        media: 'images/icon.png',
                        thumbnail: 'images/icon.png',
                        'caption': '<h4 style="text-transform: capitalize"><a href="#/' +
                            tempType + '/summary?' + relationship.subject.type + 'Id=' + relationship.subject.encodedUri + '">' + relationship.subject.name + '</a></h4>'
                    };
                    if (angular.isDefined(relationship.subject.picture)) {
                        url = relationship.subject.picture.thumb;
                        timelineDate.asset.thumbnail = url;
                        timelineDate.asset.media = url;
                    }
                }
                dates.push(timelineDate);
            });
            return dates;
        };
    });