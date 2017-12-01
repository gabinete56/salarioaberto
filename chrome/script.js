var data = CSV.fetch({
    url: chrome.extension.getURL('data/camara.csv'),
    dialect: {}
  }
).done(function(dataset) {
 //checar se o arquivo foi carregado
});


jQuery(document).ready(function($) {
  var banner = $("<h2 style='color:red'>SAIBA QUEM É QUEM NOS SALÁRIOS DA CÂMARA</h2>")
 $(".page-title").typist({
    speed:12,
    text: " (UNCENSORED)",
    cursor:false
 });

  for (i in data.records) {
    v = data.records[i]
      console.log("Checking for " + v[1]);
      el = $("iframe.external-content-iframe").contents().find("td.nome_valor:contains('"+v[0]+"')")
      el.text("")
      el.typist({
          speed:12,
          text: v[1],
          cursor: false
      })
    }
});