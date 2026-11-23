/*
 * Pré-agendamento High Business Class. Arquivo PÚBLICO, sem credenciais.
 * Não habilitar preços antes de receber e aprovar a tabela com o cliente.
 * Valores monetários são números em reais, por exemplo 250.50 (não "250,50").
 * null significa não informado; não substituir por zero.
 *
 * MODOS DE PREÇO — selecionar exatamente um em pricing.mode:
 * service_fixed: rates[serviço][veículo].fixed — preço fixo para o escopo do serviço.
 * route_fixed:  rota homologada selecionada + rota.fixedByVehicle[veículo].
 * route_distance: rota homologada com distanceKm + rates[serviço][veículo].perKm;
 *                 resultado = max(distância × R$/km, minimum), arredondado a centavos.
 *                 minimum é opcional e se aplica somente a route_distance.
 * Uma rota deve ter origin/destination, services e confirmedByClient:true.
 * A UI usa a origem/destino homologados sem inferir geocodificação ou distância.
 * Percursos personalizados sem regra de preço ficam sob consulta.
 *
 * Exemplo de ESTRUTURA de rota (não inclui dados ou preços fictícios):
 * {
 *   id: 'identificador-da-rota', label: {pt: 'Nome aprovado', en: 'Approved name'},
 *   origin: 'Origem aprovada', destination: 'Destino aprovado',
 *   services: ['aeroporto'], confirmedByClient: false, distanceKm: null,
 *   fixedByVehicle: {mercedes: null, commander: null, volvo: null, corolla: null}
 * }
 *
 * Para ativar: preencher somente regras/rotas homologadas e definir enabled:true
 * E confirmedByClient:true. Regras ausentes/inválidas continuam sob consulta.
 * Sem backend: o cálculo é indicativo. Disponibilidade e preço final são
 * confirmados pela equipe; este arquivo não é fonte para cobrança automática.
 */
window.HBC_BOOKING_CONFIG = {
  currency: 'BRL',
  timeZone: 'America/Sao_Paulo',
  minimumLeadMinutes: 0,
  whatsapp: null, // null usa HBC_CONFIG.whatsapp.
  vehicles: [
    {id: 'mercedes', name: 'Mercedes-Benz Classe E', image: 'assets/frota/mercedes.webp', passengers: null, bags: null},
    {id: 'commander', name: 'Jeep Commander', image: 'assets/frota/commander.webp', passengers: null, bags: null},
    {id: 'volvo', name: 'Volvo XC90', image: 'assets/frota/volvo.webp', passengers: null, bags: null},
    {id: 'corolla', name: 'Toyota Corolla Sedan', image: 'assets/frota/corolla.webp', passengers: null, bags: null}
  ],
  pricing: {
    enabled: false,
    confirmedByClient: false,
    mode: 'service_fixed',
    rates: {
      aeroporto: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      corporativo: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      disposicao: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      eventos: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      hoteis: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      receptivo: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      assistants: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      },
      familyoffice: {
        mercedes: {fixed: null, perKm: null, minimum: null},
        commander: {fixed: null, perKm: null, minimum: null},
        volvo: {fixed: null, perKm: null, minimum: null},
        corolla: {fixed: null, perKm: null, minimum: null}
      }
    },
    routes: []
  }
};
