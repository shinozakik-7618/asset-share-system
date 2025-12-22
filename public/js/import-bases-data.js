const BASES_DATA = [
  {
    "blockNo": "1",
    "block": "カンパニー",
    "regionNo": "100",
    "region": "長野Branch",
    "baseNo": "6101",
    "baseName": "SL長野BASE",
    "baseId": "nagano"
  },
  {
    "blockNo": "1",
    "block": "カンパニー",
    "regionNo": "100",
    "region": "長野Branch",
    "baseNo": "6503",
    "baseName": "DCL長野BASE",
    "baseId": "nagano2"
  },
  {
    "blockNo": "1",
    "block": "カンパニー",
    "regionNo": "100",
    "region": "長野Branch",
    "baseNo": "6504",
    "baseName": "DCL上田BASE",
    "baseId": "ueda"
  },
  {
    "blockNo": "1",
    "block": "カンパニー",
    "regionNo": "100",
    "region": "長野Branch",
    "baseNo": "6506",
    "baseName": "DCL松本宮田BASE",
    "baseId": "matsumoto-miyada"
  },
  {
    "blockNo": "101",
    "block": "西ブロック",
    "regionNo": "101",
    "region": "九州Branch",
    "baseNo": "6113",
    "baseName": "SL飯塚秋松BASE",
    "baseId": "iizuka-akimatsu"
  },
  {
    "blockNo": "101",
    "block": "西ブロック",
    "regionNo": "101",
    "region": "九州Branch",
    "baseNo": "6105",
    "baseName": "SL鹿児島BASE",
    "baseId": "kagoshima"
  },
  {
    "blockNo": "101",
    "block": "西ブロック",
    "regionNo": "101",
    "region": "九州Branch",
    "baseNo": "6107",
    "baseName": "SL長崎BASE",
    "baseId": "nagasaki"
  },
  {
    "blockNo": "101",
    "block": "西ブロック",
    "regionNo": "101",
    "region": "九州Branch",
    "baseNo": "6110",
    "baseName": "SL佐賀BASE",
    "baseId": "saga"
  },
  {
    "blockNo": "106",
    "block": "西ブロック",
    "regionNo": "106",
    "region": "四国Brunch",
    "baseNo": "6102",
    "baseName": "SL高松東バイパスBASE",
    "baseId": "takamatsu-higashi"
  },
  {
    "blockNo": "107",
    "block": "西ブロック",
    "regionNo": "107",
    "region": "静岡Branch",
    "baseNo": "1124",
    "baseName": "SL三島BASE",
    "baseId": "mishima"
  },
  {
    "blockNo": "107",
    "block": "西ブロック",
    "regionNo": "107",
    "region": "静岡Branch",
    "baseNo": "1130",
    "baseName": "SL富士BASE",
    "baseId": "fuji"
  },
  {
    "blockNo": "108",
    "block": "西ブロック",
    "regionNo": "108",
    "region": "横須賀三浦港南台Branch",
    "baseNo": "1119",
    "baseName": "SL横須賀BASE",
    "baseId": "yokosuka"
  },
  {
    "blockNo": "108",
    "block": "西ブロック",
    "regionNo": "108",
    "region": "横須賀三浦港南台Branch",
    "baseNo": "1089",
    "baseName": "SL港南BASE",
    "baseId": "konan"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1083",
    "baseName": "SL辻堂BASE",
    "baseId": "tsujido"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1088",
    "baseName": "SL大和つきみ野BASE",
    "baseId": "yamato-tsukimino"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1091",
    "baseName": "SL湘南台BASE",
    "baseId": "shonan-dai"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1131",
    "baseName": "SL小田原東インターBASE",
    "baseId": "odawara-higashi"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1507",
    "baseName": "DCL湘南平塚BASE",
    "baseId": "shonan-hiratsuka"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1516",
    "baseName": "DCL湘南藤沢BASE",
    "baseId": "shonan-fujisawa"
  },
  {
    "blockNo": "109",
    "block": "西ブロック",
    "regionNo": "109",
    "region": "湘南Branch",
    "baseNo": "1571",
    "baseName": "DCL中央林間BASE",
    "baseId": "chuo-rinkan"
  },
  {
    "blockNo": "111",
    "block": "西ブロック",
    "regionNo": "111",
    "region": "青梅東大和花小金井Branch",
    "baseNo": "1093",
    "baseName": "SL東大和BASE",
    "baseId": "higashi-yamato"
  },
  {
    "blockNo": "111",
    "block": "西ブロック",
    "regionNo": "111",
    "region": "青梅東大和花小金井Branch",
    "baseNo": "1120",
    "baseName": "SL青梅BASE",
    "baseId": "ome"
  },
  {
    "blockNo": "111",
    "block": "西ブロック",
    "regionNo": "111",
    "region": "青梅東大和花小金井Branch",
    "baseNo": "1086",
    "baseName": "SL花小金井BASE",
    "baseId": "hana-koganei"
  },
  {
    "blockNo": "111",
    "block": "西ブロック",
    "regionNo": "111",
    "region": "青梅東大和花小金井Branch",
    "baseNo": "1519",
    "baseName": "DCL立川BASE",
    "baseId": "tachikawa"
  },
  {
    "blockNo": "111",
    "block": "西ブロック",
    "regionNo": "111",
    "region": "青梅東大和花小金井Branch",
    "baseNo": "1566",
    "baseName": "DCL昭島BASE",
    "baseId": "akishima"
  },
  {
    "blockNo": "102",
    "block": "西ブロック",
    "regionNo": "102",
    "region": "東海地域",
    "baseNo": "6103",
    "baseName": "SL一宮名岐バイパスBASE",
    "baseId": "ichinomiya-meiki"
  },
  {
    "blockNo": "102",
    "block": "西ブロック",
    "regionNo": "102",
    "region": "東海地域",
    "baseNo": "6301",
    "baseName": "豊田くらしのデジタル館",
    "baseId": "toyota-digital"
  },
  {
    "blockNo": "102",
    "block": "西ブロック",
    "regionNo": "102",
    "region": "東海地域",
    "baseNo": "6302",
    "baseName": "SL名鉄BASE",
    "baseId": "meitetsu"
  },
  {
    "blockNo": "102",
    "block": "西ブロック",
    "regionNo": "102",
    "region": "東海地域",
    "baseNo": "6104",
    "baseName": "SL半田インターBASE",
    "baseId": "handa"
  },
  {
    "blockNo": "102",
    "block": "西ブロック",
    "regionNo": "102",
    "region": "東海地域",
    "baseNo": "6109",
    "baseName": "SL岡崎羽根BASE",
    "baseId": "okazaki-hane"
  },
  {
    "blockNo": "105",
    "block": "西ブロック",
    "regionNo": "105",
    "region": "大阪地域",
    "baseNo": "6114",
    "baseName": "SL箕面BASE",
    "baseId": "minoh"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1079",
    "baseName": "SL東名川崎BASE",
    "baseId": "tomei-kawasaki"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1569",
    "baseName": "DCLたまプラーザBASE",
    "baseId": "tama-plaza"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1092",
    "baseName": "SL稲城若葉台BASE",
    "baseId": "inagi-wakabadai"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1111",
    "baseName": "SL多摩ニュータウンBASE",
    "baseId": "tama-newtown"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1501",
    "baseName": "DCL多摩ニュータウンBASE",
    "baseId": "tama-newtown2"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1514",
    "baseName": "DCL八王子BASE",
    "baseId": "hachioji"
  },
  {
    "blockNo": "110",
    "block": "西ブロック",
    "regionNo": "110",
    "region": "東名稲城多磨地域",
    "baseNo": "1535",
    "baseName": "DCL稲城若葉台BASE",
    "baseId": "inagi-wakabadai2"
  },
  {
    "blockNo": "201",
    "block": "東ブロック",
    "regionNo": "201",
    "region": "東北Branch",
    "baseNo": "6112",
    "baseName": "SL八戸新井田BASE",
    "baseId": "hachinohe-araida"
  },
  {
    "blockNo": "201",
    "block": "東ブロック",
    "regionNo": "201",
    "region": "東北Branch",
    "baseNo": "6111",
    "baseName": "SL福島西BASE",
    "baseId": "fukushima-nishi"
  },
  {
    "blockNo": "201",
    "block": "東ブロック",
    "regionNo": "201",
    "region": "東北Branch",
    "baseNo": "6106",
    "baseName": "SL盛岡BASE",
    "baseId": "morioka"
  },
  {
    "blockNo": "202",
    "block": "東ブロック",
    "regionNo": "202",
    "region": "新潟Branch",
    "baseNo": "6108",
    "baseName": "SL長岡BASE",
    "baseId": "nagaoka"
  },
  {
    "blockNo": "202",
    "block": "東ブロック",
    "regionNo": "202",
    "region": "新潟Branch",
    "baseNo": "6715",
    "baseName": "SL新潟女池Club Lounge",
    "baseId": "niigata-meike"
  },
  {
    "blockNo": "202",
    "block": "東ブロック",
    "regionNo": "202",
    "region": "新潟Branch",
    "baseNo": "6502",
    "baseName": "DCL燕三条BASE",
    "baseId": "tsubame-sanjo"
  },
  {
    "blockNo": "202",
    "block": "東ブロック",
    "regionNo": "202",
    "region": "新潟Branch",
    "baseNo": "6505",
    "baseName": "DCL金沢BASE",
    "baseId": "kanazawa"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1121",
    "baseName": "SL足利BASE",
    "baseId": "ashikaga"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1125",
    "baseName": "SL太田BASE",
    "baseId": "ota"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1537",
    "baseName": "DCL足利BASE",
    "baseId": "ashikaga2"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1567",
    "baseName": "DCL太田BASE",
    "baseId": "ota2"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1807",
    "baseName": "DCLみどりBASE",
    "baseId": "midori"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1563",
    "baseName": "DCL栃木大平BASE",
    "baseId": "tochigi-ohira"
  },
  {
    "blockNo": "205",
    "block": "東ブロック",
    "regionNo": "205",
    "region": "栃木西Branch",
    "baseNo": "1574",
    "baseName": "DCL古河中央BASE",
    "baseId": "koga-chuo"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1095",
    "baseName": "SL東海BASE",
    "baseId": "tokai"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1106",
    "baseName": "SL水戸BASE",
    "baseId": "mito"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1503",
    "baseName": "DCL水戸BASE",
    "baseId": "mito2"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1528",
    "baseName": "DCLｼｰｻｲﾄﾞひたちなかBASE",
    "baseId": "seaside-hitachinaka"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1534",
    "baseName": "DCL石岡BASE",
    "baseId": "ishioka"
  },
  {
    "blockNo": "204",
    "block": "東ブロック",
    "regionNo": "204",
    "region": "水戸・東海地域",
    "baseNo": "1564",
    "baseName": "DCL那珂BASE",
    "baseId": "naka"
  },
  {
    "blockNo": "2051",
    "block": "東ブロック",
    "regionNo": "2051",
    "region": "栃木東地域",
    "baseNo": "1805",
    "baseName": "SL宇都宮店",
    "baseId": "utsunomiya"
  },
  {
    "blockNo": "2051",
    "block": "東ブロック",
    "regionNo": "2051",
    "region": "栃木東地域",
    "baseNo": "1529",
    "baseName": "DCL真岡BASE",
    "baseId": "moka"
  },
  {
    "blockNo": "2051",
    "block": "東ブロック",
    "regionNo": "2051",
    "region": "栃木東地域",
    "baseNo": "1115",
    "baseName": "SL小山BASE",
    "baseId": "oyama"
  },
  {
    "blockNo": "2051",
    "block": "東ブロック",
    "regionNo": "2051",
    "region": "栃木東地域",
    "baseNo": "1536",
    "baseName": "DCLﾊｰｳﾞｪｽﾄｳｫｰｸ小山BASE",
    "baseId": "harvest-oyama"
  },
  {
    "blockNo": "2051",
    "block": "東ブロック",
    "regionNo": "2051",
    "region": "栃木東地域",
    "baseNo": "1512",
    "baseName": "DCL筑西BASE",
    "baseId": "chikusei"
  },
  {
    "blockNo": "206",
    "block": "東ブロック",
    "regionNo": "206",
    "region": "群馬地域",
    "baseNo": "1134",
    "baseName": "SL前橋南インターBASE",
    "baseId": "maebashi-minami"
  },
  {
    "blockNo": "206",
    "block": "東ブロック",
    "regionNo": "206",
    "region": "群馬地域",
    "baseNo": "1539",
    "baseName": "DCL富岡BASE",
    "baseId": "tomioka"
  },
  {
    "blockNo": "206",
    "block": "東ブロック",
    "regionNo": "206",
    "region": "群馬地域",
    "baseNo": "1549",
    "baseName": "DCLﾌｨｰﾙ藤岡BASE",
    "baseId": "feel-fujioka"
  },
  {
    "blockNo": "206",
    "block": "東ブロック",
    "regionNo": "206",
    "region": "群馬地域",
    "baseNo": "1561",
    "baseName": "DCLけやきウォーク前橋BASE",
    "baseId": "keyaki-maebashi"
  },
  {
    "blockNo": "206",
    "block": "東ブロック",
    "regionNo": "206",
    "region": "群馬地域",
    "baseNo": "1573",
    "baseName": "DCL本庄BASE",
    "baseId": "honjo"
  },
  {
    "blockNo": "2071",
    "block": "東ブロック",
    "regionNo": "2071",
    "region": "狭山川越地域",
    "baseNo": "1801",
    "baseName": "SL川越 メンバーラウンジ",
    "baseId": "kawagoe"
  },
  {
    "blockNo": "2071",
    "block": "東ブロック",
    "regionNo": "2071",
    "region": "狭山川越地域",
    "baseNo": "1117",
    "baseName": "SL狭山BASE",
    "baseId": "sayama"
  },
  {
    "blockNo": "2072",
    "block": "東ブロック",
    "regionNo": "2072",
    "region": "坂戸東松山地域",
    "baseNo": "1118",
    "baseName": "SL坂戸BASE",
    "baseId": "sakado"
  },
  {
    "blockNo": "2072",
    "block": "東ブロック",
    "regionNo": "2072",
    "region": "坂戸東松山地域",
    "baseNo": "1502",
    "baseName": "DCLﾋﾟｵﾆｳｫｰｸ東松山BASE",
    "baseId": "pione-higashimatsuyama"
  },
  {
    "blockNo": "210",
    "block": "東ブロック",
    "regionNo": "210",
    "region": "埼玉西地域",
    "baseNo": "1116",
    "baseName": "SL所沢有楽町BASE",
    "baseId": "tokorozawa"
  },
  {
    "blockNo": "210",
    "block": "東ブロック",
    "regionNo": "210",
    "region": "埼玉西地域",
    "baseNo": "1104",
    "baseName": "SLふじみ野BASE",
    "baseId": "fujimino"
  },
  {
    "blockNo": "210",
    "block": "東ブロック",
    "regionNo": "210",
    "region": "埼玉西地域",
    "baseNo": "1110",
    "baseName": "SL新座BASE",
    "baseId": "niiza"
  },
  {
    "blockNo": "210",
    "block": "東ブロック",
    "regionNo": "210",
    "region": "埼玉西地域",
    "baseNo": "1576",
    "baseName": "DCL入間BASE",
    "baseId": "iruma"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1126",
    "baseName": "SL富里インターBASE",
    "baseId": "tomisato"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1301",
    "baseName": "成田くらしのデジタル館",
    "baseId": "narita-digital"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1554",
    "baseName": "DCL旭BASE",
    "baseId": "asahi"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1556",
    "baseName": "DCL四街道BASE",
    "baseId": "yotsukaido"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1803",
    "baseName": "SL成田クラブラウンジ",
    "baseId": "narita-club"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1123",
    "baseName": "SL鎌ヶ谷BASE",
    "baseId": "kamagaya"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1511",
    "baseName": "DCL千葉ﾆｭｰﾀｳﾝBASE",
    "baseId": "千葉ﾆｭｰﾀｳﾝ"
  },
  {
    "blockNo": "301",
    "block": "センターブロック",
    "regionNo": "301",
    "region": "北総Branch",
    "baseNo": "1568",
    "baseName": "DCL白井駅前BASE",
    "baseId": "shiroi"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1075",
    "baseName": "SL西馬込BASE",
    "baseId": "nishi-magome"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1077",
    "baseName": "SL碑文谷BASE",
    "baseId": "himonya"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1094",
    "baseName": "SL青山BASE",
    "baseId": "aoyama"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1096",
    "baseName": "SL麻布十番BASE",
    "baseId": "azabu-juban"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1105",
    "baseName": "SL有明ガーデンBASE",
    "baseId": "ariake"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1113",
    "baseName": "SL六本木BASE",
    "baseId": "roppongi"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1087",
    "baseName": "SL世田谷砧BASE",
    "baseId": "setagaya-kinuta"
  },
  {
    "blockNo": "305",
    "block": "センターブロック",
    "regionNo": "305",
    "region": "都心Branch",
    "baseNo": "1085",
    "baseName": "SL平和台BASE",
    "baseId": "heiwadai"
  },
  {
    "blockNo": "302",
    "block": "センターブロック",
    "regionNo": "302",
    "region": "みなと新横浜Branch",
    "baseNo": "1078",
    "baseName": "SL新横浜BASE",
    "baseId": "shin-yokohama"
  },
  {
    "blockNo": "302",
    "block": "センターブロック",
    "regionNo": "302",
    "region": "みなと新横浜Branch",
    "baseNo": "1080",
    "baseName": "SLみなとみらいBASE",
    "baseId": "minatomirai"
  },
  {
    "blockNo": "306",
    "block": "センターブロック",
    "regionNo": "306",
    "region": "北多摩Brunch",
    "baseNo": "1081",
    "baseName": "SL調布BASE",
    "baseId": "chofu"
  },
  {
    "blockNo": "306",
    "block": "センターブロック",
    "regionNo": "306",
    "region": "北多摩Brunch",
    "baseNo": "1076",
    "baseName": "SL東府中BASE",
    "baseId": "higashi-fuchu"
  },
  {
    "blockNo": "306",
    "block": "センターブロック",
    "regionNo": "306",
    "region": "北多摩Brunch",
    "baseNo": "1090",
    "baseName": "SL三鷹BASE",
    "baseId": "mitaka"
  },
  {
    "blockNo": "306",
    "block": "センターブロック",
    "regionNo": "306",
    "region": "北多摩Brunch",
    "baseNo": "1506",
    "baseName": "DCL府中BASE",
    "baseId": "fuchu"
  },
  {
    "blockNo": "208",
    "block": "センターブロック",
    "regionNo": "208",
    "region": "松戸越谷Brunch",
    "baseNo": "1108",
    "baseName": "SL松戸BASE",
    "baseId": "matsudo"
  },
  {
    "blockNo": "208",
    "block": "センターブロック",
    "regionNo": "208",
    "region": "松戸越谷Brunch",
    "baseNo": "1112",
    "baseName": "SL越谷BASE",
    "baseId": "koshigaya"
  },
  {
    "blockNo": "208",
    "block": "センターブロック",
    "regionNo": "208",
    "region": "松戸越谷Brunch",
    "baseNo": "1515",
    "baseName": "DCL流山BASE",
    "baseId": "nagareyama"
  },
  {
    "blockNo": "208",
    "block": "センターブロック",
    "regionNo": "208",
    "region": "松戸越谷Brunch",
    "baseNo": "1552",
    "baseName": "DCL吉川BASE",
    "baseId": "yoshikawa"
  },
  {
    "blockNo": "208",
    "block": "センターブロック",
    "regionNo": "208",
    "region": "松戸越谷Brunch",
    "baseNo": "1565",
    "baseName": "DCL柏中央BASE",
    "baseId": "kashiwa"
  },
  {
    "blockNo": "209",
    "block": "センターブロック",
    "regionNo": "209",
    "region": "埼玉北地域",
    "baseNo": "1122",
    "baseName": "SL鴻巣BASE",
    "baseId": "konosu"
  },
  {
    "blockNo": "209",
    "block": "センターブロック",
    "regionNo": "209",
    "region": "埼玉北地域",
    "baseNo": "1128",
    "baseName": "SL熊谷BASE",
    "baseId": "kumagaya"
  },
  {
    "blockNo": "209",
    "block": "センターブロック",
    "regionNo": "209",
    "region": "埼玉北地域",
    "baseNo": "1544",
    "baseName": "DCL幸手BASE",
    "baseId": "satte"
  },
  {
    "blockNo": "209",
    "block": "センターブロック",
    "regionNo": "209",
    "region": "埼玉北地域",
    "baseNo": "1572",
    "baseName": "DCL上尾BASE",
    "baseId": "ageo"
  },
  {
    "blockNo": "304",
    "block": "センターブロック",
    "regionNo": "304",
    "region": "港北十日市場日吉地域",
    "baseNo": "1084",
    "baseName": "SL港北BASE",
    "baseId": "kohoku"
  },
  {
    "blockNo": "304",
    "block": "センターブロック",
    "regionNo": "304",
    "region": "港北十日市場日吉地域",
    "baseNo": "1082",
    "baseName": "SL日吉BASE",
    "baseId": "hiyoshi"
  },
  {
    "blockNo": "304",
    "block": "センターブロック",
    "regionNo": "304",
    "region": "港北十日市場日吉地域",
    "baseNo": "1099",
    "baseName": "SL十日市場BASE",
    "baseId": "tokaichiba"
  },
  {
    "blockNo": "308",
    "block": "センターブロック",
    "regionNo": "308",
    "region": "城東北地域",
    "baseNo": "1097",
    "baseName": "SL西新井BASE",
    "baseId": "nishi-arai"
  },
  {
    "blockNo": "308",
    "block": "センターブロック",
    "regionNo": "308",
    "region": "城東北地域",
    "baseNo": "1098",
    "baseName": "SL環七奥戸BASE",
    "baseId": "kanshichi-okudo"
  },
  {
    "blockNo": "308",
    "block": "センターブロック",
    "regionNo": "308",
    "region": "城東北地域",
    "baseNo": "1804",
    "baseName": "SL足立小台クラブラウンジ",
    "baseId": "adachi-odai"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1109",
    "baseName": "SL船橋BASE",
    "baseId": "funabashi"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1114",
    "baseName": "SL幕張インターBASE",
    "baseId": "makuhari"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1504",
    "baseName": "DCL東京ﾍﾞｲｻｲﾄﾞ新浦安BASE",
    "baseId": "東京ﾍﾞｲｻｲﾄﾞ新浦安"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1508",
    "baseName": "DCLｵｰﾂｰﾊﾟｰｸ稲毛BASE",
    "baseId": "o2park-inage"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1517",
    "baseName": "DCLﾊｰﾊﾞｰｼﾃｨ蘇我BASE",
    "baseId": "harbor-soga"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1520",
    "baseName": "DCL新習志野BASE",
    "baseId": "shin-narashino"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1530",
    "baseName": "DCL市川インターBASE",
    "baseId": "ichikawa"
  },
  {
    "blockNo": "309",
    "block": "センターブロック",
    "regionNo": "309",
    "region": "千葉地域",
    "baseNo": "1558",
    "baseName": "DCL西葛西BASE",
    "baseId": "nishi-kasai"
  },
  {
    "blockNo": "3101",
    "block": "センターブロック",
    "regionNo": "3101",
    "region": "神栖地域",
    "baseNo": "1133",
    "baseName": "SL神栖BASE",
    "baseId": "kamisu"
  },
  {
    "blockNo": "3101",
    "block": "センターブロック",
    "regionNo": "3101",
    "region": "神栖地域",
    "baseNo": "1570",
    "baseName": "DCL神栖BASE",
    "baseId": "kamisu2"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1127",
    "baseName": "SL土浦BASE",
    "baseId": "tsuchiura"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1129",
    "baseName": "SLつくば研究学園BASE",
    "baseId": "tsukuba"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1509",
    "baseName": "DCLつくば研究学園BASE",
    "baseId": "tsukuba2"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1527",
    "baseName": "DCLひたち野うしくBASE",
    "baseId": "hitachino-ushiku"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1802",
    "baseName": "SL取手守谷BASE",
    "baseId": "toride-moriya"
  },
  {
    "blockNo": "3102",
    "block": "センターブロック",
    "regionNo": "3102",
    "region": "土浦つくば地域",
    "baseNo": "1575",
    "baseName": "DCL土浦真鍋BASE",
    "baseId": "tsuchiura-manabe"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1132",
    "baseName": "SL市原インターBASE",
    "baseId": "ichihara"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1521",
    "baseName": "DCL君津BASE",
    "baseId": "kimitsu"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1806",
    "baseName": "SL東金クラブラウンジ",
    "baseId": "togane"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1532",
    "baseName": "DCL木更津BASE",
    "baseId": "kisarazu"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1533",
    "baseName": "DCL茂原BASE",
    "baseId": "mobara"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1540",
    "baseName": "DCL市原五井BASE",
    "baseId": "ichihara-goi"
  },
  {
    "blockNo": "311",
    "block": "センターブロック",
    "regionNo": "311",
    "region": "房総地域",
    "baseNo": "1562",
    "baseName": "DCLおゆみ野BASE",
    "baseId": "oyumino"
  }
];

let importing = false;
document.addEventListener('DOMContentLoaded', () => {
  console.log('拠点データ登録ページ準備完了');
  console.log(`登録予定拠点数: ${BASES_DATA.length}`);
});
async function startImport() {
  if (importing) {
    alert('既に登録処理が実行中です');
    return;
  }
  if (!confirm(`${BASES_DATA.length} 件の拠点データを登録します。よろしいですか?`)) {
    return;
  }
  importing = true;
  const importBtn = document.getElementById('importBtn');
  const progressBox = document.getElementById('progressBox');
  const resultBox = document.getElementById('resultBox');
  const progressFill = document.getElementById('progressFill');
  const logBox = document.getElementById('logBox');
  importBtn.disabled = true;
  importBtn.textContent = '登録中...';
  progressBox.style.display = 'block';
  resultBox.style.display = 'none';
  logBox.innerHTML = '';
  let successCount = 0;
  let errorCount = 0;
  const total = BASES_DATA.length;
  addLog('拠点データの登録を開始します...', 'info');
  try {
    for (let i = 0; i < BASES_DATA.length; i++) {
      const base = BASES_DATA[i];
      try {
        const existing = await db.collection('baseMaster').where('baseId', '==', base.baseId).get();
        if (!existing.empty) {
          await existing.docs[0].ref.update({...base, updatedAt: firebase.firestore.FieldValue.serverTimestamp()});
          addLog(`✅ 更新: ${base.baseName} (${base.baseId})`, 'success');
        } else {
          await db.collection('baseMaster').add({...base, createdAt: firebase.firestore.FieldValue.serverTimestamp(), updatedAt: firebase.firestore.FieldValue.serverTimestamp()});
          addLog(`✅ 追加: ${base.baseName} (${base.baseId})`, 'success');
        }
        successCount++;
      } catch (error) {
        console.error('登録エラー:', error);
        addLog(`❌ エラー: ${base.baseName} - ${error.message}`, 'error');
        errorCount++;
      }
      const progress = Math.round(((i + 1) / total) * 100);
      progressFill.style.width = `${progress}%`;
      progressFill.textContent = `${progress}%`;
      if ((i + 1) % 10 === 0) {
        addLog(`進捗: ${i + 1} / ${total} 件完了`, 'info');
      }
    }
    addLog('', 'info');
    addLog('=== 登録完了 ===', 'info');
    addLog(`成功: ${successCount} 件`, 'success');
    if (errorCount > 0) {
      addLog(`エラー: ${errorCount} 件`, 'error');
    }
    document.getElementById('resultMessage').innerHTML = `<strong>成功:</strong> ${successCount} 件<br>${errorCount > 0 ? `<strong>エラー:</strong> ${errorCount} 件<br>` : ''}<br>拠点マスタの登録が完了しました!`;
    resultBox.style.display = 'block';
  } catch (error) {
    console.error('インポート処理エラー:', error);
    addLog(`致命的エラー: ${error.message}`, 'error');
    alert('登録処理中にエラーが発生しました');
  } finally {
    importing = false;
    importBtn.disabled = false;
    importBtn.textContent = '🚀 拠点データを一括登録する';
  }
}
function addLog(message, type = 'info') {
  const logBox = document.getElementById('logBox');
  const logLine = document.createElement('div');
  logLine.className = 'log-line';
  if (type === 'success') {
    logLine.style.color = '#28a745';
  } else if (type === 'error') {
    logLine.style.color = '#dc3545';
  }
  logLine.textContent = message;
  logBox.appendChild(logLine);
  logBox.scrollTop = logBox.scrollHeight;
}
function goToBaseMaster() {
  window.location.href = '/base-master.html';
}
