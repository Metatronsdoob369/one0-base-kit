import axios from 'axios';

export const sendObserverResultToSlack = async (payload: object) => {
  await axios.post(import.meta.env.VITE_SLACK_OBSERVER_WEBHOOK as string, {
    text: `📡 *ObserverNode Result*\n\n\
${JSON.stringify(payload, null, 2)}\
`,
  });
}; 