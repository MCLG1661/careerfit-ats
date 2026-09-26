<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules

- A análise de aderência roda em `src/lib/analyze.functions.ts` (createServerFn + Lovable AI Gateway) e retorna JSON validado; o tipo de resposta vive em `src/lib/careerfit.ts` — motivo: manter o prompt de integridade e a normalização em um único ponto no servidor.
- A exportação do currículo usa `window.print()` com o bloco `#resume-print` e a regra `@media print` em `src/styles.css` — motivo: gera PDF com texto selecionável e sem elementos que prejudiquem leitura por ATS, sem dependências extras.
