import { Component, OnInit,LOCALE_ID, Inject } from '@angular/core';
import { ClimaService } from '../serveice/clima.service';
import { GeolocationService } from '../serveice/geolocation.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

const lluviaDescripcionPromedio: { [descripcion: string]: number } = {
  'lluvia ligera': (2.5 + 7.5) / 2,
  'lluvia moderada': (2.5 + 7.5) / 2,
  'lluvia de fuerte intensidad': (7.6 + 15) / 2,
  'lluvias muy intensas': (15.1 + 30) / 2,
  'lluvia extrema': 30,
  'lluvia helada': 2,
  'lluvia de intensidad ligera': (0.1 + 2.4) / 2,
  'Aguacero': (15.1 + 30) / 2,
  'lluvia irregular': 2,

  'llovizna de intensidad ligera': (0.1 + 2.4) / 2,
  'llovizna': (2.5 + 7.5) / 2,
  'llovizna de fuerte intensidad': (7.6 + 15) / 2,
  'lluvia llovizna de intensidad ligera': (0.1 + 2.4) / 2,
  'llovizna lluvia': (2.5 + 7.5) / 2,
  'ducha lluvia y llovizna': 5,
  'aguacero fuerte lluvia y llovizna': (15.1 + 30) / 2,
  'llovizna de ducha': 2,

  'tormenta con lluvia': (15.1 + 30) / 2,
  'tormenta con fuertes lluvias': 30,
  'tormenta ligera': (0.1 + 7.5) / 2,
  'tormenta': (7.6 + 15) / 2,
  'Fuerte tormenta': 25,
  'tormenta irregular': 15,
  'tormenta con llovizna ligera': (0.1 + 7.5) / 2,
  'tormenta con llovizna': (7.6 + 15) / 2,
  'tormenta con fuerte llovizna': 25,
};


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [DatePipe]
})
export class PrincipalComponent implements OnInit {
  lista_citys:any= {'Tokio': 'Japón', 'Nueva York': 'Estados Unidos', 'Los Ángeles': 'Chile', 'Londres': 'Reino Unido', 'Seúl': 'Corea del Sur', 'París': 'Francia', 'Osaka': 'Japón', 'Chicago': 'Estados Unidos', 'Shanghái': 'China', 'Berlín': 'Alemania', 'Moscú': 'Rusia', 'Washington': 'Estados Unidos', 'Pekín': 'China', 'Ciudad de México': 'México', 'São Paulo': 'Brasil', 'Dallas': 'Estados Unidos', 'Shenzhen': 'China', 'Cantón': 'China', 'Toronto': 'Canadá', 'Frankfurt': 'Alemania', 'Tianjin': 'China', 'Houston': 'Estados Unidos', 'Mumbai': 'India', 'Roma': 'Italia', 'Filadelfia': 'Paraguay', 'Yakarta': 'Indonesia', 'Hamburgo': 'Alemania', 'San Francisco': 'Estados Unidos', 'Singapur': 'Singapur', 'Hong Kong': 'Hong Kong', 'Boston': 'Estados Unidos', 'Nagoya': 'Japón', 'Ámsterdam': 'Países Bajos', 'Estambul': 'Turquía', 'Taipéi': 'Taiwán', 'Chonging': 'China', 'Madrid': 'España', 'Atlanta': 'Estados Unidos', 'Birmingham': 'Estados Unidos', 'Dongguan': 'China', 'Milán': 'Italia', 'Busan': 'Corea del Sur', 'Bangkok': 'Tailandia', 'Seattle': 'Estados Unidos', 'Buenos Aires': 'Argentina', 'Bruselas': 'Bélgica', 'Nankín': 'China', 'Sídney': 'Australia', 'Wuhan': 'China', 'Múnich': 'Alemania', 'Miami': 'Estados Unidos', 'Hangzhou': 'China', 'Río de Janeiro': 'Brasil', 'Kioto': 'Japón', 'Minneapolis': 'Estados Unidos', 'Dubái': 'Emiratos Árabes Unidos', 'Shenyang': 'China', 'Riad': 'Arabia Saudita', 'Detroit': 'Estados Unidos', 'Montreal': 'Canadá', 'Chengdu': 'China', 'Ginebra': 'Suiza', 'Fukuoka': 'Japón', 'Colonia': 'Alemania', 'Delhi': 'India', 'Viena': 'Austria', 'Estocolmo': 'Suecia', 'Oslo': 'Noruega', 'Lisboa': 'Portugal', 'Dublín': 'Irlanda', 'Glasgow': 'Reino Unido', 'Bogotá': 'Colombia', 'Melbourne': 'Australia', 'San Petersburgo': 'Rusia', 'Marsella': 'Francia', 'Phoenix': 'Estados Unidos', 'Harbin': 'China', 'Róterdam': 'Países Bajos', 'Manila': 'Filipinas', 'Santiago': 'Chile', 'Johannesburgo': 'Sudáfrica', 'Barcelona': 'Venezuela', 'Baltimore': 'Estados Unidos', 'Stuttgart': 'Alemania', 'Abu Dabi': 'Emiratos Árabes Unidos', 'Tel Aviv': 'Israel', 'Zúrich': 'Suiza', 'Hefei': 'China', 'Sapporo': 'Japón', 'Vancouver': 'Canadá', 'Calcuta': 'India', 'Brisbane': 'Australia', 'Monterrey': 'México', 'Yeda': 'Arabia Saudita', 'Brasilia': 'Brasil', 'El Cairo': 'Egipto', 'Nápoles': 'Italia', 'Varsovia': 'Polonia', 'Lima': 'Perú', 'Lagos': 'Nigeria', 'Denver': 'Estados Unidos', 'Lyon': 'Francia', 'Incheon': 'Corea del Sur', 'Dusseldorf': 'Alemania', 'Copenhague': 'Dinamarca', 'Praga': 'República Checa', 'Liverpool': 'Reino Unido', 'Amberes': 'Bélgica', 'Valencia': 'Venezuela', 'Hiroshima': 'Japón', 'Atenas': 'Grecia', 'San José': 'Estados Unidos', 'Guadalajara': 'México', 'La Haya': 'Países Bajos', 'Novosibirsk': 'Rusia', 'Bonn': 'Alemania', 'Portland': 'Estados Unidos', 'Jerusalén': 'Israel', 'Ankara': 'Turquía', 'Kuala Lumpur': 'Malasia', 'Doha': 'Catar', 'Riverside': 'Estados Unidos', 'Jinan': 'China', 'Ciudad del Cabo': 'Sudáfrica', 'Perth': 'Australia', 'Daegu': 'Corea del Sur', 'Sendai': 'Japón', 'Austin': 'Estados Unidos', 'Toulouse': 'Francia', 'Ahmedabad': 'India', 'San Luis': 'Argentina', 'Basilea': 'Suiza', 'Sevilla': 'España', 'Qingdao': 'China', "Xi'an": 'China', 'Pittsburgh': 'Estados Unidos', 'Budapest': 'Hungría', 'Venecia': 'Italia', 'San Diego': 'Estados Unidos', 'Kuwait': 'Kuwait', 'Nanchang': 'China', 'Dalian': 'China', 'Helsinki': 'Finlandia', 'Berna': 'Suiza', 'Nairobi': 'Kenia', 'Taiyuan': 'China', 'Haifa': 'Israel', 'Bangalore': 'India', 'Bristol': 'Reino Unido', 'Ho Chi Minh': 'Vietnam', 'Essen': 'Alemania', 'Shantou': 'China', 'Kunming': 'China', 'Daejeon': 'Corea del Sur', 'Kaohsiung': 'Taiwán', 'Sacramento': 'Estados Unidos', 'Utrecht': 'Países\xa0Bajos', 'Gotemburgo': 'Suecia', 'Belo Horizonte': 'Brasil', 'Ekaterimburgo': 'Rusia', 'Shizuoka': 'Japón', 'Zibo': 'China', 'Zhengzhou': 'China', 'Lausana': 'Suiza', 'Zaragoza': 'España', 'Charlotte': 'Estados Unidos', 'Orlando': 'Estados Unidos', 'Cleveland': 'Estados Unidos', 'Bremen': 'Alemania', 'Puebla': 'México', 'Huizhou': 'China', 'Niza': 'Francia', 'Fortaleza': 'Brasil', 'Ottawa': 'Canadá', 'Casablanca': 'Marruecos', 'Gante': 'Bélgica', 'Indianápolis': 'Estados Unidos', 'Cincinnati': 'Estados Unidos', 'Izmir': 'Turquía', 'Chennai': 'India', 'Fuzhou': 'China', 'Shijiazhuang': 'China', 'Changsha': 'China', 'Saitama': 'Japón', 'Dresde': 'Alemania', 'Curitiba': 'Brasil', 'Ulsan': 'Corea de Sur', 'Málaga': 'España', 'Turín': 'Italia', 'Columbus': 'Estados Unidos', 'Calgary': 'Canadá', 'Kansas': 'Estados Unidos', 'Quebec': 'Canadá', 'Mánchester': 'Reino Unido', 'Hyderabad': 'India', 'Auckland': 'Nueva Zelanda', 'Bilbao': 'España', 'San Antonio': 'Estados Unidos', 'Córdoba': 'Argentina', 'Foshan': 'China', 'Wuxi': 'China', 'Sanya': 'China', 'Niigata': 'Japón', 'Leipzig': 'Alemania', 'Eindhoven': 'Países Bajos', 'Nantes': 'Francia', 'Nizhni Nóvgorod': 'Rusia', 'Salvador': 'Brasil', 'Graz': 'Austria', 'Cracovia': 'Polonia', 'Suzhou': 'China', 'Nashville': 'Estados Unidos', 'Las Vegas': 'Estados Unidos', 'Surabaya': 'Indonesia', 'Tijuana': 'México', 'Zhongshan': 'China', 'Zhuhai': 'China', 'Palermo': 'Italia', 'Macao': 'Macao', 'Sheffield': 'Reino Unido', 'Oporto': 'Portugal', 'León': 'México', 'Murcia': 'España', 'Génova': 'Italia', 'Estrasburgo': 'Francia', 'Teherán': 'Irán', 'Karachi': 'Pakistán', 'Virginia Beach': 'Estados Unidos', 'Milwaukee': 'Estados Unidos', 'Providence': 'Estados Unidos', 'Kitakyushu': 'Japón', 'Almaty': 'Kazajistán', 'Porto Alegre': 'Brasil', 'Adelaida': 'Australia', 'Changchun': 'China', 'Ningbo': 'China', 'Xiamen': 'China', 'Nueva Orleans': 'Estados Unidos', 'Salt Lake City': 'Estados Unidos', 'Recife': 'Brasil', 'Montpellier': 'Francia', 'Surat': 'India', 'Medan': 'Indonesia', 'Taichung': 'Taiwán', 'Santiago de Querétaro': 'México', 'Lodz': 'Polonia', 'Búfalo': 'Estados Unidos', 'Richmond': 'Estados Unidos', 'Oklahoma City': 'Estados Unidos', 'Guiyang': 'China', 'Taizhou': 'China', 'Yantai': 'China', 'Kumamoto': 'Japón', 'Leeds': 'Reino Unido', 'Hanói': 'Vietnam', 'Burdeos': 'Francia', 'Bridgeport': 'Estados Unidos', 'Rochester': 'Estados Unidos', 'Memphis': 'Estados Unidos', 'Lieja': 'Bélgica', 'Durban': 'Sudáfrica', 'Linz': 'Austria', 'Wenzhou': 'China', 'Urumqi': 'China', 'Montevideo': 'Uruguay', 'Edimburgo': 'Reino Unido', 'Raleigh': 'Estados Unidos', 'Jacksonville': 'Estados Unidos', 'Bursa': 'Turquía', 'Pretoria': 'Sudáfrica', 'Leicester': 'Reino Unido', 'Jaipur': 'India', 'Daca': 'Bangladés', 'Medellín': 'Colombia', 'Bucarest': 'Rumania', 'Louisville': 'Estados Unidos', 'Honolulu': 'Estados Unidos', 'Tangshan': 'China', 'Luoyang': 'China', 'Alejandría': 'Egipto', 'Bolonia': 'Italia', 'Albany': 'Estados Unidos', 'Florencia': 'Colombia', 'Nantong': 'China', 'Tampa': 'Estados Unidos', 'Luxemburgo': 'Luxemburgo', 'Haikou': 'China', 'Edmonton': 'Canadá', 'Huzhou': 'China', 'Omaha': 'Estados Unidos', 'Tulsa': 'Estados Unidos', 'Lille': 'Francia', 'Changzhou': 'China', 'Akron': 'Estados Unidos', 'Dayton': 'Estados Unidos', 'El Paso': 'Estados Unidos', 'Argel': 'Argelia', 'Adis  Abeba': 'Etiopía', 'Winnipeg': 'Canadá', 'Ciudad Juárez': 'México', 'Buenos Aires ': 'Argentina', 'Rosario': 'Argentina', 'Mendoza': 'Argentina', 'San Miguel de Tucumán': 'Argentina', 'La Plata': 'Argentina', 'Mar del Plata': 'Argentina', 'Quilmes': 'Argentina', 'Salta': 'Argentina', 'Santa Fe de la Vera Cruz': 'Argentina', 'San Juan': 'Argentina', 'Resistencia': 'Argentina', 'Santiago del Estero': 'Argentina', 'Corrientes': 'Argentina', 'Posadas': 'Argentina', 'Morón': 'Argentina', 'San Salvador de Jujuy': 'Argentina', 'Paraná': 'Argentina', 'Neuquén': 'Argentina', 'Formosa': 'Argentina', 'San Fernando del Valle de Catamarca': 'Argentina', 'La Rioja': 'Argentina', 'Comodoro Rivadavia': 'Argentina', 'Ushuaia': 'Argentina', 'Sucre': 'Bolivia', 'La Paz': 'Bolivia', 'Santa Cruz de la Sierra': 'Bolivia', 'Cochabamba': 'Bolivia', 'Oruro': 'Bolivia', 'Tarija': 'Bolivia', 'Potosí': 'Bolivia', 'Montero': 'Bolivia', 'Trinidad': 'Uruguay', 'Yacuiba': 'Bolivia', 'Riberalta': 'Bolivia', 'Guayaramerín': 'Bolivia', 'Mizque': 'Bolivia', 'Villazón': 'Bolivia', 'Llallagua': 'Bolivia', 'Camiri': 'Bolivia', 'Cobija': 'Bolivia', 'San Ignacio de Velasco': 'Bolivia', 'Tupiza': 'Bolivia', 'San Borja': 'Bolivia', 'Villamontes': 'Bolivia', 'Huanuni': 'Bolivia', 'Camargo': 'Bolivia', 'Coroico': 'Bolivia', 'Brasilia ': 'Brasil', 'Rio de Janeiro': 'Brasil', 'Manaus': 'Brasil', 'Goiânia': 'Brasil', 'Belém': 'Brasil', 'Guarulhos': 'Brasil', 'Campinas': 'Brasil', 'São Luís': 'Brasil', 'Maceió': 'Brasil', 'Natal': 'Brasil', 'Campo Grande': 'Brasil', 'Teresina': 'Brasil', 'João Pessoa': 'Brasil', 'Aracaju': 'Brasil', 'Porto Velho': 'Brasil', 'Florianópolis': 'Brasil', 'Macapá': 'Brasil', 'Rio Branco': 'Brasil', 'Boa Vista': 'Brasil', 'Cuiabá': 'Brasil', 'Palmas': 'Brasil', 'Vitória': 'Brasil', 'Santiago ': 'Chile', 'Puente Alto': 'Chile', 'Antofagasta': 'Chile', 'Viña del Mar': 'Chile', 'San Bernardo': 'Chile', 'Valparaíso': 'Chile', 'Temuco': 'Chile', 'Rancagua': 'Chile', 'Coquimbo': 'Chile', 'Puerto Montt': 'Chile', 'Arica': 'Chile', 'Concepción': 'Paraguay', 'La Serena': 'Chile', 'Talca': 'Chile', 'Iquique': 'Chile', 'La Pintana': 'Chile', 'Calama': 'Chile', 'Chillán': 'Chile', 'Copiapó': 'Chile', 'Quilpué': 'Chile', 'Valdivia': 'Chile', 'Osorno': 'Chile', 'Talcahuano': 'Chile', 'Curicó': 'Chile', 'Villa Alemana': 'Chile', 'Punta Arenas': 'Chile', 'Coihaique': 'Chile', 'Bogotá ': 'Colombia', 'Cali': 'Colombia', 'Barranquilla': 'Colombia', 'Cartagena': 'Colombia', 'Cúcuta': 'Colombia', 'Bucaramanga': 'Colombia', 'Ibagué': 'Colombia', 'Soledad': 'Colombia', 'Soacha': 'Colombia', 'Santa Marta': 'Colombia', 'Villavicencio': 'Colombia', 'Pereira': 'Colombia', 'Manizales': 'Colombia', 'Pasto': 'Colombia', 'Neiva': 'Colombia', 'Valledupar': 'Colombia', 'Buenaventura': 'Colombia', 'Montería': 'Colombia', 'Armenia': 'Colombia', 'Popayán': 'Colombia', 'Sincelejo': 'Colombia', 'Quito': 'Ecuador', 'Guayaquil': 'Ecuador', 'Cuenca': 'Ecuador', 'Santa Elena': 'Ecuador', 'Machala': 'Ecuador', 'Santo Domingo de los Colorados': 'Ecuador', 'Portoviejo': 'Ecuador', 'Manta': 'Ecuador', 'Loja': 'Ecuador', 'Ambato': 'Ecuador', 'Eloy Alfaro': 'Ecuador', 'Esmeraldas': 'Ecuador', 'Riobamba': 'Ecuador', 'Ibarra': 'Ecuador', 'Babahoyo': 'Ecuador', 'Tulcán': 'Ecuador', 'Latacunga': 'Ecuador', 'Puerto Francisco de Orellana': 'Ecuador', 'Puerto Baquerizo Moreno': 'Ecuador', 'Asunción': 'Paraguay', 'Ciudad del Este': 'Paraguay', 'San Lorenzo': 'Paraguay', 'Capiatá': 'Paraguay', 'Lambaré': 'Paraguay', 'Fernando de la Mora': 'Paraguay', 'Limpio': 'Paraguay', 'Nemby': 'Paraguay', 'Pedro Juan Caballero': 'Paraguay', 'Encarnación': 'Paraguay', 'Colonia Mariano Roque Alonso': 'Paraguay', 'Villa Hayes': 'Paraguay', 'Caaguazú': 'Paraguay', 'Coronel Oviedo': 'Paraguay', 'Villarrica': 'Paraguay', 'Pilar': 'Paraguay', 'Caazapá': 'Paraguay', 'Caacupé': 'Paraguay', 'San Juan Bautista': 'Paraguay', 'Areguá': 'Paraguay', 'Paraguarí': 'Paraguay', 'San Pedro de Ycuamandiyú': 'Paraguay', 'Salto del Guairá': 'Paraguay', 'Fuerte Olimpo': 'Paraguay', 'Lima ': 'Perú', 'Arequipa': 'Perú', 'Callao': 'Perú', 'Trujillo': 'Perú', 'Chiclayo': 'Perú', 'Iquitos': 'Perú', 'Huancayo': 'Perú', 'Piura': 'Perú', 'Chimbote': 'Perú', 'Cusco': 'Perú', 'Pucallpa': 'Perú', 'Tacna': 'Perú', 'Ica': 'Perú', 'Juliaca': 'Perú', 'Sullana': 'Perú', 'Chincha Alta': 'Perú', 'Huánuco': 'Perú', 'Ayacucho': 'Perú', 'Cajamarca': 'Perú', 'Puno': 'Perú', 'Tumbes': 'Perú', 'Chosica': 'Perú', 'Huaraz': 'Perú', 'Cerro de Pasco': 'Perú', 'San Isidro': 'Perú', 'Montevideo ': 'Uruguay', 'Salto': 'Uruguay', 'Paysandú': 'Uruguay', 'Las Piedras': 'Uruguay', 'Rivera': 'Uruguay', 'Maldonado': 'Uruguay', 'Tacuarembó': 'Uruguay', 'Melo': 'Uruguay', 'Mercedes': 'Uruguay', 'Artigas': 'Uruguay', 'Minas': 'Uruguay', 'San José de Mayo': 'Uruguay', 'Durazno': 'Uruguay', 'Florida': 'Uruguay', 'Treinta y Tres': 'Uruguay', 'Rocha': 'Uruguay', 'San Carlos': 'Uruguay', 'Fray Bentos': 'Uruguay', 'Colonia del Sacramento': 'Uruguay', 'Canelones': 'Uruguay', 'Caracas': 'Venezuela', 'Maracaibo': 'Venezuela', 'Barquisimeto': 'Venezuela', 'Ciudad Guayana': 'Venezuela', 'Maturín': 'Venezuela', 'Petare': 'Venezuela', 'Maracay': 'Venezuela', 'Ciudad Bolívar': 'Venezuela', 'Barinas': 'Venezuela', 'Baruta': 'Venezuela', 'Cumaná': 'Venezuela', 'Cabimas': 'Venezuela', 'Alto Barinas': 'Venezuela', 'San Cristóbal': 'Venezuela', 'Santa Teresa': 'Venezuela', 'Punto Fijo': 'Venezuela', 'Mérida': 'Venezuela', 'Turmero': 'Venezuela', 'Los Teques': 'Venezuela', 'El Tigre': 'Venezuela', 'Coro': 'Venezuela', 'Puerto Cabello': 'Venezuela', 'San Juan de los Morros': 'Venezuela', 'La Asunción': 'Venezuela'} ;
  lista_paises: any = { 'Afganistán': 'AF', 'Albania': 'AL', 'Alemania': 'DE', 'Andorra': 'AD', 'Angola': 'AO', 'Anguila': 'AI', 'Antártida': 'AQ', 'Antigua y Barbuda': 'AG', 'Arabia Saudita': 'SA', 'Argelia': 'DZ', 'Argentina': 'AR', 'Armenia': 'AM', 'Aruba': 'AW', 'Australia': 'AU', 'Austria': 'AT', 'Azerbaiyán': 'AZ', 'Bahamas': 'BS', 'Bahrein': 'BH', 'Bailía de Guernsey': 'GG', 'Bangladesh': 'BD', 'Barbados': 'BB', 'Belarús': 'BY', 'Bélgica': 'BE', 'Belice': 'BZ', 'Benín': 'BJ', 'Bermudas': 'BM', 'Bolivia': 'BO', 'Bosnia y Hercegovina': 'BA', 'Botsuana': 'BW', 'Brasil': 'BR', 'Brunéi': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF', 'Burundi': 'BI', 'Bután': 'BT', 'Cabo Verde': 'CV', 'Camboya': 'KH', 'Camerún': 'CM', 'Canadá': 'CA', 'Caribe Neerlandés': 'BQ', 'Catar': 'QA', 'Chad': 'TD', 'Chequia': 'CZ', 'Chile': 'CL', 'China': 'CN', 'Chipre': 'CY', 'Ciudad del Vaticano': 'VA', 'Colombia': 'CO', 'Comores': 'KM', 'Corea del Norte': 'KP', 'Corea del Sur': 'KR', 'Costa de Marfil': 'CI', 'Costa Rica': 'CR', 'Croacia': 'HR', 'Cuba': 'CU', 'Curaçao': 'CW', 'Dinamarca': 'DK', 'Dominica': 'DM', 'Ecuador': 'EC', 'Egipto': 'EG', 'El Salvador': 'SV', 'Emiratos Árabes Unidos': 'AE', 'Eritrea': 'ER', 'Eslovaquia': 'SK', 'Eslovenia': 'SI', 'España': 'ES', 'Estados Federados de Micronesia': 'FM', 'Estados Unidos': 'US', 'Estonia': 'EE', 'Esuatini': 'SZ', 'Etiopía': 'ET', 'Filipinas': 'PH', 'Finlandia': 'FI', 'Fiyi': 'FJ', 'Francia': 'FR', 'Gabón': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Georgia del Sur y las Islas Sandwich del Sur': 'GS', 'Ghana': 'GH', 'Gibraltar': 'GI', 'Granada': 'GD', 'Grecia': 'GR', 'Groenlandia': 'GL', 'Guadalupe': 'GP', 'Guam': 'GU', 'Guatemala': 'GT', 'Guayana': 'GY', 'Guayana Francesa': 'GF', 'Guinea': 'GN', 'Guinea Ecuatorial': 'GQ', 'Guinea-Bissau': 'GW', 'Haití': 'HT', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungría': 'HU', 'India': 'IN', 'Indonesia': 'ID', 'Irán': 'IR', 'Iraq': 'IQ', 'Irlanda': 'IE', 'Isla Bouvet': 'BV', 'Isla de Man': 'IM', 'Isla de Navidad': 'CX', 'Isla de San Martín': 'MF', 'Isla Mauricio': 'MU', 'Isla Norfolk': 'NF', 'Islandia': 'IS', 'Islas Åland': 'AX', 'Islas Caimán': 'KY', 'Islas Cocos': 'CC', 'Islas Cook': 'CK', 'Islas Feroe': 'FO', 'Islas Heard y McDonald': 'HM', 'Islas Malvinas': 'FK', 'Islas Marianas del Norte': 'MP', 'Islas Marshall': 'MH', 'Islas Pitcairn': 'PN', 'Islas Salomón': 'SB', 'Islas Turcas y Caicos': 'TC', 'Islas ultramarinas menores de los Estados Unidos': 'UM', 'Islas Vírgenes (UK)': 'VG', 'Islas Vírgenes Americanas': 'VI', 'Israel': 'IL', 'Italia': 'IT', 'Jamaica': 'JM', 'Japón': 'JP', 'Jersey': 'JE', 'Jordania': 'JO', 'Kazajistán\u200b\u200b\u200b': 'KZ', 'Kenia': 'KE', 'Kirguistán': 'KG', 'Kiribati': 'KI', 'Kosovo': 'XK', 'Kuwait': 'KW', 'Laos': 'LA', 'Lesotho': 'LS', 'Letonia': 'LV', 'Líbano': 'LB', 'Liberia': 'LR', 'Libia': 'LY', 'Liechtenstein': 'LI', 'Lituania': 'LT', 'Luxemburgo': 'LU', 'Macao': 'MO', 'Macedonia del Norte': 'MK', 'Madagascar': 'MG', 'Malasia': 'MY', 'Malaui': 'MW', 'Maldivas': 'MV', 'Malí': 'ML', 'Malta': 'MT', 'Marruecos': 'MA', 'Martinica': 'MQ', 'Mauritania': 'MR', 'Mayotte': 'YT', 'México': 'MX', 'Moldavia': 'MD', 'Mongolia': 'MN', 'Montenegro': 'ME', 'Montserrat': 'MS', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Nicaragua': 'NI', 'Níger': 'NE', 'Nigeria': 'NG', 'Niue': 'NU', 'Noruega': 'NO', 'Nueva Caledonia': 'NC', 'Nueva Zelandia': 'NZ', 'Omán': 'OM', 'Países Bajos': 'NL', 'Pakistán': 'PK', 'Palaos': 'PW', 'Palestina': 'PS', 'Panamá': 'PA', 'Papúa Nueva Guinea': 'PG', 'Paraguay': 'PY', 'Perú': 'PE', 'Polinesia Francesa': 'PF', 'Polonia': 'PL', 'Portugal': 'PT', 'Principado de Mónaco': 'MC', 'Puerto Rico': 'PR', 'Reino Unido': 'GB', 'República Centroafricana': 'CF', 'República del Congo': 'CG', 'República Democrática del Congo': 'CD', 'República Dominicana': 'DO', 'Reunión': 'RE', 'Ruanda': 'RW', 'Rumania': 'RO', 'Rusia': 'RU', 'Sáhara Occidental': 'EH', 'Samoa': 'WS', 'Samoa Americana': 'AS', 'San Bartolomé': 'BL', 'San Cristóbal y Nieves': 'KN', 'San Marino': 'SM', 'San Pedro y Miquelón': 'PM', 'San Vicente y las Granadinas': 'VC', 'Santa Elena, Ascensión y Tristán de Acuña': 'SH', 'Santa Lucía': 'LC', 'Santo Tomé y Príncipe': 'ST', 'Senegal': 'SN', 'Serbia': 'RS', 'Seychelles': 'SC', 'Sierra Leona': 'SL', 'Singapur': 'SG', 'Sint Maarten': 'SX', 'Siria': 'SY', 'Somalia': 'SO', 'Sri Lanka': 'LK', 'Sudáfrica': 'ZA', 'Sudán': 'SD', 'Sudán del Sur': 'SS', 'Suecia': 'SE', 'Suiza': 'CH', 'Surinam': 'SR', 'Svalbard y Jan Mayen': 'SJ', 'Tailandia': 'TH', 'Taiwán': 'TW', 'Tanzania': 'TZ', 'Tayikistán': 'TJ', 'Territorio Británico del Océano Índico': 'IO', 'Territorios Australes y Antárticos Franceses': 'TF', 'Timor Oriental': 'TL', 'Togo': 'TG', 'Tokelau': 'TK', 'Tonga': 'TO', 'Trinidad y Tobago': 'TT', 'Túnez': 'TN', 'Turkmenistán': 'TM', 'Turquía': 'TR', 'Tuvalu': 'TV', 'Ucrania': 'UA', 'Uganda': 'UG', 'Uruguay': 'UY', 'Uzbekistán': 'UZ', 'Vanuatu': 'VU', 'Venezuela': 'VE', 'Vietnam': 'VN', 'Wallis y Futuna': 'WF', 'Yemen': 'YE', 'Yibuti': 'DJ', 'Zambia': 'ZM', 'Zimbabue': 'ZW' };
  // lista_pais_continente:any = {"Afganistán": "Asia", "Albania": "Europa", "Alemania": "Europa", "Andorra": "Europa", "Angola": "África", "Anguila": "América", "Antártida": "Antártida", "Antigua y Barbuda": "América", "Arabia Saudita": "Asia", "Argelia": "África", "Argentina": "América", "Armenia": "Asia", "Aruba": "América", "Australia": "Oceanía", "Austria": "Europa", "Azerbaiyán": "Asia", "Bahamas": "América", "Bahrein": "Asia", "Bailía de Guernsey": "Europa", "Bangladesh": "Asia", "Barbados": "América", "Belarús": "Europa", "Bélgica": "Europa", "Belice": "América", "Benín": "África", "Bermudas": "América", "Bolivia": "América", "Bosnia y Hercegovina": "Europa", "Botsuana": "África", "Brasil": "América", "Brunéi": "Asia", "Bulgaria": "Europa", "Burkina Faso": "África", "Burundi": "África", "Bután": "Asia", "Cabo Verde": "África", "Camboya": "Asia", "Camerún": "África", "Canadá": "América", "Caribe Neerlandés": "América", "Catar": "Asia", "Chad": "África", "Chequia": "Europa", "Chile": "América", "China": "Asia", "Chipre": "Europa", "Ciudad del Vaticano": "Europa", "Colombia": "América", "Comores": "África", "Corea del Norte": "Asia", "Corea del Sur": "Asia", "Costa de Marfil": "África", "Costa Rica": "América", "Croacia": "Europa", "Cuba": "América", "Curaçao": "América", "Dinamarca": "Europa", "Dominica": "América", "Ecuador": "América", "Egipto": "África", "El Salvador": "América", "Emiratos Árabes Unidos": "Asia", "Eritrea": "África", "Eslovaquia": "Europa", "Eslovenia": "Europa", "España": "Europa", "Estados Federados de Micronesia": "Oceanía", "Estados Unidos de América": "América", "Estonia": "Europa", "Esuatini": "África", "Etiopía": "África", "Filipinas": "Asia", "Finlandia": "Europa", "Fiyi": "Oceanía", "Francia": "Europa", "Gabón": "África", "Gambia": "África", "Georgia": "Asia", "Georgia del Sur y las Islas Sandwich del Sur": "Antártida", "Ghana": "África", "Gibraltar": "Europa", "Granada": "América", "Grecia": "Europa", "Groenlandia": "América", "Guadalupe": "América", "Guam": "Oceanía", "Guatemala": "América", "Guayana": "América", "Guayana Francesa": "América", "Guinea": "África", "Guinea Ecuatorial": "África", "Guinea-Bissau": "África", "Haití": "América", "Honduras": "América", "Hong Kong": "Asia", "Hungría": "Europa", "India": "Asia", "Indonesia": "Asia", "Irán": "Asia", "Iraq": "Asia", "Irlanda": "Europa", "Isla Bouvet": "Antártida", "Isla de Man": "Europa", "Isla de Navidad": "Oceanía", "Isla de San Martín": "América", "Isla Mauricio": "África", "Isla Norfolk": "Oceanía", "Islandia": "Europa", "Islas Åland": "Europa", "Islas Caimán": "América", "Islas Cocos": "Asia", "Islas Cook": "Oceanía", "Islas Feroe": "Europa", "Islas Heard y McDonald": "Antártida", "Islas Malvinas": "América", "Islas Marianas del Norte": "Oceanía", "Islas Marshall": "Oceanía", "Islas Pitcairn": "Oceanía", "Islas Salomón": "Oceanía", "Islas Turcas y Caicos": "América", "Islas ultramarinas menores de los Estados Unidos": "América", "Islas Vírgenes (UK)": "América", "Islas Vírgenes Americanas": "América", "Israel": "Asia", "Italia": "Europa", "Jamaica": "América", "Japón": "Asia", "Jersey": "Europa", "Jordania": "Asia", "Kazajistán": "Asia", "Kenia": "África", "Kirguistán": "Asia", "Kiribati": "Oceanía", "Kosovo": "Europa", "Kuwait": "Asia", "Laos": "Asia", "Lesotho": "África", "Letonia": "Europa", "Líbano": "Asia", "Liberia": "África", "Libia": "África", "Lituania": "Europa", "Luxemburgo": "Europa", "Macao": "Asia", "Macedonia del Norte": "Europa", "Madagascar": "África", "Malasia": "Asia", "Malaui": "África", "Maldivas": "Asia", "Malí": "África", "Malta": "Europa", "Marruecos": "África", "Martinica": "América", "Mauritania": "África", "Mayotte": "África", "México": "América", "Moldavia": "Europa", "Mongolia": "Asia", "Montenegro": "Europa", "Montserrat": "América", "Mozambique": "África", "Myanmar": "Asia", "Namibia": "África", "Nauru": "Oceanía", "Nepal": "Asia", "Nicaragua": "América", "Níger": "África", "Nigeria": "África", "Niue": "Oceanía", "Noruega": "Europa", "Nueva Caledonia": "Oceanía", "Nueva Zelandia": "Oceanía", "Omán": "Asia", "Países Bajos": "Europa", "Pakistán": "Asia", "Palaos": "Oceanía", "Palestina": "Asia", "Panamá": "América", "Papúa Nueva Guinea": "Oceanía", "Paraguay": "América", "Perú": "América", "Polinesia Francesa": "Oceanía", "Polonia": "Europa", "Portugal": "Europa", "Principado de Mónaco": "Europa", "Puerto Rico": "América", "Reino Unido": "Europa", "República Centroafricana": "África", "República del Congo": "África", "República Democrática del Congo": "África", "República Dominicana": "América", "Reunión": "África", "Ruanda": "África", "Rumania": "Europa", "Rusia": "Europa/Asia", "Sáhara Occidental": "África", "Samoa": "Oceanía", "Samoa Americana": "Oceanía", "San Bartolomé": "América", "San Cristóbal y Nieves": "América", "San Marino": "Europa", "San Pedro y Miquelón": "América", "San Vicente y las Granadinas": "América", "Santa Elena, Ascensión y Tristán de Acuña": "África", "Santa Lucía": "América", "Santo Tomé y Príncipe": "África", "Senegal": "África", "Serbia": "Europa", "Seychelles": "África", "Sierra Leona": "África", "Singapur": "Asia", "Sint Maarten": "América", "Siria": "Asia", "Somalia": "África", "Sri Lanka": "Asia", "Sudáfrica": "África", "Sudán": "África", "Sudán del Sur": "África", "Suecia": "Europa", "Suiza": "Europa", "Surinam": "América", "Svalbard y Jan Mayen": "Europa", "Tailandia": "Asia", "Taiwán": "Asia", "Tanzania": "África", "Tayikistán": "Asia", "Territorio Británico del Océano Índico": "África", "Territorios Australes y Antárticos Franceses": "Antártida", "Timor Oriental": "Asia", "Togo": "África", "Tokelau": "Oceanía", "Tonga": "Oceanía", "Trinidad y Tobago": "América", "Túnez": "África", "Turkmenistán": "Asia", "Turquía": "Asia/Europa", "Tuvalu": "Oceanía", "Ucrania": "Europa", "Uganda": "África", "Uruguay": "América", "Uzbekistán": "Asia", "Vanuatu": "Oceanía", "Venezuela": "América", "Vietnam": "Asia", "Wallis y Futuna": "Oceanía", "Yemen": "Asia", "Yibuti": "África", "Zambia": "África", "Zimbabue": "África"}

  pais: string = 'ar';
  provincia: string = 'tucuman';
  datosClimaticos: any;
  lluvia: number = 0;
  coeficientes = [[5951.97633931], [684.73675898], [-60.7824355], [5401.08333866]];
  consumo_mean: number = 25401.3671232876;
  esFeriado: boolean = false;
  consumo_mean_lts: number = 1000;
  consumo_mean_lts_result: number = 0;
  mm_lluvia: number = 0;
  locationData: any;
  fullDate: string | undefined;
  currentDay: string | undefined;
  year: string | undefined;
  month: string | undefined;
  day_numeric: string | undefined;

  sugerencias: string[] = [];
  mostrarSugerencias: boolean = false;
  esFinDeSemana:boolean=false;
  locale: string = 'es';

  constructor(
    private climaService: ClimaService,
    private geolocationService: GeolocationService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.obtenerDatosClimaticos();
    this.getCurrentDay();
    this.geolocationService.getGeolocation().subscribe(
      (data) => {
        this.locationData = data;
        this.pais = this.locationData.country;
        this.provincia = this.locationData.region;
        console.log('Información de ubicación:', this.locationData.country);
        console.log('Información de ubicación:', this.locationData.region);
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error);
      }
    );
  }

  getCurrentDay() {
    const today = new Date();
    this.currentDay = today.toLocaleString(this.locale, { weekday: 'long' });
    this.year = today.toLocaleString(this.locale, { year: 'numeric'});    console.log('Día year: ',this.year)
    this.month = today.toLocaleString(this.locale, { month: 'long'});    console.log('Día month: ',this.month)
    this.day_numeric = today.toLocaleString(this.locale, { day: 'numeric' });    console.log('Día actual: ',this.day_numeric)
    if (this.currentDay === 'viernes' || this.currentDay === 'sabado' || this.currentDay === 'domingo') {
        this.esFinDeSemana=true
    }
    console.log('Es fin de semana: ',this.esFinDeSemana)
  }

  pasarASiguienteInput() {
    document.getElementById("provincia")?.focus();
  }

  ciudadesPorPais: string[] = [];

  obtenerCiudadesPorPais() {
    if (this.pais) {
      console.log('pais', this.pais)
      this.ciudadesPorPais = Object.keys(this.lista_citys).filter(
        ciudad => this.lista_citys[ciudad] == this.pais
        );
        console.log('pais', this.ciudadesPorPais)
    } else {
      this.ciudadesPorPais = [];
    }
  }

  showErrorModal() {
    const errorModal = this.modalService.open(ModalErrorComponent);
    errorModal.componentInstance.errorMessage = 'Error al obtener datos climáticos';
  }

  mostrarModalError(titulo: string, mensaje: string): void {
    const modalRef = this.modalService.open(ModalErrorComponent);
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensaje = mensaje;
  }

  obtenerDatosClimaticos(): void {
    if (this.pais && this.provincia) {
      this.climaService.obtenerDatosClimaticos(this.pais, this.provincia).subscribe(
        {
          next: (data) => {
            {
              this.datosClimaticos = data;
              const descripcionClima: string = this.datosClimaticos.weather[0].description;
              this.mm_lluvia = lluviaDescripcionPromedio[descripcionClima] || 0;
              // console.log('mm_lluvia',this.mm_lluvia)
              // console.log(JSON.stringify(data))
            };
          },
          error: (error) => {
            console.error('Error al obtener datos climáticos', error);
            // console.log('Error al obtener datos climáticos', error);
            this.mostrarModalError('Error al obtener datos climáticos', 'Verifica nombre de la ciudad');
          },
          complete: () => {
            this.calcular();
            // console.info('complete')
          }
        })
    }
  }

  calcular(): number {
    const x1 = this.datosClimaticos.main.temp;
    const x2 = this.mm_lluvia;
    const x3 = this.esFeriado;

    let consumo: number;

    if (x3 == true || this.esFinDeSemana==true) {
      const consumo_hoy = this.coeficientes[0][0] + x1 * this.coeficientes[1][0] + x2 * this.coeficientes[2][0] + this.coeficientes[3][0];
      consumo = (consumo_hoy - this.consumo_mean) * 100 / this.consumo_mean;
      this.consumo_mean_lts_result = (this.consumo_mean_lts * (consumo / 100)) + this.consumo_mean_lts
    } else if (x3 == false && this.esFinDeSemana==false) {
      const consumo_hoy = this.coeficientes[0][0] + x1 * this.coeficientes[1][0] + x2 * this.coeficientes[2][0];
      consumo = (consumo_hoy - this.consumo_mean) * 100 / this.consumo_mean;
      this.consumo_mean_lts_result = (this.consumo_mean_lts * (consumo / 100)) + this.consumo_mean_lts
    } else {
      consumo = 0;
      this.consumo_mean_lts_result = 0 // Asignar un valor predeterminado en caso de que x3 no sea ni true ni false
    }
    // console.log('valor de x3', x3, ' y esFinDeSemana: ', this.esFinDeSemana)
    return consumo
  }


}
