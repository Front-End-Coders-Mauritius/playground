const axios = require('axios');
const fs = require('fs');

const owner = 'Front-End-Coders-Mauritius';
const repo = 'frontendmu-astro';
const branch = 'main'; // Replace with the default branch of your repository

const contributorsFile = 'contributors.json';

async function updateContributors() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
    const contributors = response.data.map(contributor => {
      console.log(contributor);
      return contributor.login; 
    });

    let existingContributors = [];

    if (fs.existsSync(contributorsFile)) {
      existingContributors = JSON.parse(fs.readFileSync(contributorsFile));
    }

    const updatedContributors = [...new Set(existingContributors.concat(contributors))];

    fs.writeFileSync(contributorsFile, JSON.stringify(updatedContributors, null, 2));
    console.log('Contributors file updated.');

    // Add the commit and push logic
    const { execSync } = require('child_process');

    // Configure Git user and email for the commit
    execSync('git config --global user.name "GitHub Action"');
    execSync('git config --global user.email "action@github.com"');

    // Stage the changes
    execSync('git add .');

    // Create the commit
    execSync(`git commit -m "Update contributors.json [skip ci]"`);

    // Push the changes to the repository
    execSync(`git push origin ${branch}`);

    console.log('Changes committed and pushed to the repository.');
  } catch (error) {
    console.error('Error updating contributors:', error);
  }
}

updateContributors();
