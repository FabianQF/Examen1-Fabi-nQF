(function(){
  angular
  .module('testApp')
  .service('buyService', buyService);

  // Inicio de función buyService
  function buyService(){
    var  buy = [];

    var publicAPI = {
      setBuy : _setBuy,
      getBuy : _getBuy
    }; // Cierre del publicAPI
    return publicAPI;

    // Inicio de la funcion setBuy, que se encarga de registar los datos en el localStorage
    function _setBuy(pBuy){
      var buyList = _getBuy();
      buyList.push(pBuy);
      localStorage.setItem('lsBuyList', JSON.stringify(buyList));
    } // Cierre de la función setBuy

    // Inicio de la función getBuy, que se encarga de obtener los datos más actualizados
    function _getBuy(){
      var buyList = JSON.parse(localStorage.getItem('lsBuyList'));
      if(buyList == null){
        buyList = buy;
      }// Cierre del if

      return buyList;
    } // Cierre de la funcíon getBuy

  }// Fin de función buyService
})();
