require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/renderers/DotDensityRenderer",
  "esri/widgets/Legend",
  "esri/widgets/Bookmarks",
  "esri/widgets/Expand",
  "esri/Map",
  "esri/views/SceneView",
  "esri/layers/SceneLayer"
], (
  WebMap,
  MapView,
  FeatureLayer,
  DotDensityRenderer,
  Legend,
  Bookmarks,
  Expand,
  Map,
  SceneView,
  SceneLayer
) => {
  const map = new WebMap({
    portalItem: {
      id: "56b5bd522c52409c90d902285732e9f1"
    }
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    highlightOptions: {
      fillOpacity: 0,
      color: [50, 50, 50]
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: "top-right",
        breakpoint: false
      }
    },
    constraints: {
      maxScale: 35000
    }
  });

  view.when().then(() => {
    const dotDensityRenderer = new DotDensityRenderer({
      dotValue: 100,
      outline: null,
      referenceScale: 577790, // 1:577,790 view scale
      legendOptions: {
        unit: "housing cost"
      },
      attributes: [
        {
          field: "B25070_002E",
          color: "#f23c3f",
          label: "总租金低于家庭收入 10.0% 的租房家庭"
        },
        {
          field: "B25070_003E",
          color: "#e8ca0d",
          label: "总租金为家庭收入的 10.0% 到 14.9% 的租房家庭"
        },
        {
          field: "B25070_004E",
          color: "#00b6f1",
          label: "总租金为家庭收入的 15.0% 到 19.9% 的租房家庭"
        },
        {
          field: "B25070_005E",
          color: "#32ef94",
          label: "总租金为家庭收入的 20.0% 到 24.9% 的租房家庭"
        },
        {
          field: "B25070_006E",
          color: "#ff7fe9",
          label: "总租金为家庭收入的 25.0% 到 29.9% 的租房家庭"
        },
        {
          field: "B25070_007E",
          color: "#e2c4a5",
          label: "总租金为家庭收入的 30.0% 到 34.9% 的租房家庭"
        },
        {
          field: "B25070_008E",
          color: "#ff6a00",
          label: "为家庭收入的 35.0% 至 39.9% 的租房家庭"
        },
        {
          field: "B25070_009E",
          color: "#96f7ef",
          label: "总租金为家庭收入的 40.0% 到 49.9% 的租房家庭"
        }
      ]
    });

    // Add renderer to the layer and define a popup template
    const url =
      "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Housing_Costs_Boundaries/FeatureServer/2";
    const layer = new FeatureLayer({
      url: url,
      minScale: 20000000,
      maxScale: 35000,
      title: "关于美国家庭租房成本占家庭收入百分比",
      popupTemplate: {
        title: "{County}, {State}",
        content: [
          {
            type: "media",
            mediaInfos: [
              {
                title: "关于美国住房成本占家庭收入百分比",
                type: "bar-chart",
                value: {
                  fields: [
                    "B25070_002E",
                    "B25070_003E",
                    "B25070_004E",
                    "B25070_005E",
                    "B25070_006E",
                    "B25070_007E",
                    "B25070_008E",
                    "B25070_009E",

                  ],
                  tooltipField: "<field name>"
                }
              }
            ]
          },
          {
            type: "fields"
          }
        ],
        fieldInfos: [
          {
            fieldName: "B25070_002E",
            label: "总租金低于家庭收入 10.0% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_003E",
            label: "总租金为家庭收入的 10.0% 到 14.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_004E",
            label: "总租金为家庭收入的 15.0% 到 19.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_005E",
            label: "总租金为家庭收入的 20.0% 到 24.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_006E",
            label: "总租金为家庭收入的 25.0% 到 29.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_007E",
            label: "总租金为家庭收入的 30.0% 到 34.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_008E",
            label: "总租金为家庭收入的 35.0% 至 39.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },
          {
            fieldName: "B25070_009E",
            label: "总租金为家庭收入的 40.0% 到 49.9% 的租房家庭",
            format: {
              digitSeparator: true,
              places: 0
            }
          },

        ]
      },
      renderer: dotDensityRenderer
    });
    map.add(layer);

    view.ui.add(
      [
        new Expand({
          view: view,
          content: new Legend({ view: view }),
          group: "top-left",
          expanded: true
        }),
        new Expand({
          view: view,
          content: new Bookmarks({ view: view }),
          group: "top-left"
        }),

      ],
      "top-left"
    );
    

    
  });
});