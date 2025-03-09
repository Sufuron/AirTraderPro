// CustomImageBlot.js
import { Quill } from 'react-quill-new';

const Image = Quill.import('formats/image');

class CustomImageBlot extends Image {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('style', value.style || '');
    return node;
  }

  static value(node) {
    return {
      url: node.getAttribute('src'),
      style: node.getAttribute('style'),
    };
  }
}

CustomImageBlot.blotName = 'customImage';
CustomImageBlot.tagName = 'img';

Quill.register(CustomImageBlot, true);

// CustomImageBlot.js
export default CustomImageBlot;
