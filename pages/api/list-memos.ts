import { getMemoRecords } from '../../src/storage';
import type { NextApiRequest, NextApiResponse } from 'next'
import { MemoRecord } from '../../src/storage/types';
import { SlackMessageRequest } from '../../src/utils/slack-message';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const mySelections = {
  //   "blocks": [
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "We found *205 Hotels* in New Orleans, LA from *12/14 to 12/17*"
  //       },
  //       "accessory": {
  //         "type": "overflow",
  //         "options": [
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "emoji": true,
  //               "text": "Option One"
  //             },
  //             "value": "value-0"
  //           },
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "emoji": true,
  //               "text": "Option Two"
  //             },
  //             "value": "value-1"
  //           },
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "emoji": true,
  //               "text": "Option Three"
  //             },
  //             "value": "value-2"
  //           },
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "emoji": true,
  //               "text": "Option Four"
  //             },
  //             "value": "value-3"
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "*<fakeLink.toHotelPage.com|Windsor Court Hotel>*\n★★★★★\n$340 per night\nRated: 9.4 - Excellent"
  //       },
  //       "accessory": {
  //         "type": "image",
  //         "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_1.png",
  //         "alt_text": "Windsor Court Hotel thumbnail"
  //       }
  //     },
  //     {
  //       "type": "context",
  //       "elements": [
  //         {
  //           "type": "image",
  //           "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
  //           "alt_text": "Location Pin Icon"
  //         },
  //         {
  //           "type": "plain_text",
  //           "emoji": true,
  //           "text": "Location: Central Business District"
  //         }
  //       ]
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "*<fakeLink.toHotelPage.com|The Ritz-Carlton New Orleans>*\n★★★★★\n$340 per night\nRated: 9.1 - Excellent"
  //       },
  //       "accessory": {
  //         "type": "image",
  //         "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_2.png",
  //         "alt_text": "Ritz-Carlton New Orleans thumbnail"
  //       }
  //     },
  //     {
  //       "type": "context",
  //       "elements": [
  //         {
  //           "type": "image",
  //           "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
  //           "alt_text": "Location Pin Icon"
  //         },
  //         {
  //           "type": "plain_text",
  //           "emoji": true,
  //           "text": "Location: French Quarter"
  //         }
  //       ]
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "*<fakeLink.toHotelPage.com|Omni Royal Orleans Hotel>*\n★★★★★\n$419 per night\nRated: 8.8 - Excellent"
  //       },
  //       "accessory": {
  //         "type": "image",
  //         "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_3.png",
  //         "alt_text": "Omni Royal Orleans Hotel thumbnail"
  //       }
  //     },
  //     {
  //       "type": "context",
  //       "elements": [
  //         {
  //           "type": "image",
  //           "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
  //           "alt_text": "Location Pin Icon"
  //         },
  //         {
  //           "type": "plain_text",
  //           "emoji": true,
  //           "text": "Location: French Quarter"
  //         }
  //       ]
  //     },
  //     {
  //       "type": "divider"
  //     },
  //     {
  //       "type": "actions",
  //       "elements": [
  //         {
  //           "type": "button",
  //           "text": {
  //             "type": "plain_text",
  //             "emoji": true,
  //             "text": "Next 2 Results"
  //           },
  //           "value": "click_me_123"
  //         }
  //       ]
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "Test block with multi static select"
  //       },
  //       "accessory": {
  //         "type": "multi_static_select",
  //         "placeholder": {
  //           "type": "plain_text",
  //           "text": "Select options",
  //           "emoji": true
  //         },
  //         "options": [
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "text": "*this is plain_text text*",
  //               "emoji": true
  //             },
  //             "value": "value-0"
  //           },
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "text": "*this is plain_text text*",
  //               "emoji": true
  //             },
  //             "value": "value-1"
  //           },
  //           {
  //             "text": {
  //               "type": "plain_text",
  //               "text": "*this is plain_text text*",
  //               "emoji": true
  //             },
  //             "value": "value-2"
  //           }
  //         ],
  //         "action_id": "multi_static_select-action"
  //       }
  //     },
  //     {
  //       "type": "section",
  //       "text": {
  //         "type": "mrkdwn",
  //         "text": "This is a section block with checkboxes."
  //       },
  //       "accessory": {
  //         "type": "checkboxes",
  //         "options": [
  //           {
  //             "text": {
  //               "type": "mrkdwn",
  //               "text": "*option 0*"
  //             },
  //             "description": {
  //               "type": "mrkdwn",
  //               "text": "*option 0*"
  //             },
  //             "value": "value-0"
  //           },
  //           {
  //             "text": {
  //               "type": "mrkdwn",
  //               "text": "*option 1*"
  //             },
  //             "description": {
  //               "type": "mrkdwn",
  //               "text": "*option 1*"
  //             },
  //             "value": "value-1"
  //           },
  //           {
  //             "text": {
  //               "type": "mrkdwn",
  //               "text": "*option 2*"
  //             },
  //             "description": {
  //               "type": "mrkdwn",
  //               "text": "*option 2*"
  //             },
  //             "value": "value-2"
  //           }
  //         ],
  //         "action_id": "checkboxes-action"
  //       }
  //     },
  //     {
  //       "dispatch_action": true,
  //       "type": "input",
  //       "element": {
  //         "type": "plain_text_input",
  //         "action_id": "plain_text_input-action"
  //       },
  //       "label": {
  //         "type": "plain_text",
  //         "text": "Label",
  //         "emoji": true
  //       }
  //     }
  //   ]
  // }

  try {
    const memoRecords = getMemoRecords();
    const memoTemplate = (memo: MemoRecord) => {
      return {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*<${memo.url}|${memo.title}>* - ${memo.url}`
        }
      }
    };

    const blocks = {
      blocks: memoRecords.filter((record) => record.userId === (req.body as SlackMessageRequest).user_id).map(memoTemplate)
    };
    res.status(200).json(blocks);
  } catch (e) {
    res.status(200).send('');
  }
}