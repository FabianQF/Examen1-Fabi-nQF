(function(){
  angular
  .module('testApp')
  .controller('proprietaryController',proprietaryController);

  proprietaryController.$inject = ['proprietaryService','ImageService','Upload','$scope'];

  function proprietaryController(proprietaryService,ImageService,Upload,$scope){

    var vm = this;
    vm.proprietary = "";
    loadProprietary();

    function loadProprietary(){

      proprietaryService.getProprietary().then(function (response) {
        vm.proprietary = response.data;
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
    }// Cierre de la encargada de mostrar la información al usuario


    // Inicio de la función presave
    vm.presave= function(newProprietary){
      vm.cloudObj.data.file = document.getElementById("photo").files[0];
      Upload.upload(vm.cloudObj)
      .success(function(data){
        newProprietary.photo = data.url;
        vm.save(newProprietary);
      }); // Cierre de la función success
    } // Cierre de la función presave


    // Inicio de la función save, que se encarga de obtener los datos y enviarlos para ser guardados
    vm.save= function(){
      var newProprietary = {
        identi: vm.identi,
        name: vm.name,
        posistion: vm.posistion,
        price: vm.price,
        group: vm.group,
        ownedby: vm.ownedby,
        photo: vm.photo,
        averageProbability: vm.averageProbability
      } // Cierre de newProprietary


      // intento de restringir los usuarios que se registran
      if(vm.proprietary.length === 0){
        proprietaryService.setProprietary(newProprietary);
        clean();
        loadProprietary();
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
        return;
      } else{
        proprietaryService.setProprietary(newProprietary).then(function (response) {
          vm.identi = null;
          vm.name = null;
          vm.posistion = null;
          vm.price = null;
          vm.group = null;
          vm.ownedby = null;
          vm.photo = null;
          vm.averageProbability = null;
          loadProprietary();
        });
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
        return;
      }
    } // Cierre de la función save


    // Inicio: de la función getInfo, que se encarga de obtener los datos
    vm.getInfo = function(pProprietary){
      vm.id = pProprietary._id;
      vm.identi = pProprietary.identi;
      vm.name = pProprietary.name;
      vm.posistion = pProprietary.posistion;
      vm.price = pProprietary.price;
      vm.group = pProprietary.group;
      vm.ownedby = pProprietary.ownedby;
      vm.photo = pProprietary.photo;
      vm.averageProbability = pProprietary.averageProbability;
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
      var proprietaryEdit = {
        _id : vm.id,
        identi: vm.identi,
        name: vm.name,
        posistion: vm.posistion,
        price: vm.price,
        group: vm.group,
        ownedby: vm.ownedby,
        photo: vm.photo,
        averageProbability: vm.averageProbability
      } // Cierre de proprietaryEdit
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
      proprietaryService.updateProprietary(proprietaryEdit).then(function(response){
        proprietaryService.getProprietary()
        .then(function(response){
          vm.proprietary = response.data;
        })
        .catch(function(err){
          console.log(err);
        })
      });
      loadProprietary();
      clean();
    } // Cierre de la función update


    // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
    function clean(){
      vm.identi = '';
      vm.name = '';
      vm.posistion = '';
      vm.price = '';
      vm.group = '';
      vm.ownedby = '';
      vm.averageProbability = '';
    } // Cierre de la función clean

  }// Cierre de la función proprietaryController
})();
