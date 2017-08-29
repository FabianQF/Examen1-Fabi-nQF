(function(){
  angular
  .module('testApp')
  .service('playersService', playersService);

  // Inicio de función playersService
  function playersService($http){
    var players = [];
    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      updatePlayers : _updatePlayers
    }; // Cierre del publicAPI
    return publicAPI;

    // Inicio de la funcion setPlayers
    function _setPlayers(pPlayer){
      return $http.post('http://localhost:3000/api/save_player',pPlayer)
    } // Cierre de la función setPlayers


    // Inicio de la función getPlayers, que se encarga de obtener los datos más actualizados
    function _getPlayers(){
      return $http.get('http://localhost:3000/api/get_all_player');
    } // Cierre de la funcíon getPlayers


    // Inicio de la función updatePlayers, que se encarga de permitir la edición de datos
    function _updatePlayers(pobjPlayer){
      console.log(pobjPlayer);
      return $http.put('http://localhost:3000/api/update_player',pobjPlayer);
    } // Fin de la función updatePlayers

  } // Fin de función playersService
})();
