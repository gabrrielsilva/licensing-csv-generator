import fs from 'node:fs';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Forneça o caminho do arquivo de texto.');
  process.exit(1);
}

const attOut = fs.readFileSync(filePath, 'utf-8');
const attOutRows = attOut.trim().split('\n');

// Remove header
attOutRows.shift();

const csvHeader = "ID,Extensão da rede(m),Coordenada X,Coordenada Y,MT(SIM/NÃO),AT(SIM/NÃO),Intervenção(INST/ESPI),Equipamento,Altura poste(m),Esforço(kgf),Instalação,Protocolo de aprovação do ponto,Diâmetro cabo (mm),Tipo de cabo,Diâmetro de apoio(mm),Logradouro,Bairro,Observações";
const csvRows = [csvHeader];

// Process each line of file
attOutRows.map(row => {
  const columns = row.replace('\r', '').split('\t');

  const poleId = columns[4];
  const poleHeight = columns[2].split('/')[0];
  const poleKgf = columns[5];
  const poleExistingNetwork = columns[6];
  const poleCoordinateX = columns[7].replace('X=', '');
  const poleCoordinateY = columns[8].replace('Y=', '');;
  const poleIntervention = poleExistingNetwork === 'SIM' ? 'ESPI' : 'INST';
  const poleInstallation = poleExistingNetwork === 'SIM' ? 'EXIS' : 'NOVA';

  csvRows.push(`${poleId},,${poleCoordinateX},${poleCoordinateY},SIM,NÃO,${poleIntervention},NOEQ,${poleHeight},${poleKgf},${poleInstallation},,20,FIBR,4.8`);
});

const byteOrderMark = '\uFEFF';
const csvContent = byteOrderMark + csvRows.join('\n');
const outputFilePath = filePath.replace(/\.txt$/, '.csv');

fs.writeFileSync(outputFilePath, csvContent, 'utf-8');