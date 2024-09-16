import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import PolicyUM from '../../components/RenderDocuments/components/NONRENEWAL_TEST_DNR.pdf'



export const addTextToNonRenewal = async (texts) => {
    const pdfPath = '../../components/RenderDocuments/components/NONRENEWAL_TEST_DNR.pdf';
    const positions = [
    {x: 410, y: 180}, {x: 65, y: 637.5}, {x: 170, y: 531}, {x: 156, y: 509}, {x: 65, y: 626.5}, {x: 65, y: 615.5}, {x: 325, y: 637.5}, {x: 325, y: 626.5}, {x: 325, y: 615.5}
   
    ,{x: 65, y: 550}, {x: 65, y: 540}, {x: 65, y: 530}, {x: 65, y: 430}, {x: 65, y: 420}, {x: 65, y: 410}, {x: 120, y: 683}, {x: 355, y: 683}
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
            if (i === 0 && j !== 3 && j < 9) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (i === 0 && j === 3) {
                page.drawText(texts[j], {x, y, size: 10});
            } else if (i === 1 && j > 8) {
                page.drawText(texts[j], {x, y, size: 10});
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