const MAX_LINKS = 11;

async function shorten() {
    const url = document.getElementById("urlInput").value.trim();
    if (!url) return alert("Enter a URL");

    let saved = JSON.parse(localStorage.getItem("links") || "[]");
    if (saved.length >= MAX_LINKS)
        return alert("You reached the maximum of 11 links!");

    const req = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await req.json();
    saved.push(data.code);
    localStorage.setItem("links", JSON.stringify(saved));

    loadLinks();
}

async function loadLinks() {
    const saved = JSON.parse(localStorage.getItem("links") || "[]");

    const req = await fetch("/api/shorten");
    const all = await req.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    saved.forEach(code => {
        if (!all[code]) return;

        const div = document.createElement("div");
        div.className = "link-item";

        div.innerHTML = `
            <span>/${code}</span>
            <div>
                <button onclick="copy('${code}')">Copy</button>
                <button onclick="removeLink('${code}')">Delete</button>
            </div>
        `;

        list.appendChild(div);
    });
}

function copy(code) {
    navigator.clipboard.writeText(location.origin + "/s/" + code);
    alert("Copied!");
}

async function removeLink(code) {
    let saved = JSON.parse(localStorage.getItem("links") || "[]");
    saved = saved.filter(c => c !== code);
    localStorage.setItem("links", JSON.stringify(saved));

    await fetch("/api/shorten", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
    });

    loadLinks();
}

window.onload = loadLinks;