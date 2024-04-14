import { Client } from "@notionhq/client";
import { config } from "dotenv";
import swaggerJson from "./swagger.json"  with { type: "json" };
import { parseData } from "./parseJson.js";

config();

const formattedData = parseData(swaggerJson);


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
  formattedData.forEach(async (data) => {
    const response = await notion.pages.create(data);
  });
  // const response = await notion.pages.create({
  //   cover: {
  //     type: "external",
  //     external: {
  //       url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
  //     },
  //   },
  //   icon: {
  //     type: "emoji",
  //     emoji: randomEmoji(),
  //   },
  //   parent: {
  //     type: "database_id",
  //     database_id: databaseId,
  //   },
  //   properties: {
  //     Path: {
  //       title: [
  //         {
  //           text: {
  //             content: "Tuscan kale",
  //           },
  //         },
  //       ],
  //     },
  //     Description: {
  //       rich_text: [
  //         {
  //           text: {
  //             content: "A dark green leafy vegetable",
  //           },
  //         },
  //       ],
  //     },
  //     Method: {
  //       select: {
  //         name: "GET",
  //       },
  //     },
  //     "Last Updated": {
  //       date: {
  //         start: new Date().toISOString(),
  //       },
  //     },
  //   },
  //   children: [
  //     {
  //       object: "block",
  //       heading_2: {
  //         rich_text: [
  //           {
  //             text: {
  //               content: "Lacinato kale",
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       object: "block",
  //       paragraph: {
  //         rich_text: [
  //           {
  //             text: {
  //               content:
  //                 "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
  //               link: {
  //                 url: "https://en.wikipedia.org/wiki/Lacinato_kale",
  //               },
  //             },
  //             href: "https://en.wikipedia.org/wiki/Lacinato_kale",
  //           },
  //         ],
  //         color: "default",
  //       },
  //     },
  //   ],
  // });

  // Print the new database response
  //   console.log(response);
}

main();
