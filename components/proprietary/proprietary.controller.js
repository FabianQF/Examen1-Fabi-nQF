(function(){
  angular
    .module('testApp')
    .controller('proprietaryController',proprietaryController);
    function proprietaryController(proprietaryService,ImageService,Upload,$scope){

      var vm = this;
      vm.cloudObj = ImageService.getConfiguration();

      // Inicio de la función init que es la que se inicializa de primiera
      function init(){
        vm.proprietary = proprietaryService.getProprietary();
      }init(); // Cierre de la función init

      // Encargada de mostrar la información al usuario
      $scope.pagina = 1;
      $scope.siguiente = function() {
        $scope.pagina = 2;
      }
      $scope.anterior = function() {
        $scope.pagina = 1;
      }
      $scope.registro1 = function() {
        $scope.pagina = 1;
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
          id: vm.id,
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
         init();
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
               proprietaryService.setProprietary(newProprietary);
               clean();
               init();
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
        vm.id = pProprietary.id;
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
          id: vm.id,
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
        proprietaryService.updateProprietary(proprietaryEdit);
        init();
        clean();
      } // Cierre de la función update

      // Inicio de la función clean, que se encarga de limpiar los datos despúes de un registro
      function clean(){
        vm.id = '';
        vm.name = '';
        vm.posistion = '';
        vm.price = '';
        vm.group = '';
        vm.ownedby = '';
        vm.averageProbability = '';
      } // Cierre de la función clean

    }// Cierre de la función proprietaryController
})();
