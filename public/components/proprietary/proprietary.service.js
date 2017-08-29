(function(){
  angular
  .module('testApp')
  .service('proprietaryService', proprietaryService);

  proprietaryService.$inject = ['$http'];

  // Inicio de función proprietaryService
  function proprietaryService($http){
    var  proprietary = [];

    var publicAPI = {
      setProprietary : _setProprietary,
      getProprietary : _getProprietary,
      updateProprietary : _updateProprietary

    }; // Cierre del publicAPI
    return publicAPI;
    
    // Inicio de la funcion setProprietary
    function _setProprietary(pProprietary){
      return $http.post('http://localhost:3000/api/save_proprietary',pProprietary)
    } // Cierre de la función setProprietary

    // Inicio de la función getProprietary, que se encarga de obtener los datos más actualizados
    function _getProprietary(){
      return $http.get('http://localhost:3000/api/get_all_proprietary');
    } // Cierre de la funcíon getProprietary

    // Inicio de la función updateProprietary, que se encarga de permitir la edición de datos
    function _updateProprietary(pobjProprietary){
      console.log(pobjProprietary);
      return $http.put('http://localhost:3000/api/update_proprietary',pobjProprietary);
    }// Fin de la función updateProprietary

  }// Fin de función proprietaryService
})();
