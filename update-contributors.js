const axios = require('axios');
const fs = require('fs');

const owner = 'Front-End-Coders-Mauritius';
const repo = 'playground';

const contributorsFile = 'contributors.json';

async function updateContributors() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
    const contributors = response.data.map(contributor => contributor.login);

    const existingContributors = fs.existsSync(contributorsFile)
      ? JSON.parse(fs.readFileSync(contributorsFile))
      : [];

    const updatedContributors = [...new Set(existingContributors.concat(contributors))];

    fs.writeFileSync(contributorsFile, JSON.stringify(updatedContributors, null, 2));
    console.log('Contributors file updated.');
  } catch (error) {
    console.error('Error updating contributors:', error);
  }
}

updateContributors();
