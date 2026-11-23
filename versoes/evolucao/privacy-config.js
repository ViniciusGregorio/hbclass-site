/*
 * High Business Class — privacidade e estatísticas opcionais.
 * Arquivo público: nunca inserir senhas, tokens ou segredos.
 * O ID G-... é público; sua presença, sozinha, não ativa a coleta.
 * Antes de ativar: confirmar identificação do responsável, revisar a política,
 * desativar TODA a Medição otimizada no fluxo GA4 e revisar coleta automática,
 * retenção, compartilhamento e termos de transferência internacional na conta.
 * Somente então preencher measurementId e tornar enabled e setupReviewed true.
 */
window.HBC_PRIVACY_CONFIG = {
  policyVersion: '2026-11-23',
  controllerName: 'High Business Class',
  controllerLegalName: '',
  controllerTaxId: '63.476.106/0001-86',
  contactEmail: 'high.class.agendamentos@gmail.com',
  // Decisão técnica de validade da preferência, sem dados do planejamento.
  consentMaxAgeDays: 180,
  analytics: {
    enabled: false,
    measurementId: '',
    setupReviewed: false,
    // Validade técnica máxima dos cookies criados por esta integração.
    cookieLifetimeDays: 180
  }
};
