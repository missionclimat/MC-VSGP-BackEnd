"use strict";

var getAreaInfos = require('./getAreaInfos');

var getLineChartInfos = require('./getLineChartInfos');

var getPieInfos = require('./getPieInfos');

var getJauge = require('./getJauge');

var getImpacts = require('./getImpacts');

var getCompoChartInfos = require('./getCompoChartInfos');

function getSimulatorResults(rows) {
  //indicateurs
  var i = 2;
  var indicator = {};
  var indicators = {};

  while (rows[i] && rows[i].length !== 0) {
    var type = rows[i][4];
    indicator = {
      name: rows[i][1],
      value: rows[i][2],
      unit: rows[i][3],
      infos: rows[i][5]
    };

    if (!indicators[rows[i][0]]) {
      indicators[rows[i][0]] = {};
    }

    if (indicators[rows[i][0]][type]) {
      indicators[rows[i][0]][type].push(indicator);
    } else {
      indicators[rows[i][0]][type] = [indicator];
    }

    i++;
  }

  var jaugeDatas = getJauge(rows, 29, 0); // i+1

  var graphs = {};
  graphs.climate = getCompoChartInfos(rows, 13, 0);
  graphs.energy = getCompoChartInfos(rows, 21, 0); // <ChartContainer
  //       title={results.emiFrance.total.graph.data.title}
  //       subtitle={results.emiFrance.total.subtitle}
  //       graphData={results.emiFrance.total.graph}
  //       graphType="CompoChart"
  //       graphText={results.emiFrance.total.text}
  //       legendData={results.emiFrance.total.graph.graphDatas}
  //       sourceData={results.emiFrance.total.source}
  //     />

  var completeResults = {
    emissions: {
      title: rows[37][0],
      intro: rows[38][1],
      graphs: []
    },
    energieFinale: {
      title: rows[58][0],
      intro: rows[59][1],
      graphs: []
    },
    energieRenouvelable: {
      title: rows[72][0],
      intro: rows[73][1],
      graphs: []
    },
    energieFacture: {
      title: rows[86][0],
      intro: rows[87][1],
      graphs: []
    },
    polluants: {
      title: rows[109][0],
      intro: rows[110][1],
      graphs: []
    }
  };
  completeResults.emissions.graphs[0] = {
    graphData: getCompoChartInfos(rows, 39, 0),
    subtitle: rows[45][1],
    graphText: rows[46][1],
    source: rows[47][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 39, 0).data.title,
    legendData: getCompoChartInfos(rows, 39, 0).graphDatas
  };
  completeResults.emissions.graphs[1] = {
    graphData: getCompoChartInfos(rows, 50, 0),
    subtitle: rows[53][1],
    graphText: rows[54][1],
    source: rows[55][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 50, 0).data.title,
    legendData: getCompoChartInfos(rows, 50, 0).graphDatas
  };
  completeResults.energieFinale.graphs[0] = {
    graphData: getCompoChartInfos(rows, 61, 0),
    subtitle: rows[67][1],
    graphText: rows[68][1],
    source: rows[69][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 61, 0).data.title,
    legendData: getCompoChartInfos(rows, 61, 0).graphDatas
  };
  completeResults.energieRenouvelable.graphs[0] = {
    graphData: getCompoChartInfos(rows, 75, 0),
    subtitle: rows[80][1],
    graphText: rows[81][1],
    source: rows[82][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 75, 0).data.title,
    legendData: getCompoChartInfos(rows, 75, 0).graphDatas
  };
  completeResults.energieFacture.graphs[0] = {
    graphData: getCompoChartInfos(rows, 89, 0),
    subtitle: rows[103][1],
    graphText: rows[104][1],
    source: rows[105][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 89, 0).data.title,
    legendData: getCompoChartInfos(rows, 89, 0).graphDatas
  };
  completeResults.polluants.graphs[0] = {
    graphData: getCompoChartInfos(rows, 112, 0),
    subtitle: rows[118][1],
    graphText: rows[119][1],
    source: rows[120][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 112, 0).data.title,
    legendData: getCompoChartInfos(rows, 112, 0).graphDatas
  };
  completeResults.polluants.graphs[1] = {
    graphData: getCompoChartInfos(rows, 123, 0),
    subtitle: rows[129][1],
    graphText: rows[130][1],
    source: rows[131][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 123, 0).data.title,
    legendData: getCompoChartInfos(rows, 123, 0).graphDatas
  };
  completeResults.polluants.graphs[2] = {
    graphData: getCompoChartInfos(rows, 134, 0),
    subtitle: rows[140][1],
    graphText: rows[141][1],
    source: rows[142][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 134, 0).data.title,
    legendData: getCompoChartInfos(rows, 134, 0).graphDatas
  };
  completeResults.polluants.graphs[3] = {
    graphData: getCompoChartInfos(rows, 145, 0),
    subtitle: rows[151][1],
    graphText: rows[152][1],
    source: rows[153][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 145, 0).data.title,
    legendData: getCompoChartInfos(rows, 145, 0).graphDatas
  };
  completeResults.polluants.graphs[4] = {
    graphData: getCompoChartInfos(rows, 156, 0),
    subtitle: rows[162][1],
    graphText: rows[163][1],
    source: rows[164][1],
    graphType: "CompoChart",
    title: getCompoChartInfos(rows, 156, 0).data.title,
    legendData: getCompoChartInfos(rows, 156, 0).graphDatas
  }; // var emiSecteur = getAreaInfo(rows, 0,0)
  // var emiSecteurGnl = getAreaInfo(rows, 17,0)
  // var impacts = getImpacts(rows, 35, 0)// i+1
  // var emiFrance = {};
  // emiFrance.intro = rows[48][1]
  // emiFrance.total = {
  //     graph: getCompoChartInfos(rows,50,0),
  //     subtitle: rows[54][1],
  //     text: rows[55][1],
  //     source: rows[56][1]
  // }
  // emiFrance.sansRupture = {
  //     graph: getAreaInfo(rows,59,0),
  //     subtitle: rows[65][1],
  //     text: rows[66][1],
  //     source: rows[67][1]
  // }
  // emiFrance.avecRupture = {
  //     graph: getAreaInfo(rows,71,0),
  //     subtitle: rows[77][1],
  //     text: rows[78][1],
  //     source: rows[79][1]
  // }
  // var emiSecteurPie = {
  //     graph: getPieInfos(rows, 83, 0),
  //     title: rows[82][1],
  //     subtitle: rows[98][1],
  //     text: rows[99][1],
  //     source: rows[100][1]
  // } 
  // var dataFrance = {};
  // dataFrance.batiment={}
  // dataFrance.batiment.intro = rows[104][1]
  // dataFrance.batiment.perf = {
  //     graph: getAreaInfo(rows,106,0),
  //     subtitle: rows[110][1],
  //     text: rows[111][1],
  //     source:rows[112][1]
  // }
  // dataFrance.batiment.chauffage = {
  //     graph: getAreaInfo(rows,114,0),
  //     subtitle: rows[121][1],
  //     text: rows[122][1],
  //     source:rows[123][1]
  // }
  // dataFrance.transports={}
  // dataFrance.transports.intro = rows[126][1]
  // dataFrance.transports.distance = {
  //     graph: getAreaInfo(rows,128,0),
  //     subtitle: rows[134][1],
  //     text: rows[135][1],
  //     source:rows[136][1]
  // }
  // dataFrance.transports.emissions = {
  //     graph: getAreaInfo(rows,138,0),
  //     subtitle: rows[146][1],
  //     text: rows[147][1],
  //     source:rows[148][1]
  // }
  // dataFrance.agriculture={}
  // dataFrance.agriculture.intro = rows[152][1]
  // dataFrance.agriculture.parcelles = {
  //     graph: getAreaInfo(rows,154,0),
  //     subtitle: rows[158][1],
  //     text: rows[159][1],
  //     source:rows[160][1]
  // }
  // dataFrance.agriculture.emissions = {
  //     graph: getAreaInfo(rows,163,0),
  //     subtitle: rows[167][1],
  //     text: rows[168][1],
  //     source:rows[169][1]
  // }
  // dataFrance.conso={}
  // dataFrance.conso.intro = rows[176][1]
  // dataFrance.conso.emissions = {
  //     graph: getAreaInfo(rows,178,0),
  //     subtitle: rows[183][1],
  //     text: rows[184][1],
  //     source:rows[185][1]
  // }
  // dataFrance.conso.quantites = {
  //     graph: getLineChartInfos(rows,187,0),
  //     subtitle: rows[191][1],
  //     text: rows[192][1],
  //     source:rows[193][1]
  // }
  // dataFrance.energie={}
  // dataFrance.energie.intro = rows[198][1]
  // dataFrance.energie.facteurs = {
  //     graph: getLineChartInfos(rows,200,0),
  //     subtitle: rows[203][1],
  //     text: rows[204][1],
  //     source:rows[205][1]
  // }
  // dataFrance.energie.emissions = {
  //     graph: getAreaInfo(rows,207,0),
  //     subtitle: rows[210][1],
  //     text: rows[211][1],
  //     source:rows[212][1]
  // }
  // var emiMonde = {
  //     intro: rows[218][1],
  //     total : {
  //         graph: getLineChartInfos(rows,219,0),
  //         subtitle: rows[222][1],
  //         text: rows[223][1],
  //         source:rows[224][1]
  //     },
  //     empreinte : {
  //         graph: getLineChartInfos(rows,227,0),
  //         subtitle: rows[230][1],
  //         text: rows[231][1],
  //         source:rows[232][1]
  //     }
  // }
  // impacts.temperatures = {
  //     intro: rows[236][1],
  //     europe: {
  //         title: rows[238][1], 
  //         subtitle: rows[239][1], 
  //         text: rows[240][1],
  //         source: rows[241][1]
  //     },
  //     world: {
  //         title: rows[243][1],
  //         subtitle: rows[244][1], 
  //         text: rows[245][1],
  //         source: rows[246][1]
  //     }
  // }

  return {
    indicators: indicators,
    graphs: graphs,
    jaugeDatas: jaugeDatas,
    completeResults: completeResults // emiSecteur: emiSecteur,
    // emiSecteurGnl: emiSecteurGnl,
    // emiSecteurPie: emiSecteurPie,
    // emiFrance : emiFrance,
    // emiMonde: emiMonde,
    // // emiParSecteur: emiParSecteur,
    // impacts: impacts,
    // dataFrance: dataFrance

  };
}

module.exports = getSimulatorResults;