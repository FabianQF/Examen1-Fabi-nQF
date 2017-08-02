(function(){
  angular
  .module('testApp')
  .service('playersService', playersService);

  // Inicio de función playersService
  function playersService(){
    var players = [];
    var publicAPI = {
      setPlayers : _setPlayers,
      getPlayers : _getPlayers,
      updatePlayers : _updatePlayers,
      updateState: _updateState
    }; // Cierre del publicAPI
    return publicAPI;


    // Inicio de la funcion setPlayers, que se encarga de registar los datos en el localStorage
    function _setPlayers(pPlayer){
      var playersList = _getPlayers();

      playersList.push(pPlayer);
      localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
    } // Cierre de la función setPlayers


    // Inicio de la función getPlayers, que se encarga de obtener los datos más actualizados
    function _getPlayers(){
      var playersList = JSON.parse(localStorage.getItem('lsPlayersList'));
      if(playersList == null){
        playersList = players;
      } // Cierre del if
      return playersList;
    } // Cierre de la funcíon getPlayers


    // Inicio de la función updatePlayers, que se encarga de permitir la edición de datos
    function _updatePlayers(pobjPlayer){
      var playersList = _getPlayers();
      for(var i = 0; i < playersList.length; i++){
        if(playersList[i].id == pobjPlayer.id){
          playersList[i] = pobjPlayer;
        } // Cierre del if
      } // Cierre del ciclo
      localStorage.setItem('lsPlayersList', JSON.stringify(playersList));
    }// Fin de la función updatePlayers


    //función que actualiza el estado
      function _updateState(pPlayerList){

        localStorage.setItem('lsPlayersList', JSON.stringify(pPlayerList));
      }//cierre función updateState


  }// Fin de función playersService
})();