function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightedText({ text, className, highlights = [], highlightMetrics = false }) {
  if (!text) return null;

  const phrases = highlights
    .filter(Boolean)
    .map((phrase) => phrase.trim())
    .filter((phrase, index, list) => list.indexOf(phrase) === index)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex);

  const metricPattern = highlightMetrics
    ? [
      // Capture measurable outcomes with nearby context instead of bare numbers.
      '(?:~?\\d+(?:[.,]\\d+)?%\\s*(?:[\\p{L}\\-/()]+\\s*){0,4})',
      '(?:\\d+\\+?\\s?(?:TB|GB|MB|VMs?|VM|nodes?|services?|regions?|sunucu|servis|düğüm|dugum|bolge|bölge)\\b(?:\\s*(?:ve|and)\\s*\\d+\\+?\\s?(?:TB|GB|MB|VMs?|VM|nodes?|services?|regions?|sunucu|servis|düğüm|dugum|bolge|bölge)\\b)?)',
      '(?:~?\\d+(?:ms|us|μs)\\s*(?:den|to|->|→|-|–)?\\s*\\d*(?:ms|us|μs)?)'
    ].join('|')
    : '';

  const combinedPattern = [phrases.join('|'), metricPattern].filter(Boolean).join('|');

  if (!combinedPattern) {
    return <span className={className}>{text}</span>;
  }

  const pattern = new RegExp(`(${combinedPattern})`, 'giu');

  const parts = text.split(pattern);

  const checkPattern = new RegExp(`^(${combinedPattern})$`, 'iu');

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;
        const isHighlight = checkPattern.test(part);

        if (!isHighlight) {
          return <span key={`${part}-${index}`}>{part}</span>;
        }

        return (
          <span key={`${part}-${index}`} className="hl-tech">
            {part}
          </span>
        );
      })}
    </span>
  );
}

export default HighlightedText;
