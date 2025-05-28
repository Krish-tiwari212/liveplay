import requests

# url = "https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/"

# payload = {
#   "integrated_number": "919359059696",
#   "content_type": "template",
#   "payload": {
#     "messaging_product": "whatsapp",
#     "type": "template",
#     "template": {
#       "name": "event_registration",
#       "language": {
#         "code": "en",
#         "policy": "deterministic"
#       },
#       "namespace": "dcf7d342_945c_4a04_aeaa_5273cecf9a98",
#       "to_and_components": [
#         {
#           "to": ["919702935757", "917678642369"],
#           "components": {
#             "header_1": {
#               "type": "image",
#               "value": "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
#             },
#             "body_1": {
#               "type": "text",
#               "value": "Brother"
#             },
#             "body_2": {
#               "type": "text",
#               "value": "Delhi"
#             },
#             "body_3": {
#               "type": "text",
#               "value": "Delhi"
#             },
#             "body_4": {
#               "type": "text",
#               "value": "19-01-24"
#             },
#             "body_5": {
#               "type": "text",
#               "value": "Sports Event"
#             }
#           }
#         }
#       ]
#     }
#   }
# }

payload = {
    "integrated_number": "919359059696",
    "content_type": "template",
    "payload": {
        "messaging_product": "whatsapp",
        "type": "template",
        "template": {
            "name": "liveplay_whatsapp_otp",
            "language": {
                "code": "en",
                "policy": "deterministic"
            },
            "namespace": "dcf7d342_945c_4a04_aeaa_5273cecf9a98",
            "to_and_components": [
                {
                    "to": [
                        "917678642369",
                        "919702935757"
                    ],
                    "components": {
                        "body_1": {
                            "type": "text",
                            "value": "123456"
                        },
                        "button_1": {
                            "subtype": "url",
                            "type": "text",
                            "value": "123456"
                        }
                    }
                }
            ]
        }
    }
}

headers = {
  "content-type": "application/json",
  "authkey": "435086AzYm8o25376740af6aP1"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
