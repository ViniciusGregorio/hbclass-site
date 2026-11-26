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
            "pt": "Motorista recebe uma família junto a um sedã executivo na entrada de um hotel",
            "en": "Chauffeur welcoming a family beside an executive sedan at a hotel entrance"
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
          "src": "assets/novas/eventos-experiencia-v2.webp",
          "alt": {
            "pt": "Motorista recebe um casal junto ao carro na chegada a um evento",
            "en": "Chauffeur welcoming a couple beside the car on arrival at an event"
          }
        }
      ]
    },
    "aviacao": {
      "label": {
        "pt": "Aviação Executiva & FBO",
        "en": "Executive aviation & FBO"
      },
      "slides": [
        {
          "src": "assets/novas/aviacao-executiva-fbo-helicoptero-v4.webp",
          "alt": {
            "pt": "Motorista junto a um sedã executivo acompanha uma família no embarque em helicóptero no FBO ao pôr do sol",
            "en": "Chauffeur beside an executive sedan as a family approaches a helicopter at an FBO at sunset"
          }
        }
      ]
    },
    "hoteis": {
      "label": {
        "pt": "Hotéis",
        "en": "Hotels"
      },
      "slides": [
        {
          "src": "assets/novas/hoteis-experiencia-v2.webp",
          "alt": {
            "pt": "Motorista auxilia um casal na chegada de carro a um hotel",
            "en": "Chauffeur assisting a couple arriving by car at a hotel"
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
          "src": "assets/novas/family-office-private-clients-v2.webp",
          "alt": {
            "pt": "Família com duas crianças e motorista junto a um sedã executivo na entrada de uma residência",
            "en": "Family with two children and a chauffeur beside an executive sedan outside a residence"
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
          "src": "assets/galerias/andre/retrato-escritorio-v2.webp",
          "alt": {
            "pt": "André Gregório de camisa e gravata em escritório com luz natural",
            "en": "André Gregório wearing a shirt and tie in a naturally lit office"
          },
          "fit": "cover",
          "position": "center 20%"
        },
        {
          "src": "assets/galerias/andre/retrato-terno-v2.webp",
          "alt": {
            "pt": "André Gregório de terno em uma recepção corporativa",
            "en": "André Gregório wearing a suit in a corporate reception"
          },
          "fit": "cover",
          "position": "center 15%"
        }
      ]
    }
  }
};
