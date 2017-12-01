DEBUG = true

function processaCamara(data) {
    jQuery(document).ready(function($) {
   $(".page-title").typist({
      speed:12,
      text: " (UNCENSORED)",
      cursor:false
   });
    for (i in data.records) {
      v = data.records[i]
        if (DEBUG) {
          console.log("Checking for " + v[1]);
        }
      
        el = $("iframe.external-content-iframe").contents().find("td.nome_valor:contains('"+v[0]+"')")
        el.text("")
        el.typist({
            speed:12,
            text: v[1],
            cursor: false
        })
      }
  });
}

function processaAlesp(data) {
    jQuery(document).ready(function($) {
/*   $("#explicacao_salario").typist({
      speed:12,
      text: " (UNCENSORED)",
      cursor:false
   });
*/
    for (i in data.records) {
      v = data.records[i]
        if (DEBUG) {
          console.log("Checking for " + v[1]);
        }
      
        var regex = new RegExp('^'+v[0]+'$')
        console.log(regex)
        el = $("td[width='16%']").filter(function () {
          return regex.test($(this).text()); 
        });
        console.log(el)
        
        el.text("")
        el.typist({
            speed:12,
            text: v[1],
            cursor: false
        })
      }
  });
}


//Carrega dados e roda código na página
var url = location.href

if (url.indexOf("camara.sp.gov.br") > -1) {
  var data = CSV.fetch({
      url: chrome.extension.getURL('data/camara.csv'),
      dialect: {}
    }
  ).done(function(dataset) { 
    processaCamara(dataset);
  });
}

if (url.indexOf("al.sp.gov.br") > -1) {
  var data = CSV.fetch({
    url: chrome.extension.getURL('data/alesp.csv'),
    dialect: {}
  }
  ).done(function(dataset) { 
    processaAlesp(dataset);
  });
}

