type Faq = { question: string; answer: string };

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details className="faq-item" key={item.question} name="cira-faq">
          <summary id={`faq-question-${index}`} aria-controls={`faq-answer-${index}`}>
            <span>{item.question}</span><span className="faq-symbol" aria-hidden="true">+</span>
          </summary>
          <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}><p>{item.answer}</p></div>
        </details>
      ))}
    </div>
  );
}
