/* High Business Class — local photo galleries.
 * Rebuild: python3 scripts/update-galleries.py (from the project root).
 * Edit alt.pt / alt.en for accurate descriptions. Existing descriptions survive rebuilding.
 * related shares existing project photos across galleries without duplicating files.
 * fit (cover/contain) and position control framing without editing the source photo.
 * Keep the assignment as valid JSON: quoted keys, no trailing commas, no JS expressions.
 * No remote calls: this file also works when index.html is opened with file://.
 */
window.HBC_MEDIA = {
  "interval": 5000,
  "galleries": {
    "aeroporto": {
      "label": {
        "pt": "Transfer aeroporto",
        "en": "Airport transfers"
      },
      "slides": [
        {
          "src": "assets/novas/aeroporto.webp",
          "alt": {
            "pt": "Passageira com bagagem sendo recebida no aeroporto",
            "en": "A passenger with luggage being welcomed at the airport"
          }
        },
        {
          "src": "assets/galerias/aeroporto/terminal-diurno.webp",
          "alt": {
            "pt": "Estrutura de terminal aeroportuário durante o dia",
            "en": "Airport terminal structure during the day"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/aeroporto/terminal-noturno.webp",
          "alt": {
            "pt": "Terminal aeroportuário iluminado à noite",
            "en": "Airport terminal illuminated at night"
          },
          "fit": "contain",
          "position": "center"
        },
        {
          "src": "assets/galerias/aeroporto/vista-aerea.webp",
          "alt": {
            "pt": "Vista aérea de complexo aeroportuário",
            "en": "Aerial view of an airport complex"
          },
          "fit": "cover",
          "position": "center"
        }
      ]
    },
    "corporativo": {
      "label": {
        "pt": "Transporte corporativo",
        "en": "Corporate transportation"
      },
      "slides": [
        {
          "src": "assets/novas/corporativo.webp",
          "alt": {
            "pt": "Executivos recebendo atendimento de motorista",
            "en": "Executives receiving chauffeur service"
          }
        },
        {
          "src": "assets/galerias/hoteis/arquitetura-urbana.webp",
          "alt": {
            "pt": "Fachada de hotel com arquitetura curva em área urbana",
            "en": "Hotel with a curved façade in an urban area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/torre-hotel.webp",
          "alt": {
            "pt": "Torre de hotel em São Paulo",
            "en": "Hotel tower in São Paulo"
          },
          "fit": "contain",
          "position": "center"
        }
      ],
      "related": [
        {
          "src": "assets/galerias/hoteis/arquitetura-urbana.webp",
          "alt": {
            "pt": "Fachada de hotel com arquitetura curva em área urbana",
            "en": "Hotel with a curved façade in an urban area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/torre-hotel.webp",
          "alt": {
            "pt": "Torre de hotel em São Paulo",
            "en": "Hotel tower in São Paulo"
          },
          "fit": "contain",
          "position": "center"
        }
      ]
    },
    "disposicao": {
      "label": {
        "pt": "Disposição executiva",
        "en": "Chauffeur at disposal"
      },
      "slides": [
        {
          "src": "assets/novas/disposicao.webp",
          "alt": {
            "pt": "Passageira no banco traseiro durante um trajeto",
            "en": "A passenger in the back seat during a journey"
          }
        },
        {
          "src": "assets/galerias/hoteis/entrada-urbana.webp",
          "alt": {
            "pt": "Entrada de hotel em avenida de São Paulo",
            "en": "Hotel entrance on an avenue in São Paulo"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/frota/mercedes.webp",
          "alt": {
            "pt": "Mercedes-Benz apresentada na frota executiva",
            "en": "Mercedes-Benz featured in the executive fleet"
          },
          "fit": "contain",
          "position": "center"
        }
      ],
      "related": [
        {
          "src": "assets/galerias/hoteis/entrada-urbana.webp",
          "alt": {
            "pt": "Entrada de hotel em avenida de São Paulo",
            "en": "Hotel entrance on an avenue in São Paulo"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/frota/mercedes.webp",
          "alt": {
            "pt": "Mercedes-Benz apresentada na frota executiva",
            "en": "Mercedes-Benz featured in the executive fleet"
          },
          "fit": "contain",
          "position": "center"
        }
      ]
    },
    "eventos": {
      "label": {
        "pt": "Eventos",
        "en": "Events"
      },
      "slides": [
        {
          "src": "assets/novas/eventos.webp",
          "alt": {
            "pt": "Convidados sendo recebidos para um evento",
            "en": "Guests being welcomed for an event"
          }
        },
        {
          "src": "assets/galerias/hoteis/hotel-piscina.webp",
          "alt": {
            "pt": "Fachada de hotel e área externa com piscina",
            "en": "Hotel façade and outdoor pool area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/arquitetura-urbana.webp",
          "alt": {
            "pt": "Fachada de hotel com arquitetura curva em área urbana",
            "en": "Hotel with a curved façade in an urban area"
          },
          "fit": "cover",
          "position": "center"
        }
      ],
      "related": [
        {
          "src": "assets/galerias/hoteis/hotel-piscina.webp",
          "alt": {
            "pt": "Fachada de hotel e área externa com piscina",
            "en": "Hotel façade and outdoor pool area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/arquitetura-urbana.webp",
          "alt": {
            "pt": "Fachada de hotel com arquitetura curva em área urbana",
            "en": "Hotel with a curved façade in an urban area"
          },
          "fit": "cover",
          "position": "center"
        }
      ]
    },
    "hoteis": {
      "label": {
        "pt": "Hotéis & FBO",
        "en": "Hotels & FBO"
      },
      "slides": [
        {
          "src": "assets/novas/hoteis-fbo.webp",
          "alt": {
            "pt": "Viajante sendo recebido à saída de um hotel",
            "en": "A traveller being welcomed outside a hotel"
          }
        },
        {
          "src": "assets/galerias/hoteis/arquitetura-urbana.webp",
          "alt": {
            "pt": "Fachada de hotel com arquitetura curva em área urbana",
            "en": "Hotel with a curved façade in an urban area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/aviacao-executiva.webp",
          "alt": {
            "pt": "Entrada de terminal de aviação executiva",
            "en": "Entrance to an executive aviation terminal"
          },
          "fit": "contain",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/entrada-urbana.webp",
          "alt": {
            "pt": "Entrada de hotel em avenida de São Paulo",
            "en": "Hotel entrance on an avenue in São Paulo"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/hotel-arborizado.webp",
          "alt": {
            "pt": "Hotel cercado por área arborizada",
            "en": "Hotel surrounded by trees"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/hotel-piscina.webp",
          "alt": {
            "pt": "Fachada de hotel e área externa com piscina",
            "en": "Hotel façade and outdoor pool area"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/torre-hotel.webp",
          "alt": {
            "pt": "Torre de hotel em São Paulo",
            "en": "Hotel tower in São Paulo"
          },
          "fit": "contain",
          "position": "center"
        }
      ]
    },
    "receptivo": {
      "label": {
        "pt": "Receptivo",
        "en": "Meet & greet"
      },
      "slides": [
        {
          "src": "assets/novas/receptivo.webp",
          "alt": {
            "pt": "Casal de turistas sendo acolhido com suas malas",
            "en": "A travelling couple being welcomed with their luggage"
          }
        },
        {
          "src": "assets/galerias/aeroporto/terminal-diurno.webp",
          "alt": {
            "pt": "Estrutura de terminal aeroportuário durante o dia",
            "en": "Airport terminal structure during the day"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/hotel-arborizado.webp",
          "alt": {
            "pt": "Hotel cercado por área arborizada",
            "en": "Hotel surrounded by trees"
          },
          "fit": "cover",
          "position": "center"
        }
      ],
      "related": [
        {
          "src": "assets/galerias/aeroporto/terminal-diurno.webp",
          "alt": {
            "pt": "Estrutura de terminal aeroportuário durante o dia",
            "en": "Airport terminal structure during the day"
          },
          "fit": "cover",
          "position": "center"
        },
        {
          "src": "assets/galerias/hoteis/hotel-arborizado.webp",
          "alt": {
            "pt": "Hotel cercado por área arborizada",
            "en": "Hotel surrounded by trees"
          },
          "fit": "cover",
          "position": "center"
        }
      ]
    },
    "andre": {
      "label": {
        "pt": "André Gregório",
        "en": "André Gregório"
      },
      "slides": [
        {
          "src": "assets/galerias/andre/retrato-escritorio.webp",
          "alt": {
            "pt": "André Gregório de camisa e gravata em escritório",
            "en": "André Gregório wearing a shirt and tie in an office"
          },
          "fit": "cover",
          "position": "center 20%"
        },
        {
          "src": "assets/galerias/andre/retrato-terno.webp",
          "alt": {
            "pt": "André Gregório de terno em ambiente interno",
            "en": "André Gregório wearing a suit indoors"
          },
          "fit": "cover",
          "position": "center 15%"
        }
      ]
    }
  }
};
