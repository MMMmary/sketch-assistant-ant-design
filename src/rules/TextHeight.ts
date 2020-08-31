import { RuleContext } from '@sketch-hq/sketch-assistant-types';
import { ruleFactory } from '../utils';

/**
 * 图层名称不允许包含备份
 */
const TextHeightFn = async (context: RuleContext) => {
  const { utils } = context;
  const { objects } = utils;
  // eslint-disable-next-line no-restricted-syntax
  for (const layer of objects.text) {
    const textStyle = layer?.style?.textStyle;
    const size = textStyle?.encodedAttributes.MSAttributedStringFontAttribute.attributes.size;
    const maxHeight = textStyle?.encodedAttributes.paragraphStyle?.maximumLineHeight;
    const minHeight = textStyle?.encodedAttributes.paragraphStyle?.minimumLineHeight;
    if (size && (maxHeight !== size + 8 || minHeight !== size + 8)) {
      utils.report(`图层的行高不等于字号+8`, layer);
    }
  }
};

const TextHeight = ruleFactory({
  title: '文本行高需要为文本字号+8px',
  identifier: 'text-height',
  description: 'xxxxxx',
  rule: TextHeightFn,
});

export default TextHeight;
