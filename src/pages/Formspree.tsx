{
  "$schema": "https://formspree.io/schemas/2025-05-01/formspree.schema.json",
  "version": "2025-05-01",
  "forms": [
    {
      "id": "xbdkkrzz",
      "name": "PVM Client Onboarding",
      "description": "Multi-step onboarding form for new Prime Visibility Media clients. Collects business details, brand info, target jobs, Google Business Profile access, Meta Ads Manager access, creative assets, and authorization to manage their accounts.",
      "hash": "xbdkkrzz",
      "submissions": {
        "fields": [
          {
            "name": "business_name",
            "label": "Business Name",
            "type": "text",
            "required": true,
            "step": 1
          },
          {
            "name": "contact_name",
            "label": "Owner / Primary Contact",
            "type": "text",
            "required": true,
            "step": 1
          },
          {
            "name": "phone",
            "label": "Phone Number",
            "type": "tel",
            "required": true,
            "step": 1
          },
          {
            "name": "email",
            "label": "Business Email",
            "type": "email",
            "required": true,
            "step": 2
          },
          {
            "name": "address",
            "label": "Business Address",
            "type": "text",
            "required": true,
            "step": 2
          },
          {
            "name": "website",
            "label": "Website",
            "type": "url",
            "required": false,
            "step": 2
          },
          {
            "name": "value_prop",
            "label": "Value Proposition",
            "type": "textarea",
            "required": true,
            "step": 3
          },
          {
            "name": "differentiator",
            "label": "Differentiator",
            "type": "textarea",
            "required": true,
            "step": 3
          },
          {
            "name": "years_in_business",
            "label": "Years In Business",
            "type": "text",
            "required": false,
            "step": 3
          },
          {
            "name": "target_jobs",
            "label": "Target Jobs (multi-select)",
            "type": "text",
            "required": true,
            "step": 4
          },
          {
            "name": "avg_ticket",
            "label": "Average Ticket Size",
            "type": "text",
            "required": true,
            "step": 4
          },
          {
            "name": "service_area",
            "label": "Service Area / Cities",
            "type": "text",
            "required": true,
            "step": 4
          },
          {
            "name": "has_gbp",
            "label": "Has Google Business Profile",
            "type": "select",
            "required": true,
            "step": 5
          },
          {
            "name": "google_email",
            "label": "Google Business Email",
            "type": "email",
            "required": false,
            "step": 5
          },
          {
            "name": "review_volume",
            "label": "Current Review Volume",
            "type": "textarea",
            "required": false,
            "step": 5
          },
          {
            "name": "has_business_manager",
            "label": "Has Meta Business Manager",
            "type": "select",
            "required": true,
            "step": 6
          },
          {
            "name": "meta_admin_email",
            "label": "Meta Business Manager Email",
            "type": "email",
            "required": false,
            "step": 6
          },
          {
            "name": "facebook_page",
            "label": "Facebook Page URL",
            "type": "url",
            "required": false,
            "step": 6
          },
          {
            "name": "instagram_handle",
            "label": "Instagram Handle",
            "type": "text",
            "required": false,
            "step": 6
          },
          {
            "name": "ad_budget",
            "label": "Monthly Ad Budget",
            "type": "text",
            "required": true,
            "step": 6
          },
          {
            "name": "creative_assets",
            "label": "Available Creative Assets (multi-select)",
            "type": "text",
            "required": false,
            "step": 7
          },
          {
            "name": "brand_colors",
            "label": "Brand Colors",
            "type": "textarea",
            "required": false,
            "step": 7
          },
          {
            "name": "brand_notes",
            "label": "Brand Notes",
            "type": "textarea",
            "required": false,
            "step": 7
          },
          {
            "name": "additional_notes",
            "label": "Additional Notes / Goals",
            "type": "textarea",
            "required": false,
            "step": 8
          },
          {
            "name": "authorize_management",
            "label": "Authorize Account Management",
            "type": "checkbox",
            "required": true,
            "step": 8
          },
          {
            "name": "understand_ad_spend",
            "label": "Understands Ad Spend Is Separate",
            "type": "checkbox",
            "required": true,
            "step": 8
          },
          {
            "name": "provide_access",
            "label": "Will Provide Access In 48hrs",
            "type": "checkbox",
            "required": true,
            "step": 8
          },
          {
            "name": "signature",
            "label": "Digital Signature",
            "type": "text",
            "required": true,
            "step": 8
          },
          {
            "name": "signature_date",
            "label": "Signature Date",
            "type": "date",
            "required": true,
            "step": 8
          }
        ]
      },
      "settings": {
        "name": "PVM Client Onboarding Form",
        "notifications": {
          "email": {
            "enabled": true,
            "subject": "🚀 New Client Onboarding — {{ business_name }}",
            "from_name": "PVM Onboarding"
          }
        },
        "submission_limit": 100,
        "captcha": {
          "enabled": false
        },
        "honeypot": {
          "enabled": true
        },
        "redirect_url": null,
        "store_data": true,
        "autoresponse": {
          "enabled": true,
          "subject": "We got your onboarding — {{ business_name }} 🎉",
          "body": "Hey {{ contact_name }},\n\nThanks for completing your PVM onboarding. Your build manager has been notified and will reach out within 24 hours to:\n\n1. Confirm Google Business Profile + Meta Business Manager access\n2. Schedule a quick kickoff call\n3. Send you the access instructions\n\nIn the meantime, no action needed on your end.\n\nQuestions? Reply to this email or text us at (214) 506-0806.\n\n— Prime Visibility Media\nhttps://primevisibilitymedia.com"
        },
        "fields_to_send_in_email": [
          "business_name",
          "contact_name",
          "phone",
          "email",
          "address",
          "value_prop",
          "differentiator",
          "target_jobs",
          "avg_ticket",
          "service_area",
          "has_gbp",
          "google_email",
          "has_business_manager",
          "meta_admin_email",
          "facebook_page",
          "ad_budget",
          "creative_assets",
          "authorize_management",
          "understand_ad_spend",
          "provide_access",
          "signature",
          "signature_date"
        ]
      }
    }
  ]
}
