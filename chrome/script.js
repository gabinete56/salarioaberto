function processaPagina(data) {
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

//Carrega dados e roda código na página
var data = CSV.fetch({
    url: chrome.extension.getURL('data/camara.csv'),
    dialect: {}
  }
).done(function(dataset) { 
  processaPagina(dataset);
});