DEBUG = true

function processaCamara(data) {
    jQuery(document).ready(function($) {
   $(".page-title").typist({
      speed:12,
      text: " (UNCENSORED)",
      cursor:false
   });

   $("iframe.external-content-iframe").contents().find("td.nome_valor").each(function () {
    var matricula = $(this).text().trim()
    if (data[matricula]) {
      $(this).text(data[matricula]['nome'])
    }

   });
  });
}

function processaAlesp(data) {
    jQuery(document).ready(function($) {

    $("td[width='16%']").each(function () {
      var matricula = $(this).text().trim()
      if (data[matricula]) {
        $(this).text(data[matricula]['nome'])
      }
      });
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
    var data = {}
    for (i in dataset.records) {
      v = dataset.records[i]
      data[v[0]] = { "nome" : v[1]}
    }
    processaCamara(data);
  });
}

if (url.indexOf("al.sp.gov.br") > -1) {
  var data = CSV.fetch({
    url: chrome.extension.getURL('data/alesp.csv'),
    dialect: {}
  }
  ).done(function(dataset) { 

    var data = {}
    for (i in dataset.records) {
      v = dataset.records[i]
      data[v[0]] = { "nome" : v[1]}
    }
    processaAlesp(data);
  });
}

