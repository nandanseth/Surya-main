import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import PolicyUMNJ from '../../components/RenderDocuments/components/PolicyUM/PolicyUMNJ.pdf'
import { UMStateInfoMapping } from '../../utils/documents/UMInfoMapping'


export const addTextToPDF = async (texts, states, CSLOrSplit) => {

    const secondaryFormStates = ['Arizona', 'Pennsylvania']

    const secondaryFormMapping = {
        'Arizona': {'Combined Single Limit': 6, 'Split Limit': 6},
        'Pennsylvania': {'Combined Single Limit': 6, 'Split Limit': 4}
    }

    const extraTexts = [`Policy Number: ${texts[0]}`, 'Business Auto Declarations']

    const extraPositions = [{xNew: 70, yNew: 750}, {xNew: 420, yNew: 750}]

    const secondaryFormInts = [2,3,4,5]

    const pdfLink = UMStateInfoMapping[states][CSLOrSplit].pdfLink
    const pdf = UMStateInfoMapping[states][CSLOrSplit].pdf
    const positions = UMStateInfoMapping[states][CSLOrSplit].positions

    // const pdfPath = '../../components/RenderDocuments/components/PolicyUM/PolicyUMNJ.pdf';
    const pdfPath = pdfLink
    // const positions = [
    // {x: 155, y: 787.5},
    // {x: 205, y: 627.5},
    // {x: 175, y: 485},
    // {x: 225, y: 467.5},
    // {x: 175, y: 407.5},
    // {x: 430, y: 407.5}
    // ];

     

    // const positions = []

    const pdfBytes = await fetch(pdf);
    const arrayBuffer = await pdfBytes.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        for (let j = 0; j < positions.length; j++) {
            const { x, y } = positions[j];

            if (j===0 && states !== "New Jersey" && i <= 2 || j===0 && states==="New Jersey") {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===0) {
                continue
            }

            if (states !== "New Jersey" && i >= 3) {
                for (const positionNew of extraPositions) {
                    const {xNew, yNew} = positionNew
                    const k = extraPositions.indexOf(positionNew)
                    console.log(xNew, yNew, 'sl')
                    const textsNew = extraTexts[k]
                    page.drawText(textsNew, {x: xNew, y: yNew, size: 11})
                }
            }



            if (j===1 && i===0) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===1 && i===2) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===1) {
                continue
            }

            if (secondaryFormStates.includes(states)) {
                if (secondaryFormInts.includes(j) && i===secondaryFormMapping[states][CSLOrSplit]) {
        
                    page.drawText(texts[j], {x, y, size: 11});
                }
            }

            if (j===2 && i===3) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===2) {
                continue
            }

            if (j===3 && i===3) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===3) {
                continue
            }

            

            if (j===4 && i===3) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===4) {
                continue
            }

            if (j===5 && i===3) {
                page.drawText(texts[j], {x, y, size: 11});
            } else if (j===5) {
                continue
            }

            console.log(secondaryFormStates.includes(states),'dofm')

            




            
            
        }
    }
    const pdfBytesUpdated = await pdfDoc.save();
    const url = URL.createObjectURL(new Blob([pdfBytesUpdated], { type: 'application/pdf' }))
    return url;
};