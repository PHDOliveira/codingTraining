(function (module) {

	'use strict';


	module.service('PageUtils', function () {
		this.moverPagina = function (posicao) {
			setTimeout(function () {
				if (posicao == "top") {
					$('html, body').animate({
						scrollTop: 0
					}, 500);
				} else if (posicao == "bottom") {
					$('html, body').animate({
						scrollTop: $("#rodape").position().top
					}, 500);
				} else if (posicao == "conteudo") {
					$('html, body').animate({
						scrollTop: $("#programa").position().top - 50
					}, 500);
				} else {
					$('html, body').animate({
						scrollTop: posicao
					}, 500);
				}
			}, 100);
			return;
		};

	});
	module.service('Local',['localStorageService',function(localStorageService){
		this.set = function(key, value){
			localStorageService.set(key,value);
		}
		this.get = function(key){
			return localStorageService.get(key);
		}
		this.del = function(key){
			localStorageService.remove(key);
		}
		this.clearAll = function(){
			localStorageService.clearAll();
		}
	}]);



})(angular.module('app.services', []));