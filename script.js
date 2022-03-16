const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;

async function modifyPdf() {
  // SVG path for a wavy line
  const svgPath =
    "M105.77314,221.47762c10.09394,23.55253,24.21851,44.08208,32.95798,68.5526c3.18782,8.9259,7.33864,17.54462,10.54655,26.36638.76575,2.10581,2.90274,8.17602,1.31832,6.5916-7.96426-7.96426-45.15151-97.96828-31.63966-108.10217c10.86039-8.14529,30.65024,13.83556,31.63966,23.72975.99158,9.91581-9.28378,19.96447-15.81983,25.04806-1.96221,1.52616-6.05937,2.915-5.27328,5.27328.87888,2.63664,5.22858,1.90537,7.90992,2.63664c12.69538,3.46238,22.12399,7.00105,32.95798,14.50151.79211.54838,17.77043,14.84453,18.45647,14.50151c3.32566-1.66283,13.16216-77.81237,7.90991-85.69075-1.3789-2.06835-2.8357-5.76079-5.27328-5.27328-1.27366.25473-2.88412,25.1829-1.31832,38.23126c1.05786,8.81554,6.32615,31.99062,17.13815,35.59462c19.4455,6.48183,25.17415-10.21413,14.50151-22.41143-1.68732-1.92837-1.90508-8.12901-3.95496-6.5916-5.15983,3.86988-1.16831,22.90087,5.27328,25.04806c2.12573.70858,4.84189.08144,6.59159-1.31832c5.58599-4.46879,9.2083-11.00782,14.50151-15.81983c15.64783-14.2253,52.20053-35.85197,63.27932-50.09613c1.7063-2.19382,3.31071-5.21364,2.63664-7.90991-2.72331-10.89326-13.74335-16.18199-17.13815-26.36638-1.19519-3.58557-1.23859-13.29351-2.63664-17.13815-.87567-2.40808-6.00484-5.05418-3.95496-6.5916c10.15379-7.61535,52.32081,31.26893,56.68772,42.18621c9.69041,24.22602-128.89867,104.96459-154.24334,125.24032";

  // Fetch an existing PDF document
  const url = document.getElementById('pdf_url').value;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Embed the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Get the width and height of the first page
  const { width, height } = firstPage.getSize();

  // Draw the SVG path as a thick green line
  firstPage.drawSvgPath(svgPath, {
    x: width / 2,
    y: height / 2 - 10,
    borderColor: rgb(0, 0, 0),
    borderWidth: 5,
    scale: 0.3,
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();

  // Trigger the browser to download the PDF document
  download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");
}
