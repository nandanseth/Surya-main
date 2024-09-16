import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import PolicyUM from '../../components/RenderDocuments/components/Conditional_Renewal_Notice.pdf'



export const addTextToRenewal = async (texts) => {
    const pdfPath = '../../components/RenderDocuments/components/Conditional_Renewal_Notice.pdf';
    const positions = [
    {x: 80, y: 596}, {x: 90, y: 567.5}, {x: 170, y: 516}, {x: 175, y: 489}, {x: 400, y: 446}, {x: 60, y: 430},{x: 60, y: 415},{x: 60, y: 400}
    ];
    const pdfBytes = await fetch(PolicyUM);
    const arrayBuffer = await pdfBytes.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    console.log(pages," KKDFO")
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        for (let j = 0; j < positions.length; j++) {
            const { x, y } = positions[j];
            if (i === 0 && j < 5) {
                page.drawText(texts[j], {x, y, size: 11});
            }
            if (i === 1 && j > 4) {
                page.drawText(texts[j], {x, y, size: 11});
            }
            

            // if (j===1 && i===0) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===1 && i===2) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===1) {
            //     continue
            // }

            // if (j===2 && i===3) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===2) {
            //     continue
            // }

            // if (j===3 && i===3) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===3) {
            //     continue
            // }

            // if (j===4 && i===3) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===4) {
            //     continue
            // }

            // if (j===5 && i===3) {
            //     page.drawText(texts[j], {x, y, size: 11});
            // } else if (j===5) {
            //     continue
            // }




            
            
        }
    }
    const pdfBytesUpdated = await pdfDoc.save();
    const url = URL.createObjectURL(new Blob([pdfBytesUpdated], { type: 'application/pdf' }))
    return url;
};