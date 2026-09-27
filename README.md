<p align="center">
  <img src="docs/careerfit-ats-brand 2.png" alt="CareerFit ATS" width="850">
</p>

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript)
![Lovable](https://img.shields.io/badge/Built%20with-Lovable-FF4F8B)
![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

# CareerFit ATS

> **Seu currículo alinhado à vaga. Sem inventar quem você é.**

O **CareerFit ATS** é uma aplicação web desenvolvida como projeto do **Santander / DIO — Trilha Lovable 2026**.

A aplicação compara o conteúdo de um currículo com a descrição de uma vaga, estima o nível de aderência, identifica palavras-chave e competências relevantes, aponta gaps e gera uma versão do currículo otimizada para sistemas ATS (*Applicant Tracking Systems*).

O princípio central do projeto é simples:

> **O CareerFit pode melhorar a forma como o candidato apresenta sua experiência, mas nunca inventa experiência, competência ou qualificação que ele não possui.**

---

## Aplicação publicada

**CareerFit ATS:**  
https://careerfit-ats.lovable.app

---

---

## 📸 Demonstração

### 1. Comparação entre vaga e currículo

O usuário insere a descrição da oportunidade e o conteúdo do currículo para iniciar a análise de compatibilidade.

![Tela inicial do CareerFit ATS](docs/screenshots/01-home.png)

### 2. Análise de aderência

O CareerFit ATS estima a aderência entre currículo e vaga, identifica palavras-chave presentes e ausentes e analisa competências relevantes.

![Análise de aderência do CareerFit ATS](docs/screenshots/02-analise-aderencia.png)

### 3. Gaps e recomendações

A aplicação identifica requisitos da vaga que não possuem evidência suficiente no currículo, destaca pontos fortes e apresenta recomendações — sem inventar experiências ou qualificações.

![Gaps e recomendações do CareerFit ATS](docs/screenshots/03-gaps-recomendacoes.png)

### 4. Currículo otimizado para ATS

Com base exclusivamente nas informações fornecidas pelo candidato, o CareerFit reorganiza e reescreve o currículo para melhorar sua apresentação e compatibilidade com sistemas ATS.

![Currículo otimizado pelo CareerFit ATS](docs/screenshots/04-curriculo-otimizado.png)

> **Princípio do projeto:** o CareerFit pode melhorar a forma como a experiência profissional é apresentada, mas nunca inventa experiência, competência ou qualificação.

---

---

## O problema

Muitos candidatos possuem experiências compatíveis com uma oportunidade, mas seus currículos não apresentam essas informações de maneira suficientemente clara ou alinhada à linguagem utilizada na descrição da vaga.

Antes mesmo de chegar a um recrutador, o currículo pode passar por sistemas ATS responsáveis por organizar, filtrar e classificar candidaturas.

O CareerFit ATS foi criado para ajudar o candidato a:

- comparar seu currículo com uma vaga específica;
- identificar requisitos presentes e ausentes;
- visualizar competências relevantes;
- identificar gaps;
- receber recomendações de melhoria;
- reorganizar o currículo para uma estrutura mais adequada a ATS;
- preservar integralmente a veracidade das informações profissionais.

---

## Como funciona

O fluxo principal da aplicação é:

**Descrição da vaga + Currículo → Análise → Aderência → Keywords → Competências → Gaps → Recomendações → Currículo otimizado → PDF**

### 1. Descrição da vaga

O usuário cola o texto completo da oportunidade que deseja analisar.

### 2. Currículo

O usuário insere o conteúdo do currículo atual.

### 3. Análise de aderência

O CareerFit compara os dois conteúdos e apresenta um indicador percentual de aderência estimada.

O percentual não representa a pontuação de um ATS específico e não garante aprovação em um processo seletivo.

### 4. Palavras-chave

A aplicação separa:

- palavras-chave identificadas no currículo;
- palavras-chave relevantes da vaga que não foram identificadas.

### 5. Competências

Quando possível, são identificadas:

- Hard Skills;
- Soft Skills;
- requisitos relacionados à oportunidade.

### 6. Gaps

Requisitos presentes na vaga, mas não comprovados pelo currículo, são apresentados como gaps.

Esses requisitos **não são automaticamente incorporados ao currículo otimizado**.

### 7. Recomendações

O CareerFit sugere formas de melhorar a apresentação das experiências reais, como:

- reposicionar competências relevantes;
- melhorar a clareza;
- destacar experiências relacionadas à vaga;
- utilizar terminologia compatível quando semanticamente verdadeira;
- priorizar resultados e responsabilidades relevantes.

### 8. Currículo otimizado

A aplicação reorganiza e reescreve somente informações existentes no currículo original.

### 9. Exportação

O currículo otimizado pode ser exportado em **PDF**.

---

## Regra de integridade

Uma das decisões mais importantes do projeto foi impedir que a otimização do currículo introduzisse informações inexistentes.

O CareerFit pode:

- reorganizar conteúdo;
- melhorar a redação;
- destacar informações;
- alterar a ordem das informações;
- utilizar termos semanticamente equivalentes;
- tornar experiências existentes mais claras.

O CareerFit não pode inventar:

- experiências profissionais;
- empresas;
- cargos;
- datas;
- competências;
- ferramentas;
- tecnologias;
- certificações;
- formação;
- idiomas;
- resultados;
- métricas.

Quando uma competência solicitada pela vaga não pode ser comprovada pelo currículo, ela é apresentada como **gap**.

---

## Teste de integridade

Durante a validação do projeto foi realizado um teste controlado.

A vaga utilizada solicitava, entre outros requisitos:

- Python;
- SQL;
- Power BI;
- Excel avançado;
- Pandas;
- AWS;
- Machine Learning;
- Tableau.

O currículo de teste possuía:

- Python;
- Power BI;
- Excel;
- Pandas;
- análise de dados;
- visualização de dados.

### Resultado

O CareerFit identificou corretamente como não comprovados:

- SQL;
- AWS;
- Machine Learning;
- Tableau;
- Excel avançado.

Um comportamento particularmente importante ocorreu com **Excel**.

Embora o currículo informasse conhecimento em Excel, a aplicação não inferiu automaticamente proficiência avançada.

**Excel ≠ Excel avançado**

O requisito "Excel avançado" permaneceu classificado como gap.

Da mesma forma, SQL, AWS, Machine Learning e Tableau não foram adicionados ao currículo otimizado.

Esse teste validou na prática a principal regra do projeto:

> **Otimizar a apresentação sem fabricar experiência.**

---

## Exemplo de análise

No teste controlado, o CareerFit apresentou uma aderência estimada de **72%**, separando competências encontradas, requisitos não identificados e gaps relevantes.

> O percentual é um indicador interno de correspondência entre currículo e vaga e não representa a pontuação de um ATS comercial específico.

---

## Mega Prompt

A primeira versão da aplicação foi criada no Lovable a partir de um **Mega Prompt estruturado em Markdown**.

O prompt especificou:

- objetivo do produto;
- público-alvo;
- fluxo da aplicação;
- identidade visual;
- design system;
- estrutura da interface;
- análise de aderência;
- palavras-chave;
- Hard Skills e Soft Skills;
- gaps;
- recomendações;
- currículo otimizado;
- exportação em PDF;
- estados da aplicação;
- responsividade;
- acessibilidade;
- privacidade;
- regra contra fabricação de informações.

### Design System

Foi solicitado o uso de:

- **shadcn/ui**;
- azul-marinho como cor principal;
- azul como cor secundária;
- verde para indicadores positivos;
- amarelo/âmbar para atenção;
- vermelho para gaps críticos ou erros;
- fundo claro;
- cards brancos;
- tipografia Inter ou equivalente.

---

## Mega Prompt original

<details>
<summary><strong>Clique para visualizar o Mega Prompt utilizado</strong></summary>

```markdown
# CareerFit ATS

Crie uma aplicação web responsiva chamada **CareerFit ATS**.

## Objetivo do produto

O CareerFit ATS ajuda candidatos a comparar seu currículo com uma descrição de vaga, identificar o nível estimado de aderência e gerar uma versão do currículo mais adequada para sistemas ATS (Applicant Tracking Systems).

A aplicação deve analisar somente as informações fornecidas pelo usuário.

Princípio central:

**"Seu currículo alinhado à vaga. Sem inventar quem você é."**

A aplicação pode reorganizar, reescrever, resumir e destacar informações existentes no currículo, mas NUNCA deve inventar experiências profissionais, cargos, empresas, datas, formação acadêmica, certificações, ferramentas, tecnologias, idiomas, competências, resultados, métricas ou responsabilidades.

Se determinada competência ou requisito estiver presente na vaga, mas não puder ser comprovado pelo currículo fornecido, apresente-o como um GAP.

Nunca acrescente esse requisito ao currículo otimizado.

## Funcionalidades principais

A aplicação deve permitir:

1. colar a descrição da vaga;
2. colar o currículo;
3. analisar a compatibilidade;
4. apresentar aderência estimada de 0 a 100%;
5. identificar palavras-chave encontradas;
6. identificar palavras-chave ausentes;
7. identificar Hard Skills e Soft Skills;
8. apresentar gaps;
9. apresentar pontos fortes;
10. fornecer recomendações;
11. gerar uma versão ATS Friendly do currículo;
12. exportar o currículo em PDF.

## Currículo ATS Friendly

O currículo otimizado deve utilizar somente informações comprovadas pelo currículo original.

Deve:

- utilizar estrutura simples;
- possuir títulos de seção claros;
- evitar tabelas complexas;
- priorizar experiências relacionadas à vaga;
- utilizar palavras-chave somente quando forem verdadeiras;
- melhorar clareza;
- melhorar concisão;
- preservar empresas, cargos e datas;
- preservar formação e certificações reais;
- preservar métricas quando existirem.

Nunca criar métricas ou resultados inexistentes.

## Design

Utilize **shadcn/ui**.

A interface deve ser clean, moderna, profissional, corporativa, tecnológica, acessível e responsiva.

Utilize azul-marinho como cor principal, azul como secundária, verde para indicadores positivos, amarelo/âmbar para atenção e vermelho para gaps críticos ou erros.

## Prioridade

Priorize o MVP:

Descrição da vaga + Currículo → Análise → Aderência → Gaps → Recomendações → Currículo ATS Friendly → PDF

Não implemente inicialmente:

- login;
- cadastro;
- autenticação;
- banco de dados;
- histórico;
- pagamentos;
- dashboard administrativo;
- integração com e-mail.

O princípio mais importante de todo o sistema é:

**O CareerFit pode melhorar como o candidato apresenta sua experiência, mas nunca pode inventar experiência que ele não possui.**
```

</details>

---

## Evolução após a primeira geração

A construção foi realizada de forma incremental.

A prioridade foi manter o escopo concentrado no **MVP funcional**, evitando inicialmente recursos que não eram necessários para validar a proposta, como:

- login;
- autenticação;
- banco de dados;
- histórico de análises;
- dashboard;
- pagamentos;
- integração com e-mail.

Após a primeira geração, o foco foi validar:

1. funcionamento da análise;
2. identificação de palavras-chave;
3. identificação de gaps;
4. comportamento diante de competências ausentes;
5. geração do currículo otimizado;
6. exportação em PDF.

A decisão foi não adicionar funcionalidades apenas para aumentar a complexidade do projeto. O objetivo foi entregar uma aplicação pequena, funcional, testável e coerente com o problema proposto.

---

## Tecnologias utilizadas

- Lovable
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase / Lovable Cloud
- Git
- GitHub

---

## Segurança e configuração

Variáveis de ambiente não são versionadas diretamente no repositório.

O arquivo `.env.example` documenta as variáveis necessárias sem armazenar valores de configuração.

```env
SUPABASE_PROJECT_ID=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

---

## Executando localmente

Clone o repositório:

```bash
git clone https://github.com/MCLG1661/careerfit-ats.git
```

Entre no diretório:

```bash
cd careerfit-ats
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env.example` e configure as variáveis necessárias.

Execute o projeto:

```bash
npm run dev
```

---

## Possíveis evoluções

O MVP foi deliberadamente mantido enxuto.

Algumas evoluções possíveis são:

- exportação em `.docx`;
- histórico de análises;
- autenticação;
- dashboard de evolução do match;
- comparação entre diferentes versões do currículo;
- especialização por área profissional;
- análise de múltiplas vagas;
- SEO;
- GEO;
- internacionalização.

---

## Sobre o projeto

Projeto desenvolvido para o desafio:

**Santander / DIO — Trilha Lovable 2026**

### Autor

**Marcus Corrêa Lopes Guedes**

Linkedin: [Marcus Guedes](https://www.linkedin.com/in/marcusguedes/)

GitHub: [MCLG1661](https://github.com/MCLG1661)

---

## Aviso

O CareerFit ATS fornece uma análise estimada de aderência entre currículo e vaga.

A ferramenta não representa nem reproduz necessariamente os critérios utilizados por plataformas ATS específicas e não garante aprovação ou avanço em processos seletivos.

O conteúdo gerado deve ser revisado pelo usuário antes de ser utilizado.

---

**CareerFit ATS — Currículos mais alinhados. Informações sempre verdadeiras.**
