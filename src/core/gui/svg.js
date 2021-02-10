import { viewbox } from './constants';

export function svg(tagName, attrs) {
  
  const el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      el.setAttribute(key, attrs[key]);
    });
  }

  return el;
}

export function svgRoot() {

  const el = svg('svg', {
    version: '1.0',
    viewBox: viewbox.join(' '),
    width: '100%',
    height: '100%'
  });

  el.style = 'fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;pointer-events:bounding-box;';

  return el;
}

export function svgObject(paths, tx, ty) {

  const tg = svg('g', {
    transform: `translate(${tx}, ${ty})`
  });

  const object = svg('g');

  for (const data of paths) {
    const path = svg('path', {d: data});
    object.appendChild(path);
  }

  tg.appendChild(object);

  return tg;
}

export function rect(attrs) {
  const el = svg('rect', attrs);
  return el;
}

