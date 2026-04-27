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

    console.log('URL atual da página:', currentUrlPage);

    if (currentUrlPage.includes(moduleDiagnostic)) {
            console.log('Módulo de diagnóstico detectado');
        if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ADERENCE)) {
            console.log('Página de aderência e participação detectada');
        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.ANSWERS)) {
            console.log('Página de respostas detectada');
        } else if (currentUrlPage.includes(ROUTES.DIAGNOSTIC.RECOMMENDATIONS)) {
            console.log('Página de recomendações detectada');
        } else {
            console.log('Página de diagnóstico não reconhecida para impressão');
            alert('Esta página de diagnóstico não é compatível com a impressão. Por favor, navegue para uma página de aderência, respostas ou recomendações para imprimir.');
            return;
        }

    } else if (currentUrlPage.includes(moduleEvaluation)) {
        console.log('Módulo de avaliação detectado');
    
        if (currentUrlPage.includes(ROUTES.EVALUATION.ADERENCE)) {
            console.log('Página de aderência e participação detectada');
        } else if (currentUrlPage.includes(ROUTES.EVALUATION.ANSWERS)) {
            console.log('Página de respostas detectada');
        } else if (currentUrlPage.includes(ROUTES.EVALUATION.RECOMMENDATIONS)) {
            console.log('Página de recomendações detectada');
        } else {
            console.log('Página de avaliação não reconhecida para impressão');
            alert('Esta página de avaliação não é compatível com a impressão. Por favor, navegue para uma página de aderência, respostas ou recomendações para imprimir.');
            return;
        }

    } else {
        console.log('Módulo não reconhecido para impressão');
        alert('Esta página não é compatível com a impressão. Por favor, navegue para uma página de diagnóstico ou avaliação para imprimir.');
        return;
    }

    const evaluationName = getNameEvaluationDiagnostic(dataJson);
    const economicGroupName = getNameEconomicGroup(dataJson);

    const docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'A4',
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [20, 20, 20, 20],
        content: [
            {
                text: `${evaluationName}`,
                style: 'header-title',
            },
            {
                text: `${economicGroupName}`,
                style: 'header-sub-title',
            },
            'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        ],
        styles: {
            'header-title': {
                fontSize: 20,
                bold: true,
                margin: [0, 0, 0, 10], // [left, top, right, bottom],
                color: '#596CFF'
            },
            'header-sub-title': {
                fontSize: 10,
                bold: true,
                margin: [0, 0, 0, 10], // [left, top, right, bottom],
                color: '#333333'
            },
        }
    };

    pdfMake.createPdf(docDefinition).download(`Relatório ${formatedReference}.pdf`);

    console.log("[GENERATOR-PDF.JS] Fim do script");
}

