import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const renderDoc = {
    
    methods: {
        renderDoc(object) {
            loadFile(
                this.urlTemplate = "templates/210910-PCAP-suministro abierto.docx",
                function (error, content) {

                    if (error) {
                        throw error;
                    }

                    const zip = new PizZip(content);
                    const doc = new Docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });

                    // renderiza el documento recibe un objeto en formato JSON con las etiquetas definidas en plantilla
                    doc.render(object);

                    const out = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    });

                    // Salida de documento
                    // POSIBILIDAD DE GUARDAR DIRECTO A PDF -> out??
                    saveAs(out, "GENERADO-210910-PCAP-suministro abierto.docx");
                }
            );
        },
    },
}