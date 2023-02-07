import faqs from "../faq.json";

const FaqCollaspe = () => {
  const faq = faqs.map((el) => {
    return (
      <div
        key={el.question}
        tabIndex={0}
        className="collapse-plus rounded-box collapse border border-base-300 bg-base-100"
      >
        <div className="collapse-title text-xl font-medium">{el.question}</div>
        <div className="collapse-content">
          <p>{el.answer}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="text-center font-robotoSlab text-2xl font-bold">
        Frequently Asked Questions
      </h1>
      {faq}
    </div>
  );
};

export default FaqCollaspe;
