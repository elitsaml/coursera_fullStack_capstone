(function(){

    'use strict';

    angular.module('communityGardenApp').controller('MessageController', MessageController);

    MessageController.$inject = ['MessageService', 'AuthService', 'messages', 'toaster'];
    function MessageController(MessageService, AuthService, messages, toaster) {

      var vm = this;
      vm.messages = messages;
      vm.delete = deleteMessage;
      vm.newMessage = newMessage;

      console.log("DBG: MessageController");

      //////// ------------------- implementation -------------- ///////////
      // ----------- all scope functions
      function deleteMessage( msg) {
        MessageService.delete({
                id: msg.id
            },
            /* on success */
            function () {
                toaster.pop('success', "", "Message is deleted.");
                delete vm.messages[ msg.id];
                MessageService.query().$promise.then(function (messages) {
                        vm.messages = messages; // _.indexBy(plots, '_id');
                    });

            },
            /* on error */
            function (err) {
                toaster.pop('success', "", "Failed deleting the plot.");
            }
        );
      };

      function newMessage() {
          var newMsg = new MessageService();
          newMsg.content = vm.newMsgContent;
          newMsg.from = AuthService.getUsername();
          newMsg.$save({},
              // on success
              function (savedData) {
                  console.log("Trying to save the content for a message from: " + newMsg.from);
                   // refresch the messages
                   MessageService.query().$promise.then(function (messages) {
                           vm.messages = messages; // _.indexBy(plots, '_id');
                       });
                  vm.newMsgContent = '';
              },
              // on error
              function (err) {
                  toaster.pop('error', "", 'Failed saving the plot.');
                  console.dir(err);
              }
          );
      }
    }//MessageController
})();
