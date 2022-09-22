export default function Highlighter ({text, highlight}) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> {parts.map((part, i) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: 'blue'  } : {}}>
            {part}
        </span>)
    } </span>;
}
