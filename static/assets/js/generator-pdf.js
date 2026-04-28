import { getNameEvaluationDiagnostic } from "./components/get-name-eval-diag.js";
import { getNameEconomicGroup } from "./components/get-name-economic-group.js";
import { generateBadge } from "./components/generate-badge.js";
import { getPeriodTimeEvaluationDiagnostic } from "./components/get-period-eval-diag.js";

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

    // =========================
    // 🎯 ESTADO INICIAL
    // =========================

    const PAGE_MARGIM_TOP = 50; // margem superior para evitar sobreposição com o header
    const PAGE_MARGIM_BOTTOM = 60; // margem inferior para evitar sobreposição com o footer
    const PAGE_MARGIM_LEFT = 30; // margem esquerda para evitar sobreposição com o header
    const PAGE_MARGIM_RIGHT = 30; // margem direita para evitar sobreposição com o header

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
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

        if (currentUrlPage.includes(moduleDiagnostic)) {
            console.log('Módulo de diagnóstico detectado');
            if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ADERENCE)) {
                console.log('Página de aderência e participação detectada');

            } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ANSWERS)) {
                console.log('Página de respostas detectada');

            } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.RECOMMENDATIONS)) {
                console.log('Página de recomendações detectada');

            }

        } else if (currentUrlPage.includes(moduleEvaluation)) {
            console.log('Módulo de avaliação detectado');
        
            if (currentUrlPage.includes(ROUTES.EVALUATION.ADERENCE)) {
                console.log('Página de aderência e participação detectada');

            } else if (currentUrlPage.includes(ROUTES.EVALUATION.ANSWERS)) {
                console.log('Página de respostas detectada');

            } else if (currentUrlPage.includes(ROUTES.EVALUATION.RECOMMENDATIONS)) {
                console.log('Página de recomendações detectada');

            }
        }

        pdfMake.createPdf(docDefinition).download(`Relatório ${formatedReference}.pdf`);

    } else {
        alert('Módulo não reconhecido. Por favor, navegue para uma página de diagnóstico ou avaliação para imprimir.');
    }

    console.log("[GENERATOR-PDF.JS] Fim do script");
};