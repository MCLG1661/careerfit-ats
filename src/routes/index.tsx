import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileSearch,
  FileText,
  Info,
  Lightbulb,
  Loader2,
  Printer,
  ShieldCheck,
  Target,
} from "lucide-react";

import { analyzeFit } from "@/lib/analyze.functions";
import type { AnalysisResponse, AnalysisResult } from "@/lib/careerfit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareerFit ATS — Seu currículo alinhado à vaga" },
      {
        name: "description",
        content:
          "Compare seu currículo com a descrição da vaga, veja a aderência estimada, os gaps reais e gere um currículo ATS friendly sem inventar informações.",
      },
      { property: "og:title", content: "CareerFit ATS — Seu currículo alinhado à vaga" },
      {
        property: "og:description",
        content:
          "Análise de aderência entre currículo e vaga, palavras-chave, gaps, recomendações e currículo otimizado para ATS.",
      },
    ],
  }),
  component: Index,
});

const MATCH_DISCLAIMER =
  "Indicador baseado na correspondência entre requisitos, competências e palavras-chave identificadas na vaga e no currículo. O resultado não representa a pontuação de um ATS específico nem garante aprovação em processos seletivos.";

function scoreTone(score: number) {
  if (score >= 70) return { text: "text-success", bar: "bg-success", label: "Boa aderência" };
  if (score >= 45) return { text: "text-warning", bar: "bg-warning", label: "Aderência parcial" };
  return { text: "text-destructive", bar: "bg-destructive", label: "Aderência baixa" };
}

function SectionCard({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-secondary" aria-hidden="true" />
          {title}
        </CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Chip({ tone, children }: { tone: "found" | "missing" | "neutral"; children: React.ReactNode }) {
  const styles = {
    found: "bg-success-soft text-success border-success/25",
    missing: "bg-warning-soft text-warning-foreground border-warning/40",
    neutral: "bg-info-soft text-primary border-secondary/25",
  }[tone];
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-sm font-medium ${styles}`}>
      {children}
    </span>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function Index() {
  const [vaga, setVaga] = useState("");
  const [curriculo, setCurriculo] = useState("");
  const [result, setResult] = useState<AnalysisResponse | null>(null);

  const analyze = useServerFn(analyzeFit);
  const mutation = useMutation({
    mutationFn: (payload: { vaga: string; curriculo: string }) => analyze({ data: payload }),
    onSuccess: (data) => setResult(data),
  });

  const ready = vaga.trim().length > 0 && curriculo.trim().length > 0;
  const ok = result?.status === "ok" ? (result as AnalysisResult) : null;

  function handleSubmit() {
    setResult(null);
    mutation.mutate({ vaga: vaga.trim(), curriculo: curriculo.trim() });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <FileSearch className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">CareerFit ATS</h1>
              <p className="text-sm text-muted-foreground">
                Seu currículo alinhado à vaga. Sem inventar quem você é.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 sm:px-6">
        <p className="flex items-start gap-2 rounded-md border bg-info-soft px-3 py-2.5 text-sm text-primary">
          <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>
            O CareerFit melhora a apresentação das suas experiências reais. Nenhuma experiência,
            competência ou qualificação é inventada.
          </span>
        </p>

        <section aria-labelledby="entrada" className="space-y-4">
          <h2 id="entrada" className="sr-only">
            Dados para análise
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Descrição da vaga</CardTitle>
                <CardDescription>Inclua requisitos, responsabilidades e competências.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="vaga" className="sr-only">
                  Descrição da vaga
                </Label>
                <Textarea
                  id="vaga"
                  value={vaga}
                  onChange={(e) => setVaga(e.target.value)}
                  placeholder="Cole aqui a descrição completa da oportunidade..."
                  className="min-h-64 resize-y"
                />
                <p className="text-right text-xs text-muted-foreground">{vaga.length} caracteres</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Seu currículo</CardTitle>
                <CardDescription>Cole o texto do currículo que você usa hoje.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="curriculo" className="sr-only">
                  Seu currículo
                </Label>
                <Textarea
                  id="curriculo"
                  value={curriculo}
                  onChange={(e) => setCurriculo(e.target.value)}
                  placeholder="Cole aqui o conteúdo do seu currículo..."
                  className="min-h-64 resize-y"
                />
                <p className="text-right text-xs text-muted-foreground">{curriculo.length} caracteres</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={!ready || mutation.isPending}
              onClick={handleSubmit}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Analisando currículo e vaga...
                </>
              ) : (
                <>
                  <Target className="size-4" aria-hidden="true" />
                  Analisar compatibilidade
                </>
              )}
            </Button>
            {!ready ? (
              <p className="text-xs text-muted-foreground">
                Preencha a descrição da vaga e o currículo para liberar a análise.
              </p>
            ) : null}
            <p className="max-w-xl text-center text-xs text-muted-foreground">
              Evite inserir informações pessoais sensíveis desnecessárias. Revise os dados antes de
              utilizar ou compartilhar o currículo gerado.
            </p>
          </div>
        </section>

        {mutation.isError ? (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" aria-hidden="true" />
            <AlertTitle>Não foi possível analisar</AlertTitle>
            <AlertDescription>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Ocorreu um erro inesperado. Tente novamente."}
            </AlertDescription>
          </Alert>
        ) : null}

        {result?.status === "insufficient" ? (
          <Alert className="border-warning/40 bg-warning-soft">
            <Info className="size-4" aria-hidden="true" />
            <AlertTitle>Conteúdo insuficiente para uma análise responsável</AlertTitle>
            <AlertDescription>{result.motivo}</AlertDescription>
          </Alert>
        ) : null}

        {ok ? (
          <>
            <section aria-labelledby="analise" className="space-y-4">
              <h2 id="analise" className="text-2xl font-semibold tracking-tight">
                Análise de Aderência
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Match ATS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className={`text-4xl font-semibold ${scoreTone(ok.matchScore).text}`}>
                      {ok.matchScore}%
                    </span>
                    <span className="text-sm text-muted-foreground">
                      de aderência estimada — {scoreTone(ok.matchScore).label}
                    </span>
                  </div>
                  <Progress
                    value={ok.matchScore}
                    aria-label="Aderência estimada"
                    indicatorClassName={scoreTone(ok.matchScore).bar}
                  />
                  {ok.resumoAderencia ? <p className="text-sm">{ok.resumoAderencia}</p> : null}
                  <p className="text-xs text-muted-foreground">{MATCH_DISCLAIMER}</p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <SectionCard
                  icon={CheckCircle2}
                  title="Palavras-chave encontradas no currículo"
                  description="Presentes tanto na vaga quanto no seu currículo."
                >
                  {ok.palavrasChaveEncontradas.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ok.palavrasChaveEncontradas.map((k) => (
                        <Chip key={k} tone="found">
                          {k}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    <Empty>Nenhuma palavra-chave da vaga foi identificada no currículo.</Empty>
                  )}
                </SectionCard>

                <SectionCard
                  icon={AlertTriangle}
                  title="Não identificadas no currículo"
                  description="Importantes na vaga, mas sem comprovação no seu currículo. Não foram adicionadas ao currículo otimizado."
                >
                  {ok.palavrasChaveAusentes.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ok.palavrasChaveAusentes.map((k) => (
                        <Chip key={k} tone="missing">
                          {k}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    <Empty>Nenhuma palavra-chave relevante da vaga ficou de fora.</Empty>
                  )}
                </SectionCard>

                <SectionCard icon={Target} title="Hard Skills" description="Competências técnicas do currículo com correspondência na vaga.">
                  {ok.hardSkills.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ok.hardSkills.map((s) => (
                        <Chip key={s} tone="neutral">
                          {s}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    <Empty>Nenhuma competência técnica correspondente foi identificada.</Empty>
                  )}
                </SectionCard>

                <SectionCard icon={Target} title="Soft Skills" description="Competências comportamentais sustentadas pelo texto do currículo.">
                  {ok.softSkills.length ? (
                    <div className="flex flex-wrap gap-2">
                      {ok.softSkills.map((s) => (
                        <Chip key={s} tone="neutral">
                          {s}
                        </Chip>
                      ))}
                    </div>
                  ) : (
                    <Empty>Nenhuma competência comportamental correspondente foi identificada.</Empty>
                  )}
                </SectionCard>
              </div>

              <SectionCard
                icon={AlertTriangle}
                title="Gaps em relação à vaga"
                description="Requisitos da vaga sem evidência suficiente no currículo fornecido."
              >
                {ok.gaps.length ? (
                  <ul className="space-y-3">
                    {ok.gaps.map((gap) => {
                      const critical = gap.importancia === "alta";
                      return (
                        <li
                          key={gap.requisito}
                          className={`rounded-md border p-3 ${critical ? "border-destructive/30 bg-danger-soft" : "border-warning/40 bg-warning-soft"}`}
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{gap.requisito}</span>
                            <span
                              className={`rounded px-1.5 py-0.5 text-xs font-medium ${critical ? "bg-destructive text-destructive-foreground" : "bg-warning text-warning-foreground"}`}
                            >
                              importância {gap.importancia}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-foreground/80">
                            {gap.observacao || "Não identificado no currículo fornecido."}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <Empty>Nenhum gap relevante identificado entre o currículo e a vaga.</Empty>
                )}
              </SectionCard>

              <div className="grid gap-4 md:grid-cols-2">
                <SectionCard icon={CheckCircle2} title="Pontos fortes">
                  {ok.pontosFortes.length ? (
                    <ul className="space-y-2 text-sm">
                      {ok.pontosFortes.map((p) => (
                        <li key={p} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Empty>Nenhum ponto forte de aderência foi identificado.</Empty>
                  )}
                </SectionCard>

                <SectionCard icon={Lightbulb} title="Como melhorar sua apresentação para esta vaga">
                  {ok.recomendacoes.length ? (
                    <ul className="space-y-2 text-sm">
                      {ok.recomendacoes.map((r) => (
                        <li key={r} className="flex gap-2">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Empty>Nenhuma recomendação adicional.</Empty>
                  )}
                </SectionCard>
              </div>
            </section>

            <section aria-labelledby="otimizado" className="space-y-4">
              <h2 id="otimizado" className="text-2xl font-semibold tracking-tight">
                Currículo Otimizado
              </h2>

              <p className="flex items-start gap-2 rounded-md border bg-info-soft px-3 py-2.5 text-sm text-primary">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  O CareerFit reorganizou e reescreveu apenas informações encontradas no currículo
                  original. Revise o conteúdo antes de utilizá-lo.
                </span>
              </p>

              {ok.ajustesRealizados.length ? (
                <SectionCard icon={FileText} title="Principais ajustes realizados">
                  <ul className="list-inside list-disc space-y-1 text-sm">
                    {ok.ajustesRealizados.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </SectionCard>
              ) : null}

              <Card>
                <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-base">Versão ATS friendly</CardTitle>
                  <Button variant="outline" onClick={() => window.print()} disabled={!ok.curriculoOtimizado}>
                    <Printer className="size-4" aria-hidden="true" />
                    Exportar currículo em PDF
                  </Button>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-md border bg-muted/40 p-4 font-sans text-sm leading-relaxed">
                    {ok.curriculoOtimizado || "Não foi possível gerar o currículo otimizado."}
                  </pre>
                </CardContent>
              </Card>

              <div id="resume-print" className="hidden print:block">
                {ok.curriculoOtimizado}
              </div>
            </section>
          </>
        ) : null}
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-5xl space-y-2 px-4 py-6 text-sm sm:px-6">
          <p className="font-medium">
            CareerFit ATS — Currículos mais alinhados. Informações sempre verdadeiras.
          </p>
          <Separator />
          <p className="text-xs text-muted-foreground">
            Esta ferramenta fornece uma análise estimada de aderência e não garante aprovação em
            processos seletivos.
          </p>
        </div>
      </footer>
    </div>
  );
}
