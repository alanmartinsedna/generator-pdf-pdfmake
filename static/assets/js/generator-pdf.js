import { getNameEvaluationDiagnostic } from "./components/get-name-eval-diag.js";
import { getNameEconomicGroup } from "./components/get-name-economic-group.js";

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

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        // 👇 IMPORTANTE: espaço suficiente pro header
        pageMargins: [30, 50, 30, 60],
        // =========================
        // 🎯 HEADER FIXO
        // =========================
        header: function (currentPage, pageCount) {
            return {
                margin: [30, 20, 30, 10],
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
                                x2: 535,
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

    console.log('URL atual da página:', currentUrlPage);

    const evaluationName = getNameEvaluationDiagnostic(dataJson);
    const economicGroupName = getNameEconomicGroup(dataJson);

    if(currentUrlPage.includes(moduleDiagnostic) || currentUrlPage.includes(moduleEvaluation)) {
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