DEBUG = true

function processaCamara(data) {
   $("iframe.external-content-iframe").contents().find("td.nome_valor").each(function () {
    var matricula = $(this).text().trim()
    if (data[matricula]) {
      $(this).text(data[matricula]['nome'])
      } else {
        $(this).html(matricula+"<a href='#' title='Ainda não conseguimos identificar essa matricula. Se for você, ajuda a gente? :)'>???</a>")
      }

     });
    return true;
}

function processaAlesp(data) {
    $("td[width='16%']").each(function () {
      var matricula = $(this).text().trim()
      if (data[matricula]) {
        $(this).text(data[matricula]['nome'])
      }
      });
    return true;
  }


//Carrega dados e roda código na página
var url = location.href

var aparecium = $("<div id='aparecium' style='display:none;min-height:20px;width:100%;color:#fff;background-color:#af1352;padding:5px;text-align:center;font-weight:bold;'>Com o Plugin Aparecium Salários da <a style='color:#D0D820;text-decoration:none;' href='http://www.minhasampa.org.br' target='_blank'>Minha Sampa</a> + <a style='color:#D0D820;text-decoration:none;' href='http://facebook.com/gabinete56' target='_blank'>Gabinete 56</a> nenhuma Assembleia ou Câmara ficará secreta.</div>")

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
    jQuery(document).ready(function ($) {
      $("body").prepend(aparecium)
      $.when(processaCamara(data)).done(function () {
        $("#aparecium").slideDown("fast")
      });
    });
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

    jQuery(document).ready(function ($) {
      $("body").prepend(aparecium)
      $("header").css('position', 'static')
      $("#dados").css('margin-top', '')
      $.when(processaAlesp(data)).done(function () {
        $("#aparecium").slideDown("fast")
      });
    });
  });
}

