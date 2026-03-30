/**
 * Minimal markdown-to-HTML renderer.
 * Handles: headings, bold, italic, links, lists, blockquotes, tables, code blocks, inline code, paragraphs.
 * No external dependencies.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  let result = escapeHtml(text);
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/__(.+?)__/g, "<strong>$1</strong>");
  // Italic
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  result = result.replace(/_(.+?)_/g, "<em>$1</em>");
  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // Inline code
  result = result.replace(/`([^`]+)`/g, "<code>$1</code>");
  return result;
}

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // skip closing ```
      output.push(
        `<pre><code${lang ? ` class="language-${lang}"` : ""}>${codeLines.join("\n")}</code></pre>`
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      output.push(`<h3>${renderInline(line.slice(4))}</h3>`);
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      output.push(`<h2>${renderInline(line.slice(3))}</h2>`);
      i++;
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableRows: string[] = [];
      let isHeader = true;
      while (i < lines.length && lines[i].includes("|")) {
        const row = lines[i].trim();
        // Skip separator row
        if (/^\|[\s\-:|]+\|$/.test(row)) {
          i++;
          isHeader = false;
          continue;
        }
        const cells = row
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim());
        const tag = isHeader ? "th" : "td";
        const cellsHtml = cells
          .map((c) => `<${tag}>${renderInline(c)}</${tag}>`)
          .join("");
        tableRows.push(`<tr>${cellsHtml}</tr>`);
        if (isHeader) isHeader = true; // stays header until separator
        i++;
      }
      output.push(`<table>${tableRows.join("")}</table>`);
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      output.push(
        `<blockquote><p>${renderInline(quoteLines.join(" "))}</p></blockquote>`
      );
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(renderInline(lines[i].trim().slice(2)));
        i++;
      }
      output.push(
        `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) {
        items.push(renderInline(lines[i].trim().replace(/^\d+\.\s/, "")));
        i++;
      }
      output.push(
        `<ol>${items.map((item) => `<li>${item}</li>`).join("")}</ol>`
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    output.push(`<p>${renderInline(line)}</p>`);
    i++;
  }

  return output.join("\n");
}
