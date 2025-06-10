import express from 'express';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

export function createHttpTransport(server) {
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());

  const httpTransport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined
  });
  server.connect(httpTransport);

  app.post("/", async (req, res) => {
    try {
      await httpTransport.handleRequest(req, res, req.body);
    } catch (err) {
      console.error("HTTP MCP error:", err);
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          id: req.body?.id ?? null,
          error: { code: -32603, message: "Internal server error" }
        });
      }
    }
  });

  app.delete("/", (req, res) => res.status(405).end());
  app.get("/", (req, res) => res.status(405).end());

  return { app, port };
}
