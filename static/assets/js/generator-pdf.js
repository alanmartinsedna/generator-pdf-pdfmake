import { getNameEvaluationDiagnostic } from "./components/get-name-eval-diag.js";
import { getNameEconomicGroup } from "./components/get-name-economic-group.js";
import { generateBadge } from "./components/generate-badge.js";
import { getPeriodTimeEvaluationDiagnostic } from "./components/get-period-eval-diag.js";
import { generateTopic } from "./components/topic-block.js";
import { generateMetricsFromData } from "./components/general-metrics-eval-diag.js";
import { generateAderenceTableGroups } from "./components/generate-aderence-groups.js";
import { generateScoreCard }  from "./components/score-card.js"
import { generateScale } from "./components/scale-metrics.js"
import { generateTableAnswers } from "./components/generate-answers.js"
import { getGlobalAverageAnswers } from "./components/get-average-global-answers.js"
import { getRecommendation } from "./components/get-recomendation.js"

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

    // const pageOrientationType = 'landscape'
    const pageOrientationType = 'portrait'

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: pageOrientationType,
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
            },
            'mainRowInternalTable': {
                fontSize: 10,
                bold: false,
                color: '#000000'
            },
            'rowsInternalTable': {
                fontSize: 8,
                bold: false,
                color: '#000000'
            },
            'heading1': {
                fontSize: 24,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'heading2': {
                fontSize: 18,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'heading3': {
                fontSize: 14,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'heading4': {
                fontSize: 12,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'heading5': {
                fontSize: 10,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'heading6': {
                fontSize: 9,
                lineHeight:1.2,
                bold: true,
                alignment:'left',
                color: '#000000',
                margin:[0,0,0,0]
            },
            'bodyText': {
                leadingIndent: 20,
                fontSize: 10,
                lineHeight:1.3,
                bold: false,
                alignment:'justify',
                color: '#000000',
                margin:[20,0,0,0]
            },
            'smallText': {
                fontSize: 9,
                lineHeight: 1.3,
                bold: false,
                italics: false,
                alignment: 'left',
                margin: [0, 0, 0, 0]
            
            },
            'caption': {
                leadingIndent: 0,
                fontSize: 8,
                lineHeight: 1.2,
                bold: false,
                italics: true,
                alignment: 'center',
                margin: [0, 0, 0, 0]
            },
            'italic': {
                italics: true
            },
            'bold': {
                bold: true
            },
            'unorderedList': {
                fontSize: 10,
                bold: false,
                lineHeight: 1.4,
                margin: [40, 0, 0, 0]
            },
            'orderedList': {
                fontSize: 10,
                bold: false,
                lineHeight: 1.4,
                margin: [40, 0, 0, 0]
            },
            'underline': {
                decoration: 'underline',
                decorationColor: '#000000'
            },
            'lineThrough': {
                decoration: 'lineThrough',
                decorationColor: '#000000'
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

        if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ADERENCE) || currentUrlPage.includes(ROUTES.EVALUATION.ADERENCE)) {
            // Página de aderência e participação detectada
            docDefinition.content.push(
                generateMetricsFromData(dataJson)
            );
            docDefinition.content.push(
                ...generateAderenceTableGroups(dataJson)
            );

        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ANSWERS) || currentUrlPage.includes(ROUTES.EVALUATION.ANSWERS)) {
            // Página de respostas detectada
            docDefinition.content.push(
                generateTopic({text: 'Resultado',fontSize: 18,align: 'center',backgroundColor: '#ffffff',color: '#000000',height: 18}),
            );

            docDefinition.content.push(generateScoreCard(100, 'Nível X - Otimizado', '#1890ff'))

            docDefinition.content.push(
                generateScale({
                    parts: [
                        { color: '#ff4d4f', label: 'Nível I - Inicial' },
                        { color: '#ff6f61', label: 'Nível II - Básico' },
                        { color: '#ff8c42', label: 'Nível III - Emergente' },
                        { color: '#faad14', label: 'Nível IV - Definido' },
                        { color: '#fadb14', label: 'Nível V - Gerenciado' },
                        { color: '#d3f261', label: 'Nível VI - Integrado' },
                        { color: '#95de64', label: 'Nível VII - Padronizado' },
                        { color: '#52c41a', label: 'Nível VIII - Estruturado' },
                        { color: '#36cfc9', label: 'Nível IX - Monitorado' },
                        { color: '#1890ff', label: 'Nível X - Otimizado' }
                    ], hasLegend: true
                })
            ); 

            docDefinition.content.push(generateTableAnswers(getGlobalAverageAnswers(dataJson)))


        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.RECOMMENDATIONS) || currentUrlPage.includes(ROUTES.EVALUATION.RECOMMENDATIONS)) {
            // Página de recomendações detectada
            docDefinition.content.push(
                generateTopic({text: 'Percepção geral do público',fontSize: 18,align: 'center',backgroundColor: '#ffffff',color: '#000000',height: 18}),
            );

            docDefinition.content.push(generateScoreCard(75, 'Nível VIII - Estruturado', '#52c41a'))

            docDefinition.content.push(
                generateScale({
                    parts: [
                        { color: '#ff4d4f', label: 'Nível I - Inicial' },
                        { color: '#ff6f61', label: 'Nível II - Básico' },
                        { color: '#ff8c42', label: 'Nível III - Emergente' },
                        { color: '#faad14', label: 'Nível IV - Definido' },
                        { color: '#fadb14', label: 'Nível V - Gerenciado' },
                        { color: '#d3f261', label: 'Nível VI - Integrado' },
                        { color: '#95de64', label: 'Nível VII - Padronizado' },
                        { color: '#52c41a', label: 'Nível VIII - Estruturado' },
                        { color: '#36cfc9', label: 'Nível IX - Monitorado' },
                        { color: '#1890ff', label: 'Nível X - Otimizado' }
                    ], hasLegend: true
                })
            ); 
            
            docDefinition.content.push(getRecommendation(dataJson))
        }

        pdfMake.createPdf(docDefinition).download(`Relatório ${formatedReference}.pdf`);

    } else {
        alert('Módulo não reconhecido. Por favor, navegue para uma página de diagnóstico ou avaliação para imprimir.');
    }

    console.log("[GENERATOR-PDF.JS] Fim do script");
};