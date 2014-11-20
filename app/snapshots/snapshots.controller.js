(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('snapshotsController', Ctrl);

  Ctrl.$inject = ['$scope', 'currentWorkbook','gridFileFormatConverter'];

  /* @ngInject */
  function Ctrl($scope, currentWorkbook,gridFileFormatConverter) {
    /*jshint validthis: true */

    $scope.commits = currentWorkbook.data.gitCommits;

    //Tied with each li item being rendered by the ng-repeat on snapshots.html
    $scope.changeCommit = function(commitIndex){
      currentWorkbook.currentHash = $scope.commits[commitIndex];
      //Does Git Checkout to the current workbook file detaching from the head to the clicked commit
      console.log('a;oweigha;oiwhgr;oiahgrv;oiahbiovaoi;hbv',currentWorkbook.currentHash);
      gridFileFormatConverter.changeToCommit(currentWorkbook.data.tempFolderPath,currentWorkbook.currentHash.id);
    };

    $scope.$watchCollection(function(){
      return currentWorkbook.data;
    }, function(newVal, oldVal, scope){
      if (typeof newVal !== 'undefined'){
        scope.commits = newVal.gitCommits;
      }
    },true);

    // $rootScope.$on('commit',function(data){
    //   console.log('Blah');
    // });

    $scope.$on('git-commits-change', function(){
      console.log('WTF');
      $scope.$digest();
    });

  }
})();