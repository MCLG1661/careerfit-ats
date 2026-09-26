import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { AnalysisResponse } from "./careerfit";

const inputSchema = z.object({
  vaga: z.string().min(1).max(40000),
  curriculo: z.string().min(1).max(40000),
});

const SYSTEM_PROMPT = `Você é o CareerFit ATS, um analista de recrutamento e especialista em currículos ATS.

PRINCÍPIO ABSOLUTO E INEGOCIÁVEL:
"Seu currículo alinhado à vaga. Sem inventar quem você é."

Você pode reorganizar, reescrever, resumir, priorizar e destacar informações QUE JÁ EXISTEM no currículo fornecido.
Você NUNCA pode inventar: experiências, cargos, empresas, datas, formação, certificações, ferramentas, tecnologias, idiomas, competências, resultados, métricas ou responsabilidades.
Se um requisito da vaga não puder ser comprovado pelo currículo, ele é um GAP e NUNCA deve entrar no currículo otimizado.
Nunca crie métricas ou resultados inexistentes. Preserve empresas, cargos, datas, formação e certificações exatamente como estão.

Responda SEMPRE em português do Brasil e SOMENTE com um objeto JSON válido, sem markdown e sem comentários.

Se o currículo (ou a vaga) tiver conteúdo insuficiente para uma análise responsável, retorne:
{"status":"insufficient","motivo":"<explicação curta e útil para o usuário>"}

Caso contrário retorne exatamente esta estrutura:
{
  "status": "ok",
  "matchScore": <inteiro 0-100 estimado pela correspondência de requisitos, competências e palavras-chave>,
  "resumoAderencia": "<2 a 3 frases objetivas sobre a aderência>",
  "palavrasChaveEncontradas": ["<palavras-chave da vaga presentes no currículo>"],
  "palavrasChaveAusentes": ["<palavras-chave importantes da vaga ausentes no currículo>"],
  "hardSkills": ["<competências técnicas do currículo que correspondem à vaga>"],
  "softSkills": ["<competências comportamentais sustentadas pelo texto do currículo>"],
  "gaps": [{"requisito":"<requisito da vaga>","importancia":"alta|media|baixa","observacao":"<por que não foi identificado no currículo>"}],
  "pontosFortes": ["<fatores reais de aderência comprovados pelo currículo>"],
  "recomendacoes": ["<ações práticas de apresentação, sem sugerir alegar competências inexistentes>"],
  "curriculoOtimizado": "<currículo em texto puro, pronto para ATS>",
  "ajustesRealizados": ["<principais ajustes feitos em relação ao currículo original>"]
}

Regras do campo curriculoOtimizado:
- texto puro, sem markdown, sem tabelas, sem colunas, sem caracteres decorativos;
- títulos de seção em MAIÚSCULAS em linha própria;
- itens de lista começando com "- ";
- ordem sugerida, apenas quando a informação existir no original: NOME E CONTATO, RESUMO PROFISSIONAL, COMPETÊNCIAS, EXPERIÊNCIA PROFISSIONAL, FORMAÇÃO ACADÊMICA, CERTIFICAÇÕES, IDIOMAS, PROJETOS RELEVANTES;
- nunca crie uma seção sem informação de origem;
- use terminologia da vaga apenas quando for verdadeira em relação ao currículo.`;

export const analyzeFit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<AnalysisResponse> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      throw new Error("Serviço de análise indisponível no momento.");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.7-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `DESCRIÇÃO DA VAGA:\n"""\n${data.vaga}\n"""\n\nCURRÍCULO DO CANDIDATO:\n"""\n${data.curriculo}\n"""\n\nAnalise e responda apenas com o JSON.`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (response.status === 429) {
      throw new Error("Muitas análises em sequência. Aguarde alguns instantes e tente novamente.");
    }
    if (response.status === 402) {
      throw new Error("O limite de uso da análise foi atingido. Tente novamente mais tarde.");
    }
    if (!response.ok) {
      console.error("AI gateway error", response.status, await response.text());
      throw new Error("Não foi possível concluir a análise. Tente novamente.");
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const raw = payload.choices?.[0]?.message?.content;
    if (!raw) {
      throw new Error("Não foi possível concluir a análise. Tente novamente.");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim());
    } catch {
      throw new Error("A análise retornou um formato inesperado. Tente novamente.");
    }

    const result = parsed as Partial<AnalysisResponse> & Record<string, unknown>;

    if (result.status === "insufficient") {
      return {
        status: "insufficient",
        motivo:
          typeof result["motivo"] === "string" && result["motivo"].trim()
            ? (result["motivo"] as string)
            : "O conteúdo fornecido é insuficiente para uma análise responsável.",
      };
    }

    const list = (value: unknown): string[] =>
      Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && !!v.trim()) : [];

    const score = Number(result["matchScore"]);

    return {
      status: "ok",
      matchScore: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : 0,
      resumoAderencia: typeof result["resumoAderencia"] === "string" ? result["resumoAderencia"] : "",
      palavrasChaveEncontradas: list(result["palavrasChaveEncontradas"]),
      palavrasChaveAusentes: list(result["palavrasChaveAusentes"]),
      hardSkills: list(result["hardSkills"]),
      softSkills: list(result["softSkills"]),
      gaps: Array.isArray(result["gaps"])
        ? (result["gaps"] as unknown[])
            .filter((g): g is Record<string, unknown> => !!g && typeof g === "object")
            .map((g) => ({
              requisito: String(g["requisito"] ?? ""),
              importancia:
                g["importancia"] === "alta" || g["importancia"] === "baixa"
                  ? (g["importancia"] as "alta" | "baixa")
                  : "media",
              observacao: String(g["observacao"] ?? ""),
            }))
            .filter((g) => g.requisito)
        : [],
      pontosFortes: list(result["pontosFortes"]),
      recomendacoes: list(result["recomendacoes"]),
      curriculoOtimizado:
        typeof result["curriculoOtimizado"] === "string" ? result["curriculoOtimizado"] : "",
      ajustesRealizados: list(result["ajustesRealizados"]),
    };
  });
