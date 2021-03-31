window.indexedDB=window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


    var db;
    function openDB(){
        let request=window.indexedDB.open("facturacion", 1);
        request.onsuccess=function(e){
        db=request.result;
        }

    }
    
