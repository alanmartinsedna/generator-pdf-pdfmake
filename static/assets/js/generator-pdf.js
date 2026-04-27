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

    const docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'A4',
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'portrait',
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [40, 60, 40, 60],
        content: ['Teste de exeução de gerar pdf']
    };

    pdfMake.createPdf(docDefinition).download(`Relatório ${formatedReference}.pdf`);

    console.log("[GENERATOR-PDF.JS] Fim do script");
}