function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function kvKey(lessonKey) {
  return `asset-progress:${lessonKey}`;
}

async function handleAssetProgress(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (!env.ASSET_PROGRESS) {
    console.error("[asset-progress] ASSET_PROGRESS KV binding is missing");
    return json({ error: "ASSET_PROGRESS KV binding not configured" }, 503);
  }

  if (request.method === "GET") {
    const url = new URL(request.url);
    const lessonKey = (url.searchParams.get("lesson") || "").trim();
    console.log("[asset-progress] GET lesson=", lessonKey);
    if (!lessonKey) {
      return json({ error: "missing lesson query param" }, 400);
    }
    try {
      const raw = await env.ASSET_PROGRESS.get(kvKey(lessonKey));
      const progress = raw ? JSON.parse(raw) : {};
      console.log("[asset-progress] GET ok keys=", Object.keys(progress).length);
      return json({ lessonKey, progress });
    } catch (err) {
      console.error("[asset-progress] GET failed", err);
      return json({ error: "failed to read progress", detail: String(err) }, 500);
    }
  }

  if (request.method === "PUT") {
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error("[asset-progress] PUT invalid JSON", err);
      return json({ error: "invalid JSON body" }, 400);
    }

    const lessonKey = String(body?.lessonKey || "").trim();
    const path = String(body?.path || "").trim();
    const done = !!body?.done;
    console.log("[asset-progress] PUT", { lessonKey, path, done });

    if (!lessonKey || !path) {
      return json({ error: "lessonKey and path are required" }, 400);
    }

    try {
      const raw = await env.ASSET_PROGRESS.get(kvKey(lessonKey));
      const progress = raw ? JSON.parse(raw) : {};
      if (done) progress[path] = true;
      else delete progress[path];
      await env.ASSET_PROGRESS.put(kvKey(lessonKey), JSON.stringify(progress));
      console.log("[asset-progress] PUT ok keys=", Object.keys(progress).length);
      return json({ lessonKey, progress });
    } catch (err) {
      console.error("[asset-progress] PUT failed", err);
      return json({ error: "failed to save progress", detail: String(err) }, 500);
    }
  }

  return json({ error: "method not allowed" }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/asset-progress") {
      return handleAssetProgress(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
