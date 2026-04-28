import { getNameEvaluationDiagnostic } from "./components/get-name-eval-diag.js";
import { getNameEconomicGroup } from "./components/get-name-economic-group.js";
import { generateBadge } from "./components/generate-badge.js";
import { getPeriodTimeEvaluationDiagnostic } from "./components/get-period-eval-diag.js";
import { generateTopic } from "./components/topic-block.js";
import { globalAnswersEvaluationDiagnostic } from "./components/get-global-answereds.js";

export function generateFilePdf(dataJson) {
    console.log("[GENERATOR-PDF.JS] Início do script");

    let currentTime = new Date();
    // Convertemos para String e aplicamos o padStart
    let day = String(currentTime.getDate()).padStart(2, '0');
    let month = String(currentTime.getMonth() + 1).padStart(2, '0');
    let year = currentTime.getFullYear();
    let hours = String(currentTime.getHours()).padStart(2, '0');
    let minute = String(currentTime.getMinutes()).padStart(2, '0');
    let seconds = String(currentTime.getSeconds()).padStart(2, '0');
    let formatedReference = `${day}${month}${year}${hours}${minute}${seconds}` 

    const currentUrlPage = window.location.pathname;
    const moduleDiagnostic = '/diagnostico/';
    const moduleEvaluation = '/avaliacao/';
    const ROUTES = {
        DIAGNOSTIC: {
            ADERENCE: '/diagnostico/aderencia-participacao/',
            ANSWERS: '/diagnostico/respostas/',
            RECOMMENDATIONS: '/diagnostico/recomendacoes/',
        },
        EVALUATION: {
            ADERENCE: '/avaliacao/aderencia-participacao/',
            ANSWERS: '/avaliacao/respostas/',
            RECOMMENDATIONS: '/avaliacao/recomendacoes/',
        },
    };
    
    let currentPageSection = '';
    const sectionAderence = 'Aderência de participação';
    const sectionAnswers = 'Respostas';
    const sectionRecommendations = 'Recomendações';

    // =========================
    // 🎯 ESTADO INICIAL
    // =========================

    const PAGE_MARGIM_TOP = 50; // margem superior para evitar sobreposição com o header
    const PAGE_MARGIM_BOTTOM = 60; // margem inferior para evitar sobreposição com o footer
    const PAGE_MARGIM_LEFT = 30; // margem esquerda para evitar sobreposição com o header
    const PAGE_MARGIM_RIGHT = 30; // margem direita para evitar sobreposição com o header

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // 👇 IMPORTANTE: espaço suficiente pro header
        pageMargins: [PAGE_MARGIM_LEFT, PAGE_MARGIM_TOP, PAGE_MARGIM_RIGHT, PAGE_MARGIM_BOTTOM],
        // =========================
        // 🎯 HEADER FIXO
        // =========================
        header: function (currentPage, pageCount, pageSize) {
            const lineLengthUtil = pageSize.width - PAGE_MARGIM_LEFT - PAGE_MARGIM_RIGHT;
            return {
                margin: [PAGE_MARGIM_LEFT, 20, PAGE_MARGIM_RIGHT, 10],
                stack: [
                    {
                        columns: [
                            {
                                text: 'EDNA Compliance',
                                fontSize: 12,
                                bold: true
                            },
                            {
                                text: 'Relatório diagnóstico e avaliação',
                                alignment: 'right',
                                fontSize: 10
                            }
                        ]
                    },
                    {
                        canvas: [
                            {
                                type: 'line',
                                x1: 0,
                                y1: 5,
                                x2: lineLengthUtil,
                                y2: 5,
                                lineWidth: 1,
                                lineColor: '#cccccc'
                            }
                        ]
                    }
                ]
            };
        },
        // =========================
        // 📄 FOOTER COM PAGINAÇÃO
        // =========================
        footer: function (currentPage, pageCount) {
            return {
                margin: [30, 10, 30, 20],
                columns: [
                    {
                        text: `Gerado em: ${currentTime.toLocaleString()}`,
                        fontSize: 8
                    },
                    {
                        text: `Página ${currentPage} de ${pageCount}`,
                        alignment: 'right',
                        fontSize: 8,
                        bold: true
                    }
                ]
            };
        },
        // ===========================
        // 📦 CONTEÚDO PARA GERAR PDF
        // ===========================
        content: [],
        
        // =========================
        // 🎨 ESTILOS
        // =========================
        styles: {
            'header-title': {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10],
                color: '#596CFF'
            },
            'header-sub-title': {
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10],
                color: '#333333'
            },
            'paragraph': {
                fontSize: 12,
                margin: [0, 0, 0, 10],
                alignment: 'justify',
                leadingIndent: 20,
                lineHeight: 1.3
            }
        }
    };

    const evaluationName = getNameEvaluationDiagnostic(dataJson);
    const economicGroupName = getNameEconomicGroup(dataJson);

    if(currentUrlPage.includes(moduleDiagnostic) || currentUrlPage.includes(moduleEvaluation)) {
        // Adiciona o título, subtítulo
        docDefinition.content.push(
            {
                text: evaluationName,
                style: 'header-title'
            },
            {
                text: economicGroupName,
                style: 'header-sub-title'
            }
        );
        
        // Adiciona badge do period
        docDefinition.content.push(generateBadge(getPeriodTimeEvaluationDiagnostic(dataJson), 'left'));
        // Espaçamento entre badge e próximo conteúdo
        
        if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ADERENCE) || currentUrlPage.includes(ROUTES.EVALUATION.ADERENCE)) {
            // Página de aderência e participação detectada
            currentPageSection = sectionAderence;
        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ANSWERS) || currentUrlPage.includes(ROUTES.EVALUATION.ANSWERS)) {
            // Página de respostas detectada
            currentPageSection = sectionAnswers;
        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.RECOMMENDATIONS) || currentUrlPage.includes(ROUTES.EVALUATION.RECOMMENDATIONS)) {
            // Página de recomendações detectada
            currentPageSection = sectionRecommendations;
        }

        docDefinition.content.push(
            generateTopic({text: `${currentPageSection}`,fontSize: 12,align: 'left',backgroundColor: '#e9ecef',color: '#596CFF',height: 30}),
        );

        globalAnswersEvaluationDiagnostic(dataJson)

        if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ADERENCE) || currentUrlPage.includes(ROUTES.EVALUATION.ADERENCE)) {
            // Página de aderência e participação detectada
            docDefinition.content.push(
                {
                    table: {
                        widths: ['*', '*', '*', '16,666667%', '16,666667%', '16,666667%'],
                        body: [
                            [
                                { text: '' },
                                { text: '' },
                                { text: '' },
                                {
                                    stack: [
                                        {
                                            text: [
                                                { text: 'Pendentes\n', fontSize: 11, color: '#000000', bold: true },
                                                { text: 'diagnósticos', fontSize: 9, color: '#000000' }
                                            ],
                                            margin: [0, 0, 0, 15],
                                            alignment: 'left'
                                        },
                                        {
                                            text: '0%',
                                            fontSize: 16,
                                            bold: true,
                                            color: '#000000',
                                            alignment: 'left'
                                        }
                                    ]
                                },
                                {
                                    stack: [
                                        {
                                            text: [
                                                { text: 'Respondidas\n', fontSize: 11, color: '#000000', bold: true },
                                                { text: 'diagnósticos', fontSize: 9, color: '#000000' }
                                            ],
                                            margin: [0, 0, 0, 15],
                                            alignment: 'left'
                                        },
                                        {
                                            text: '10',
                                            fontSize: 16,
                                            bold: true,
                                            color: '#000000',
                                            alignment: 'left'
                                        }
                                    ]
                                },
                                {
                                    stack: [
                                        {
                                            text: [
                                                { text: 'Público total\n', fontSize: 11, color: '#000000', bold: true },
                                                { text: 'pessoas', fontSize: 9, color: '#000000' }
                                            ],
                                            margin: [0, 0, 0, 15],
                                            alignment: 'left'
                                        },
                                        {
                                            text: '10',
                                            fontSize: 16,
                                            bold: true,
                                            color: '#000000',
                                            alignment: 'left'
                                        }
                                    ]
                                }
                            ]
                        ]
                    },
                    layout: {
                        hLineWidth: () => 0,
                        vLineWidth: (i) => {
                            if (i === 3 || i === 4 || i === 5) return 2;
                            return 0;
                        },
                        vLineColor: (i) => {
                            if (i === 3) return '#BA2A9B'; // vermelho
                            if (i === 4) return '#65d34a'; // verde
                            if (i === 5) return '#0077c2'; // azul
                            return null;
                        },
                        paddingLeft: () => 10,
                        paddingRight: () => 10,
                        paddingTop: () => 0,
                        paddingBottom: () => 0
                    },
                    margin: [0, 20, 0, 20]
                }
            );


        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ANSWERS) || currentUrlPage.includes(ROUTES.EVALUATION.ANSWERS)) {
            // Página de respostas detectada

        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.RECOMMENDATIONS) || currentUrlPage.includes(ROUTES.EVALUATION.RECOMMENDATIONS)) {
            // Página de recomendações detectada
        }


        pdfMake.createPdf(docDefinition).download(`Relatório ${formatedReference}.pdf`);

    } else {
        alert('Módulo não reconhecido. Por favor, navegue para uma página de diagnóstico ou avaliação para imprimir.');
    }

    console.log("[GENERATOR-PDF.JS] Fim do script");
};