# sap-mcp-server
Yet Another SAP MCP Server

This is a Model Context Protocol (MCP) server for VS Code and other AI tools. It provides tools for:

* Fetching npm package info ( for testing )
* Fetching SAP Sales Orders ( for testing )
* Generating ABAP Function Modules using AI
* Generating code snippets in any language using AI

It supports both **stdio** (for MCP Inspector or command-line integrations) and **HTTP** (for future integrations with tools like Cursor).


## Features

* npm Package Info — get details of any package from the npm registry
* SAP Sales Orders — fetch sales orders from your SAP backend
* ABAP Function Generator — generate an ABAP function module template from a description
* AI Code Generation — generate code snippets in any language using AI

## Getting Started

### Clone the repo

```bash
git clone https://github.com/GutjahrAI/sap-mcp-server.git
cd sap-mcp-server
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
TRANSPORT_MODE=stdio
PORT=3000
OPENAI_API_KEY=sk-...
SAP_BASE_URL=https://your-sap-system.com
SAP_USERNAME=your_username
SAP_PASSWORD=your_password
```


## Running the Server

### STDIO mode (for MCP Inspector)

```bash
TRANSPORT_MODE=stdio node index.js
```

### HTTP mode (for HTTP-based clients)

```bash
TRANSPORT_MODE=http node index.js
```d

By default, HTTP listens on `http://localhost:3000/mcp`.


## Available Tools

| Tool ID              | Description                             |
| -------------------- | --------------------------------------- |
| getNpmPackageInfo    | Get info about an npm package           |
| fetchSalesOrders     | Fetch sales orders from SAP             |
| generateAbapFunction | Generate ABAP function module template  |
| generateCodeWithAI   | Generate a code snippet in any language |


## Development

* `index.js` — bootstraps the server and selects transport mode
* `mcp/` — contains MCP tools and tool registration

  * `tools/` — each tool is modular and easy to extend
* `transports/` — stdio and HTTP transport handlers

## Known Limitations

* Only Basic Auth is implemented for SAP calls.


## Contributions

PRs and issues welcome! Let’s make this server even more powerful together.


## License

Apache-2.0


