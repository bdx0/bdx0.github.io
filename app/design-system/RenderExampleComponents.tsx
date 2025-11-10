import React from 'react';

export default function RenderExampleComponents() {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4">
        Example Component Reference Design Code (React + Tailwind)
      </h3>
      <div className="space-y-4">
        <h4 className="text-xl font-medium mb-2">InventoryItem Component</h4>
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <code className="text-lg text-white">
            {`// components/InventoryItem.jsx
import React from 'react';

export default function InventoryItem({ icon, name, qty, equipped }) {
  return (
    <div
      className={'w-[96px] h-[96px] p-2u rounded-hud-sm relative bg-panel-bg border border-ui-line ' + (equipped ? 'ring-2 ring-neon-cyan/70 shadow-neon-sm' : '')}
    >
      <div className="absolute top-1u right-1u text-[11px] px-1u rounded-hud-pill bg-bg-900 text-neutral-body">
        {qty}
      </div>
      <div className="flex items-center justify-center h-full">
        <img src={icon} alt={name} className="max-w-[60%] max-h-[60%]" />
      </div>
      <div className="absolute left-2u bottom-1u text-xs text-neutral-body font-sans">
        {name}
      </div>
    </div>
  );
}`}
          </code>
        </pre>

        <h4 className="text-xl font-medium mb-2">ItemTooltip Component</h4>
        <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
          <code className="text-lg text-white">
            {`// components/ItemTooltip.jsx
import React from 'react';

export default function ItemTooltip({ title, lines }) {
  return (
    <div className="w-80 bg-panel-bg p-4u rounded-hud-md shadow-neon-sm border border-ui-line">
      <div className="text-lg font-display font-semibold text-neutral-strong mb-2u">
        {title}
      </div>
      <div className="text-sm text-neutral-body space-y-1u">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
