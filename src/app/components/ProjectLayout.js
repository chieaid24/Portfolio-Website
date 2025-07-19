export default function ProjectLayout({ title, subtitle, summary, tool_paragraphs }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{title}</h1>
      {/* {tool_paragraphs.map((text, idx) => (
        <p key={idx} className="mb-4 leading-relaxed text-lg text-gray-700">
          {text}
        </p>
      ))} */}
    </div>
  );
}