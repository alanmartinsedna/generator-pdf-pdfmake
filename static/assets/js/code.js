import { generateFilePdf } from './generator-pdf.js'

document.addEventListener("DOMContentLoaded", function () {
    console.log("[CODE.JS] Início do script");

    const btnGeneratePdf = document.getElementById('btnGeneratePdf');

    const dataCenario = 'data-cenario-01.json';
    // const dataCenario = 'data-cenario-02.json';
    // const dataCenario = 'data-cenario-03.json';
    // const dataCenario = 'data-cenario-04.json';
    // const dataCenario = 'data-cenario-05.json';
    // const dataCenario = 'data-cenario-06.json';

    btnGeneratePdf.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/static/assets/json/${dataCenario}`);
            const dataJsonCenario = await response.json();

            generateFilePdf(dataJsonCenario)

        } catch (error) {
            console.error("Erro ao carregar JSON:", error);
        }
    });

    console.log("[CODE.JS] Fim do script");
});