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

type SupplyBar = {
  label: string;
  value: number;
  color: string;
  labelY: number;
  barY: number;
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
    ctx.fillStyle = i < producers ? "#ffffff" : "#233e43";
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

function drawSupplyBars(results: ShiftResults): void {
  const bars: SupplyBar[] = [
    {
      label: "Production",
      value: results.production,
      color: "#27766b",
      labelY: 102,
      barY: 110,
    },
    {
      label: "Consumption",
      value: results.consumption,
      color: "#a44d23",
      labelY: 154,
      barY: 162,
    },
  ];

  for (const bar of bars) {
    ctx.fillStyle = "#233e43";
    ctx.fillText(`${bar.label}: ${bar.value}`, 18, bar.labelY);

    ctx.fillStyle = bar.color;
    ctx.fillRect(18, bar.barY, bar.value * 14, 20);
  }
}

function renderAllocation(): void {
  const results = calculateShiftResults(assignedProducers);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(results.assignedProducers);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";

  ctx.fillText(`Producers: ${results.assignedProducers} / 6`, 18, 76);
  drawSupplyBars(results);

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
