export type Gap = {
  requisito: string;
  importancia: "alta" | "media" | "baixa";
  observacao: string;
};

export type AnalysisResult = {
  status: "ok";
  matchScore: number;
  resumoAderencia: string;
  palavrasChaveEncontradas: string[];
  palavrasChaveAusentes: string[];
  hardSkills: string[];
  softSkills: string[];
  gaps: Gap[];
  pontosFortes: string[];
  recomendacoes: string[];
  curriculoOtimizado: string;
  ajustesRealizados: string[];
};

export type InsufficientResult = {
  status: "insufficient";
  motivo: string;
};

export type AnalysisResponse = AnalysisResult | InsufficientResult;
