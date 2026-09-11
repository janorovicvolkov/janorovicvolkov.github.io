const postsPath = "/blogs/posts/";
let allPosts = [];

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  }[character]));
}

function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: markdown };

  const data = {};
  match[1].split("\n").forEach((line) => {
    const separator = line.indexOf(":");
    if (separator === -1) return;
    const key = line.slice(0, separator).trim();
    data[key] = line.slice(separator + 1).trim();
  });
  return { data, body: match[2] };
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown) {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const lines = block.split("\n");
    if (lines.every((line) => /^[-*] /.test(line))) {
      return `<ul>${lines.map((line) => `<li>${inlineMarkdown(line.slice(2))}</li>`).join("")}</ul>`;
    }
    if (lines.length === 1 && /^### /.test(lines[0])) return `<h3>${inlineMarkdown(lines[0].slice(4))}</h3>`;
    if (lines.length === 1 && /^## /.test(lines[0])) return `<h2>${inlineMarkdown(lines[0].slice(3))}</h2>`;
    if (lines.length === 1 && /^# /.test(lines[0])) return `<h2>${inlineMarkdown(lines[0].slice(2))}</h2>`;
    if (lines.every((line) => /^```/.test(line))) return `<pre><code>${escapeHtml(lines.slice(1, -1).join("\n"))}</code></pre>`;
    return `<p>${lines.map(inlineMarkdown).join("<br>")}</p>`;
  }).join("");
}

function postBodyWithoutTitle(post) {
  const headingPattern = /^\s*#\s+(.+?)\s*(?:\n|$)/;
  const match = post.body.match(headingPattern);
  if (match && match[1].trim() === post.title.trim()) {
    return post.body.slice(match[0].length);
  }
  return post.body;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(`${date}T00:00:00`));
}

function renderPosts(posts) {
  const list = document.getElementById("post-list");
  if (!posts.length) {
    list.innerHTML = '<p class="loading-state">No notes match that search.</p>';
    return;
  }

  list.innerHTML = posts.map((post, index) => `
    <article class="post-entry ${index === 0 ? "post-entry-featured" : ""}">
      <div class="post-meta"><span>${escapeHtml(post.tag || "Note")}</span><time datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time></div>
      <h2><a href="/blogs/?post=${encodeURIComponent(post.file)}">${escapeHtml(post.title)}</a></h2>
      <div class="post-body">${markdownToHtml(postBodyWithoutTitle(post))}</div>
      <a class="post-read-link" href="/blogs/?post=${encodeURIComponent(post.file)}">Read note <span>↗</span></a>
    </article>
  `).join("");
}

function renderPostDetail(post) {
  const heading = document.getElementById("blog-title");
  const intro = document.querySelector(".blog-intro");
  const search = document.getElementById("post-search");
  const list = document.getElementById("post-list");

  heading.innerHTML = "One note<br><em>at a time.</em>";
  intro.textContent = "A Markdown file, rendered as a page when you open it.";
  search.hidden = true;
  document.title = `${post.title} | Janorovic Volkov`;
  list.innerHTML = `
    <article class="post-detail">
      <a class="post-back-link" href="/blogs/">← Back to all notes</a>
      <div class="post-meta"><span>${escapeHtml(post.tag || "Note")}</span><time datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time></div>
      <h2>${escapeHtml(post.title)}</h2>
      <div class="post-body">${markdownToHtml(postBodyWithoutTitle(post))}</div>
    </article>`;
}

function searchPosts(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    renderPosts(allPosts);
    return;
  }

  const matches = allPosts.filter((post) => [post.title, post.tag, post.date, post.file]
    .join(" ")
    .toLowerCase()
    .includes(normalizedQuery));
  renderPosts(matches);
}

async function loadPosts() {
  const list = document.getElementById("post-list");
  try {
    const manifest = await fetch(`${postsPath}index.json`).then((response) => response.json());
    allPosts = await Promise.all(manifest.map(async (entry) => {
      const markdown = await fetch(`${postsPath}${entry.file}`).then((response) => response.text());
      const parsed = parseFrontMatter(markdown);
      return { ...parsed.data, ...entry, body: parsed.body };
    }));

    allPosts.sort((a, b) => b.date.localeCompare(a.date));
    const selectedFile = new URLSearchParams(window.location.search).get("post");
    const selectedPost = allPosts.find((post) => post.file === selectedFile);
    if (selectedPost) renderPostDetail(selectedPost);
    else renderPosts(allPosts);
    const form = document.getElementById("post-search");
    const input = document.getElementById("search-input");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      searchPosts(input.value);
    });
    input.addEventListener("input", () => searchPosts(input.value));
  } catch (error) {
    list.innerHTML = '<p class="loading-state">The notes could not be loaded right now.</p>';
    console.error("Unable to load blog posts", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPosts);
