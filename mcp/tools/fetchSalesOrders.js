import { z } from "zod";
import axios from "axios";

export const fetchSalesOrders = {
  schema: {
    status: z.string().optional()
  },
  handler: async ({ status }) => {
    const sapBaseUrl = process.env.SAP_BASE_URL;
    const username = process.env.SAP_USERNAME;
    const password = process.env.SAP_PASSWORD;

    const url = `${sapBaseUrl}/A_SalesOrder`;
    const response = await axios.get(url, {
      auth: { username, password },
      headers: { Accept: "application/json" },
      params: status ? { $filter: `SalesOrderStatus eq '${status}'` } : {}
    });

    const results = response.data?.d?.results || [];
    if (results.length === 0) {
      return { content: [{ type: "text", text: "No sales orders found." }] };
    }

    const formatted = results
      .map(o => `Order ID: ${o.SalesOrder}, Status: ${o.SalesOrderStatus}`)
      .join('\n');

    return { content: [{ type: "text", text: formatted }] };
  }
};
