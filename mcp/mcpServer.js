import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getNpmPackageInfo } from './tools/getNpmPackageInfo.js';
import { fetchSalesOrders } from './tools/fetchSalesOrders.js';
import { generateAbapFunction } from './tools/generateAbapFunction.js';
import { generateCodeWithAI } from './tools/generateCodeWithAI.js';

export async function createServer() {
  const server = new McpServer({
    name: "npm & SAP integration tools",
    version: "1.0.0",
    description: "Tools to get npm package info and SAP sales order data."
  });

  // Register tools
  server.tool("getNpmPackageInfo", "Get information about an npm package", getNpmPackageInfo.schema, getNpmPackageInfo.handler);
  server.tool("fetchSalesOrders", "Fetch sales orders from SAP", fetchSalesOrders.schema, fetchSalesOrders.handler);
  server.tool("generateAbapFunction","Generate an ABAP function module template",generateAbapFunction.schema,generateAbapFunction.handler);
    server.tool("generateCodeWithAI","Generate code snippet using AI",generateCodeWithAI.schema, generateCodeWithAI.handler);



  return server;
}
