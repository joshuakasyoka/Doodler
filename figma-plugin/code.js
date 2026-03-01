figma.showUI(__html__, { width: 320, height: 340, title: 'Doodler UI' });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate') {
    try {
      await generateComponents();
      figma.closePlugin('✅ Doodler components generated!');
    } catch (err) {
      console.error(err);
      figma.closePlugin('❌ ' + err.message);
    }
  }
};

// ─── Tokens ───────────────────────────────────────────────────────────────────

function hex(h) {
  return {
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  };
}

const C = {
  active:  hex('#1D2021'),
  hover:   hex('#2A2E2F'),
  white:   hex('#FFFFFF'),
  grey:    hex('#F4F4F4'),
  beige:   hex('#FCEFDC'),
  text:    hex('#303030'),
  outline: hex('#E9E9E9'),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function solidFill(color, opacity = 1) {
  return [{ type: 'SOLID', color, opacity }];
}

function noFill() { return []; }

function al(frame, opts = {}) {
  const {
    dir = 'HORIZONTAL',
    align = 'CENTER',
    cross = 'CENTER',
    gap = 0,
    pt = 0, pb = 0, pl = 0, pr = 0,
  } = opts;
  frame.layoutMode = dir;
  frame.primaryAxisAlignItems = align;
  frame.counterAxisAlignItems = cross;
  frame.itemSpacing = gap;
  frame.paddingTop = pt;
  frame.paddingBottom = pb;
  frame.paddingLeft = pl;
  frame.paddingRight = pr;
}

function txt(content, opts = {}) {
  const node = figma.createText();
  node.fontName = { family: opts.family || 'Inter', style: opts.style || 'Regular' };
  node.characters = content;
  node.fontSize = opts.size || 14;
  node.fills = solidFill(opts.color || C.text, opts.opacity !== undefined ? opts.opacity : 1);
  return node;
}

function sectionLabel(text, x, y) {
  const node = figma.createText();
  node.fontName = { family: 'Inter', style: 'Medium' };
  node.characters = text;
  node.fontSize = 11;
  node.fills = solidFill(C.text, 0.35);
  node.x = x;
  node.y = y;
  figma.currentPage.appendChild(node);
  return node;
}

async function loadFonts() {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
}

// ─── Button ───────────────────────────────────────────────────────────────────

function makeButtonVariant(page, variant, size) {
  const outline = variant === 'Outline';
  const large   = size === 'Large';

  const comp = figma.createComponent();
  comp.name = `Variant=${variant}, Size=${size}`;
  comp.cornerRadius = 8;
  comp.fills = outline ? noFill() : solidFill(C.active);

  if (outline) {
    comp.strokes = [{ type: 'SOLID', color: C.active }];
    comp.strokeWeight = 1;
    comp.strokeAlign = 'INSIDE';
  }

  al(comp, { pt: large ? 12 : 8, pb: large ? 12 : 8, pl: 16, pr: 16, gap: 8 });

  comp.appendChild(txt('Button', {
    size: large ? 16 : 14,
    color: outline ? C.active : C.white,
  }));

  page.appendChild(comp);
  return comp;
}

function createButtonSet(page) {
  const vars = [
    makeButtonVariant(page, 'Primary', 'Large'),
    makeButtonVariant(page, 'Primary', 'Small'),
    makeButtonVariant(page, 'Outline', 'Large'),
    makeButtonVariant(page, 'Outline', 'Small'),
  ];
  const set = figma.combineAsVariants(vars, page);
  set.name = 'Button';
  return set;
}

// ─── Chip ─────────────────────────────────────────────────────────────────────

function makeChipVariant(page, variant) {
  const comp = figma.createComponent();
  comp.name = `Variant=${variant}`;
  comp.cornerRadius = 16;

  if (variant === 'Default') {
    comp.fills = solidFill(C.active);
  } else if (variant === 'Secondary') {
    comp.fills = solidFill(C.white);
    comp.strokes = [{ type: 'SOLID', color: C.active }];
    comp.strokeWeight = 1;
    comp.strokeAlign = 'INSIDE';
  } else {
    comp.fills = noFill();
    comp.strokes = [{ type: 'SOLID', color: C.active }];
    comp.strokeWeight = 1;
    comp.strokeAlign = 'INSIDE';
  }

  al(comp, { pt: 4, pb: 4, pl: 8, pr: 8 });
  comp.appendChild(txt('Label', { size: 12, color: variant === 'Default' ? C.white : C.active }));
  page.appendChild(comp);
  return comp;
}

function createChipSet(page) {
  const vars = [
    makeChipVariant(page, 'Default'),
    makeChipVariant(page, 'Secondary'),
    makeChipVariant(page, 'Outline'),
  ];
  const set = figma.combineAsVariants(vars, page);
  set.name = 'Chip';
  return set;
}

// ─── Icon Button ──────────────────────────────────────────────────────────────

function makeIconButtonVariant(page, size) {
  const hitArea = size === 'Large' ? 44 : 36;
  const iconDim = size === 'Large' ? 24 : 20;

  const comp = figma.createComponent();
  comp.name = `Size=${size}`;
  comp.resize(hitArea, hitArea);
  comp.fills = noFill();
  al(comp, {});

  const icon = figma.createFrame();
  icon.resize(iconDim, iconDim);
  icon.cornerRadius = 4;
  icon.fills = solidFill(C.active);
  comp.appendChild(icon);

  page.appendChild(comp);
  return comp;
}

function createIconButtonSet(page) {
  const vars = [
    makeIconButtonVariant(page, 'Large'),
    makeIconButtonVariant(page, 'Small'),
  ];
  const set = figma.combineAsVariants(vars, page);
  set.name = 'IconButton';
  return set;
}

// ─── Tab ──────────────────────────────────────────────────────────────────────

function createTabComponent(page) {
  const comp = figma.createComponent();
  comp.name = 'Tab';
  comp.cornerRadius = 16;
  comp.fills = solidFill(C.grey);
  al(comp, { gap: 4, pt: 4, pb: 4, pl: 4, pr: 4 });

  ['Tab 1', 'Tab 2', 'Tab 3'].forEach((label, i) => {
    const item = figma.createFrame();
    item.name = i === 0 ? 'Active' : `Item ${i + 1}`;
    item.cornerRadius = 12;
    item.fills = i === 0 ? solidFill(C.white) : noFill();
    al(item, { pt: 8, pb: 8, pl: 12, pr: 12 });
    item.appendChild(txt(label, { size: 14, color: C.text }));
    comp.appendChild(item);
  });

  page.appendChild(comp);
  return comp;
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function createToastComponent(page) {
  const comp = figma.createComponent();
  comp.name = 'Toast';
  comp.cornerRadius = 8;
  comp.fills = solidFill(C.active);
  comp.effects = [{
    type: 'DROP_SHADOW',
    color: { r: 0, g: 0, b: 0, a: 0.15 },
    offset: { x: 0, y: 4 },
    radius: 12,
    spread: 0,
    visible: true,
    blendMode: 'NORMAL',
  }];
  al(comp, { pt: 12, pb: 12, pl: 24, pr: 24 });
  comp.appendChild(txt('Notification message', { size: 14, color: C.white }));
  page.appendChild(comp);
  return comp;
}

// ─── Content ──────────────────────────────────────────────────────────────────

function createContentComponent(page) {
  const comp = figma.createComponent();
  comp.name = 'Content';
  comp.cornerRadius = 16;
  comp.fills = solidFill(C.white);
  comp.strokes = [{ type: 'SOLID', color: C.outline }];
  comp.strokeWeight = 1;
  comp.strokeAlign = 'INSIDE';
  al(comp, { dir: 'VERTICAL', cross: 'MIN', gap: 20, pt: 16, pb: 16, pl: 16, pr: 16 });
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(320, comp.height);

  [
    { title: 'Attribute', desc: 'Description of this attribute or finding.' },
    { title: 'Attribute', desc: 'Another piece of descriptive content here.' },
  ].forEach(({ title, desc }) => {
    const row = figma.createFrame();
    row.name = 'Item';
    row.fills = noFill();
    al(row, { dir: 'VERTICAL', cross: 'MIN', gap: 2 });
    row.layoutSizingHorizontal = 'FILL';
    row.appendChild(txt(title, { size: 14, style: 'Medium', color: C.text }));
    row.appendChild(txt(desc, { size: 14, color: C.text }));
    comp.appendChild(row);
  });

  page.appendChild(comp);
  return comp;
}

// ─── Steps Component ──────────────────────────────────────────────────────────

function createStepsComponent(page) {
  const comp = figma.createComponent();
  comp.name = 'StepsComponent';
  comp.fills = noFill();
  al(comp, { dir: 'VERTICAL', cross: 'MIN', gap: 8 });
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(560, comp.height);

  // Step labels
  const labelsRow = figma.createFrame();
  labelsRow.name = 'Labels';
  labelsRow.fills = noFill();
  al(labelsRow, { align: 'SPACE_BETWEEN' });
  labelsRow.layoutSizingHorizontal = 'FILL';

  ['Krachten', 'Klachten', 'Inzichten', 'Aanpak'].forEach((step, i) => {
    labelsRow.appendChild(txt(step, { size: 14, color: C.text, opacity: i === 0 ? 1 : 0.4 }));
  });
  comp.appendChild(labelsRow);

  // Progress track
  const track = figma.createFrame();
  track.name = 'Track';
  track.resize(560, 8);
  track.cornerRadius = 4;
  track.fills = solidFill(C.grey);
  track.layoutSizingHorizontal = 'FILL';

  const bar = figma.createFrame();
  bar.name = 'Fill';
  bar.resize(140, 8);
  bar.cornerRadius = 4;
  bar.fills = solidFill(C.active);
  track.appendChild(bar);
  comp.appendChild(track);

  // Counter
  comp.appendChild(txt('Step 1 of 4', { size: 12, color: C.text, opacity: 0.4 }));

  page.appendChild(comp);
  return comp;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateComponents() {
  await loadFonts();

  const page = figma.currentPage;
  page.name = 'Doodler UI';

  const LEFT = 0;
  let y = 0;
  const LABEL_H = 24;
  const GAP = 56;

  const place = (node, label) => {
    sectionLabel(label, LEFT, y);
    y += LABEL_H;
    node.x = LEFT;
    node.y = y;
    y += node.height + GAP;
  };

  place(createButtonSet(page),       'BUTTON');
  place(createChipSet(page),         'CHIP');
  place(createIconButtonSet(page),   'ICON BUTTON');
  place(createTabComponent(page),    'TAB');
  place(createToastComponent(page),  'TOAST');
  place(createContentComponent(page),'CONTENT');
  place(createStepsComponent(page),  'STEPS');

  figma.viewport.scrollAndZoomIntoView(page.children);
}
