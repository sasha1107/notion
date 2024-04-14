import { config } from "dotenv";
import { randomEmoji } from "./emoji.js";

config();

const databaseId = process.env.NOTION_DATABASE_ID;

export function parseData(data) {
  const paths = data.paths;

  const formattedData = [];

  for (const path in paths) {
    const methods = paths[path];
    for (const method in methods) {
      const details = methods[method];
      const parameter = details.parameters;
      const responses = Object.entries(details.responses);
      const pathData = {
        cover: {
          type: "external",
          external: {
            url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
          },
        },
        icon: {
          type: "emoji",
          emoji: randomEmoji(),
        },
        parent: {
          type: "database_id",
          database_id: databaseId,
        },
        properties: {
          Path: {
            title: [
              {
                text: {
                  content: path,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: details.summary,
                },
              },
            ],
          },
          Method: {
            select: {
              name: method.toUpperCase(),
            },
          },
          "Last Updated": {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
        children: [
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Parameters",
                  },
                },
              ],
            },
          },
          {
            object: "block",
            type: "code",
            code: {
              caption: [],
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: JSON.stringify(parameter, null, 2),
                  },
                },
              ],
              language: "json",
            },
          },
          {
            object: "block",
            heading_2: {
              rich_text: [
                {
                  text: {
                    content: "Response",
                  },
                },
              ],
            },
          },
        ].concat(
          ...responses.map(([code, response]) => [
            {
              object: "block",
              heading_2: {
                rich_text: [
                  {
                    text: {
                      content: `Response ${code}`,
                    },
                  },
                ],
              },
            },
            {
              object: "block",
              type: "code",
              code: {
                caption: [],
                rich_text: [
                  {
                    type: "text",
                    text: {
                      content: JSON.stringify(response, null, 2),
                    },
                  },
                ],
                language: "json",
              },
            },
          ])
        ),
      };

      formattedData.push(pathData);
    }
  }

  return formattedData;
}
