import { Client } from "@notionhq/client";
import { config } from "dotenv";

config();

const pageId = process.env.NOTION_PAGE_ID;
const apiKey = process.env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

/* 
---------------------------------------------------------------------------
*/

/**
 * Resources:
 * - Create a database endpoint (notion.databases.create(): https://developers.notion.com/reference/create-a-database)
 * - Working with databases guide: https://developers.notion.com/docs/working-with-databases
 */

async function main() {
  // Create a new database
  const response = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    icon: {
      type: "emoji",
      emoji: "📝",
    },
    cover: {
      type: "external",
      external: {
        url: "https://website.domain/images/image.png",
      },
    },
    title: [
      {
        type: "text",
        text: {
          content: "API Docs",
          link: null,
        },
      },
    ],
    properties: {
      Path: {
        title: {},
      },
      Description: {
        rich_text: {},
      },
      Method: {
        select: {
          options: [
            {
              name: "GET",
              color: "blue",
            },
            {
              name: "POST",
              color: "green",
            },
            {
              name: "PUT",
              color: "orange",
            },
            {
              name: "PATCH",
              color: "purple",
            },
            {
              name: "DELETE",
              color: "red",
            },
          ],
        },
      },
      "Last Updated": {
        date: {},
      },
    },
  });

  // Print the new database response
  console.log(response);
}

main();
