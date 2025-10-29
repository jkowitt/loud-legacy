# Legacy CRM Web

Concept marketing + product explainer for the Legacy CRM platform inside Loud Legacy. The app follows the shared design tokens so it pairs with VALORA and Business Now while telling the CRM story for sponsorships, real estate, consulting, and more.

## Running locally
```bash
npm install
npm run dev:legacy-crm
```

### Included experience
- Dashboard-first landing page outlining contacts, companies, opportunities, and activities
- Table + kanban previews for pipeline stages and task automation
- Business Now integration section showing template + coaching sync
- Prospect coverage planner to translate revenue goals into required prospects
- AI prospect scout that suggests contacts with context and next steps
- Analytics spotlight for forecasting (expected revenue, win rates, top industries)
- Integration callouts for VALORA, Business Now, and Gmail ingestion flows
- Shared global styles via `@loud-legacy/shared-design-system`

### Next steps
- Wire into `@loud-legacy/shared-auth` once a session adapter is defined
- Extend with API routes for contacts/companies/opportunities data once backend is ready
- Add Storybook or component tests if this matures beyond concept stage
