const modalSubmitPayload = {
  "type": "view_submission",
  "team": {
    "id": "T01H5TZGHUJ",
    "domain": "cash",
    "enterprise_id": "E01BAFDEXUP",
    "enterprise_name": "Block, Inc."
  },
  "user": {
    "id": "U02UQL045PZ",
    "username": "050897",
    "name": "050897",
    "team_id": "T01H5TZGHUJ"
  },
  "api_app_id": "A04TKLB8N2E",
  "token": "hcwQPzye2Pyoo1CsGeIYK1to",
  "trigger_id": "5603365778470.1583951561970.d8bceee4b58599abb8dd4f3534567ff1",
  "view": {
    "id": "V05HXSTRERH",
    "team_id": "T01H5TZGHUJ",
    "type": "modal",
    "blocks": [
      {
        "type": "input",
        "block_id": "Mkaz",
        "label": { "type": "plain_text", "text": "Title", "emoji": true },
        "optional": false,
        "dispatch_action": false,
        "element": {
          "type": "plain_text_input",
          "action_id": "memo_title",
          "placeholder": {
            "type": "plain_text",
            "text": "Give this memo a title to remember it by",
            "emoji": true
          },
          "dispatch_action_config": {
            "trigger_actions_on": ["on_enter_pressed"]
          }
        }
      }
    ],
    "private_metadata": "",
    "callback_id": "create_memo_modal",
    "state": {
      "values": {
        "Mkaz": {
          "memo_title": { "type": "plain_text_input", "value": "My new memo" }
        }
      }
    },
    "hash": "1689845427.UHNADjTu",
    "title": { "type": "plain_text", "text": "Save your memo", "emoji": true },
    "clear_on_close": false,
    "notify_on_close": false,
    "close": null,
    "submit": { "type": "plain_text", "text": "Submit", "emoji": true },
    "previous_view_id": null,
    "root_view_id": "V05HXSTRERH",
    "app_id": "A04TKLB8N2E",
    "external_id": "",
    "app_installed_team_id": "T01H5TZGHUJ",
    "bot_id": "B04U9E2NW80"
  },
  "response_urls": [],
  "is_enterprise_install": false,
  "enterprise": { "id": "E01BAFDEXUP", "name": "Block, Inc." }
};

export type ModalSubmitPayload = typeof modalSubmitPayload;
