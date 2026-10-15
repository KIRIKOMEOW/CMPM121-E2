export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let assignedProducers = 2;
type ShiftResults = {
  assignedProducers: number;
  production: number;
  consumption: number;
  balance: number;
};

function calculateProduction(producers: number): number {
  return producers * 3;
}

function calculateShiftResults(producers: number): ShiftResults {
  const production = calculateProduction(producers);
  const consumption = 6;
  const balance = production - consumption;

  return {
    assignedProducers: producers,
    production,
    consumption,
    balance,
  };
}

function drawCrewAssignments(producers: number): void {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < producers ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < assignedProducers ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
}

function updateAllocationReadout(results: ShiftResults): void {
  readout.textContent =
    `Assigned: ${results.assignedProducers}/6 · Production: ${results.production} · Consumption: ${results.consumption} · Balance: ${
      results.balance > 0 ? "+" : ""
    }${results.balance}`;
}

function renderAllocation(): void {
  const results = calculateShiftResults(assignedProducers);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(results.assignedProducers);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";

  ctx.fillText(`Producers: ${results.assignedProducers} / 6`, 18, 76);
  ctx.fillText(`Production: ${results.production}`, 18, 102);

  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, results.production * 14, 20);

  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${results.consumption}`, 18, 154);

  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, results.consumption * 14, 20);

  updateAllocationReadout(results);
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedProducers = Math.max(0, assignedProducers - 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedProducers = Math.min(6, assignedProducers + 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedProducers = 2;
    renderAllocation();
  };
renderAllocation();
