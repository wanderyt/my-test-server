const mockActionResponse = {
  "type": "block_actions",
  "user": {
    "id": "U02UQL045PZ",
    "username": "050897",
    "name": "050897",
    "team_id": "T01H5TZGHUJ"
  },
  "api_app_id": "A04TKLB8N2E",
  "token": "hcwQPzye2Pyoo1CsGeIYK1to",
  "container": {
    "type": "message",
    "message_ts": "1689497313.000100",
    "channel_id": "D04U9E41CHE",
    "is_ephemeral": true
  },
  "trigger_id": "5583463331605.1583951561970.0ce5ee9ac10e3f690347b3903a272931",
  "team": {
    "id": "T01H5TZGHUJ",
    "domain": "cash",
    "enterprise_id": "E01BAFDEXUP",
    "enterprise_name": "Block, Inc."
  },
  "enterprise": { "id": "E01BAFDEXUP", "name": "Block, Inc." },
  "is_enterprise_install": false,
  "channel": { "id": "D04U9E41CHE", "name": "directmessage" },
  "state": {
    "values": {
      "iZi": {
        "multi_static_select-action": {
          "type": "multi_static_select",
          "selected_options": []
        }
      },
      "IRs": {
        "checkboxes-action": {
          "type": "checkboxes",
          "selected_options": [
            {
              "text": {
                "type": "mrkdwn",
                "text": "*this is mrkdwn text*",
                "verbatim": false
              },
              "value": "value-0",
              "description": {
                "type": "mrkdwn",
                "text": "*this is mrkdwn text*",
                "verbatim": false
              }
            }
          ]
        }
      },
      "uxEW": {
        "plain_text_input-action": { "type": "plain_text_input", "value": null }
      }
    }
  },
  "response_url": "https://hooks.slack.com/actions/T01H5TZGHUJ/5610096887520/SiAEHjFiw8qxLM56DZqEaGr1",
  "actions": [
    {
      "selected_options": [
        {
          "text": {
            "type": "mrkdwn",
            "text": "*this is mrkdwn text*",
            "verbatim": false
          },
          "value": "value-0",
          "description": {
            "type": "mrkdwn",
            "text": "*this is mrkdwn text*",
            "verbatim": false
          }
        }
      ],
      "action_id": "checkboxes-action",
      "block_id": "IRs",
      "type": "checkboxes",
      "action_ts": "1689497323.669691"
    }
  ]
};

export type SlackAction = typeof mockActionResponse;