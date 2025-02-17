import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose} from 'redux';
import App from './routes/App';
import reducer from './reducers';

import reduxThunk from 'redux-thunk';

const initialState = {
  cart: [],
  payment:[],
  total:[],
  productos_init:[],
  products: [
    {
      "id": 1,
      "category": "ACCESORIOS",
      "image": "",
      "title": "SIFON ELECTRICO",
      "price": 378000,
      "description": "Antiguo método creado en 1830, su funcionamiento es por vacío haciendo una extracción balanceada y un ritual durante su preparación."
    },
    {
      "id": 2,
      "category": "ACCESORIOS",
      "image": "",
      "title": "SIFON HARIO 5 TAZAS",
      "price": 360000,
      "description": "Antiguo método creado en 1830, su funcionamiento es por vacío haciendo una extracción balanceada y un ritual durante su preparación."
    },
    {
      "id": 3,
      "category": "ACCESORIOS",
      "image": "",
      "title": "DRIPPER HARIO V60  2  (PLASTICO)",
      "price": 47000,
      "description": "Método de extracción en plástico, con estrías a un ángulo de 60 grados para desarrollar una extracción balanceada."
    },
    {
      "id": 4,
      "category": "ACCESORIOS",
      "image": "",
      "title": "DRIPPER BANEXPORT (CERAMICA) COLORES",
      "price": 55000,
      "description": ""
    },
    {
      "id": 5,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA HARIO CHEMEX X 3 TZ",
      "price": 210000,
      "description": "Cafetera de filtro Chemex. Capacidad 1-3 tazas, hasta 440 ml. Este método de preparación es favorito entre baristas y aficionados. Gracias a su diseño alemán en forma de reloj de arena y a sus filtros exlusivos, se logra obtener una taza limpia y brillante con textura sedosa."
    },
    {
      "id": 6,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA HARIO CHEMEX X 6 TZ",
      "price": 231000,
      "description": "Cafetera de filtro Chemex. Capacidad 1-6 tazas, hasta 880 ml. Gracias a su diseño alemán en forma de reloj de arena y a sus filtros exlusivos, se logra obtener una taza limpia y brillante con textura sedosa."
    },
    {
      "id": 7,
      "category": "ACCESORIOS",
      "image": "",
      "title": "FILTRO  PAPEL DRIPPER V60  1",
      "price": 36750,
      "description": "100 filtros de papel para dripper V60 No. 1. Capacidad de 1 a 2 tazas."
    },
    {
      "id": 8,
      "category": "ACCESORIOS",
      "image": "",
      "title": "FILTRO  PAPEL DRIPPER V60  2",
      "price": 39900,
      "description": "100 filtros de papel para dripper V60 No. 2. Capacidad de 1 a 3 tazas."
    },
    {
      "id": 9,
      "category": "ACCESORIOS",
      "image": "",
      "title": "FILTROS CHEMEX 3 TZ",
      "price": 52500,
      "description": "100 filtros de papel para cafetera Chemex 3 tazas."
    },
    {
      "id": 10,
      "category": "ACCESORIOS",
      "image": "",
      "title": "FILTRO CHEMEX 6TZ",
      "price": 63000,
      "description": "100 filtros de papel para cafetera Chemex 6 tazas."
    },
    {
      "id": 11,
      "category": "ACCESORIOS",
      "image": "11_SABORIZANTES",
      "title": "SABORIZANTES MACADAMIA",
      "price": 37000,
      "description": ""
    },
    {
      "id": 12,
      "category": "ACCESORIOS",
      "image": "11_SABORIZANTES",
      "title": "SABORIZANTES VAINILLA",
      "price": 37000,
      "description": ""
    },
    {
      "id": 13,
      "category": "ACCESORIOS",
      "image": "11_SABORIZANTES",
      "title": "SABORIZANTES AMARETO",
      "price": 37000,
      "description": ""
    },
    {
      "id": 14,
      "category": "ACCESORIOS",
      "image": "11_SABORIZANTES",
      "title": "SABORIZANTES CARAMELO",
      "price": 37000,
      "description": ""
    },
    {
      "id": 15,
      "category": "ACCESORIOS",
      "image": "",
      "title": "CEPILLO PARA LIMPIAR GRUPO",
      "price": 19900,
      "description": ""
    },
    {
      "id": 16,
      "category": "ACCESORIOS",
      "image": "16_CAFIZA",
      "title": "CAFIZA",
      "price": 84000,
      "description": ""
    },
    {
      "id": 17,
      "category": "ACCESORIOS",
      "image": "",
      "title": "CAFETERA  PRENSA FRANCESA",
      "price": 54000,
      "description": ""
    },
    {
      "id": 18,
      "category": "ACCESORIOS",
      "image": "",
      "title": "AEROPRESS",
      "price": 160000,
      "description": ""
    },
    {
      "id": 19,
      "category": "ACCESORIOS",
      "image": "",
      "title": "BOLL PRESS",
      "price": 405000,
      "description": ""
    },
    {
      "id": 20,
      "category": "ACCESORIOS",
      "image": "",
      "title": "PUNZONES",
      "price": 16000,
      "description": ""
    },
    {
      "id": 21,
      "category": "ACCESORIOS",
      "image": "",
      "title": "AZAFATE ",
      "price": 130000,
      "description": ""
    },
    {
      "id": 22,
      "category": "ACCESORIOS",
      "image": "",
      "title": "MAT PARA TAMPER",
      "price": 35000,
      "description": ""
    },
    {
      "id": 23,
      "category": "ACCESORIOS",
      "image": "",
      "title": "TAMPER OCD",
      "price": 510000,
      "description": ""
    },
    {
      "id": 24,
      "category": "ACCESORIOS",
      "image": "",
      "title": "TAMPER RB",
      "price": 280000,
      "description": "El primer tamper hecho por Reg Barber fue en maple. Este tamper es hecho de madera de la región Noreste de América y Canadá."
    },
    {
      "id": 25,
      "category": "ACCESORIOS",
      "image": "",
      "title": "TAMPER RB COBRE",
      "price": 300000,
      "description": "Estos tampers están hechos mediante el proceso de anodizado, el cual consiste en un proceso electroquímico que crea una capa más gruesa de óxido sobre el metal"
    },
    {
      "id": 26,
      "category": "ACCESORIOS",
      "image": "",
      "title": "SISTEMA DE FILTRACION DE AGUA",
      "price": 294000,
      "description": "Sistema de filtración con carcasas transparentes que permiten ver el estado de los cartuchos. Incluye filtro de sedimento y filtro de carbón activo."
    },
    {
      "id": 27,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA CON FILTRO METALICO 200ML DG2118",
      "price": 90000,
      "description": ""
    },
    {
      "id": 28,
      "category": "ACCESORIOS",
      "image": "30_JARRA\nFILTRO METALICO",
      "title": "JARRA CON FILTRO METALICO 400ML DG-2118A",
      "price": 100000,
      "description": ""
    },
    {
      "id": 29,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA DE VIDRIO TIPO CHEMEX 700ML SIN MANGOGB-2015A",
      "price": 189000,
      "description": ""
    },
    {
      "id": 30,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA DE VIDRIO TIPO CHEMEX 400ML CON ACCESORIO TIPO MADERA  DC-2012",
      "price": 157500,
      "description": ""
    },
    {
      "id": 31,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA DE VIDRIO TIPO CHEMEX 600ML SIN MANGO DG-2014A",
      "price": 189000,
      "description": ""
    },
    {
      "id": 32,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA DE VIDRIO TIPO CHEMEX 800ML SIN MANGO DG-2016A",
      "price": 210000,
      "description": ""
    },
    {
      "id": 33,
      "category": "ACCESORIOS",
      "image": "",
      "title": "METODO DE PREPARACION DE VIDRIO CON EMBUDO ESTRIADO BICKER DG-2115A",
      "price": 357000,
      "description": ""
    },
    {
      "id": 34,
      "category": "ACCESORIOS",
      "image": "FALTA IMAGEN",
      "title": "DRIPPER METALICO COBRIZADO CAPACIDAD 2-4 TAZAS DG-189",
      "price": 78500,
      "description": ""
    },
    {
      "id": 35,
      "category": "ACCESORIOS",
      "image": "FALTA IMAGEN",
      "title": "DRIPPER METALICO CAPACIDAD 1-2 TAZAS DG-190",
      "price": 69000,
      "description": ""
    },
    {
      "id": 36,
      "category": "ACCESORIOS",
      "image": "",
      "title": "DRIPPER PLASTICO CAPACIDAD 1-2 TAZAS  DG-152",
      "price": 37000,
      "description": ""
    },
    {
      "id": 37,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA SERVER DE VIDRIO CON TAPA  HERMETICA 500ML DG-2119",
      "price": 75000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 38,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA COLOR PLATA DE 350ML MILK JUG SILVER",
      "price": 70000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 39,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA COLOR PLATA DE 500ML MILK JUG SILVER",
      "price": 84000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 40,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA COLOR NEGRA DE 350ML DIGUO MILK JUG SILVER",
      "price": 70000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 41,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA COLOR NEGRA DE 500ML DIGUO MILK JUG SILVER",
      "price": 84000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 42,
      "category": "ACCESORIOS",
      "image": "",
      "title": "MOLINO MANUAL PEQUEÑO",
      "price": 116000,
      "description": ""
    },
    {
      "id": 43,
      "category": "ACCESORIOS",
      "image": " ",
      "title": "MOLINO MANUAL GRANDE",
      "price": 126000,
      "description": ""
    },
    {
      "id": 44,
      "category": "MERCHANDISING",
      "image": "",
      "title": "BOLSAS DE FIQUE-BOLSAS DE YUTE",
      "price": 15000,
      "description": ""
    },
    {
      "id": 45,
      "category": "MERCHANDISING",
      "image": "",
      "title": "PAÑOLETAS ",
      "price": 40000,
      "description": ""
    },
    {
      "id": 46,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CUCHARAS AZULES+BOLSA",
      "price": 58000,
      "description": ""
    },
    {
      "id": 47,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CUCHARAS DE COBRE+BOLSA",
      "price": 58000,
      "description": ""
    },
    {
      "id": 48,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CUCHARAS PLATEADAS+BOLSA",
      "price": 50000,
      "description": ""
    },
    {
      "id": 49,
      "category": "MERCHANDISING",
      "image": "",
      "title": "PINES ",
      "price": 25000,
      "description": ""
    },
    {
      "id": 50,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CAMISETA CON BOLSILLO+CAJA",
      "price": 53000,
      "description": ""
    },
    {
      "id": 51,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CAMISETA FULL MATAS+CAJA",
      "price": 58000,
      "description": ""
    },
    {
      "id": 52,
      "category": "CAFE",
      "image": "",
      "title": "ORIGEN HUILA LB",
      "price": 30500,
      "description": ""
    },
    {
      "id": 53,
      "category": "CAFE",
      "image": "",
      "title": "ORIGEN CAUCA LB",
      "price": 30500,
      "description": ""
    },
    {
      "id": 54,
      "category": "CAFE",
      "image": "",
      "title": "ORIGEN NARIÑO LB",
      "price": 30500,
      "description": ""
    },
    {
      "id": 55,
      "category": "CAFE",
      "image": "",
      "title": "ORIGEN SIERRA NEVADA ORGANICO LB",
      "price": 30500,
      "description": ""
    },
    {
      "id": 56,
      "category": "CAFE",
      "image": "",
      "title": "BLEND EXPRESSO LB",
      "price": 26500,
      "description": ""
    },
    {
      "id": 57,
      "category": "CAFE",
      "image": "",
      "title": "BOURBON ROSADO MEDIA LB",
      "price": 33500,
      "description": ""
    },
    {
      "id": 58,
      "category": "CAFE",
      "image": "",
      "title": "GEISHA MEDIA LB",
      "price": 33500,
      "description": ""
    },
    {
      "id": 59,
      "category": "CAFE",
      "image": "",
      "title": "TYPICA MEDIA LB",
      "price": 33500,
      "description": ""
    },
    {
      "id": 60,
      "category": "CAFE",
      "image": "",
      "title": "ANAEROBICO MEDIA LB",
      "price": 30000,
      "description": ""
    },
    {
      "id": 61,
      "category": "CAFE",
      "image": "",
      "title": "NATURAL MEDIA LB",
      "price": 29000,
      "description": ""
    },
    {
      "id": 62,
      "category": "CAFE",
      "image": "",
      "title": "MASTER BLEND MEDIA LB",
      "price": 35000,
      "description": ""
    },
    {
      "id": 63,
      "category": "CAFE",
      "image": "",
      "title": "DIVERSO MEDIA LB",
      "price": 33500,
      "description": ""
    },
    {
      "id": 64,
      "category": "MENU",
      "image": "",
      "title": "DRIPPER V60 X 1 TAZA",
      "price": 5600,
      "description": "DRIPPER V60"
    },
    {
      "id": 65,
      "category": "MENU",
      "image": "",
      "title": "DRIPPER V60 X 2 TAZAS",
      "price": 10000,
      "description": "DRIPPER V60"
    },
    {
      "id": 66,
      "category": "MENU",
      "image": "",
      "title": "ESPRESSO DOBLE",
      "price": 4200,
      "description": ""
    },
    {
      "id": 67,
      "category": "MENU",
      "image": "",
      "title": "FLAT WHITE ",
      "price": 6500,
      "description": ""
    },
    {
      "id": 68,
      "category": "MENU",
      "image": "",
      "title": "MACHIATTO",
      "price": 6000,
      "description": ""
    },
    {
      "id": 69,
      "category": "MENU",
      "image": "",
      "title": "LATTE",
      "price": 6500,
      "description": ""
    },
    {
      "id": 70,
      "category": "MENU",
      "image": "",
      "title": "CAPUCCINO",
      "price": 6500,
      "description": ""
    },
    {
      "id": 71,
      "category": "MENU",
      "image": "",
      "title": "MOKACCINO",
      "price": 7500,
      "description": ""
    },
    {
      "id": 72,
      "category": "MENU",
      "image": "",
      "title": "CHEMEX X 1 TAZA",
      "price": 6500,
      "description": ""
    },
    {
      "id": 73,
      "category": "MENU",
      "image": "",
      "title": "CHEMEX X 2 TAZA",
      "price": 10000,
      "description": ""
    },
    {
      "id": 74,
      "category": "MENU",
      "image": "",
      "title": "CHEMEX X 3 TAZA",
      "price": 14000,
      "description": ""
    },
    {
      "id": 75,
      "category": "MENU",
      "image": "",
      "title": "CAPUCHINO ALMENDRAS",
      "price": 7500,
      "description": ""
    },
    {
      "id": 76,
      "category": "MENU",
      "image": "",
      "title": "LATTE ALMENDRAS ",
      "price": 7500,
      "description": ""
    },
    {
      "id": 77,
      "category": "MENU",
      "image": "",
      "title": "MACHIATTO LECHE ALMENDRAS",
      "price": 7000,
      "description": ""
    },
    {
      "id": 78,
      "category": "MENU",
      "image": "",
      "title": "AGUA ",
      "price": 4500,
      "description": ""
    },
    {
      "id": 79,
      "category": "MENU",
      "image": "",
      "title": "COCACOLA",
      "price": 4000,
      "description": ""
    },
    {
      "id": 80,
      "category": "MENU",
      "image": "",
      "title": "TE HATSU",
      "price": 6500,
      "description": ""
    },
    {
      "id": 81,
      "category": "MENU",
      "image": "",
      "title": "CACAO CALIENTE ",
      "price": 7000,
      "description": ""
    },
    {
      "id": 82,
      "category": "MENU",
      "image": "",
      "title": "TE CHAI PRIMA",
      "price": 7000,
      "description": ""
    },
    {
      "id": 83,
      "category": "MENU",
      "image": "",
      "title": "TE CHAI ALMENDRAS ",
      "price": 9800,
      "description": ""
    },
    {
      "id": 84,
      "category": "MENU",
      "image": "",
      "title": "INFUSIÓN SELVÁTICA CONSUMO",
      "price": 8000,
      "description": ""
    },
    {
      "id": 86,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE ZANAHORIA",
      "price": 8500,
      "description": ""
    },
    {
      "id": 87,
      "category": "MENU",
      "image": "",
      "title": "TORTA FRUTOS ROJOS",
      "price": 8500,
      "description": ""
    },
    {
      "id": 88,
      "category": "MENU",
      "image": "",
      "title": "HOLANDINA X UNIDAD ",
      "price": 3500,
      "description": ""
    },
    {
      "id": 89,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE BANANO",
      "price": 8500,
      "description": ""
    },
    {
      "id": 90,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE MANZANA",
      "price": 8500,
      "description": ""
    },
    {
      "id": 91,
      "category": "MENU",
      "image": "",
      "title": "EMPANADA DE POLLO",
      "price": 5500,
      "description": ""
    },
    {
      "id": 92,
      "category": "MENU",
      "image": "",
      "title": "EMPANADA DE CARNE",
      "price": 5500,
      "description": ""
    },
    {
      "id": 93,
      "category": "MENU",
      "image": "",
      "title": "CACAO HUNTERS DIPTICO",
      "price": 11500,
      "description": "CACAO HUNTERS DIPTICO"
    },
    {
      "id": 94,
      "category": "MENU",
      "image": "",
      "title": "UCHUVAS HUNTERS GRAGEAS DE CAFÉ 60 GRAMOS",
      "price": 8900,
      "description": ""
    },
    {
      "id": 95,
      "category": "MENU",
      "image": "",
      "title": "CARLOTA GRAGEAS DE UCHUVA 60 GRAMOS",
      "price": 12000,
      "description": "CARLOTA"
    },
    {
      "id": 96,
      "category": "MENU",
      "image": "",
      "title": "BARRA DE CACAO CARLOTA",
      "price": 10000,
      "description": ""
    },
    {
      "id": 97,
      "category": "MENU",
      "image": "",
      "title": "MINI HUNTERS ARHUACOS",
      "price": 26000,
      "description": ""
    },
    {
      "id": 98,
      "category": "MENU",
      "image": "",
      "title": "MINI HUNTERS",
      "price": 24900,
      "description": ""
    },
    {
      "id": 99,
      "category": "MENU",
      "image": "",
      "title": "AMERICANO",
      "price": 4500,
      "description": ""
    },
    {
      "id": 100,
      "category": "MERCHANDISING",
      "image": "",
      "title": "JABON DE CAFE",
      "price": 16000,
      "description": ""
    },
    {
      "id": 101,
      "category": "MENU",
      "image": "",
      "title": "CHEESCAKE DE OREO",
      "price": 8500,
      "description": ""
    },
    {
      "id": 102,
      "category": "MERCHANDISING",
      "image": "",
      "title": "CAJA SELVATICA",
      "price": 22000,
      "description": ""
    },
    {
      "id": 103,
      "category": "MERCHANDISING",
      "image": "",
      "title": "PAQUETE HOLANDINAS",
      "price": 23000,
      "description": ""
    },
    {
      "id": 104,
      "category": "MERCHANDISING",
      "image": "",
      "title": "SACHET HUNTERS",
      "price": 7500,
      "description": ""
    },
    {
      "id": 105,
      "category": "MERCHANDISING",
      "image": "",
      "title": "LIBRO HEIRLOOM CACAO",
      "price": 52000,
      "description": "CACAO HUNTERS"
    },
    {
      "id": 106,
      "category": "MERCHANDISING",
      "image": "",
      "title": "LIBRO ORIGEN",
      "price": 42500,
      "description": "CACAO HUNTERS"
    },
    {
      "id": 107,
      "category": "MENU",
      "image": "",
      "title": "BROWNIES",
      "price": 5000,
      "description": ""
    },
    {
      "id": 108,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP POLIPROPILENO 8 ONZ",
      "price": 35000,
      "description": ""
    },
    {
      "id": 109,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP POLIPROPILENO 12 ONZ",
      "price": 42000,
      "description": ""
    },
    {
      "id": 110,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP CRISTAL 8 ONZ",
      "price": 52000,
      "description": ""
    },
    {
      "id": 111,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP CRISTAL 12 ONZ",
      "price": 60000,
      "description": ""
    },
    {
      "id": 112,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP STARWARS 12 ONZ",
      "price": 70000,
      "description": ""
    },
    {
      "id": 113,
      "category": "MERCHANDISING",
      "image": "",
      "title": "KEEPCUP CAFE 18 12 ONZ",
      "price": 22000,
      "description": ""
    },
    {
      "id": 114,
      "category": "CAFE",
      "image": "",
      "title": "AMOR Y AMISTAD 250 GMS",
      "price": 15000,
      "description": ""
    },
    {
      "id": 115,
      "category": "CAFE",
      "image": "",
      "title": "SAN CAFE - ANAEROBICO 250 GMS",
      "price": 29000,
      "description": ""
    },
    {
      "id": 116,
      "category": "MERCHANDISING",
      "image": "",
      "title": "JARRA BONAVITA",
      "price": 320000,
      "description": ""
    },
    {
      "id": 117,
      "category": "ACCESORIOS",
      "image": "",
      "title": "JARRA SERVER DE VIDRIO CON TAPA  HERMETICA 360ML DG-2119",
      "price": 66000,
      "description": "Jarra profesional en acero\ninoxidable para cremar\nleche."
    },
    {
      "id": 118,
      "category": "MENU",
      "image": "",
      "title": "MOCCA",
      "price": 7500,
      "description": "MOCCA"
    },
    {
      "id": 119,
      "category": "MENU",
      "image": "",
      "title": "CLUB COLOMBIA",
      "price": 6500,
      "description": "CERVEZA"
    },
    {
      "id": 120,
      "category": "MENU",
      "image": "",
      "title": "ADICION DE LIMON",
      "price": 600,
      "description": "ADICION"
    },
    {
      "id": 121,
      "category": "MENU",
      "image": "",
      "title": "JUGOS MANBE ALBA Y VELA X 250ML",
      "price": 6000,
      "description": "JUGOS"
    },
    {
      "id": 122,
      "category": "MENU",
      "image": "",
      "title": "RON VIEJO DE CALDAS",
      "price": 8000,
      "description": "RON"
    },
    {
      "id": 123,
      "category": "MENU",
      "image": "",
      "title": "WHISKY BUCHANNANS",
      "price": 17000,
      "description": "whisky"
    },
    {
      "id": 124,
      "category": "MENU",
      "image": "",
      "title": "VINO BLANCO Y VINO TINTO FRONTERA",
      "price": 12000,
      "description": "COPA DE VINO"
    },
    {
      "id": 125,
      "category": "MENU",
      "image": "",
      "title": "REDBULL",
      "price": 10000,
      "description": "REDBULL"
    },
    {
      "id": 126,
      "category": "MENU",
      "image": "",
      "title": "CINNAMON ROLL",
      "price": 4800,
      "description": "CINNAMON ROLL"
    },
    {
      "id": 127,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE ZANAHORIA",
      "price": 8500,
      "description": "TORTA"
    },
    {
      "id": 128,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE BANANO",
      "price": 8500,
      "description": "TORTA"
    },
    {
      "id": 129,
      "category": "MENU",
      "image": "",
      "title": "PASTEL DE POLLO",
      "price": 4800,
      "description": "PASTEL DE POLLO"
    },
    {
      "id": 130,
      "category": "MENU",
      "image": "",
      "title": "ROLLO DE CHOCOLATE",
      "price": 3000,
      "description": "ROLLO DE CHOCOLATE"
    },
    {
      "id": 131,
      "category": "MENU",
      "image": "",
      "title": "CANASTA DE TORTILLA CON CAMARON Y GUACAMOLE",
      "price": 12000,
      "description": "CANASTA DE TORTILLA CON CAMARON Y GUACAMOLE"
    },
    {
      "id": 132,
      "category": "MENU",
      "image": "",
      "title": "ACHIRAS",
      "price": 3800,
      "description": "ACHIRAS"
    },
    {
      "id": 133,
      "category": "MENU",
      "image": "",
      "title": "SANDWISH DE POLLO",
      "price": 5500,
      "description": "SANDWISH DE POLLO"
    },
    {
      "id": 134,
      "category": "MENU",
      "image": "",
      "title": "SANDWISH DE CARNE",
      "price": 5500,
      "description": "SANDWISH DE CARNE"
    },
    {
      "id": 135,
      "category": "MENU",
      "image": "",
      "title": "SANDWICH DE ROAST BEEF",
      "price": 14000,
      "description": "SANDWICH DE ROAST BEEF"
    },
    {
      "id": 136,
      "category": "MENU",
      "image": "",
      "title": "PINCHO DE QUESO PICANTE Y PEPINILLO",
      "price": 12000,
      "description": "PINCHO DE QUESO PICANTE Y PEPINILLO"
    },
    {
      "id": 137,
      "category": "MENU",
      "image": "",
      "title": "PINCHO DE QUESO PICANTE Y PEPINILLO",
      "price": 12000,
      "description": "PINCHO DE QUESO PICANTE Y PEPINILLO"
    },
    {
      "id": 138,
      "category": "MENU",
      "image": "",
      "title": "SANDWICH DE AMELIE",
      "price": 14000,
      "description": "SANDWICH DE AMELIE"
    },
    {
      "id": 139,
      "category": "MENU",
      "image": "",
      "title": "TAPA DE MANZANA VERDE Y JAMON SERRANO",
      "price": 12000,
      "description": "TAPA DE MANZANA VERDE Y JAMON SERRANO"
    },
    {
      "id": 140,
      "category": "MENU",
      "image": "",
      "title": "TORTILLA ESPAÑOLA",
      "price": 8000,
      "description": "TORTILLA ESPAÑOLA"
    },
    {
      "id": 141,
      "category": "MENU",
      "image": "",
      "title": "TAPA DE MANZANA VERDE Y JAMON SERRANO",
      "price": 12000,
      "description": "TAPA DE MANZANA VERDE Y JAMON SERRANO"
    },
    {
      "id": 142,
      "category": "MENU",
      "image": "",
      "title": "CACAO DIPTICO HUNTERS",
      "price": 11500,
      "description": "CACAO DIPTICO HUNTERS"
    },
    {
      "id": 143,
      "category": "MENU",
      "image": "",
      "title": "CACAO SACHET HUNTERS",
      "price": 7500,
      "description": "CACAO SACHET HUNTERS"
    },
    {
      "id": 144,
      "category": "MENU",
      "image": "",
      "title": "TORTA DE CHOCOLATE",
      "price": 8000,
      "description": "TORTA DE CHOCOLATE"
    },
    {
      "id": 145,
      "category": "MENU",
      "image": "",
      "title": "CACAO SACHET HUNTERS",
      "price": 7500,
      "description": "CACAO SACHET HUNTERS"
    },
    {
      "id": 146,
      "category": "MENU",
      "image": "",
      "title": "CROISSANT DE QUESO",
      "price": 4000,
      "description": "CROISSANT DE QUESO"
    },{
      "id": 147,
      "category": "MENU",
      "image": "",
      "title": "CROISSANT DE JAMON Y QUESO",
      "price": 6500,
      "description": "CROISSANT DE JAMON Y QUESO"
    },
    {
      "id": 148,
      "category": "MENU",
      "image": "",
      "title": "CERVEZA CORONA",
      "price": 8000,
      "description": "CERVEZA CORONA"
    }
  
  ]
}

initialState.productos_init=initialState.products
//const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, initialState,applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);