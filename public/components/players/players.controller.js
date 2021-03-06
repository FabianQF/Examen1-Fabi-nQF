(function(){
  angular
  .module('testApp')
  .controller('playersController',playersController);

  playersController.$inject = ['playersService','ImageService','Upload','$scope'];

  function playersController(playersService,ImageService,Upload,$scope){

    var vm = this;
    vm.players = "";
    loadPlayers();

    function loadPlayers(){

      playersService.getPlayers().then(function (response) {
        vm.players = response.data;
      });

      vm.cloudObj = ImageService.getConfiguration();
    }

    // Encargada de mostrar la información al usuario
    $scope.page = 1;
    $scope.next = function() {
      $scope.page = 2;
    }
    $scope.back = function() {
      $scope.page = 1;
    }
    $scope.register = function() {
      $scope.page = 1;
    } // Cierre de la encargada de mostrar la información al usuario


    // Inicio de la función presave
    vm.presave= function(newPlayer){
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
      .success(function(data){
        newPlayer.photo = data.url;
        vm.save(newPlayer);
      }); // Cierre de la función success
    } // Cierre de la función presave


    vm.alertRegister = function(){
      swal({
        type: 'success',
        title: '¡Registro completado!',
        timer: 3000,
        showConfirmButton: false
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('Registro exitoso')
          }
        }
      )
    }

    vm.alertValitation = function(){
      swal({
        type: 'error',
        title: '¡El código ya existe!',
        timer: 3000,
        showConfirmButton: false
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('Error, el código ya existe')
          }
        }
      )
    }
    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
    vm.save= function(){
      var newPlayer = {
        code: vm.code,
        name: vm.name,
        firstName: vm.firstName,
        lastName: vm.lastName,
        alias: vm.alias,
        money: 1000,
        photo: vm.photo
      } // Cierre de newPlayer

      // intento de restringir los usuarios que se registran
      if(vm.players.length === 0){
        playersService.setPlayers(newPlayer).then(function (response) {
          vm.code = null;
          vm.name = null;
          vm.firstName = null;
          vm.lastName = null;
          vm.alias = null;
          vm.money = null;
          vm.photo = null;
          loadPlayers();
        });
        clean();
        loadPlayers();
        vm.alertRegister();
        return;

      } else{
        for(var i = 0; i < vm.players.length; i++){
          if(newPlayer.code == vm.players[i].code){
            vm.alertValitation();
            return;
          } else{
            playersService.setPlayers(newPlayer).then(function (response) {
              vm.code = null;
              vm.name = null;
              vm.firstName = null;
              vm.lastName = null;
              vm.alias = null;
              vm.money = null;
              vm.photo = null;
              loadPlayers();
            });
            clean();
            vm.alertRegister();
            return;
          }
        }
      }
    } // Cierre de la función save


    // Inicio: de la función getInfo, que se encarga de obtener los datos
    vm.getInfo = function(pPlayer){
      vm.id = pPlayer._id;
      vm.code = pPlayer.code;
      vm.name = pPlayer.name;
      vm.firstName = pPlayer.firstName;
      vm.lastName = pPlayer.lastName;
      vm.alias = pPlayer.alias;
      vm.photo = pPlayer.photo;
    } // Cierre de la función getInfo


    //función que cambia botones al precionar editar
    vm.hideButton = function(){
      document.querySelector('#actualizar').classList.remove('displayNone');
      document.querySelector('#registrar').classList.add('displayNone');
    } // Cierre de la función que cambia botones al precionar editar


    // Inicio de la función update, que se encarga de devolver los datos para ser editados
    vm.update = function(){
      document.querySelector('#actualizar').classList.add('displayNone');
      document.querySelector('#registrar').classList.remove('displayNone');
      var playersEdit = {
        _id : vm.id,
        code: vm.code,
        name: vm.name,
        firstName: vm.firstName,
        lastName: vm.lastName,
        money: Number(1000),
        alias: vm.alias,
        photo: vm.photo
      } // Cierre de playersEdit
      swal({
        type: 'success',
        title: '¡Información actualizada!',
        timer: 3000,
        showConfirmButton: false
      }).then(
        function () {},
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {
            console.log('Información actualizada')
          }
        }
      )
      playersService.updatePlayers(playersEdit).then(function(response){
        playersService.getPlayers()
        .then(function(response){
          vm.players = response.data;
        })
        .catch(function(err){
          console.log(err);
        })
      });
      loadPlayers();
      clean();
    } // Cierre de la función update


    // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
    function clean(){
      vm.code = '';
      vm.name = '';
      vm.firstName = '';
      vm.lastName = '';
      vm.alias = '';
    } // Cierre de la función clean


  }// Cierre de la función playersController
})();
