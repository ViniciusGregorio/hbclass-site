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
          "src": "assets/novas/transferofc001.webp",
          "alt": {
            "pt": "Motorista recebe passageiro junto a um sedã em terminal de aviação executiva",
            "en": "Chauffeur welcoming a passenger beside a sedan at an executive aviation terminal"
          }
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
          "src": "assets/novas/corporativoofc001.webp",
          "alt": {
            "pt": "Passageiro de terno usa notebook no banco traseiro de um veículo executivo",
            "en": "Passenger in a suit using a laptop in the rear seat of an executive vehicle"
          }
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
          "src": "assets/novas/disposicao01.webp",
          "alt": {
            "pt": "Passageira usa o celular no banco traseiro de um veículo executivo",
            "en": "Passenger using a phone in the rear seat of an executive vehicle"
          }
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
        }
      ]
    },
    "receptivo": {
      "label": {
        "pt": "Receptivo Executivo",
        "en": "Executive Meet & Greet"
      },
      "slides": [
        {
          "src": "assets/novas/receptivoexecutivoofc001.webp",
          "alt": {
            "pt": "Motorista segura a porta de um sedã executivo para um passageiro diante de um edifício",
            "en": "Chauffeur holding the door of an executive sedan for a passenger outside a building"
          }
        }
      ]
    },
    "assistants": {
      "label": {
        "pt": "Assistants & Secretaries",
        "en": "Assistants & Secretaries"
      },
      "slides": [
        {
          "src": "assets/novas/assitantssecretariesofc001.webp",
          "alt": {
            "pt": "Mulher de blazer claro usando notebook em uma mesa de escritório",
            "en": "Woman in a light blazer using a laptop at an office desk"
          }
        }
      ]
    },
    "familyoffice": {
      "label": {
        "pt": "Family Office & Private Clients",
        "en": "Family Office & Private Clients"
      },
      "slides": [
        {
          "src": "assets/novas/FAMILYOFFICE_PRIVATECLIENTS.webp",
          "alt": {
            "pt": "Família com duas crianças junto a um sedã preto na entrada de uma residência",
            "en": "Family with two children beside a black sedan outside a residence"
          }
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
