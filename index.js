import dotenv from 'dotenv';
import { createServer } from './mcp/mcpServer.js';
import { createHttpTransport } from './transports/httpTransport.js';
import { createStdioTransport } from './transports/stdioTransport.js';

dotenv.config();

const server = await createServer();

const transportMode = process.env.TRANSPORT_MODE || 'stdio';

if (transportMode === 'stdio') {
  const stdioTransport = createStdioTransport();
  await server.connect(stdioTransport);
} else if (transportMode === 'http') {
  const { app, port } = createHttpTransport(server);
  app.listen(port, () => {
    console.error(`🚀 MCP HTTP server running at http://localhost:${port}/mcp`);
  });
} else {
  console.error(`Unknown transport mode: ${transportMode}`);
  process.exit(1);
}
