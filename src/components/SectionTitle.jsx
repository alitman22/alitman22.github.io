function SectionTitle({ number, title }) {
  return (
    <h2 className="section-title">
      <span className="section-number">{number}.</span>
      {title}
    </h2>
  );
}

export default SectionTitle;
